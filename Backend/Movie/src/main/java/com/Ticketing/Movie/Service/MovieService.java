package com.Ticketing.Movie.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.Ticketing.Movie.DAO.MovieDAO;
import com.Ticketing.Movie.Entity.Movie;

@Service
@Transactional
public class MovieService {

	@Autowired
	MovieDAO movieDao;
	
	public Optional<Movie> getMovie(String movieName) {
		return this.movieDao.findMovieByMovieName(movieName);
	}

	public List<Movie> getAllMovies() {
		return this.movieDao.findAll();
	}

	public Movie addMovie(Movie movie) {
		return this.movieDao.save(movie);
	}

	public void deleteMovie(String movieName) {
		this.movieDao.deleteByMovieName(movieName);
		
	}

}
