package umm3601.wordRiver;

import static com.mongodb.client.model.Filters.eq;


import java.util.ArrayList;


import com.google.common.collect.ImmutableMap;
import com.mongodb.client.MongoDatabase;

import org.bson.Document;
import org.bson.types.ObjectId;
import org.mongojack.JacksonMongoCollection;

import io.javalin.http.BadRequestResponse;
import io.javalin.http.Context;
import io.javalin.http.NotFoundResponse;
public class WordRiverController {

  private final JacksonMongoCollection<ContextPack> ctxCollection;


/**
 * Construct a controller for context packs
 *
 * @param database the database containing context pack data
 */

 public WordRiverController(MongoDatabase database) {
   ctxCollection = JacksonMongoCollection.builder().build(database, "wordlists", ContextPack.class);
 }


 /**
  * Get a Json response with a list of all context packs
  *
  * @param ctx a Javalin HTTP context
  */

  public void getPacks(Context ctx) {
    ctx.json(ctxCollection.find(new Document()).into(new ArrayList<>()));
  }

}
