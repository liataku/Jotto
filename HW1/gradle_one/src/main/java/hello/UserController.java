package hello;

import org.json.simple.JSONObject;
import org.json.simple.JSONArray;
import org.json.simple.parser.ParseException;
import org.json.simple.parser.JSONParser;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController{

    private UserRepository userRepository;

    public UserController(UserRepository userRepository)
    {
        this.userRepository = userRepository;
    }

    //Returns a list of all Users
    @GetMapping(path = "/AllUsers", produces =  "application/json", consumes = "application/json")
    public JSONObject getAllUsers()
    {
        List<Users> users = this.userRepository.findAll();
        JSONObject tmp = new JSONObject();
        try {
            for(int i = 0; i < users.size(); i++)
            {
                tmp.put("id", users.get(i).getId()); //some public getters inside GraphUser?
                tmp.put("username", users.get(i).getUserName());
                tmp.put("password", users.get(i).getPasswordName());
                tmp.put("games" , users.get(i).getAllGamesFromUser());
            }
        } catch(Exception e)
        {
            System.out.println("User not added \n");
        }
        return tmp;
    }
    //Returns all games ever played
    @GetMapping(path = "/AllGames", produces =  "application/json", consumes = "application/json")
    public JSONArray getAllGames()
    {
        List<Users> users = this.userRepository.findAll();

        JSONArray gameArray = new JSONArray();

        for(int i = 0; i < users.size(); i++)
        {
            for(int j = 0; j < users.get(i).getAllGamesFromUser().size(); j++)
            {
                Games aGame = users.get(i).getGame(j+1);
                gameArray.add(aGame);
            }
        }

        return gameArray;
    }

    //Returns all guesses that have ever been made ever
    @GetMapping(path = "/AllGuesses", produces =  "application/json", consumes = "application/json")
    public JSONArray getAllGuesses()
    {
        ArrayList<Games> gameList = getAllGames();

        JSONArray gl = new JSONArray();


        for(int i = 0; i < gameList.size(); i++)
        {
            ArrayList<Guesses> guessList = new ArrayList<Guesses>();
            guessList = gameList.get(i).getGuesses();

            for(int j = 0; j < guessList.size(); j++)
            {
                gl.add(guessList.get(j));
            }

        }

        return gl;
    }

    //Returns a list of all of a single users guesses
    @GetMapping(path = "/AllUserGuesses/{id}", produces =  "application/json", consumes = "application/json")
    public JSONArray getAllUserGuesses(@PathVariable(name = "id") String id)
    {
        Users user = userRepository.findByMongoid(id);
        ArrayList<Games> gamesList = user.getAllGamesFromUser();
        JSONArray gl = new JSONArray();

        for(int i = 0; i < gamesList.size(); i++)
        {
            ArrayList<Guesses> guessesList = gamesList.get(i).getGuesses();

            for(int j = 0; j < guessesList.size(); j++)
            {
                gl.add(guessesList.get(j));
            }
        }

        return gl;
    }


    @PutMapping(value = "/InsertUser", consumes = "application/json")
    public void insert(@RequestBody Users user){
        this.userRepository.insert(user);
    }

    @PostMapping(path = "/AddUser", consumes =  "application/json")
    public void update(@RequestBody Users user) {

        this.userRepository.save(user);

    }

    @PutMapping("/UpdateUser")
    public void add(@RequestBody Users user) {
        this.userRepository.save(user);
    }

    @DeleteMapping("/Delete/{id}")
    public void delete(@PathVariable("id") String id)
    {
        this.userRepository.delete(this.userRepository.findByMongoid(id));
    }

    //Returns a user object to client
    @GetMapping(path = "GetUser/{id}", produces =  "application/json", consumes = "application/json")
    public JSONObject getById(@PathVariable("id") String id)
    {
        Users user = this.userRepository.findByMongoid(id);
        String mongoid = user.getId();
        String username = user.getUserName();
        String password = user.getPasswordName();

        ArrayList<Games> games = user.getAllGamesFromUser();
        JSONObject tmp = new JSONObject();

        tmp.put("id", mongoid);
        tmp.put("username",username);
        tmp.put("password", password);
        tmp.put("games", games);

        return tmp;
    }

    //Returns a user back to client using the name
    @GetMapping(path = "/Users/{username}", produces =  "application/json", consumes = "application/json")
    public JSONObject getByUsername(@PathVariable("username") String userName)
    {
        Users user = this.userRepository.findByUserName(userName);
        String mongoid = user.getId();
        String username = user.getUserName();
        String password = user.getPasswordName();

        ArrayList<Games> games = user.getAllGamesFromUser();
        JSONObject tmp = new JSONObject();
        tmp.put("id", mongoid);
        tmp.put("username",username);
        tmp.put("password", password);
        tmp.put("games", games);

        return tmp;
    }
}