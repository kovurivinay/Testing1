import React, { Component } from 'react';
import '../../App.css';
import { Redirect } from 'react-router';
import { Login_IP, Login_Port } from '../../config';
import axios from 'axios';

class CLogin extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            emailError: "",
            password: "",
            passwordError: "",
            direct: false
        }
        this.change = this.change.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }
    change = (e) => {
        this.setState({
            check: false,
            [e.target.name]: e.target.value
        })
    }

    validate = () => {
        let isError = false;
        const errors = {
            emailError: "",
            passwordError: ""
        };

        if (this.state.email.indexOf("@") === -1) {
            isError = true;
            errors.emailError = "Requires valid email";
        }
        if (this.state.password.length == 0) {
            isError = true;
            errors.passwordError = "Password required";
        }

        this.setState({

            ...errors
        });
        return isError;
    }

    submitLogin = async (e) => {
        var headers = new Headers();
        e.preventDefault();

        const data = {
            email: this.state.email,
            password: this.state.password
        }

        axios.post(Login_IP + Login_Port + '/login', data)
            .then(response => {
                if (response.data[0].role == "customer") {
                    localStorage.setItem('email', response.data[0].email);
                    localStorage.setItem('cookie', response.data[0].role)
                    console.log("Status Code : ", response.data);
                    if (response.status === 200) {
                        this.setState({
                            authFlag: true,
                            direct: true
                        })
                    } else {
                        this.setState({
                            authFlag: false,
                            emailError: "Credentials incorrect"
                        })
                    }
                }
                else {
                    alert("Using Admin Credentials. Use Admin Login!")
                }
            }).catch(e => {
                alert("Invalid Credentials!")
            });

    }

    render() {
        var redirectTo = null;
        if (this.state.direct) {
            redirectTo = <Redirect to="/Home" />
        }
        let { email, password } = this.state;

        return (<div className="listBody">
            {redirectTo}
            <div className="text-center">
                <br></br>
                <h1>Log in to BookMyTicket</h1>
                <h4>Need an acount? <a id="sign-in-link" href="/Signup">Sign Up</a></h4></div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-4 col-lg-offset-4 listBody1 ">
                        <div className="row  margin-bottom1">
                            <form class="form  ">
                                {this.props.Lvalue}
                                {(this.state.check) ? <div class="col-lg-12 " style={{ backgroundColor: 'gray' }}>
                                    <h5>{this.state.emailError} {this.state.passwordError}</h5></div> : <a />}
                                <div class="col-lg-6">
                                    <h3>Account Login</h3></div>
                                <div class="form-group col-lg-12">
                                    <input name="email" type="email" id="email" errorText={this.state.emailError} class="form-control" id="email" placeholder="Enter email" onChange={this.change} />
                                </div>
                                <div class="form-group col-lg-12">
                                    <input name="password" type="password" class="form-control" placeholder="Password" onChange={this.change} />
                                </div>
                                <div class="form-group col-lg-12">

                                    <a href="" id="forgotPasswordUrl" class="forgot-password">Forgot password?</a>
                                </div>
                                <div className="form-group col-lg-8 col-lg-offset-2">
                                    <input type="submit" className="form-control signin1 " value="Sign in" onClick={this.submitLogin} />
                                </div>
                                <div class=" traveler col-lg-12">
                                    <label htmlFor="rememberMe">
                                        <input id="rememberMe" name="rememberMe" type="checkbox" value="true" /><input type="hidden" name="_rememberMe" value="on" />
                                        Keep me signed in</label>
                                </div>
                                <div class="centered-hr text-center col-lg-11 ">
                                    <span class="text-center"><em>or</em></span>
                                </div>
                                <div className="form-group col-lg-8 col-lg-offset-2">
                                    <input type="button" className="form-control btn-primary fbcolor " value="Log in with Facebook" />
                                </div>
                                <div className="form-group col-lg-8 col-lg-offset-2">
                                    <input type="button" className="form-control btn-secondary gcolor  " value="Log in with Google" />
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-lg-12 free-space"></div>
            </div>
        </div>)
    }
}


export default CLogin