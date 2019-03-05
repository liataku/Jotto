package hello;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;

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
}