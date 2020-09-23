package com.Ticketing.Theatre.Entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "THEATRE")
public class Theatre {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private int id;
	
	//@Column(name = "MOVIENAME")
	//private String movieName;
	
	@Column(name = "LOCATION")
	private String location;
	
	@Column(name = "THEATRENAME")
	private String theatreName;

	@Column(name = "CAPACITY")
	private Integer seatingCapacity;
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	//public String getMovieName() {
		//return movieName;
	//}

	//public void setMovieName(String movieName) {
		//this.movieName = movieName;
	//}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getTheatreName() {
		return theatreName;
	}

	public void setTheatreName(String theatreName) {
		this.theatreName = theatreName;
	}

	public Integer getSeatingCapacity() {
		return seatingCapacity;
	}

	public void setSeatingCapacity(Integer seatingCapacity) {
		this.seatingCapacity = seatingCapacity;
	}
	

}
