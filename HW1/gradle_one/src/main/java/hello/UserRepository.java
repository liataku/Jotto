package hello;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<Customer, String> {

    public Customer findById(String firstName);

    public List<Customer> findByUsername(String lastName);
}
