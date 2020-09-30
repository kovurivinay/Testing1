package com.Ticketing.User.Controller;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.Ticketing.User.Entity.User;
import com.Ticketing.User.DAO.UserDAO;
import com.Ticketing.User.Entity.User;
import com.Ticketing.User.Service.UserService;

@RestController
@RequestMapping("/")
@CrossOrigin("*") 
public class UserController {

	@Autowired
	UserService userService;
	
	@Autowired
	UserDAO userDao;
	
	@RequestMapping("/")
	public String home() {
		return "Hello from Login Service";
	}
	
	@PostMapping("/login")
	public ResponseEntity<Object> loginUser(@RequestBody User user) {
		System.out.println("Inside Login");
		List<User> loginUser = userDao.findUserByEmail(user.getEmail());
//		System.out.println(user.getPassword());
		if (loginUser.size() > 0) {
//			System.out.println(loginUser.get(0).getEmail());
			if(loginUser.get(0).getPassword().equals(user.getPassword())) {
				return new ResponseEntity<>(loginUser, HttpStatus.OK);
			}
			else {
				return ResponseEntity.notFound().build();
			}
		}

		return ResponseEntity.notFound().build();
	}

	@PostMapping("/signUp")
	public ResponseEntity<Object> signup(@RequestBody User req) {
		try {
			System.out.println("Inside Sign Up!");
			String email = req.getEmail();
			String password = req.getPassword();
			String emailCheck[] = email.split("@");
			String role;
			
			// To check if the email and password are not empty
			if (email.equals("")) {
				return new ResponseEntity<>("FAILURE-EMPTY_EMAIL", HttpStatus.BAD_REQUEST);
			}
			if (password.equals("")) {
				return new ResponseEntity<>("FAILURE-EMPTY_PASSWORD", HttpStatus.BAD_REQUEST);
			}
			
			// To check if the user already exists
			List<User> users = userDao.findUserByEmail(email);
			if (users.size() > 0) {
//				System.out.println(users.get(0).getEmail());
				return new ResponseEntity<>("FAILURE-Email_Exists", HttpStatus.BAD_REQUEST);
			}

			User user = new User();
			user.setPassword(req.getPassword());
			user.setEmail(email);
			user.setUserName(req.getUserName());
			user.setRole(req.getRole());
			user.setPhonenumber(req.getPhonenumber());
			user = userDao.save(user);
			System.out.println("User saved!");
			return new ResponseEntity<>(user, HttpStatus.OK);
		}
		catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<Object>("Bad Request", HttpStatus.BAD_REQUEST);
		}

	
	}
	
	@GetMapping("/users")
	public ResponseEntity<List<User>> getAllUsers(@RequestParam("Role") String role) {
		try {
			if(role.equalsIgnoreCase("admin")){
				List<User> user = this.userService.getAllUsers();
				return ResponseEntity.ok(user);
			}
			return ResponseEntity.badRequest().build();
		} catch (Exception e) {
			return ResponseEntity.badRequest().build();
		}
	}
	
	@PutMapping("/user/{email}")
	public ResponseEntity<Object> updateUser(@PathVariable String email, @RequestBody User user) {
		try {

				List<User> users = userDao.findUserByEmail(email);
				if (users.size() == 0) {
					return new ResponseEntity<>("FAILURE-Email does not Exists", HttpStatus.BAD_REQUEST);
				}
				User fetchedUser = users.get(0);
				fetchedUser.setEmail(user.getEmail());
				fetchedUser.setUserName(user.getUserName());
				fetchedUser.setPassword(user.getPassword());
				fetchedUser.setRole(user.getRole());
				fetchedUser.setPhonenumber(user.getPhonenumber());
				
				this.userService.addUser(fetchedUser);
				return ResponseEntity.ok().build();
		} catch (Exception e) {
			return ResponseEntity.badRequest().build();
		}
	}

	@DeleteMapping("/user/{email}")
	public ResponseEntity<User> deleteUser(@PathVariable String email) {
		try {
		
				this.userService.deleteUser(email);
				return ResponseEntity.ok().build();
			
		} catch (Exception e) {
			return ResponseEntity.badRequest().build();
		}
	}
	
	@GetMapping("/user/{email}")
	public ResponseEntity<List<User>> getUser(@PathVariable String email) {
		try {
			List<User> user = this.userService.getUserByEmail(email);
			return ResponseEntity.ok(user);
		} catch (Exception e) {
			return ResponseEntity.badRequest().build();
		}
	}
	
}
