import React from "react";
import { ENDPOINT_BOOKINGS } from "./constants";

export class MyBookings extends React.Component {

    constructor(props) {
        super(props);

        this.getMyBookings = this.getMyBookings.bind(this);
        this.updateColumn = this.updateColumn.bind(this);
        this.updateBooking = this.updateBooking.bind(this);

        this.state = {
            bookings: [],
            error: ''
        }
    }

    componentDidMount() {
        this.getMyBookings();
    }

    render() {
        return (<div style={{"padding-left": "10px"}}>

                    { this.state.bookings.length > 0 ?
                        <div>
                    
                            <br />
                            <table>
                                <thead>
                                    <tr>
                                        <th>Booking Id</th>
                                        <th>Start Date</th>
                                        <th>End Date</th>
                                        <th>Booking Type</th>
                                        <th></th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.bookings.map(( listValue, index ) => {
                                        let l = listValue;
                                        return (
                                            <tr key={index}>
                                                <td>{listValue.id}</td>
                                                <td><input type="date" onChange={(e) => this.updateColumn(index, "startDate", e.target.value)} value={listValue.startDate} /></td>
                                                <td><input type="date" onChange={(e) => this.updateColumn(index, "endDate", e.target.value)} value={listValue.endDate} /></td>
                                                <td>{listValue.bookingType}</td>
                                                <td><button className="button-13" onClick={() => this.updateBooking(index, listValue.id)}>Update</button></td>
                                                <td><button className="button-13" onClick={() => this.deleteBooking(index, listValue.id)}>Delete</button></td>
                                                {/* <td><input type="number" value={l.quantity} onChange={(e) => this.updateQuantity(index, e.target.value)} /></td>
                                                <td><button onClick={() => this.update(listValue.itemId, l.quantity)}>Update Quantity</button></td> */}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                        : 'No Items found'
                    }


        </div>);
    }

    getMyBookings() {
        fetch(ENDPOINT_BOOKINGS + '?userId=' + this.props.userId)
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(data => this.setState({bookings: data}))
    }

    updateColumn(index, column, value) {
        let myBookings = this.state.bookings;
        if(column === 'startDate') {
            myBookings[index].startDate = value;
        } else if(column === 'endDate') {
            myBookings[index].endDate = value; 
        }
        this.setState({bookings: myBookings});
    }

    updateBooking(index, id) {
        this.fetchPutAPI(ENDPOINT_BOOKINGS + '/' + id + '?userId=' + this.props.userId, this.state.bookings[index]);
    }

    deleteBooking(index, id) {
        this.fetchDeleteAPI(ENDPOINT_BOOKINGS + '/' + id + '?userId=' + this.props.userId);
        let myBookings = this.state.bookings;
        myBookings.splice(index, 1);
        this.setState({bookings: myBookings});
    }

    fetchPutAPI(url, data) {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
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

    fetchDeleteAPI(url) {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            
        };
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