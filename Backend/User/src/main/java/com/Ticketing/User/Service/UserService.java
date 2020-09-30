package com.Ticketing.User.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.Ticketing.User.DAO.UserDAO;
import com.Ticketing.User.Entity.User;

@Service
@Transactional
public class UserService {

	@Autowired
	UserDAO userDao;

	public User addUser(User user) {
		return this.userDao.save(user);
	}

	public Optional<User> getUser(int id) {
		return this.userDao.findById(id);
	}					

	public void deleteUser(int id) {
		this.userDao.deleteById(id);
	}

	public List<User> getAllUsers() {
		return this.userDao.findAll();
	}

	public void deleteUser(String email) {
		this.userDao.deleteByEmail(email);
	}

	public List<User> getUserByEmail(String email){
		return this.userDao.findUserByEmail(email);
	}

}	

