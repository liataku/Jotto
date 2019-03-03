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
    @GetMapping(path = "/AllUsers", produces =  "application/json")
    public JSONObject getAllUsers()
    {
        List<User> users = this.userRepository.findAll();
        JSONObject tmp = new JSONObject();
        try {
            for(int i = 0; i < users.size(); i++)
            {
                tmp.put("Id", users.get(i).getId()); //some public getters inside GraphUser?
                tmp.put("Username", users.get(i).getUserName());
                tmp.put("Password", users.get(i).getPasswordName());
                tmp.put("Games" , users.get(i).getAllGamesFromUser());
            }
        } catch(Exception e)
        {
            System.out.println("User not added \n");
        }
        return tmp;
    }
    //Returns all games ever played
    @GetMapping(path = "/AllGames", produces =  "application/json")
    public JSONObject getAllGames()
    {
        List<User> users = this.userRepository.findAll();
        JSONObject tmp = new JSONObject();

        JSONArray gameArray = new JSONArray();

        for(int i = 0; i < users.size(); i++)
        {
            for(int j = 0; j < users.get(i).getAllGamesFromUser().size(); j++)
            {
                Games aGame = users.get(i).getGame(j+1);
                gameArray.add(aGame);
            }
        }

        tmp.put("Games",gameArray);
        return tmp;
    }

    //Returns all guess that have ever been made ever
    @GetMapping(path = "/AllGuesses", produces =  "application/json")
    public JSONObject getAllGuesses()
    {
        JSONObject gamesObject = getAllGames();
        ArrayList<Games> gameList = (ArrayList<Games>) gamesObject.get("Games");
        ArrayList<Guesses> gl = new ArrayList<Guesses>();


        for(int i = 0; i < gameList.size(); i++)
        {
            ArrayList<Guesses> guessList = new ArrayList<Guesses>();
            guessList = gameList.get(i).getGuesses();

            for(int j = 0; j < guessList.size(); j++)
            {
                gl.add(guessList.get(j));
            }

        }

        JSONObject tmp = new JSONObject();
        tmp.put("Guesses", gl);
        return tmp;
    }

    //Returns a list of all of a single users guesses
    @GetMapping(path = "/AllUserGuesses/{id}", produces =  "application/json")
    public JSONObject getAllUserGuesses(@PathVariable(name = "id") String id)
    {
        User user = userRepository.findByMongoid(id);
        ArrayList<Games> gamesList = user.getAllGamesFromUser();
        ArrayList<Guesses> gl = new ArrayList<Guesses>();

        for(int i = 0; i < gamesList.size(); i++)
        {
            ArrayList<Guesses> guessesList = gamesList.get(i).getGuesses();

            for(int j = 0; j < guessesList.size(); j++)
            {
                gl.add(guessesList.get(j));
            }
        }

        JSONObject tmp = new JSONObject();
        tmp.put("Guesses", gl);


        return tmp;
    }


    @PutMapping("/InsertUser")
    public void insert(@RequestBody User user){
        this.userRepository.insert(user);
    }

    @PostMapping(path = "/AddUser", consumes =  "application/json")
    public void update(@RequestBody User user) {
        this.userRepository.save(user);

    }

    @PutMapping("/UpdateUser")
    public void add(@RequestBody User user) {
        this.userRepository.save(user);
    }

    @DeleteMapping("/Delete/{id}")
    public void delete(@PathVariable("id") String id)
    {
        this.userRepository.delete(this.userRepository.findByMongoid(id));
    }

    @GetMapping(path = "GetUser/{id}", produces =  "application/json")
    public JSONObject getById(@PathVariable("id") String id)
    {
        User user = this.userRepository.findByMongoid(id);
        JSONObject tmp = new JSONObject();
        tmp.put("User", user);
        return tmp;
    }

    @GetMapping(path = "/Users/{username}", produces =  "application/json")
    public JSONObject getByUsername(@PathVariable("username") String userName)
    {
        List<User> user = this.userRepository.findByUserName(userName);
        JSONObject tmp = new JSONObject();
        tmp.put("User", user);
        return tmp;
    }
}