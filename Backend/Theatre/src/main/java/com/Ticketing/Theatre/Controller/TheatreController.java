package com.Ticketing.Theatre.Controller;

import java.util.List;
import java.util.Optional;

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

import com.Ticketing.Theatre.Service.TheatreService;
import com.Ticketing.Theatre.DAO.TheatreDAO;
import com.Ticketing.Theatre.Entity.Theatre;


@RestController
@RequestMapping("/")
@CrossOrigin("*") 
public class TheatreController {
	
	@Autowired
	TheatreService theatreService;
	
	@Autowired
	TheatreDAO theatreDao;
	
	@RequestMapping("/")
	public String home() {
		return "Hello from Theatre Service";
	}
	
	@GetMapping("/theatre/{theatreName}")
	public ResponseEntity<Theatre> getTheatre(@PathVariable String theatreName) {
		try {
			Optional<Theatre> theatre = this.theatreService.getTheatre(theatreName);
			if (!theatre.isPresent()) {
				return ResponseEntity.notFound().build();
			}
			return ResponseEntity.ok(theatre.get());
		} catch (Exception e) {
			return ResponseEntity.badRequest().build();
		}
	}
	
	@GetMapping("/theatres")
	public ResponseEntity<List<Theatre>> getAllTheatres() {
		try {
			List<Theatre> theatre = this.theatreService.getAllTheatres();
			return ResponseEntity.ok(theatre);
		} catch (Exception e) {
			return ResponseEntity.badRequest().build();
		}
	}
	
	@PostMapping("/theatre")
	public ResponseEntity<Object> addNewTheatre(@RequestBody Theatre theatre, @RequestParam("Role") String role) {
		try {
			if(role.equalsIgnoreCase("admin")){
				Optional<Theatre> fetchedtheatre = this.theatreService.getTheatre(theatre.getTheatreName());
				if (fetchedtheatre.isPresent()) {
					return new ResponseEntity<>("Theatre name taken!", HttpStatus.BAD_REQUEST);
				}
				return ResponseEntity.ok(this.theatreService.addTheatre(theatre));
			}
			return ResponseEntity.badRequest().build();
		} catch (Exception e) {
			return ResponseEntity.badRequest().build();
		}
	}
	

	@PutMapping("/theatre")
	public ResponseEntity<Object> updateTheatre(@RequestBody Theatre theatre, @RequestParam("Role") String role) {
		try {
			if(role.equalsIgnoreCase("admin")){
				Optional<Theatre> retrievedtheatre = this.theatreService.getTheatre(theatre.getTheatreName());
				if (!retrievedtheatre.isPresent()) {
					return new ResponseEntity<>("Theatre name not present!", HttpStatus.BAD_REQUEST);
				}
				Theatre fetchedTheatre = retrievedtheatre.get();
				if(theatre.getTheatreName().length()!=0) {
					fetchedTheatre.setTheatreName(theatre.getTheatreName());	
				}
				if(theatre.getLocation().length()!=0) {
					fetchedTheatre.setLocation(theatre.getLocation());	
				}
				if(theatre.getSeatingCapacity()!=null) {
					fetchedTheatre.setSeatingCapacity(theatre.getSeatingCapacity());	
				}
				
				this.theatreService.addTheatre(fetchedTheatre);
				return ResponseEntity.ok().build();
			}
			return ResponseEntity.badRequest().build();
		} catch (Exception e) {
			return ResponseEntity.badRequest().build();
		}
	}

	@DeleteMapping("/theatre/{theatreName}")
	public ResponseEntity<Theatre> deleteTheatre(@PathVariable String theatreName, @RequestParam("Role") String role) {
		try {
			if(role.equalsIgnoreCase("admin")){
				Optional<Theatre> theatre = this.theatreService.getTheatre(theatreName);
				if (!theatre.isPresent()) {
					return ResponseEntity.notFound().build();
				}
				this.theatreService.deleteTheatre(theatreName);
				return ResponseEntity.ok().build();
			}
			return ResponseEntity.badRequest().build();
		} catch (Exception e) {
			return ResponseEntity.badRequest().build();
		}
	}
}
