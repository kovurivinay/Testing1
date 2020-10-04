package com.Ticketing.Booking.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.Ticketing.Booking.DAO.ShowsDAO;
import com.Ticketing.Booking.Entities.Shows;

@Service
@Transactional
public class ShowsService {
	@Autowired
	ShowsDAO showsDao;
	
	public List<Shows> getShows(String showName) {
		return this.showsDao.findByShowName(showName);
	}

	public List<Shows> getAllShows() {
		return this.showsDao.findAll();
	}

	public Shows addShows(Shows show) {
		Shows addedShows = this.showsDao.save(show);
		return addedShows;
	}

	public void deleteShows(int showsId) {
		this.showsDao.deleteById(showsId);
		
	}

	public List<Shows> getShowsWithMovie(String movieName) {
		return this.showsDao.findByMovieName(movieName);
	}

	public List<Shows> getShowsWithTheatre(String theatreName) {
		return this.showsDao.findByTheatreName(theatreName);
	}
	
	public List<Shows> getShowsWithTheatreAndMovie(String theatreName, String movieName) {
		return this.showsDao.findByTheatreNameAndMovieName(theatreName, movieName);
	}

	public Optional<Shows> getShowsWithId(int showsId) {
		return this.showsDao.findById(showsId);
	}

	public void deleteShowByMovieName(String movieName) {
		this.showsDao.deleteByMovieName(movieName);
	}

	public void deleteShowByTheatreName(String theatreName) {
		 this.showsDao.deleteByTheatreName(theatreName);
		
	}
	
}