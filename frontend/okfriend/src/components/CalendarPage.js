import React, { Component } from 'react'
// import Calendar from 'react-calendar'
import EventList from './EventList'
import EventDetail from './EventDetail'
import EventForm from './EventForm'

export default class CalendarPage extends Component {

    state = {
        allEvents: [],
        selectedEventID: null
    }

    componentDidMount(){
        fetch(`http://localhost:3000/users/${this.props.userID}`)
        .then(r=> r.json())
        .then(resObj => {
            this.setState({
                allEvents: resObj.all_events,
                selectedEventID: resObj.all_events[0].id
            })
        })
    }

    addEvent = (eventObj) => {
        this.setState({
            allEvents: [...this.state.allEvents, eventObj]
        })
    }

    showEventDetail = (eventObj) => {
        this.setState({
            selectedEventID: eventObj.id
        })
    }

    render(){
        return(
            <div className="calendar-page">
                <h1>Hello from Calendar</h1>
                {/* <Calendar/> */}
                <EventList allEvents={this.state.allEvents} userID={this.props.userID} showEventDetail={this.showEventDetail}/>
                <EventDetail selectedEventID={this.state.selectedEventID} userID={this.props.userID}/>
                <EventForm userID={this.props.userID} myFriends={this.props.myFriends} addEvent={this.addEvent}/>
            </div>
        )
    }
}