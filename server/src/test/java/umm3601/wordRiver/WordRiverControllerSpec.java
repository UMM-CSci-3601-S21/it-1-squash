package umm3601.wordRiver;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.collect.ImmutableMap;
import com.mockrunner.mock.web.MockHttpServletRequest;
import com.mockrunner.mock.web.MockHttpServletResponse;
import com.mongodb.MongoClientSettings;
import com.mongodb.ServerAddress;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import org.bson.Document;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import io.javalin.http.BadRequestResponse;
import io.javalin.http.Context;
import io.javalin.http.NotFoundResponse;
import io.javalin.http.util.ContextUtil;
import io.javalin.plugin.json.JavalinJson;

public class WordRiverControllerSpec {
  MockHttpServletRequest mockReq = new MockHttpServletRequest();
  MockHttpServletResponse mockRes = new MockHttpServletResponse();
  private WordRiverController wordRiverController;
  private ObjectId robinId;
  static MongoClient mongoClient;
  static MongoDatabase db;
  static ObjectMapper jsonMapper = new ObjectMapper();

  @BeforeAll
  public static void setupAll() {
    String mongoAddr = System.getenv().getOrDefault("MONGO_ADDR", "localhost");
    mongoClient = MongoClients.create(MongoClientSettings.builder()
        .applyToClusterSettings(builder -> builder.hosts(Arrays.asList(new ServerAddress(mongoAddr)))).build());
    db = mongoClient.getDatabase("test");
  }

  @BeforeEach
  public void setupEach() throws IOException {
    // Reset out mock request and response objects
    mockReq.resetAll();
    mockRes.resetAll();
    // Setup database
    MongoCollection<Document> ctxDocuments = db.getCollection("wordlists");
    ctxDocuments.drop();
    List<Document> testPacks = new ArrayList<>();

    // this format for adding items was borrowed from Team Climate https://github.com/UMM-CSci-3601-S21/it-1-climate

    testPacks.add(new Document().append("name", "batman").append("icon", "batman.png").append("enabled", "true").append(
        "wordlist",
        Arrays.asList(new Document().append("name", "batman").append("enabled", true)
            .append("nouns", Arrays.asList(new Document("word", "suit").append("forms", Arrays.asList("suits"))))
            .append("verbs", Arrays.asList(new Document("word", "glide").append("forms", Arrays.asList("glides"))))
            .append("adjectives", Arrays.asList(new Document("word", "black").append("forms", Arrays.asList("blacks"))))
            .append("misc", Arrays.asList(new Document("word", "the").append("forms", Arrays.asList("the")))))));

    testPacks.add(new Document().append("name", "joker").append("icon", "joker.png").append("enabled", "false").append(
        "wordlist",
        Arrays.asList(new Document().append("name", "joker").append("enabled", true)
            .append("nouns", Arrays.asList(new Document("word", "suit").append("forms", Arrays.asList("suits"))))
            .append("verbs", Arrays.asList(new Document("word", "laugh").append("forms", Arrays.asList("laughs"))))
            .append("adjectives", Arrays.asList(new Document("word", "evil").append("forms", Arrays.asList("evils"))))
            .append("misc", Arrays.asList(new Document("word", "the").append("forms", Arrays.asList("the")))))));

    robinId = new ObjectId();
    Document robin = new Document().append("_id", robinId).append("name", "robin").append("icon", "robin.png")
        .append("enabled", "true").append("wordlist",
            Arrays.asList(new Document().append("name", "robin").append("enabled", true)
                .append("nouns", Arrays.asList(new Document("word", "suit").append("forms", Arrays.asList("suits"))))
                .append("verbs", Arrays.asList(new Document("word", "fight").append("forms", Arrays.asList("fights"))))
                .append("adjectives", Arrays.asList(new Document("word", "red").append("forms", Arrays.asList("reds"))))
                .append("misc", Arrays.asList(new Document("word", "the").append("forms", Arrays.asList("the"))))));

    ctxDocuments.insertMany(testPacks);
    ctxDocuments.insertOne(robin);
    wordRiverController = new WordRiverController(db);
  }

  @AfterAll
  public static void teardown() {
    db.drop();
    mongoClient.close();
  }

  @Test
  public void GetAllContextPacks() throws IOException {
    // Create fake Javalin context
    Context ctx = ContextUtil.init(mockReq, mockRes, "api/wordlists");
    wordRiverController.getContextPacks(ctx);
    assertEquals(200, mockRes.getStatus());
    String result = ctx.resultString();
    assertEquals(db.getCollection("wordlists").countDocuments(),
        JavalinJson.fromJson(result, ContextPack[].class).length);
  }

  @Test
public void GetContextPackWithExistentId() throws IOException {

  String testID = robinId.toHexString();

  Context ctx = ContextUtil.init(mockReq, mockRes, "api/wordlists/:id", ImmutableMap.of("id", testID));
  wordRiverController.getContextPack(ctx);

  assertEquals(200, mockRes.getStatus());

  String result = ctx.resultString();
  ContextPack resultPack = JavalinJson.fromJson(result, ContextPack.class);

  assertEquals(resultPack._id, robinId.toHexString());
  assertEquals(resultPack.name, "robin");
}

@Test
  public void GetContextPackWithBadId() throws IOException {

    Context ctx = ContextUtil.init(mockReq, mockRes, "api/wordlists/:id", ImmutableMap.of("id", "bad"));

    assertThrows(BadRequestResponse.class, () -> {
      wordRiverController.getContextPack(ctx);
    });
  }

@Test
  public void GetContextPackWithNonexistentId() throws IOException {

    Context ctx = ContextUtil.init(mockReq, mockRes, "api/wordlists/:id", ImmutableMap.of("id", "58af3a600343927e48e87335"));

    assertThrows(NotFoundResponse.class, () -> {
      wordRiverController.getContextPack(ctx);
    });
  }

  @Test
public void AddNewWordList() throws IOException {
  String testNewWordList = "{"
    + "\"name\": \"Test\","
    + "\"enabled\": true,"
    + "\"nouns\": [],"
    + "\"verbs\": [],"
    + "\"adjectives\": [],"
    + "\"misc\": []"
    + "}";

    String testID = robinId.toHexString();
    mockReq.setBodyContent(testNewWordList);
    mockReq.setMethod("POST");

    Context ctx = ContextUtil.init(mockReq, mockRes, "api/wordlists/:id", ImmutableMap.of("id", testID));
    wordRiverController.addWordList(ctx);

    assertEquals(200, mockRes.getStatus());
}
}
