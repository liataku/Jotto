package hello;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

    //findUserId and findByUserName had outdated search
    //queries, changed from firstName and lastName to
    //mongoid and userName respectively
    //note - all repository methods MUST begin with "findBy"
    //and end with the variable they are searching for
    //with the first letter capitalized.
    //(e.g. "String mckenna" search is findByMckenna(string mckenna)
    //unfortunately findById is a default method in
    //CrudRepository so to avoid override conflict
    //I had to temporarily change all instances of
    //"id" to "mongoid", please change as needed. - Peter
    public User findByMongoid(String mongoid);

    public List<User> findByUserName(String userName);
}
