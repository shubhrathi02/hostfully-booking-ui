import React from "react";
import { ENDPOINT_BOOKINGS } from "./constants";

export class CreateBooking extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.fetchPostAPI = this.fetchPostAPI.bind(this);

        this.state = {
            error: ""
        }
    }

    render() {
        return (<div style={{"padding-left": "30px"}}>
                
                <br />
                <form ref={(el) => this.myFormRef = el} onSubmit={this.onSubmit}>
                    <label>Start Date:
                        <input style={{"margin-left":"10px"}} type="date" name="startDate" /> <br /><br />
                    </label>
                    <label>End Date:
                        <input style={{"margin-left":"16px"}} type="date" name="endDate" /> <br />
                    </label>
                    <br />
                    <label>
                        <input type="radio" name="isBlock" value="isBlock" /> isBlock <br />
                    </label>
                    <div style={{"color":"red"}}> {this.state.error} <br /> <br /> </div>
                    <input className="button-13" type="submit" value="Create Booking" />
                </form>

            </div>
        );
    }

    onSubmit(event) {
        event.preventDefault();
        let data = event.target;
        
        let bookingData = {
            startDate: data.startDate.value,
            endDate: data.endDate.value,
            bookingType: data.isBlock.checked ? 'BLOCK' : 'GENERAL',
        };
        this.fetchPostAPI(ENDPOINT_BOOKINGS + '?userId=' + this.props.userId, bookingData);
        
        
        this.myFormRef.reset();

    }

    fetchPostAPI(url, data) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        let time = Date.now();
        fetch(url, requestOptions)
            .then(data => {
                if(data.status >= 400) {
                    data.text().then((text) => this.setState({error: text}));
                } else {
                    
                    return console.log(data);
                }
            })
            .catch(e => { console.log(e)});
    }
}