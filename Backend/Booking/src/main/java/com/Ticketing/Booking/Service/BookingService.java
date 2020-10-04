package com.Ticketing.Booking.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.Ticketing.Booking.DAO.BookingDAO;
import com.Ticketing.Booking.Entities.Booking;
import com.Ticketing.Booking.Entities.Shows;

@Service
@Transactional
public class BookingService {

	@Autowired
	BookingDAO bookingDao;
	
	public List<Booking> getBooking(String username) {
		return this.bookingDao.findBookingByUserName(username);
	}

	public List<Booking> getAllBookings() {
		return this.bookingDao.findAll();
	}

	public Booking addBooking(Booking booking) {
		return this.bookingDao.save(booking);
	}

	public void deleteBooking(int bookingId) {
		this.bookingDao.deleteById(bookingId);
		
	}

	public Optional<Booking> getBooking(String username, int bookingId) {
		return this.bookingDao.findBookingByUserNameAndId(username, bookingId);
		
	}

	public Optional<Booking> getBookingWithId(int bookingId) {
		return this.bookingDao.findBookingById(bookingId);
	}

	public void deleteBookingByMovieName(String movieName) {
		this.bookingDao.deleteByMovieName(movieName);		
	}

	public void deleteBookingByTheatreName(String theatreName) {
		 this.bookingDao.deleteByTheatreName(theatreName);
		
	}

}