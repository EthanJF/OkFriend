import React, { Component } from 'react'
import Friends from './Friends'
import Chat from './Chat'

export default class FriendsChatPanel extends Component {
    render(){
        return(
            <div className="friends-chat-panel">
                <Friends friends={this.props.friends} userID={this.props.userID} setID={this.props.setID}/>
                <Chat />
            </div>
        )
    }
}