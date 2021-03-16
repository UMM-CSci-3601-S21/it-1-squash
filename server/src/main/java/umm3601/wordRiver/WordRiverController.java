package umm3601.wordRiver;

import static com.mongodb.client.model.Filters.eq;

import java.util.ArrayList;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.mongojack.JacksonMongoCollection;

import io.javalin.http.BadRequestResponse;
import io.javalin.http.Context;
import io.javalin.http.NotFoundResponse;

public class WordRiverController {

  private final JacksonMongoCollection<ContextPack> contextPackCollection;

  /**
   * Construct a controller for context packs
   *
   * @param database the database containing context pack data
   */
  public WordRiverController(MongoDatabase database) {
    contextPackCollection = JacksonMongoCollection.builder().build(database, "wordlists", ContextPack.class);
  }

  /**
   * Get a Json response with a list of all context packs
   *
   * @param ctx a Javalin HTTP context
   */
  public void getPacks(Context ctx) {
    ctx.json(contextPackCollection.find(new Document()).into(new ArrayList<>()));
  }

  public void getPack(Context ctx) {

    String id = ctx.pathParam("id");
    ContextPack contextPack;

    try {
      contextPack = contextPackCollection.find(eq("_id", new ObjectId(id))).first();
    } catch (IllegalArgumentException e) {
      throw new BadRequestResponse("The requested context pack id wasn't a legal Mongo Object ID.");
    }
    if (contextPack == null) {
      throw new NotFoundResponse("The requested context pack was not found");
    } else {
      ctx.json(contextPack);
    }
  }

}
