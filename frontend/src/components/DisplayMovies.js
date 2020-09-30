import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import Footer from './Footer';
import { Movie_IP, Movie_Port } from "./../config";

class DisplayMovies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            prs: [],
            ID: 0,
            Movie_props: this.props.location.state,
            currentPage: 1,
            todosPerPage: 10,
            startDate: "",
            endDate: "",
            city: "",
            selectedMovieName:""
        }
    }
    async componentDidMount() {
        console.log(this.state.Movie_props)
        this.setState({
            startDate: this.state.Movie_props.startDate,
            endDate: this.state.Movie_props.endDate
        })

        var d = new Date(this.state.Movie_props.startDate)
        this.state.startDate = d.getUTCDate() + "-" + (d.getUTCMonth() + 1) + "-" + d.getUTCFullYear();
        d = new Date(this.state.Movie_props.endDate)
        this.state.endDate = d.getUTCDate() + "-" + (d.getUTCMonth() + 1) + "-" + d.getUTCFullYear();
        console.log(Movie_IP + Movie_Port + '/moviesBetweenDates?' + `startDate=${this.state.startDate}&endDate=${this.state.endDate}`)
        await axios.get(Movie_IP + Movie_Port + '/moviesBetweenDates?' + `startDate=${this.state.startDate}&endDate=${this.state.endDate}`)
            .then((response) => {
                //update the state with the response data
                console.log(response.data)
                this.setState({
                    prs: response.data,
                    prsreuse: response.data

                });
            }).catch(err => {
                console.log(err);
            });
        console.log(this.state)
    }

    // Without async, it's not setting state
    details = async (movieName) => {
        await this.setState({
            selectedMovieName: movieName
        })
        this.props.history.push("/MovieDetails", this.state)
    }
    handleClick = (event) => {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }

    // change = (e) => {
    //     this.setState({ [e.target.name]: e.target.value });
    //     if(e.target.name=="country"){
    //         var temp=this.state.prsreuse.filter(function(pr){
    //             return pr.city==e.target.value
    //         })
    //         this.setState({
    //             prs:temp
    //         })
    //         console.log(temp)

    //     }
    //     else if(e.target.name=="startdate"){
    //         //if(this.state.)
    //         alert("")
    //         var temp=this.state.prsreuse.filter(function(pr){
    //             console.log(pr.startdate)
    //             console.log(e.target.value)
    //             console.log(e.target.value<=pr.startdate)

    //             return e.target.value<=pr.startdate
    //         })

    //         this.setState({
    //             prs:temp
    //         })
    //         console.log(temp)
    //     }
    // }
    render() {
        const { prs, currentPage, todosPerPage } = this.state;
        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        const props = prs.slice(indexOfFirstTodo, indexOfLastTodo);
        
        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(prs.length / todosPerPage); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <li class="page-item"><a class="page-link" key={number}
                    id={number}
                    onClick={this.handleClick}>{number}</a></li>
            );
        });
        let details = []
        for (var i = 0; i < props.length; i++) {
            details.push(
                <div className="col-lg-9 border-prs margin-bottom1 rounded1 shadow-vin">
                    <div>
                        <div className="col-lg-3  container1">
                        <img alt="Cinema Images, Stock Photos &amp; Vectors | Shutterstock" class="n3VNCb" src="https://image.shutterstock.com/image-vector/movie-time-poster-vintage-cinema-260nw-1480643543.jpg" data-noaft="1" jsname="HiaYvf" jsaction="load:XAeZkd;" >
                        </img>
                        </div>
                        <div className="list- col-lg-6 container2">
                            <a href="" onClick={this.details.bind(this, props[i].movieName)} className="list-group-item ">
                                <h3 className="">{props[i].movieName}</h3>
                                    <div class=" Details__label">Language: {props[i].language}</div>
                                    <div class=" Details__label">Genre: {props[i].genre}</div>
                                    <div class=" Details__label">Rating: {props[i].rating}</div>
                                    <div class=" Details__label">Release Date: {props[i].releaseDate}</div>

                            </a>
                        </div>
                    </div>
                </div>
            )
        }

        return (<div>
            <div className="HomeContent">
                <p>
                    <input type="date" className="place inc-width" value={this.state.startDate} name="startdate" />
                    <input type="date" className="place inc-width" value={this.state.endDate} name="enddate" placeholder="Depart"></input>
                </p>
            </div>
            <div className="col-lg-9 col-lg-offset-3">
                <nav aria-label="Page navigation">
                    <ul class="pagination">
                        {renderPageNumbers}
                    </ul>
                </nav>
            </div>
            <div class="col-lg-1"></div>
            <div class="col-lg-11">
                {details}
            </div>{/*console.log(this.props.location.state)*/}
            <div class="col-lg-12 free-space"></div>
            <div class="col-lg-12 free-space"></div>
            <Footer />
        </div>)
    }
}

export default DisplayMovies