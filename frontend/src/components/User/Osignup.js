import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import {Login_IP, Login_Port, Node_IP, Node_Port} from "./../../config";

class Osignup extends Component {
    constructor() {
        super();
        this.state = {
            userName: "",
            userNameError: "",
            phonenumber:"",
            phonenumberError:"",
            password: "",
            passwordError: "",
            email:"",
            emailError:"",
            check:false
        }
        this.change = this.change.bind(this);
        this.submitSignup = this.submitSignup.bind(this);
    }

    change = (e) => {
        this.setState({
            check:false,
            [e.target.name] : e.target.value
            
        })
    }
    
    validate = () => {
        let isError = false;
        const errors = {
            userNameError: "",
            phonenumberError:"",
            passwordError: "",
            emailError:""
        };
    
        if (this.state.email.indexOf("@") === -1) {
          isError = true;
          errors.emailError = "Requires valid email";
        }
        if (this.state.password.length==0) {
            isError = true;
            errors.passwordError = "Password required";
          }
          if (this.state.phonenumber.length==0) {
            isError = true;
            errors.phonenumberError = "phonenumber required";
          }
          if (this.state.userName.length==0) {
            isError = true;
            errors.userNameError = "userName required";
          }
  
    
        this.setState({
          
          ...errors
        });
        return isError;
    }

    submitSignup = (e) => {
        console.log("inside submit signup")
        var headers = new Headers();
        e.preventDefault();
        const err = this.validate();
        this.setState({
            check:true
        })
        if(!err){
            
            const data = {
                userName : this.state.userName,
                phonenumber : this.state.phonenumber,
                email : this.state.email,
                password : this.state.password,
                role : "admin"
            }
            console.log(data.userName)
            axios.post(Login_IP+Login_Port+'/signUp',data)
                .then(response => {
                    localStorage.setItem('email', response.data.email);
                    localStorage.setItem('cookie', response.data.role)
                    console.log("Status Code : ",response.status);
                    if(response.status === 200){
                        this.setState({
                            authFlag : true,
                            direct:true
                        })
                    }else{
                        this.setState({
                            authFlag : false
                        })
                    }
                }).catch(e=>{
                    alert("Try with different Email ID!")
                    console.log(e)
                })
        }
        
    }


    render() {
        var redirectTo=null;
        if(this.state.direct){
            redirectTo=<Redirect to= "/Home"/>
        }

        return (<div className="listBody">
        {redirectTo}
            <div className="text-center">
                <br></br>
                <h1>Admin Sign up for BookMyTicket</h1>
                <h4>Already have an account? <a id="sign-in-link" href="/ologin">Log in</a></h4></div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-6 col-lg-offset-3 listBody1 ">
                    {(this.state.check)?<div class="col-lg-12 margin-bottom1" style={{backgroundColor:'gray',display: 'inline'}} >
                                    <h5>{this.state.userNameError}<br></br>
                                     {this.state.phonenumberError}
                                     <br></br>{this.state.emailError}<br></br>{this.state.passwordError}</h5></div>:<hr></hr>}
                        <div className="row margin-top1 margin-bottom1">
                            <form class="form">
                                <div class="form-group col-lg-6">
                                    {/*<label for="fname">userName Name</label>*/}
                                    <input onChange={this.change} type="text" class="form-control" name="userName" id="fname" placeholder="Enter userName" />
                                </div>
                                <div class="form-group col-lg-6">
                                    <input onChange={this.change} type="text" class="form-control" name="phonenumber" id="lname" placeholder="Enter phonenumber" />
                                </div>
                                <div class="form-group col-lg-12">
                                    <input onChange={this.change} type="email" class="form-control" name="email" id="email" placeholder="Enter email" />
                                </div>
                                <div class="form-group col-lg-12">
                                    <input onChange={this.change} type="password" name="password" class="form-control" placeholder="Password" />
                                </div>
                                <div class="form-group col-lg-11">
                                    <button style={{ width: '50%' }} onClick={this.submitSignup} className="form-control btn btn-warning">Sign me Up</button>
                                </div>

                                <div class="centered-hr text-center col-lg-11 ">
                                    <span class="text-center"><em>or</em></span>
                                </div>
                                <div className="form-group col-lg-8 col-lg-offset-2">
                                <input type="button" className="form-control btn-primary fbcolor " value="Log in with Facebook"/>
                                </div>
                                <div className="form-group col-lg-8 col-lg-offset-2">
                                <input type="button" className="form-control btn-secondary gcolor  " value="Log in with Google"/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
    }
}

export default Osignup