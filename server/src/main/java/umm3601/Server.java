package umm3601;

import java.util.Arrays;
import com.mongodb.MongoClientSettings;
import com.mongodb.ServerAddress;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;
import io.javalin.Javalin;
import io.javalin.core.util.RouteOverviewPlugin;

import umm3601.user.UserController;
import umm3601.wordRiver.WordRiverController;

public class Server {

  static String appName = "Word River";

  public static void main(String[] args) {

    // Get the MongoDB address and database name from environment variables and
    // if they aren't set, use the defaults of "localhost" and "dev".
    String mongoAddr = System.getenv().getOrDefault("MONGO_ADDR", "localhost");
    String databaseName = System.getenv().getOrDefault("MONGO_DB", "dev");

    // Setup the MongoDB client object with the information we set earlier
    MongoClient mongoClient = MongoClients.create(MongoClientSettings.builder()
        .applyToClusterSettings(builder -> builder.hosts(Arrays.asList(new ServerAddress(mongoAddr)))).build());

    // Get the database
    MongoDatabase database = mongoClient.getDatabase(databaseName);

    // Initialize dependencies
    UserController userController = new UserController(database);
    WordRiverController wordRiverController = new WordRiverController(database);
    Javalin server = Javalin.create(config -> {
      config.registerPlugin(new RouteOverviewPlugin("/api"));
    });
    /*
     * We want to shut the `mongoClient` down if the server either fails to start,
     * or when it's shutting down for whatever reason. Since the mongoClient needs
     * to be available throughout the life of the server, the only way to do this is
     * to wait for these events and close it then.
     */
    server.events(event -> {
      event.serverStartFailed(mongoClient::close);
      event.serverStopped(mongoClient::close);
    });
    Runtime.getRuntime().addShutdownHook(new Thread(() -> {
      server.stop();
    }));

    server.start(4567);

    // Gets the context packs that are currently in the database.
    // NOTE: The database must be seeded before this can work properly
    server.get("/api/wordlists", wordRiverController::getPacks);

    server.get("/api/wordlists/:id", wordRiverController::getPack);

    // List users, filtered using query parameters
    server.get("/api/users", userController::getUsers);

    // Get the specified user
    server.get("/api/users/:id", userController::getUser);

    // Delete the specified user
    server.delete("/api/users/:id", userController::deleteUser);

    // Add new user with the user info being in the JSON body
    // of the HTTP request
    server.post("/api/users", userController::addNewUser);

    server.exception(Exception.class, (e, ctx) -> {
      ctx.status(500);
    });
  }
}
