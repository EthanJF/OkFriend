import React, { Component } from 'react'

export default class EventDetail extends Component {

    state = {
        thisEvent: {}
    }

    componentDidMount(){
        fetch(`http://localhost:3000/events/${this.props.selectedEventID}`)
                .then(r => r.json())
                .then(resObj => {
                    this.setState({
                        thisEvent: resObj
                    })
                })
    
    }
    render() {
        const otherFriend = this.state.thisEvent.user1_id === this.props.userID ? this.state.thisEvent.user2 : this.state.thisEvent.user1
        return (
            <div className="event-detail">
                 <h1>Hello from EventDetail</h1>
                 <h3>Name: {this.state.thisEvent.name}</h3>
                 <h3>Description: {this.state.thisEvent.description}</h3>
                 <h3>Time: {this.state.thisEvent.time}</h3>
                 <h3>Other Participant: {otherFriend ? otherFriend.username : ""}</h3>
            </div>
        )
    }
}