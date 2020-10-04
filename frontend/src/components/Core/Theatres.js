import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import Footer from '../Footer';
import { Theatre_IP, Theatre_Port } from "../../config";
import ToggleDisplay from 'react-toggle-display';

class Theatres extends Component {
    constructor() {
        super();
        this.state = {
            location: "",
            theatreName: "",
            seatingCapacity: "",

            theatres:[],

            updatedlocation: "",
            updatedtheatreName: "",
            updatedseatingCapacity: "",
        }
    }

    componentDidMount() {
        axios.get(Theatre_IP + Theatre_Port +'/theatres')
                .then((response) => {
                //update the state with the response data
                console.log(response.data)
                this.setState({
                    theatres : response.data,
                    
                }); 
            }).catch(err => {
                console.log(err);
            });
    }

    change = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    addTheatre = (e) => {
        e.preventDefault();
        const data = {
            location: this.state.location,
            theatreName: this.state.theatreName,
            seatingCapacity: this.state.seatingCapacity
        }
        
        axios.post(Theatre_IP + Theatre_Port + '/theatre?Role=' + localStorage.getItem("cookie"), data)
            .then((response) => {
                console.log("Status Code : ", response.data);
                if (response.status === 200) {
                    alert("Theatre Added")
                } else {
                    console.log("not done")
                }

            });
    }

    updateTheatre = (e) => {
        e.preventDefault();
        const data = {
            location: this.state.updatelocation,
            theatreName: this.state.updatetheatreName,
            seatingCapacity: this.state.updateseatingCapacity
        }
        axios.put(Theatre_IP + Theatre_Port + '/theatre?Role=' + localStorage.getItem("cookie"), data)
            .then((response) => {
                console.log("Status Code : ", response);
                if (response.status === 200) {
                    alert("Theatre Updated")
                } else {
                    console.log("Check Theatre name")
                }

            }).catch(err => {
                alert("Check Theatre name")
            });
    }

    deleteTheatre = (e) => {
        e.preventDefault();
        
        axios.delete(Theatre_IP + Theatre_Port +`/theatre/${this.state.deletetheatreName}?Role=`+ localStorage.getItem("cookie"))
            .then((response) => {
                console.log("Status Code : ", response.data);
                if (response.status === 200) {
                    alert("Theatre Deleted")
                } else {
                    console.log("not done")
                }

            }).catch(err => {
                alert("Check Theatre name")
            });;
    }

    render() {
        var theatres= this.state.theatres

        let theatreDetails = theatres.map(theatre => {
            return(
                <tr>
                    <td>{theatre.theatreName}</td>
                    <td>{theatre.location}</td>
                    <td>{theatre.seatingCapacity}</td>            
                </tr>
               
            )
       })

        return (
            <div>

                <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link active" data-toggle="tab" href="#GetTheatres" role="tab" aria-controls="home" aria-selected="true">Get All Theatres</a>
                    </li>
                    <ToggleDisplay if={localStorage.getItem('cookie')=="admin"}>
                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link " data-toggle="tab" href="#AddTheatre" role="tab" aria-controls="settings" aria-selected="false">Add Theatre</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link"  data-toggle="tab" href="#UpdateTheatre" role="tab" aria-controls="messages" aria-selected="false">Update Theatre</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-toggle="tab" href="#DeleteTheatre" role="tab" aria-controls="profile" aria-selected="false">Delete Theatre</a>
                    </li>
                    </ul>
                    </ToggleDisplay>

                </ul>


                <div class="tab-content">
                    <div class="tab-pane active" id="GetTheatres" role="tabpanel" aria-labelledby="home-tab">
                        <div class="container">
                            <h2>List of All Theatres</h2>
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Theatre Name</th>
                                        <th>Location</th>
                                        <th>Seating Capacity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/*Display the Tbale row based on data recieved*/}
                                    {theatreDetails}
                                </tbody>
                            </table>
                        </div>

                    </div>
                    <div class="tab-pane" id="AddTheatre" role="tabpanel" aria-labelledby="profile-tab"> <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-6 col-lg-offset-3  ">
                                <div className="free-space"></div>
                                <div className="row margin-top1 margin-bottom1">

                                    <form class="form">
                                        <div class="form-group col-lg-12">
                                            <input onChange={this.change} type="text" class="form-control" name="theatreName" id="theatreName" placeholder="Theatre Name" />
                                        </div>
                                        <div class="form-group col-lg-12">
                                            <input onChange={this.change} type="text" class="form-control" name="location" id="location" placeholder="Location" />
                                        </div>
                                        <div class="form-group col-lg-12">
                                            <input onChange={this.change} type="text" class="form-control" name="seatingCapacity" id="seatingCapacity" placeholder="Seating Capacity" />
                                        </div>
                                        <div class="form-group col-lg-6">
                                            <a onClick={this.addTheatre} class="form-control btn btn-primary btn-rounded" style={{ width: '50%' }} label="Next" href="" type="button">
                                                <span class="btn__label">Add Theatre</span></a></div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div></div>
                    <div class="tab-pane" id="UpdateTheatre" role="tabpanel" aria-labelledby="messages-tab">
                        <div className="row">
                                <div className="col-lg-6 col-lg-offset-3  ">
                                    <div className="free-space"></div>
                                    <div className="row margin-top1 margin-bottom1">

                                        <form class="form">
                                            <div class="form-group col-lg-12">
                                                <input onChange={this.change} type="text" class="form-control" name="updatetheatreName" id="updatetheatreName" placeholder="Theatre Name" />
                                            </div>
                                            <div class="form-group col-lg-12">
                                                <input onChange={this.change} type="text" class="form-control" name="updatelocation" id="updatelocation" placeholder="Location" />
                                            </div>
                                            <div class="form-group col-lg-12">
                                                <input onChange={this.change} type="text" class="form-control" name="updateseatingCapacity" id="updateseatingCapacity" placeholder="Seating Capacity" />
                                            </div>
                                            <div class="form-group col-lg-6">
                                                <a onClick={this.updateTheatre} class="form-control btn btn-primary btn-rounded" style={{ width: '50%' }} label="Next" href="" type="button">
                                                    <span class="btn__label">Update Theatre</span></a></div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <div class="tab-pane" id="DeleteTheatre" role="tabpanel" aria-labelledby="settings-tab">
                    <div className="row">
                                <div className="col-lg-6 col-lg-offset-3  ">
                                    <div className="free-space"></div>
                                    <div className="row margin-top1 margin-bottom1">

                                        <form class="form">
                                            <div class="form-group col-lg-12">
                                                <input onChange={this.change} type="text" class="form-control" name="deletetheatreName" id="deletetheatreName" placeholder="Theatre Name" />
                                            </div>
                                            <div class="form-group col-lg-6">
                                                <a onClick={this.deleteTheatre} class="form-control btn btn-primary btn-rounded" style={{ width: '50%' }} label="Next" href="" type="button">
                                                    <span class="btn__label">Delete Theatre</span></a></div>
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

export default Theatres;