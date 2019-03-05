package hello;
import java.util.ArrayList;
import java.util.Date;


public class Games{

    private Date date;
    private String playerName;
    private String player_Word;
    private String cpu_Word;
    private ArrayList<Guesses> guesses;
    private int gameNum = 0;

    public Games(Date date, String playerName, String player_Word, String cpu_Word)
    {
        this.date = date;
        this.playerName = playerName;
        this.player_Word = player_Word;
        this.cpu_Word = cpu_Word;
        guesses = new ArrayList<Guesses>();
        gameNum++;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getPlayerName() {
        return playerName;
    }

    public void setPlayerName(String playerName) {
        this.playerName = playerName;
    }

    public String getPlayer_Word() { return this.player_Word; }

    public void setPlayer_Word(String player_Word) { this.player_Word = player_Word; }

    public String getCpu_Word() {
        return cpu_Word;
    }

    public void setCpu_Word(String cpu_Word) {
        this.cpu_Word = cpu_Word;
    }

    public ArrayList<Guesses> getGuesses() {
        return guesses;
    }

    public void setGuesses(ArrayList<Guesses> guesses) {
        this.guesses = guesses;
    }

    public int getGameNum() {
        return gameNum;
    }

    public void setGuess(Guesses guess)
    {
        this.guesses.add(guess);
    }

    public void AddGame() {
        gameNum++;
    }
}