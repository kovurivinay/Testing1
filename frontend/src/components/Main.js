import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Home from './Home/Home';
import Navbar from './LandingPage/Navbar';
import Profile from './User/Profile';
import Signup from './User/Signup';
import Osignup from './User/Osignup';
import CLogin from './User/CLogin';
import OLogin from './User/OLogin';
import Footer from './Footer';
import Theatres from './Core/Theatres';
import Movies from './Core/Movies';
import Shows from './Core/Shows';
import Bookings from './Core/Bookings';
import DisplayMovies from './DisplayMovies';
import MovieDetails from './MovieDetails';

//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
                
                <Route path="/" component={Navbar}/>
                <Route path="/Home" component={Home}/>
                <Route path="/Profile" component={Profile}/>
                <Route path="/Signup" component={Signup}/>
                <Route path="/CLogin" component={CLogin}/>
                <Route path="/OLogin" component={OLogin}/>
                <Route path="/Osignup" component={Osignup}/>
                <Route path="/Footer" component={Footer}/>

                <Route path="/Theatres" component={Theatres} />
                <Route path="/Movies" component={Movies} />
                <Route path="/Bookings" component={Bookings} />
                <Route path="/Shows" component={Shows} />
                <Route path="/DisplayMovies" component={DisplayMovies} />
                <Route path="/MovieDetails" component={MovieDetails} />
            </div>
            
        )
    }
}
//Export The Main Component
export default Main;