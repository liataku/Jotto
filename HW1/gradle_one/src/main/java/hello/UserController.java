package hello;

import org.json.simple.JSONObject;
import org.json.simple.JSONArray;
import org.json.simple.parser.ParseException;
import org.json.simple.parser.JSONParser;
import org.springframework.web.bind.annotation.*;
import org.springframework.util.MimeType;
import org.springframework.http.MediaType;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import javax.print.attribute.standard.Media;
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
    @GetMapping(path = "/GetAllUsers")
    public List<Users> getAllUsers()
    {
        System.out.println("This is the magic test! \n");
        List<Users> users = this.userRepository.findAll();

        return users;
    }
    //Returns all games ever played
    @GetMapping(path = "/AllGames")
    public ArrayList<Games> getAllGames()
    {

        System.out.println("Inside of all games \n");
        List<Users> users = this.userRepository.findAll();

        ArrayList<Games> gameArray = new ArrayList<Games>();

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

    //Returns all games a user has played

    @GetMapping(path = "/AllUserGames/{id}")
    public ArrayList<Games> getAllUserGames(@PathVariable(name = "id") String id)
    {
        Users user = userRepository.findByMongoid(id);
        ArrayList<Games> gamesList = user.getAllGamesFromUser();

        return gamesList;

    }

    //Returns all guesses that have ever been made ever
    @GetMapping(path = "/AllGuesses")
    public ArrayList<Guesses> getAllGuesses()
    {


        System.out.println("Before Guess loop \n");

        System.out.println("Inside of all guesses \n");

        List<Users> users = this.userRepository.findAll();

        ArrayList<Games> gameArray = new ArrayList<Games>();

        for(int i = 0; i < users.size(); i++)
        {
            for(int j = 0; j < users.get(i).getAllGamesFromUser().size(); j++)
            {
                Games aGame = users.get(i).getGame(j+1);
                gameArray.add(aGame);
            }
        }
        ArrayList<Guesses> gl = new ArrayList<Guesses>();

        try{
            for(int i = 0; i < gameArray.size(); i++)
            {
                for(int j = 0; j < gameArray.get(i).getGuesses().size(); j++)
                {
                    gl.add(gameArray.get(i).getGuesses().get(j));
                }

            }

        }catch(Exception e){
            System.out.println("Exception");
        }

        System.out.println("After Guess loop \n");
        return gl;
    }

    //Returns a list of all of a single users guesses
    @GetMapping(path = "/AllUserGuesses/{id}")
    public ArrayList<Guesses> getAllUserGuesses(@PathVariable(name = "id") String id)
    {
        Users user = userRepository.findByMongoid(id);
        ArrayList<Games> gamesList = user.getAllGamesFromUser();
        ArrayList<Guesses> gl = new ArrayList<Guesses>();

        try{
            for(int i = 0; i < gamesList.size(); i++)
            {
                ArrayList<Guesses> guessesList = gamesList.get(i).getGuesses();

                for(int j = 0; j < guessesList.size(); j++)
                {
                    gl.add(guessesList.get(j));
                }
            }
        }catch(Exception e){

            System.out.println("Another execeotoj");
        }


        return gl;
    }


    @PostMapping(value = "/AddUser")
    public ModelAndView insert(@ModelAttribute("user") Users user){
        //delete(user.getId());

        System.out.println("Inside of add users \n");
        this.userRepository.insert(user);
        System.out.println(user.getUserName());

        ModelAndView mv = new ModelAndView("home");
        mv.setView(new RedirectView("/home?registered", true));

        return mv;
    }

    @PostMapping(path = "/UpdateUser")
    public void update(@ModelAttribute Users user) {
       
        this.userRepository.save(user);

    }

    // adds a user to the database
   /* @PutMapping("/AddUser")
    public void add(@RequestBody Users user) {
        this.userRepository.save(user);
    }*/

    @DeleteMapping("/Delete/{id}")
    public void delete(@PathVariable("id") String id)
    {
        this.userRepository.delete(this.userRepository.findByMongoid(id));
    }

    //Returns a user object to client
    @GetMapping(path = "GetUser/{id}")
    public Users getById(@PathVariable("id") String id)
    {
        Users user = this.userRepository.findByMongoid(id);
//        String mongoid = user.getId();
//        String username = user.getUserName();
//        String password = user.getPasswordName();
//
//        ArrayList<Games> games = user.getAllGamesFromUser();
//        JSONObject tmp = new JSONObject();
//
//        tmp.put("id", mongoid);
//        tmp.put("username",username);
//        tmp.put("password", password);
//        tmp.put("games", games);

        return user;
    }

    //Returns a user back to client using the name
    @GetMapping(path = "/Users/{username}")
    public Users getByUsername(@PathVariable("username") String userName)
    {
        Users user = this.userRepository.findByUserName(userName);
//        String mongoid = user.getId();
//        String username = user.getUserName();
//        String password = user.getPasswordName();
//
//        ArrayList<Games> games = user.getAllGamesFromUser();
//        JSONObject tmp = new JSONObject();
//        tmp.put("id", mongoid);
//        tmp.put("username",username);
//        tmp.put("password", password);
//        tmp.put("games", games);

        return user;
    }


}