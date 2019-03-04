package hello;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.util.Date;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
public class seeder implements CommandLineRunner {

    private UserRepository userRepository;

    public seeder(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... strings) throws Exception {
        Date date = new Date();
        Games g1 = new Games(date, "guy", "Happy");
        Games g2 = new Games(date, "guy", "Dopey");

        Games g3 = new Games(date, "Ibis", "Times");
        Games g4 = new Games(date, "Sofitel", "Carry");
        Guesses guess = new Guesses("boom", 2, "type");
        Guesses guess2 = new Guesses("pop", 1, "chicken");
        Guesses guess3 = new Guesses("drop", 3, "fries");
        Guesses guess4 = new Guesses("lock", 1, "pizza");

        g1.setGuess(guess);
        g1.setGuess(guess2);
        g3.setGuess(guess2);
        g3.setGuess(guess2);
        g4.setGuess(guess2);
        g4.setGuess(guess);
        g2.setGuess(guess2);
        g2.setGuess(guess4);
        g2.setGuess(guess3);

        for(int i = 0; i < g1.getGuesses().size(); i++)
        {
            g1.getGuesses().get(i).setGuess("LLALA" + i);

        }
        for(int i = 0; i < g2.getGuesses().size(); i++)
        {
            g2.getGuesses().get(i).setGuess("Lamps" + i);
        }
        for(int i = 0; i < g3.getGuesses().size(); i++)
        {
            g3.getGuesses().get(i).setGuess("Karra" + i);
        }
        for(int i = 0; i < g4.getGuesses().size(); i++)
        {
            g4.getGuesses().get(i).setGuess( "Pablo" + i);
        }

        Users guy = new Users("Guy", "Cheetah");

        guy.addGame(g1);
        guy.addGame(g2);


        Users michelle = new Users("Ibis","90");

        michelle.addGame(g3);


        Users sofitel = new Users("Sofitel", "200");
        sofitel.addGame(g4);

        // drop all hotels
        this.userRepository.deleteAll();

        //add our hotels to the database
        List<Users> users2 = Arrays.asList(guy, michelle, sofitel);
        this.userRepository.save(guy);
        this.userRepository.save(michelle);
        this.userRepository.save(sofitel);

        System.out.println(userRepository.findByUserName("Sofitel").getUserName());
    }
}
