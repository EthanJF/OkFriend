import React, { Component } from 'react'
// import Calendar from 'react-calendar'
import EventList from './EventList'
import EventDetail from './EventDetail'
import EventForm from './EventForm'

export default class CalendarPage extends Component {

    state = {
        allEvents: [],
        selectedEventID: null,
        showDetailComponent: false
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

    showEventDetail = (eventID) => {
        this.setState({
            selectedEventID: eventID,
            showDetailComponent: true
        })
    }

    render(){
        return(
            <div className="calendar-page">
                <EventList allEvents={this.state.allEvents} userID={this.props.userID} showEventDetail={this.showEventDetail}/>
                {this.state.showDetailComponent ? <EventDetail selectedEventID={this.state.selectedEventID} userID={this.props.userID} allEvents={this.state.allEvents}/> : ""}
                <EventForm userID={this.props.userID} myFriends={this.props.myFriends} addEvent={this.addEvent}/>
            </div>
        )
    }
}