import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import Footer from '../Footer';
import { Booking_IP, Booking_Port } from "../../config";
import ToggleDisplay from 'react-toggle-display';

class Bookings extends Component {
    constructor() {
        super();
        this.state = {
            userName: "",
            movieName: "",
            theatreName: "",
            bookingName: "",
            ticketCount: "",
            cost: "",
            date: "",

            bookingsId: "",

            bookings: [],

            startDate:"",
            endDate:"",
        }
    }

    change = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    deleteBooking = (e) => {
        e.preventDefault();

        axios.delete(Booking_IP + Booking_Port + `/booking/${this.state.bookingsId}`)
            .then((response) => {
                console.log("Status Code : ", response.data);
                if (response.status === 200) {
                    alert("Booking Deleted")
                } else {
                    console.log("not done")
                }

            }).catch(err => {
                alert("Check Booking name")
            });;
    }

    componentDidMount() {
        if(localStorage.getItem("cookie")=="admin"){
            axios.get(Booking_IP + Booking_Port + '/bookings?Role=' + localStorage.getItem("cookie"))
            .then((response) => {
                console.log(response.data)
                this.setState({
                    bookings: response.data,
                });
            }).catch(err => {
                console.log(err);
            });
        }
        else if(localStorage.getItem("cookie")=="customer"){
            axios.get(Booking_IP + Booking_Port + `/booking/${localStorage.getItem("email")}`)
            .then((response) => {
                console.log(response.data)
                this.setState({
                    bookings: response.data,
                });
            }).catch(err => {
                console.log(err);
            });
        }
    }

    bookingsBetweenDates = (e) =>{
        e.preventDefault();

        var d= new Date(this.state.startDate)
        this.state.startDate=d.getUTCDate()+"-"+(d.getUTCMonth()+1)+"-"+d.getUTCFullYear();
        d= new Date(this.state.endDate)
        this.state.endDate=d.getUTCDate()+"-"+(d.getUTCMonth()+1)+"-"+d.getUTCFullYear();
        console.log(Booking_IP + Booking_Port + '/bookingsBetweenDates?Role='+ localStorage.getItem("cookie") + `&startDate=${this.state.startDate}&endDate=${this.state.endDate}` )
        axios.get(Booking_IP + Booking_Port + '/bookingsBetweenDates?Role='+ localStorage.getItem("cookie") + `&startDate=${this.state.startDate}&endDate=${this.state.endDate}` )
        .then((response) => {
            //update the state with the response data
            console.log(response.data)
            this.setState({
                bookings: response.data,

            });
        }).catch(err => {
            console.log(err);
        });

    }

    cancelledBookingsBetweenDates = (e) =>{
        e.preventDefault();

        var d= new Date(this.state.startDate)
        this.state.startDate=d.getUTCDate()+"-"+(d.getUTCMonth()+1)+"-"+d.getUTCFullYear();
        d= new Date(this.state.endDate)
        this.state.endDate=d.getUTCDate()+"-"+(d.getUTCMonth()+1)+"-"+d.getUTCFullYear();
        console.log(Booking_IP + Booking_Port + '/cancelledbookings?Role='+ localStorage.getItem("cookie") + `&startDate=${this.state.startDate}&endDate=${this.state.endDate}` )
        axios.get(Booking_IP + Booking_Port + '/cancelledbookings?Role='+ localStorage.getItem("cookie") + `&startDate=${this.state.startDate}&endDate=${this.state.endDate}` )
        .then((response) => {
            //update the state with the response data
            console.log(response.data)
            this.setState({
                bookings: response.data,

            });
        }).catch(err => {
            console.log(err);
        });

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

    cancelBooking = (id, userName) =>{
        axios.post(Booking_IP + Booking_Port + `/cancelBooking/${userName}/${id}` )
        .then((response) => {
            console.log(response.data)
            alert("Cancelled")
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        var bookings = this.state.bookings

        let bookingDetails = []
        for (var i = 0; i < bookings.length; i++) {
            bookingDetails.push(
                <div className="col-lg-9 border-prs margin-bottom1 rounded1 shadow-vin">
                        <div className="list- col-lg-6 container2">
                            <h4 className="">Id: {bookings[i].id}</h4>
                            {/* <div class="HitInfo__details"> */}
                                <div class=" Details__label">User Name: {bookings[i].userName}</div>
                                <div class=" Details__label">Movie Name: {bookings[i].movieName}</div>
                                <div class=" Details__label">Show Name: {bookings[i].showName}</div>
                                <div class=" Details__label">Ticket Count: {bookings[i].ticketCount}</div>
                                <div class=" Details__label">Cost: {bookings[i].cost}</div>
                                <div class=" Details__label">Date: {bookings[i].date}</div>
                            {/* </div> */}
                        </div>
                        <ToggleDisplay if={bookings[i].cancelled!=true}>
                        <div className="col-lg-2">
                            <button className="btn-danger" onClick={this.cancelBooking.bind(this, bookings[i].id, bookings[i].userName)}>Cancel Booking</button>
                        </div>
                        </ToggleDisplay>
                        <ToggleDisplay if={bookings[i].cancelled==true}>
                        <div className="col-lg-2">
                            <button className="btn-warning">Cancelled</button>
                        </div>
                        </ToggleDisplay>
                </div>
            )
        }

        return (
            <div>
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link active" data-toggle="tab" href="#GetBookings" role="tab" aria-controls="home" aria-selected="true">Get All Bookings</a>
                    </li>
                    <ToggleDisplay if={localStorage.getItem('cookie')=="admin"}>
                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link" data-toggle="tab" href="#bookingsBetweenDates" role="tab" aria-controls="messages" aria-selected="false">Bookings between Dates</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-toggle="tab" href="#cancelledBookingsBetweenDates" role="tab" aria-controls="messages" aria-selected="false">Cancelled Bookings between Dates</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-toggle="tab" href="#DeleteBooking" role="tab" aria-controls="profile" aria-selected="false">Delete Booking</a>
                    </li>
                    </ul>
                    </ToggleDisplay>

                </ul>


                <div class="tab-content">
                    <div class="tab-pane active" id="GetBookings" role="tabpanel" aria-labelledby="home-tab">
                        <div class="container">
                            <h2>List of All Bookings</h2>
                            <div class="col-lg-11">
                                {bookingDetails}
                            </div>
                        </div>
                    </div>

                    <div class="tab-pane" id="bookingsBetweenDates" role="tabpanel" aria-labelledby="home-tab">
                        <div class="container">
                            <h2>List of All Bookings between dates</h2>
                            <div class="form-group col-lg-12">
                                <label>Start Date</label>
                                <input type="date" value={this.state.startDate} name="startDate" onChange={this.change} />
                            </div>
                            <div class="form-group col-lg-12">
                                <label>End Date</label>
                                <input type="date" value={this.state.endDate} name="endDate" onChange={this.endDatechange} />
                            </div>
                            <div class="form-group col-lg-6">
                                            <a onClick={this.bookingsBetweenDates} class="form-control btn btn-primary btn-rounded" style={{ width: '50%' }} label="Next" href="" type="button">
                                                <span class="btn__label">Fetch Bookings</span></a></div>
                            <div class="col-lg-11">
                                {bookingDetails}
                            </div>
                        </div>
                    </div>

                    <div class="tab-pane" id="cancelledBookingsBetweenDates" role="tabpanel" aria-labelledby="home-tab">
                        <div class="container">
                            <h2>List of All Cancelled Bookings between dates</h2>
                            <div class="form-group col-lg-12">
                                <label>Start Date</label>
                                <input type="date" value={this.state.startDate} name="startDate" onChange={this.change} />
                            </div>
                            <div class="form-group col-lg-12">
                                <label>End Date</label>
                                <input type="date" value={this.state.endDate} name="endDate" onChange={this.endDatechange} />
                            </div>
                            <div class="form-group col-lg-6">
                                            <a onClick={this.cancelledBookingsBetweenDates} class="form-control btn btn-primary btn-rounded" style={{ width: '50%' }} label="Next" href="" type="button">
                                                <span class="btn__label">Fetch Bookings</span></a></div>
                            <div class="col-lg-11">
                                {bookingDetails}
                            </div>
                        </div>
                    </div>

                    <div class="tab-pane" id="DeleteBooking" role="tabpanel" aria-labelledby="settings-tab">
                        <div className="row">
                            <div className="col-lg-6 col-lg-offset-3  ">
                                <div className="free-space"></div>
                                <div className="row margin-top1 margin-bottom1">

                                    <form class="form">

                                        <div class="form-group col-lg-12">
                                            <input onChange={this.change} type="text" class="form-control" name="bookingsId" id="bookingsId" placeholder="Booking Id" />
                                        </div>
                                        <div class="form-group col-lg-6">
                                            <a onClick={this.deleteBooking} class="form-control btn btn-primary btn-rounded" style={{ width: '50%' }} label="Next" href="" type="button">
                                                <span class="btn__label">Delete Booking</span></a></div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default Bookings;