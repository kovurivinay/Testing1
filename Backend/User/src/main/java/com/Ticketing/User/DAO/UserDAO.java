package com.Ticketing.User.DAO;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.Ticketing.User.Entity.User;



@Repository
public interface UserDAO extends JpaRepository<User, Integer>{
	
//	@Query("SELECT a FROM user a where a.email=?1") 
	ArrayList<User> findUserByEmail(String email);

	public void deleteByEmail(String email);
}
