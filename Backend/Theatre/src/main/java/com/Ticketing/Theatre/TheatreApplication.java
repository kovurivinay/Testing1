package com.Ticketing.Theatre;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.ComponentScan;

import com.Ticketing.Theatre.Controller.TheatreController;

@SpringBootApplication
//@ComponentScan(basePackageClasses = TheatreController.class, ShowsController.class)
@ComponentScan("com.Ticketing.Theatre")
@EnableEurekaClient 
public class TheatreApplication {

	public static void main(String[] args) {
		SpringApplication.run(TheatreApplication.class, args);
	}

}
