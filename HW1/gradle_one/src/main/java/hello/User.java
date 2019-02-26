package hello;

import java.util.ArrayList;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Users")
public class User{

    @Id
    private String id;
    private String userName;
    private String password;

    private ArrayList<Games> games;

    public User(String id, String userName, String password)
    {
        this.id = id;
        this.userName = userName;
        this.password = password;

        games = new ArrayList<Games>();

    }

    public String getId()
    {
        return id;
    }

    public void setId(String id)
    {
        this.id = id;
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
    public Games getGame(String id)
    {
        return null;
    }



}