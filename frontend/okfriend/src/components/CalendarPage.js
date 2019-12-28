import React, { Component } from 'react'
// import Calendar from 'react-calendar'
import EventList from './EventList'
import EventDetail from './EventDetail'
import EventForm from './EventForm'

export default class CalendarPage extends Component {

    state = {
        allEvents: [],
        thisEvent: {}
    }

    componentDidMount(){
        fetch(`http://localhost:3000/users/${this.props.userID}`)
        .then(r=> r.json())
        .then(resObj => {
            this.setState({
                allEvents: resObj.all_events,
                thisEvent: resObj.all_events[0]
            })
        })
    }

    addEvent = (eventObj) => {
        this.setState({
            allEvents: [...this.state.allEvents, eventObj]
        })
    }

    showEventDetail = (eventID) => {
        fetch(`http://localhost:3000/events/${eventID}`)
        .then(r => r.json())
        .then(resObj => {
            this.setState({
                thisEvent: resObj
            })
        })
    }

    render(){
        return(
            <div className="calendar-page">
                <EventList allEvents={this.state.allEvents} userID={this.props.userID} showEventDetail={this.showEventDetail}/>
                 <EventDetail selectedEventID={this.state.selectedEventID} userID={this.props.userID} allEvents={this.state.allEvents} thisEvent={this.state.thisEvent}/>
                <EventForm userID={this.props.userID} myFriends={this.props.myFriends} addEvent={this.addEvent}/>
            </div>
        )
    }
}