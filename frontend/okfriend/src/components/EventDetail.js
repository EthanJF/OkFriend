import React, { Component } from 'react'

export default class EventDetail extends Component {



    render() {
        const thisEvent = this.props.thisEvent
        const otherFriend = thisEvent.user1_id === this.props.userID ? thisEvent.user2 : thisEvent.user1
        return (
            <div className="event-detail">
                 <h1>Hello from EventDetail</h1>
                 <h3>Name: {thisEvent.name}</h3>
                 <h3>Description: {thisEvent.description}</h3>
                 <h3>Time: {thisEvent.time}</h3>
                 <h3>Other Participant: {otherFriend ? otherFriend.username : ""}</h3>
            </div>
        )
    }
}