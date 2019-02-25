package hello;


import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import org.springframework.http.CacheControl;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewResolverRegistry;

@Configuration
public class MvcConfig implements WebMvcConfigurer {
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/home").setViewName("home");
        registry.addViewController("/").setViewName("home");
        registry.addViewController("/hello").setViewName("hello");
        registry.addViewController("/test_jotto").setViewName("test_jotto");
        registry.addViewController("/login").setViewName("login");
    }
    /*
    public void addResourceHandlers(ResourceHandlerRegistry registry) {

        // Register resource handler for CSS and JS
        registry.addResourceHandler("/resources/**")
                .addResourceLocations("classpath:/statics/", "D:/statics/");

    }
    */
}