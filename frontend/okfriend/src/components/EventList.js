import React, { Component } from 'react'

export default class EventList extends Component {
    render(){
        const eventList = this.props.allEvents.map((event) => {
            const otherFriend = event.user1.id === this.props.userID ? event.user2 : event.user1
            return <li onClick={()=>this.props.showEventDetail(event.id)}>{event.name} with {otherFriend.username} at {event.time.toLocaleString()}</li>
        })
        return(
            <div className="event-list">
                <h1>Hello from EventList</h1>
                <h3>My Upcoming Events</h3>
                <ul>
                    {eventList}
                </ul>
            </div>
        )
    }
}