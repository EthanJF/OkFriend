import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class Friends extends Component {
    render(){
        const friends = this.props.friends.map((friend) => {
            if(friend.user2.id !== this.props.userID) {
                return <NavLink exact to={`/home/user-profile/${friend.user2.username}`}><li key={friend.id}>{friend.user2.username}</li></NavLink>
            } else {
                return <NavLink exact to={`/home/user-profile/${friend.user1.username}`}><li key={friend.id}>{friend.user1.username}</li></NavLink>
            }
        })
        return(
            <div className="friends">
                <h1>My Friends</h1>
                <ul className="friends-list">
                    {friends}
                </ul>
            </div>
        )
    }
}