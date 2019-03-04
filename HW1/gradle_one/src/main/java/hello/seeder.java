package hello;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

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
        Users guy = new Users("Guy", "Cheetah");

        Users michelle = new Users(
                "Ibis",
                "90"

                );

        Users sofitel = new Users(
                "Sofitel",
                "200"
                );

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
