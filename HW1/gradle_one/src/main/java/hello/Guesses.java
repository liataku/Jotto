package hello;
import org.springframework.data.annotation.Id;

import java.util.ArrayList;

public class Guesses{

    @Id
    String id;
    String type;
    String guess;
    int correct_num = 0;

    ArrayList<String> correct_Array;

    public Guesses(String guess, int correct_num, String type)
    {

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

    public ArrayList<String> getCorrect_Array() {
        return correct_Array;
    }
    public void setCorrect_Array(ArrayList<String> correct_Array) {
        this.correct_Array = correct_Array;
    }
}