import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';

//create the Navbar Component
class Navbar extends Component {
    constructor(props) {
        super(props);
        //this.handleLogout = this.handleLogout.bind(this);
        this.state = {
            direct1: false
        }
    }
    //handle logout to destroy the cookie
    handleLogout1 = () => {
        if(localStorage.getItem('cookie')=="customer"){
            console.log("Removed customer cookie")
            localStorage.removeItem('email')
            localStorage.removeItem('cookie')
        }
        else if (localStorage.getItem('cookie')=="admin") {
            console.log("Removed admin cookie")
            localStorage.removeItem('email')
            localStorage.removeItem('cookie')
        }
    }

    messagesButton = ()=>{
        this.props.history.push("/Profile", this.state)
    }

    render() {
        //if Cookie is set render Logout Button
        let navLogin1 = null;
        if (localStorage.getItem('cookie')=="customer") {
            console.log("Able to read cookie");
            navLogin1 = (
                <ul className="nav navbar-nav navbar-right">
                    <li class="dropdown ">
                        <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                            {localStorage.getItem('email')}<span class="caret"></span>
                        </a>
                        <ul class="dropdown-menu">
                            <li><a href='/Profile'>Customer Profile</a></li>
                            <li><a href='/Shows'>Shows</a></li>
                            <li><a href='/Theatres'>Theatres</a></li>
                            <li><a href='/Movies'>Movies</a></li>
                            <li><a href='/Bookings'>Bookings</a></li>
                        </ul>
                    </li>
                    <li><div><i className="fas fa-user-edit fa-2x margin-top-messages" onClick={this.messagesButton}></i></div></li>
                    <li><Link to="" onClick={this.handleLogout1.bind(this)}><span className="glyphicon glyphicon-user"></span>Logout</Link></li>
                </ul>
            );
        }
        else if (localStorage.getItem('cookie')=="admin") {
            console.log("Able to read cookie");
            navLogin1 = (
                <ul className="nav navbar-nav navbar-right">
                    <li class="dropdown ">
                        <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                            {localStorage.getItem('email')}<span class="caret"></span>
                        </a>
                        <ul class="dropdown-menu">
                            <li><a href='/Profile'>Admin Profile</a></li>
                            <li><a href='/Shows'>Shows</a></li>
                            <li><a href='/Theatres'>Theatres</a></li>
                            <li><a href='/Movies'>Movies</a></li>
                            <li><a href='/Bookings'>Bookings</a></li>
                        </ul>
                    </li>
                    <li><div><i className="fas fa-user-edit fa-2x margin-top-messages" onClick={this.messagesButton}></i></div></li>
                    <li><Link to="/Home" onClick={this.handleLogout1.bind(this)}><span className="glyphicon glyphicon-user"></span>Logout</Link></li>
                </ul>
            );
        }
        else {
            //Else display login button
            console.log("Not Able to read cookie");
            navLogin1 = (
                <ul className="nav navbar-nav navbar-right">
                    <li class="dropdown ">
                        <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                            Login<span class="caret"></span>
                        </a>
                        <ul class="dropdown-menu">
                            <li><a href='/Clogin'>Customer Login</a></li>
                            <li><a href='/ologin'>Admin Login</a></li>
                        </ul>
                    </li>
                </ul>
            )
        }

        return (
            <div>
                <nav className="navbar navbar-transparent margin-minus">
                    <div className="container">
                        <div class="navbar-header" >
                            <a style={{fontSize: 30}} href='/Home'>BookMyTicket</a>
                        </div>
                        <ul class="nav navbar-nav navbar-right">
                            <li>{navLogin1}</li>
                            <li> </li>
                            <li ></li>
                            <li className="margin-icon navbar-item"><a href="/Home"> <i class="fas fa-home fa-2x"></i></a></li>
                        </ul>
                    </div>
                </nav>
            </div>

        )
    }
}
export default Navbar;