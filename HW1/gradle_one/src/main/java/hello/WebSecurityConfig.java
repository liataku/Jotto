package hello;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Configuration
//@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http
                .authorizeRequests()
                .antMatchers("/", "/home",
                        "/css/jotto.css", "/css/StyleSheet.css",
                        "/js/jquery-3.3.1.min.js","/users/AllGames", "/users/AllUserGames/", "/users/AllGuesses",
                        "/users", "/users/AllUserGuesses/", "/users/AddUser", "/users/UpdateUser", "/users/Delete", "/users/GetUser/", "/users/", "/hello", "/js/buttonhelper.js", "/users/GetAllUsers", "/temporary",
                        "/register").permitAll()
                .anyRequest().authenticated()
                .and()
                .formLogin()
                .loginPage("/login")
                .permitAll()
                .and()
                .logout()
                .permitAll();
        //http.authorizeRequests().antMatchers("/resources/static/css/jotto.css").permitAll();
        //http.authorizeRequests().antMatchers("/*.css").permitAll();
    }

    //can definie user related details here
    /*
    @Bean
    @Override
    public UserDetailsService userDetailsService() {
        UserDetails user_rock =
                User.withDefaultPasswordEncoder()
                        .username("Rock")
                        .password("calcium")
                        .roles("USER")
                        .build();
    //admin role interacts strangely with login
        // not a major gripe right now but
        //we will eventually have to define custom roles
        UserDetails user_roll =
                User.withDefaultPasswordEncoder()
                        .username("Roll")
                        .password("helium")
                        .roles("ADMIN")
                        .build();
        return new InMemoryUserDetailsManager(user_rock,user_roll);
    }
    */
    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    @Service
    public class MyUserDetailsService implements UserDetailsService {

        @Autowired
        private UserRepository userRepository;

        @Override
        public UserDetails loadUserByUsername(String username) {

            Users user = userRepository.findByUserName(username);
            //System.out.println("loadUserByUsername triggered");

            if (user == null) {
                //System.out.println("No user found with username: "+ username);
                throw new UsernameNotFoundException("No user found with username: "+ username);
            }
            //System.out.println("loadUserByUsername successful");
            Set<GrantedAuthority> grantedAuthorities = new HashSet<GrantedAuthority>(1);
            grantedAuthorities.add(new SimpleGrantedAuthority("USER"));
            return new org.springframework.security.core.userdetails.User(
                    user.getUserName(),
                    passwordEncoder().encode(user.getPasswordName()),
                    grantedAuthorities);
        }
    }
}