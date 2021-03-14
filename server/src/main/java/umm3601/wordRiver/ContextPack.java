package umm3601.wordRiver;

import org.mongojack.Id;
import org.mongojack.ObjectId;
import java.util.ArrayList;

public class ContextPack {

  @ObjectId @Id
  public String _id;

  public String schema = "https://raw.githubusercontent.com/kidstech/story-builder/master/Assets/packs/schema/pack.schema.json";
  public String name;
  public String icon;
  public boolean enabled;
  public ArrayList<WordList> wordlist;
}
