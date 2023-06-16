import React from "react";
import './css/common.css';
import { UserComponent } from "./UserComponent";
import { MyBookings } from "./MyBookings";
import { CreateBooking } from "./CreateBooking";

export class BookingPageComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: null,
            showComponent: ""
        }
    }

    setUser(userId) {
        console.log(userId);
        this.setState({userId: userId, showComponent: "myBookings"});
    }

    render() {
        return (<div>
            { !this.state.userId ? <UserComponent setUser={this.setUser.bind(this)}/> : 
            
                <div>
                    <h2> Welcome to Booking Application</h2>
                    <ul>
                        <li><a onClick={() => this.setState({showComponent: "myBookings"})}><span></span> My Bookings</a></li>
                        <li><a onClick={() => this.setState({showComponent: "createBooking"})}><span></span> Create Booking</a></li>
                    </ul>
                </div>
            }
            
            {
                this.state.showComponent === 'myBookings' ? 
                <MyBookings userId={this.state.userId} type='GENERAL' setUser={this.setUser.bind(this)} /> : ''
            }
            {
                this.state.showComponent === 'createBooking' ? 
                <CreateBooking userId={this.state.userId} setUser={this.setUser.bind(this)} /> : ''
            }
            
        </div>
        );
    }

    
}