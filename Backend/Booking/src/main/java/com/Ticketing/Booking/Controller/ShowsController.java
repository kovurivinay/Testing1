package com.Ticketing.Booking.Controller;

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

import com.Ticketing.Booking.DAO.ShowsDAO;
import com.Ticketing.Booking.Entities.Shows;
import com.Ticketing.Booking.Service.ShowsService;

@RestController
@RequestMapping("/")
@CrossOrigin("*") 
public class ShowsController {
	@Autowired
	ShowsService showsService;
	
	@Autowired
	ShowsDAO showsDao;
	
	@RequestMapping("/showsTest")
	public String home() {
		return "Hello from Shows Service";
	}
	
	@GetMapping("/showsByShow/{showsName}")
	public ResponseEntity<Object> getShows(@PathVariable String showsName) {
		try {
			List<Shows> shows = this.showsService.getShows(showsName);
			if (shows.isEmpty()) {
				return ResponseEntity.notFound().build();
			}
			return ResponseEntity.ok(shows);
		} catch (Exception e) {
			return ResponseEntity.badRequest().build();
		}
	}
	
	@GetMapping("/showsByMovie/{movieName}")
	public ResponseEntity<Object> getShowWithMovieName(@PathVariable String movieName) {
		try {
			List<Shows> shows = this.showsService.getShowsWithMovie(movieName);
			if (shows.isEmpty()) {
				return ResponseEntity.notFound().build();
			}
			return ResponseEntity.ok(shows);
		} catch (Exception e) {
			return ResponseEntity.badRequest().build();
		}
	}
	
	@GetMapping("/showsByTheatre/{theatreName}")
	public ResponseEntity<Object> getShowWithTheatreName(@PathVariable String theatreName) {
		try {
			List<Shows> shows = this.showsService.getShowsWithTheatre(theatreName);
			if (shows.isEmpty()) {
				return ResponseEntity.notFound().build();
			}
			return ResponseEntity.ok(shows);
		} catch (Exception e) {
			return ResponseEntity.badRequest().build();
		}
	}
	
	@GetMapping("/shows")
	public ResponseEntity<List<Shows>> getAllShowss() {
		try {
			List<Shows> shows = this.showsService.getAllShows();
			return ResponseEntity.ok(shows);
		} catch (Exception e) {
			return ResponseEntity.badRequest().build();
		}
	}
	
	@PostMapping("/shows")
	public ResponseEntity<Shows> addNewShows(@RequestBody Shows shows, @RequestParam("Role") String role) {
		try {
			if(role.equalsIgnoreCase("admin")){
				return ResponseEntity.ok(this.showsService.addShows(shows));
			}
			return ResponseEntity.badRequest().build();
		} catch (Exception e) {
			return ResponseEntity.badRequest().build();
		}
	}
	

	@PutMapping("/shows/{showsId}")
	public ResponseEntity<Object> updateShows(@PathVariable int showsId, @RequestBody Shows shows, @RequestParam("Role") String role) {
		try {
			if(role.equalsIgnoreCase("admin")){
				Optional<Shows> retrievedShow = this.showsService.getShowsWithId(showsId);
				if (!retrievedShow.isPresent()) {
					return new ResponseEntity<>("Show not found! ", HttpStatus.BAD_REQUEST);
				}
				Shows fetchedshow = retrievedShow.get();
				if (shows.getCost()!=null) {
					fetchedshow.setCost(shows.getCost());
				}
				if (shows.getMovieName().length()!=0) {
					fetchedshow.setMovieName(shows.getMovieName());	
				}
				if (shows.getSeatingCapacity()!=null) {
					fetchedshow.setSeatingCapacity(shows.getSeatingCapacity());	
				}
				if (shows.getShowName().length()!=0) {
					fetchedshow.setShowName(shows.getShowName());	
				}
				if (shows.getTheatreName().length()!=0) {
					fetchedshow.setTheatreName(shows.getTheatreName());	
				}
				System.out.println(shows.getDate());
				if (shows.getDate()!=null) {
					fetchedshow.setDate(shows.getDate());	
				}
				
				this.showsDao.save(fetchedshow);
				return ResponseEntity.ok().build();
			}
			return ResponseEntity.badRequest().build();
		} catch (Exception e) {
			return ResponseEntity.badRequest().build();
		}
	}

	@DeleteMapping("/shows/{showsId}")
	public ResponseEntity<Shows> deleteShows(@PathVariable int showsId, @RequestParam("Role") String role) {
		try {
			if(role.equalsIgnoreCase("admin")){
				this.showsService.deleteShows(showsId);
				return ResponseEntity.ok().build();
			}
			return ResponseEntity.badRequest().build();
		} catch (Exception e) {
			return ResponseEntity.badRequest().build();
		}
	}
}
