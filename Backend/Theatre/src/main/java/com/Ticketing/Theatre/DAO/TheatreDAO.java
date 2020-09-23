package com.Ticketing.Theatre.DAO;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Ticketing.Theatre.Entity.Theatre;


@Repository
public interface TheatreDAO extends JpaRepository<Theatre, Integer> {

	Optional<Theatre> findByTheatreName(String theatreName);

	Object deleteByTheatreName(String theatreName);

}
