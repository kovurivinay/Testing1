import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import Footer from './Footer';
import { Booking_IP, Booking_Port, Movie_IP, Movie_Port } from "./../config";
import ToggleDisplay from 'react-toggle-display';

class MovieDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movieDetails: "",
            showDetails: "",
            Movie_props: "",

            selectedTheatre:"",
            selectedShow:"",
            selectedCost:"",
            selectedDate:"",
            selectedTicketCount:"",
            theatre_shows:[],
            selectedId:"",
            seatingCapacity:"",

            show:false
        }

    }

    async componentWillMount() {
        console.log(this.props.location.state)
        console.log(this.props.location.state.selectedMovieName)

        const movieName = this.props.location.state.selectedMovieName

        this.setState({
            Movie_props: this.props.location.state.Movie_props
        })
        await axios.get(Movie_IP + Movie_Port + `/movie/${movieName}`)
            .then((response) => {
                console.log("Status Code : ", response.data);
                if (response.status === 200) {
                    this.setState({
                        movieDetails: response.data
                    })
                } else {
                    console.log("not done")
                }
            });

        await axios.get(Booking_IP + Booking_Port + `/showsByMovie/${movieName}`)
            .then((response) => {
                console.log("Status Code : ", response.data);
                var showDetails= response.data;
                var theatre_map={}
                if (response.status === 200) {
                    this.setState({
                        showDetails: response.data
                    })
                    var showDetails=this.state.showDetails;
                    var theatre_map={}
                    for(var i=0; i<showDetails.length; i++){
                        console.log(i)
                        theatre_map[showDetails[i].theatreName] = theatre_map[showDetails[i].theatreName] || [];
                        theatre_map[showDetails[i].theatreName].push(
                            <div>
                                <a class="HitInfo__details hover_pointer" onClick={this.updateCart.bind(this,showDetails[i].id, showDetails[i].theatreName, showDetails[i].showName, showDetails[i].date, showDetails[i].cost, showDetails[i].seatingCapacity)}>
                                <div class=" Details__label">Show Name: {showDetails[i].showName}</div>
                                <div class=" Details__label">Date: {showDetails[i].date}</div>
                                <div class=" Details__label">Cost: {showDetails[i].cost}</div>
                                <div class=" Details__label">Remaining Tickets: {showDetails[i].seatingCapacity}</div>
                                </a>
                            </div>
                        );
                    }
                    console.log(theatre_map)
                    var theatre_shows=[]
                    Object.keys(theatre_map).forEach(function (key){
                        theatre_shows.push(
                            <div>
                                <h3>{key}</h3>
                                <div>{theatre_map[key]}</div>
                            </div>
                        )
                        
                    });
                    this.setState({
                        theatre_shows:theatre_shows
                    })
                } else {
                    console.log("not done")
                }
            });

    }
    book = async () => {
        var data = {
            userName: localStorage.getItem('email'),
            movieName: this.props.location.state.selectedMovieName,
            showId: this.state.selectedId,
            theatreName: this.state.selectedTheatre,
            showName: this.state.selectedShow,
            ticketCount: this.state.selectedTicketCount,
            cost: this.state.selectedCost,
            date: this.state.selectedDate,
            cancelled:false
        }
        if( data.ticketCount> this.state.seatingCapacity){
            alert("Ticket count should be less than or equal to capacity")
        }
        else if(data.theatreName.length!=0){
            console.log(data)
            await axios.post(Booking_IP + Booking_Port + '/booking', data)
                .then((response) => {
                    console.log("Response : ", response.data);
                    if (response.status === 200) {
                        console.log(response.data)
                        alert("Booking done");
                        this.props.history.push("/Bookings")
                    } else {
                        console.log("not done")
                    }
                })
        }
        else{
            alert("Select the Available shows below.")
        }

    }

    change = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    updateCart =(id, theatreName, showName, date, cost, seatingCapacity) =>{
        this.setState({
            selectedId:id,
            selectedCost:cost,
            selectedTheatre:theatreName,
            selectedShow:showName,
            selectedDate:date,
            seatingCapacity:seatingCapacity,

            show:true
        })
        console.log(this.state)
        window.scrollTo(0,0);
    }

    render() {
        var photos = []

        photos.push(
            <div class="item active container-img">
                <div class="movie-img"></div>
                {/* <img src="../imgs/1.jpeg"></img> */}
                {/* <img alt="Movie Poster" style={{ 'width': '100%' }} class="n3VNCb" src="https://i1.wp.com/wallur.com/wp-content/uploads/2016/12/wonder-woman-film-background-12.png?resize=1920%2C1080" data-deferred="1" id="imi" data-w="1920" data-h="1080" jsname="HiaYvf" jsaction="load:XAeZkd;" data-atf="true" data-iml="1162.4599999995553"></img> */}
                {/* <img alt="Movie Poster" class="n3VNCb"style={{ 'width': '100%' }}  src="https://weneedfun.com/wp-content/uploads/2016/11/HD-Movie-Wallpapers-6.jpg" data-deferred="1" id="imi" data-w="1920" data-h="1080" jsname="HiaYvf" jsaction="load:XAeZkd;" data-atf="true" data-iml="4505.369999998948"></img> */}
            </div>
        )

        return (<div>
            <div className="col-lg-12">
                <div class="container col-lg-8 rounded1">

                    <div id="myCarousel" class="carousel slide rounded1" data-ride="carousel">
                        <div class="carousel-inner">
                            {photos}
                        </div>
                    </div>
                </div>

                <div class="container col-lg-4 border-prs1 rounded1 shadow-vin">
                    <form class="form">
                        <div class="col-lg-12 free-space"></div>
                            <label for="movieName">Movie Name</label>&nbsp;&nbsp;&nbsp;&nbsp;
                            <span>{this.props.location.state.selectedMovieName}</span> <br></br>
                            <label for="releaseDate">Release Date</label>&nbsp;&nbsp;
                            <input type="text" name="releaseDate" value={this.state.movieDetails.releaseDate} disabled></input>

                        <div class="col-lg-12 free-space"></div>
                        <ToggleDisplay if={this.state.show} tag="section">
                        <div>
                            <div className="row">

                                <div className="free-space"></div>
                                <form class="form">
                                    <div class="form-group col-lg-12">
                                        <label>Theatre: </label>
                                        <span>&nbsp; {this.state.selectedTheatre} </span>
                                    </div>
                                    <div class="form-group col-lg-12">
                                        <label>Date: </label>
                                        <span>&nbsp; {this.state.selectedDate} </span>
                                    </div>
                                    <div class="form-group col-lg-12">
                                        <label>Cost: </label>
                                        <span>&nbsp; {this.state.selectedCost} </span>
                                    </div>
                                    <div class="form-group col-lg-12">
                                        <label>Number of Tickets: </label>
                                        <input type="text" class="form-control" name="selectedTicketCount" onChange={this.change} />
                                    </div>
                                    <div class="col-lg-12">
                                    <span style={{ 'fontSize': '30px' }}>Total Cost: {this.state.selectedCost*this.state.selectedTicketCount}</span>  </div>

                                </form>

                            </div>
                        </div>
                        </ToggleDisplay>
                        <div className="form-group col-lg-8 col-lg-offset-2">
                            <input type="button" onClick={this.book.bind(this)} className="form-control btn-primary fbcolor " value="Request to Book" />
                        </div>
                        {/* <div class="col-lg-7 col-lg-offset-3">
                            <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLongTitle">Send a message</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <textarea onChange={this.change} className="details_item form-control" name="message" placeholder="Message to the admin"></textarea><br></br>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                            <button type="button" onClick={this.send} class="btn btn-primary">Send</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}

                    </form>
                </div>
                <div class="col-lg-12 free-space"></div>
                <h3>Available Shows</h3>
                <div>{this.state.theatre_shows}</div>
                <div class="col-lg-12 free-space"></div>
                <div class="col-lg-12 free-space"></div>
                <div class="col-lg-12 free-space"></div>
                <div class="col-lg-12 free-space"></div>
            </div>


            <Footer />
        </div>)
    }
}


export default MovieDetails