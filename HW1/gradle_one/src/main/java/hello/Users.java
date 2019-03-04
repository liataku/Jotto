package hello;

import java.util.ArrayList;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Users")
public class Users{

    @Id
    private String mongoid;
    private String userName;
    private String password;

    private ArrayList<Games> games;

    public Users(String userName, String password)
    {

        this.userName = userName;
        this.password = password;
        games = new ArrayList<Games>();

    }

    public ArrayList<Games> getAllGamesFromUser()
    {
        return games;
    }

    public String getId()
    {
        return mongoid;
    }

    public void setId(String mongoid)
    {
        this.mongoid = mongoid;
    }

    public void setUsername(String userName)
    {
        this.userName = userName;
    }

    public String getUserName()
    {
        return userName;
    }

    public void setPasswordname(String passwordName)
    {
        this.password = passwordName;
    }

    public String getPasswordName()
    {
        return this.password;
    }


    //adds a game to the list
    public void addGame(Games game)
    {
        games.add(game);
    }

    //Loop through and return game with correct id
    public Games getGame(int id)
    {
        for(int i = 0; i < games.size(); i++)
        {
            if(games.get(i).getGameNum() == id)
            {
                return games.get(i);
            }
        }

        return null;

    }



}