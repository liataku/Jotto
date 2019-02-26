package hello;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController{

    private UserRepository userRepository;

    public UserController(UserRepository userRepository)
    {
        this.userRepository = userRepository;
    }

    @GetMapping("/all")
    public List<User> getAll()
    {
        List<User> users = this.userRepository.findAll();

    }
    @PutMapping
    public void insert(@RequestBody User user){
        this.userRepository.insert(user);
    }

    @PostMapping
    public void update(RequestBody User user){
        this.userRepository.save(user);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") String id)
    {
        this.userRepository.delete(id);
    }

    @GetMapping("/{id}")
    public User getById(@PathVariable("id") string id)
    {
        User user = this.userRepository.findById(id);

        return user;
    }

    @GetMapping("/Users/{username}")
    public List<User> getByUsername(@PathVariable("username") String userName)
    {
        List<User> user = this.userRepository.findByUserName(userName);

        return user;
    }



}