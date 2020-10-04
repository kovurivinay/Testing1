package com.Ticketing.Booking.DAO;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Ticketing.Booking.Entities.Shows;

@Repository
public interface ShowsDAO extends JpaRepository<Shows, Integer> {

	List<Shows> findByShowName(String showName);

	void deleteByShowName(String showName);

	List<Shows> findByMovieName(String movieName);

	List<Shows> findByTheatreName(String theatreName);

	List<Shows> findByTheatreNameAndMovieName(String theatreName, String movieName);

	void deleteByMovieName(String movieName);

	void deleteByTheatreName(String theatreName);

}

