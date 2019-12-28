import React, { Component } from 'react'
import Friends from './Friends'
import Chat from './Chat'

export default class FriendsChatPanel extends Component {

    state = {
        allChats: [],
        thisChat: {}
    }

    componentDidMount(){
        fetch(`http://localhost:3000/users/${this.props.userID}`)
        .then( r=> r.json())
        .then(resObj => {
            this.setState({
                allChats: resObj.all_chats,
                thisChat: resObj.all_chats[0]
            })
        })
    }

    addAChat = (newChat) => {
        this.setState({
            allChats: [...this.state.allChats, newChat]
        })
    }

    deleteAChat = (id) => {
        fetch(`http://localhost:3000/chats/${id}`, {
            method: "DELETE"
        })
        .then(r => r.json())
        .then(resObj => {
            console.log("deleted")
            const newChats = this.state.allChats.filter((chat) => {
                return chat.id !== resObj.id
            })
            this.setState({
                allChats: newChats
            })
        })
    }

    render(){
        const renderChats = this.state.allChats.map((chat) => {
            return <div onClick={() => this.props.startChatFromLI(chat.user1.id===this.props.userID ? chat.user2.id : chat.user1.id)}><li>Chat with {chat.user1.username===this.props.username ? chat.user2.username : chat.user1.username} ID: {chat.id}</li><button onClick={() => this.deleteAChat(chat.id)}>Delete</button></div>
        })
        return(
            <div className="friends-chat-panel">
                <Friends friends={this.props.friends} userID={this.props.userID} setID={this.props.setID}/>
                <h1>My Chats</h1>
                {renderChats}
                {this.props.showChatPanel ? (<Chat username={this.props.username} selectedUserID={this.props.selectedUserID} userID={this.props.userID} allChats={this.state.allChats} addAChat={this.addAChat}/>) : ""}
            </div>
        )
    }
}