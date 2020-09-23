package com.Ticketing.Movie.DAO;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Ticketing.Movie.Entity.Movie;

@Repository
public interface MovieDAO extends JpaRepository<Movie, Integer>{

	public Optional<Movie> findMovieByMovieName(String movieName);

	public void deleteByMovieName(String movieName);
	
}
