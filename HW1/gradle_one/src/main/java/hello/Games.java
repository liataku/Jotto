package hello;
import java.util.ArrayList;

public class Games{

    String date;
    String playerName;
    String cpu_Word;
    ArrayList<Guesses> guesses;

    public Games(String date, String playerName, String cpu_Word)
    {
        this.date = date;
        this.playerName = playerName;
        this.cpu_Word = cpu_Word;
        guesses = new ArrayList<Guesses>();
    }
}