package hello;
import java.util.List;

public class Guesses{

    @Id
    String id;
    String type;
    String guess;
    int correct_num = 0;

    ArrayList<String> correct_Array;

    public Guesses(String id, String guess, int correct_num, String type)
    {
        this.id = id;
        this.guess = guess;
        this.correct_num = correct_num;
        this.type = type;
        correct_Array = new ArrayList<String>();

    }

    public String getId()
    {
        return id;
    }

    public String getType()
    {
        return type;
    }

    public String getGuess()
    {
        return guess;
    }

    public int getCorrect_num()
    {
        return correct_num;
    }

   public void setId(String id)
   {
       this.id = id;
   }

   public void setGuess(String guess)
   {
       this.guess = guess;
   }

   public void setType(String type)
   {
       this.type = type;
   }

   public void setCorrect_num(String num)
   {
       this.correct_Array.add(num);
   }



}