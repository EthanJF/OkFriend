import React, { Component } from 'react'

export default class Friends extends Component {
    render(){
        const friends = this.props.friends.map((friend) => {
            if(friend.user2.id !== this.props.userID) {
                return <li onClick={() => this.props.setID(friend.user2.id)}>{friend.user2.username}</li>
            } else {
                return <li onClick={() => this.props.setID(friend.user1.id)}>{friend.user1.username}</li>
            }
        })
        return(
            <div className="friends">
                <h1>My Friends</h1>
                <ul>
                    {friends}
                </ul>
            </div>
        )
    }
}