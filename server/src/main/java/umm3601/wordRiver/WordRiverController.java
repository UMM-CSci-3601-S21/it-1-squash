package umm3601.wordRiver;

import java.util.ArrayList;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.mongojack.JacksonMongoCollection;
import io.javalin.http.Context;

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

}
