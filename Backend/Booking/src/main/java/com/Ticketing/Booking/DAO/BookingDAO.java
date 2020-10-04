package com.Ticketing.Booking.DAO;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Ticketing.Booking.Entities.Booking;
import com.Ticketing.Booking.Entities.Shows;

@Repository
public interface BookingDAO extends JpaRepository<Booking, Integer>{

	List<Booking> findBookingByUserName(String username);

	void deleteByUserName(String username);

	Optional<Booking> findBookingByUserNameAndId(String username, int bookingId);

	Optional<Booking> findBookingById(int bookingId);

	void deleteByMovieName(String movieName);

	void deleteByTheatreName(String theatreName);

}