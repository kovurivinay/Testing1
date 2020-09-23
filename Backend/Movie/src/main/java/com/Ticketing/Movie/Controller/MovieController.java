package com.Ticketing.Movie.Controller;
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

import com.Ticketing.Movie.DAO.MovieDAO;
import com.Ticketing.Movie.Service.MovieService;
import com.Ticketing.Movie.Entity.Movie;

@RestController
@RequestMapping("/")
@CrossOrigin("*") 
public class MovieController {

	@Autowired
	MovieService movieService;
	
	@Autowired
	MovieDAO movieDao;
	
	@RequestMapping("/")
	public String home() {
		return "Hello from Movie Service";
	}
	
	@GetMapping("/movie/{movieName}")
	public ResponseEntity<Movie> getMovie(@PathVariable String movieName) {
		try {
			Optional<Movie> movie = this.movieService.getMovie(movieName);
			if (!movie.isPresent()) {
				return ResponseEntity.notFound().build();
			}
			return ResponseEntity.ok(movie.get());
		} catch (Exception e) {
			return ResponseEntity.badRequest().build();
		}
	}
	
	@GetMapping("/movies")
	public ResponseEntity<List<Movie>> getAllMovies() {
		try {
			List<Movie> movie = this.movieService.getAllMovies();
			return ResponseEntity.ok(movie);
		} catch (Exception e) {
			return ResponseEntity.badRequest().build();
		}
	}
	
	@PostMapping("/movie")
	public ResponseEntity<Object> addNewMovie(@RequestBody Movie movie, @RequestParam("Role") String role) {
		try {
			if(role.equalsIgnoreCase("admin")){
				Optional<Movie> fetchedmovie = this.movieService.getMovie(movie.getMovieName());
				if (fetchedmovie.isPresent()) {
					return new ResponseEntity<>("Movie name taken!", HttpStatus.BAD_REQUEST);
				}
				return ResponseEntity.ok(this.movieService.addMovie(movie));
			}
			return ResponseEntity.badRequest().build();
		} catch (Exception e) {
			return ResponseEntity.badRequest().build();
		}
	}
	

	@PutMapping("/movie/{movieName}")
	public ResponseEntity<Object> updateMovie(@PathVariable String movieName, @RequestBody Movie movie, @RequestParam("Role") String role) {
		try {
			if(role.equalsIgnoreCase("admin")){
				Optional<Movie> fetchedmovie = this.movieService.getMovie(movie.getMovieName());
				if (!fetchedmovie.isPresent()) {
					return new ResponseEntity<>("Movie not available!", HttpStatus.BAD_REQUEST);
				}
				Movie retrievedMovie = fetchedmovie.get();
				retrievedMovie.setGenre(movie.getGenre());
				retrievedMovie.setLanguage(movie.getLanguage());
				retrievedMovie.setMovieName(movie.getMovieName());
				retrievedMovie.setRating(movie.getRating());
				retrievedMovie.setReleaseDate(movie.getReleaseDate());
				
				this.movieService.addMovie(retrievedMovie);
				return ResponseEntity.ok().build();
			}
			return ResponseEntity.badRequest().build();
		} catch (Exception e) {
			return ResponseEntity.badRequest().build();
		}
	}

	@DeleteMapping("/movie/{movieName}")
	public ResponseEntity<Movie> deleteMovie(@PathVariable String movieName, @RequestParam("Role") String role) {
		try {
			if(role.equalsIgnoreCase("admin")){
				this.movieService.deleteMovie(movieName);
				return ResponseEntity.ok().build();
			}
			return ResponseEntity.badRequest().build();
		} catch (Exception e) {
			return ResponseEntity.badRequest().build();
		}
	}
	
	
}

