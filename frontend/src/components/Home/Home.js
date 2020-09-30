import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { link } from 'fs';
import { Link } from 'react-router-dom';
import Footer from '../Footer';

class Home extends Component {
    constructor() {
        super();
        this.state = {
            location: "",
            startDate: "",
            endDate: "",
        };
    }

    change = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    endDatechange = async (e) => {
        if (e.target.value <= this.state.startDate) {
            await this.setState({
                startDate: e.target.value,
                endDate: ""
            })
        }
        else {
            await this.setState({ endDate: e.target.value });
        }
    }
    search = () => {
        console.log(this.state)
        
        if (this.state.startDate == "") {
            alert("Enter Start Date!")
        }
        else if (this.state.endDate == "") {
            alert("Enter End Date!")
        }
        else {
            this.props.history.push("/DisplayMovies", this.state)
        }
    }
    
    render() {
        return (
            <div>
                <div>
                    <div class="bg-img">
                        <div class="container ">
                        <div className="HeadLine"><h1>Book Tickets, <br></br>Buy Popcorn <br></br>Have fun!</h1></div>
                            <div class="col-lg-12 free-space">
                                
                            </div>
                            <div class="col-lg-12 free-space"></div>
                            <div class="col-lg-12 free-space"></div>
                            <div class="col-lg-12 free-space"></div>
                            <div class="col-lg-12 free-space"></div>
                            <div class=" col-lg-12" >
                               
                                <div className="HomeContent">
                                    <p><input type="text" id="p1" className="place" name="location" placeholder="Where do you want to go" onChange={this.change}></input>
                                        <input type="date" className="place inc-width" value={this.state.startDate} name="startDate" onChange={this.change} />
                                        <input type="date" className="place inc-width" value={this.state.endDate} name="endDate" onChange={this.endDatechange} placeholder="Depart"></input>
                                        {/* <input type="number" className="place" name="accomodations" onChange={this.change} placeholder="Guests"></input> */}
                                        <input type="button" className="place1 btn-lg fbcolor rounded1 " style={{ 'backgroundColor': '#0067db' }} onClick={this.search.bind(this)} value="Search"></input>
                                    </p>
                                </div>
                            </div>
                            <div class="col-lg-12 free-space"></div>
                            <div class="col-lg-12 free-space"></div>
                            <div class="col-lg-12 free-space"></div>
                            <div class="col-lg-12 free-space"></div>
                        </div>
                        <div style={{ 'height': '40px' }}></div>
                    </div>
                </div>
                <div class="col-lg-12 free-space"></div>
                <div class="col-lg-12 free-space"></div>
                <div class="">
                    <Footer /></div>
            </div>
        )
    }
}
export default Home;