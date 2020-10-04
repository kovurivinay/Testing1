package com.Ticketing.Booking.Controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.persistence.Column;

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

import com.Ticketing.Booking.DAO.BookingDAO;
import com.Ticketing.Booking.Service.BookingService;
import com.Ticketing.Booking.Service.ShowsService;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.Ticketing.Booking.Entities.Booking;
import com.Ticketing.Booking.Entities.Shows;

@RestController
@RequestMapping("/")
@CrossOrigin("*") 
public class BookingController {

	@Autowired
	BookingService bookingService;
	
	@Autowired
	BookingDAO bookingDao;
	
	@Autowired
	ShowsService showsService;
	
	@RequestMapping("/")
	public String home() {
		return "Hello from Booking Service";
	}
	
	@GetMapping("/booking/{username}")
	public ResponseEntity<Object> getBooking(@PathVariable String username) {
		try {
			List<Booking> bookings = this.bookingService.getBooking(username);
			if (bookings.isEmpty()) {
				return ResponseEntity.notFound().build();
			}
			return ResponseEntity.ok(bookings);
		} catch (Exception e) {
			return ResponseEntity.badRequest().build();
		}
	}
	
	@GetMapping("/bookings")
	public ResponseEntity<List<Booking>> getAllBookings(@RequestParam("Role") String role) {
		try {
			if(role.equalsIgnoreCase("admin")){
				List<Booking> booking = this.bookingService.getAllBookings();
				return ResponseEntity.ok(booking);
			}
			return ResponseEntity.badRequest().build();
			
		} catch (Exception e) {
			return ResponseEntity.badRequest().build();
		}
	}
	
	@GetMapping("/bookingsBetweenDates")
	public ResponseEntity<List<Booking>> getbookingsBetweenDates(@RequestParam("Role") String role, @RequestParam("startDate") String d1, @RequestParam("endDate") String d2) {
		try {
			if(role.equalsIgnoreCase("admin")){
			    Date startDate=new SimpleDateFormat("dd-MM-yyyy").parse(d1);  
			    Date endDate=new SimpleDateFormat("dd-MM-yyyy").parse(d2);  
				List<Booking> bookings = this.bookingService.getAllBookings();
				List<Booking> filteredBooking = new ArrayList<>();
				for(Booking b:bookings) {
					if (b.getDate().after(startDate) && b.getDate().before(endDate)) {
						filteredBooking.add(b);
					}
				}
				return ResponseEntity.ok(filteredBooking);
			}
			return ResponseEntity.badRequest().build();
		} catch (Exception e) {
			return ResponseEntity.badRequest().build();
		}
	}
	
	@GetMapping("/cancelledbookings")
	public ResponseEntity<List<Booking>> getCancelledBookings(@RequestParam("Role") String role, @RequestParam("startDate") String d1, @RequestParam("endDate") String d2) {
		try {
			if(role.equalsIgnoreCase("admin")){
			    Date startDate=new SimpleDateFormat("dd-MM-yyyy").parse(d1);  
			    Date endDate=new SimpleDateFormat("dd-MM-yyyy").parse(d2);  
				List<Booking> bookings = this.bookingService.getAllBookings();
				List<Booking> filteredBooking = new ArrayList<>();
				for(Booking b:bookings) {
					if (b.getCancelled()!=null && b.getCancelled()==true && b.getDate().after(startDate) && b.getDate().before(endDate)) {
						filteredBooking.add(b);
					}
				}
				return ResponseEntity.ok(filteredBooking);
			}
			return ResponseEntity.badRequest().build();
		} catch (Exception e) {
			return ResponseEntity.badRequest().build();
		}
	}
	
	@PostMapping("/booking")
	public ResponseEntity<Object> addNewBooking(@RequestBody Booking booking) {
		try {
				Optional<Shows> retrievedShow = this.showsService.getShowsWithId(booking.getId());
				if (!retrievedShow.isPresent()) {
					System.out.println("No show present!");
					return new ResponseEntity<>("No show present with given theatrename and moviename!", HttpStatus.BAD_REQUEST);
				}
				else {
					Shows show = retrievedShow.get();
						if (show.getDate().compareTo(booking.getDate())==0){
							Integer remainingTickets = show.getSeatingCapacity()-booking.getTicketCount();
							if (remainingTickets >=0) {
								show.setSeatingCapacity(remainingTickets);
								this.showsService.addShows(show);
								booking.setCost(booking.getTicketCount()*show.getCost());
							}
							else {
								return new ResponseEntity<>("No tickets left for the show! Tickets remaining are: "+show.getSeatingCapacity(), HttpStatus.BAD_REQUEST);
							}
						}
					}
				return ResponseEntity.ok(this.bookingService.addBooking(booking));
			
		} catch (Exception e) {
			return ResponseEntity.badRequest().build();
		}
	}
	


	@DeleteMapping("/booking/{bookingId}")
	public ResponseEntity<Booking> deleteBooking(@PathVariable int bookingId) {
		try {
			this.bookingService.deleteBooking(bookingId);
			return ResponseEntity.ok().build();
		} catch (Exception e) {
			return ResponseEntity.badRequest().build();
		}
	}
	
	@DeleteMapping("/deleteBookingByMovie/{movieName}")
	public ResponseEntity<Booking> deleteBookingMovie(@PathVariable String movieName) {
		try {
			this.bookingService.deleteBookingByMovieName(movieName);
			this.showsService.deleteShowByMovieName(movieName);
			return ResponseEntity.ok().build();
		} catch (Exception e) {
			return ResponseEntity.badRequest().build();
		}
	}
	
	@DeleteMapping("/deleteBookingByTheatre/{theatreName}")
	public ResponseEntity<Booking> deleteBookingTheatre(@PathVariable String theatreName) {
		try {
			this.bookingService.deleteBookingByTheatreName(theatreName);
			this.showsService.deleteShowByTheatreName(theatreName);
			return ResponseEntity.ok().build();
		} catch (Exception e) {
			return ResponseEntity.badRequest().build();
		}
	}
	
	@PostMapping("/cancelBooking/{username}/{bookingId}")
	public ResponseEntity<Object> cancelBooking(@PathVariable String username, @PathVariable int bookingId) {
		try {
			Optional<Booking> retrievedBooking = this.bookingService.getBooking(username, bookingId);
			if(!retrievedBooking.isPresent()) {
				return new ResponseEntity<Object>("Booking not found", HttpStatus.NOT_FOUND);
			}
			Booking currentBooking = retrievedBooking.get();
			currentBooking.setCancelled(true);
			this.bookingDao.save(currentBooking);
			
			return ResponseEntity.ok().build();
		} catch (Exception e) {
			return ResponseEntity.badRequest().build();
		}
	}
	
	@PostMapping("/cancelBooking/{username}")
	public ResponseEntity<Object> cancelBooking(@PathVariable String username) {
		try {
			List<Booking> bookings = this.bookingService.getBooking(username);
			if (bookings.isEmpty()) {
				return ResponseEntity.notFound().build();
			}
			for(Booking currentBooking:bookings) {
				currentBooking.setCancelled(true);
				this.bookingDao.save(currentBooking);	
			}
			return ResponseEntity.ok().build();
		} catch (Exception e) {
			return ResponseEntity.badRequest().build();
		}
	}
	
}
