package com.Ticketing.Theatre.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.Ticketing.Theatre.DAO.TheatreDAO;
import com.Ticketing.Theatre.Entity.Theatre;

@Service
@Transactional
public class TheatreService {
	
	@Autowired
	TheatreDAO theatreDao;

	public Optional<Theatre> getTheatre(String theatreName) {
		return this.theatreDao.findByTheatreName(theatreName);
	}

	public List<Theatre> getAllTheatres() {
		return this.theatreDao.findAll();
	}

	public Theatre addTheatre(Theatre theatre) {
		Theatre addedTheatre = this.theatreDao.save(theatre);
		return addedTheatre;
	}

	public void deleteTheatre(String theatreName) {
		this.theatreDao.deleteByTheatreName(theatreName);
		
	}

}
