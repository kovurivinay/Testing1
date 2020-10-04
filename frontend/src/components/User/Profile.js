import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Login_IP, Login_Port, Booking_IP, Booking_Port } from "./../../config";


class Profile extends Component {
    constructor() {
        super();
        this.state = {
            userName: "",
            email: "",
            phonenumber: "",
            password:""
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value, });
    }
    componentDidMount() {
        axios.get(Login_IP + Login_Port + `/user/${localStorage.getItem('email')}`)
            .then((response) => {
                console.log("Inside cget profiles")
                console.log("Status Code : ", response.data);
                if (response.status === 200) {
                    this.setState({
                        ...response.data[0]
                    })
                    console.log(this.state)
                } else {
                    console.log("not done")
                }
            }).catch(err => {
                console.log(err);
            });

    }

    updateProfile = () => {
        axios.put(Login_IP + Login_Port + `/user/${localStorage.getItem('email')}`, this.state)
            .then((response) => {
                console.log("Inside cget profiles")
                console.log("Status Code : ", response.data);
                if (response.status === 200) {
                    console.log("Updated")
                    alert("Update successful!")
                } else {
                    console.log("not done")
                }
            }).catch(err => {
                console.log(err);
            });
    }

    deleteUser = () => {
        axios.delete(Login_IP + Login_Port + `/user/${localStorage.getItem('email')}`, this.state)
        .then((response) => {
            console.log("Status Code : ", response.data);
                    axios.post(Booking_IP + Booking_Port + `/cancelBooking/${localStorage.getItem('email')}` )
                    .then((response) => {
                        console.log(response.data)
                    }).catch(err => {
                        console.log(err);
                    });

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
                alert("Deletion successful!")
                this.props.history.push("/Home")
        }).catch(err => {
            console.log(err);
        });
    }

    render() {

        return (
            <div>

                <div class="img-circle user-photo"></div>
                <div><center>
                    <i class="fas fa-user-edit fa-4x"></i></center>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-6 col-lg-offset-1 Pcontainer">
                            <div className="row">
                                <div class="col-lg-6">
                                    <h3><b>Update Profile Information</b></h3></div>
                                <div class="col-lg-6 text-right">
                                    Connect
                                    <i class="fab fa-facebook-square fa-2x"></i>
                                </div>
                            </div>
                            <div class="row ">
                                <form class="form">
                                    <div class="form-group col-lg-7">
                                        <label>Name</label>
                                        <input type="text" class="form-control" name="userName" value={this.state.userName} onChange={this.handleChange} placeholder="Name" />
                                    </div>

                                    <div class="form-group col-lg-7">
                                        <label>Email</label>
                                        <input type="text" class="form-control" name="email" value={this.state.email} onChange={this.handleChange} placeholder="Enter email" disabled />
                                    </div>
                                    <div class="form-group col-lg-7">
                                        <label>Phone Number</label>
                                        <input type="email" class="form-control" name="phonenumber" value={this.state.phonenumber} onChange={this.handleChange} placeholder="Phone Number" />
                                    </div>
                                    <div class="form-group col-lg-7">
                                        <label>Password</label>
                                        <input type="text" class="form-control" name="password" value={this.state.password} onChange={this.handleChange} />
                                    </div>

                                </form>
                            </div>
                            <div>
                                <br></br>
                                <div class="form-group col-lg-7">
                                    <button onClick={this.updateProfile.bind(this)} type="submit">Submit</button>
                                </div>
                                <div className="form-group col-lg-5">
                            <button onClick={this.deleteUser.bind(this)} className="btn-danger">Delete User</button>
                        </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default Profile;