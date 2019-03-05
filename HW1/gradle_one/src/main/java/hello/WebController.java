package hello;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.jws.WebParam;
import java.util.ArrayList;

@RestController
@RequestMapping()
public class WebController
{
    public WebController(){};


    @GetMapping(path = "/login")
    public ModelAndView getLoginPage()
    {
        ModelAndView mv = new ModelAndView("login");
        System.out.println("Login");

        return mv;

    }

    @GetMapping(path = "/home")
    public ModelAndView getHomePage()
    {
        ModelAndView mv = new ModelAndView("home");

        System.out.println("Home");

        return mv;

    }

    @GetMapping(path = "/register")
    public ModelAndView getRegisterPage()
    {
        ModelAndView mv = new ModelAndView("register");

        System.out.println("Register");

        return mv;

    }
    
    @GetMapping(path = "/hello")
    public ModelAndView getHelloPage()
    {
        ModelAndView mv = new ModelAndView("hello");

        System.out.println("hello");

        return mv;

    }

    @GetMapping(path = "/test_jotto")
    public ModelAndView getJottoPage()
    {
        ModelAndView mv = new ModelAndView("test_jotto");

        System.out.println("test_jotto");

        return mv;

    }

    @GetMapping(path = "/temporary")
    public ModelAndView getTempPage()
    {
        ModelAndView mv = new ModelAndView("Temporary");

        System.out.println("temp");

        return mv;

    }
    @GetMapping(path = "/")
    public ModelAndView getHome()
    {
        ModelAndView mv = new ModelAndView("home");
        System.out.println("Home first");

        return mv;

    }
}




