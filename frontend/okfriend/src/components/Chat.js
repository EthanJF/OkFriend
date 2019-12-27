import React, { Component } from 'react'

export default class Chat extends Component {

    state = {
        messages: [],
        message: "",
        thisChat: {},
        otherUsername: null
    }

    componentDidMount(){
        const myChat = this.props.allChats.find(element => element.user1_id === this.props.selectedUserID || element.user2_id === this.props.selectedUserID)
        if (!myChat){
        fetch("http://localhost:3000/chats", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                chat: {
                    user1_id: this.props.userID,
                    user2_id: this.props.selectedUserID
                }
            })
        })
        .then( r => r.json())
        .then( resObj => {
            this.setState({
                thisChat: resObj,
                otherUsername: resObj.user2.username
            }, () => this.props.addAChat(resObj))
            alert("adding new chat")
        })
        } else {
            this.setState({
                thisChat: myChat,
                otherUsername: myChat.user2.username
            }, () => {
                    fetch(`http://localhost:3000/chats/${myChat.id}`)
                        .then(r => r.json())
                        .then(resObj => {
                            const newMessages = resObj.messages.map((message) => {
                                return message
                            })
                            this.setState({
                                messages: newMessages
                            })
                        })
            })
        }
        

    }

    onSubmit = (event) => {
        event.preventDefault()
        fetch("http://localhost:3000/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                message: {
                    user_id: this.props.userID,
                    chat_id: this.state.thisChat.id,
                    content: event.target.message.value
                }
            })
        })
        .then( r=> r.json())
        .then(resObj => {
            this.setState({
                messages: [...this.state.messages, resObj],
                message: ""
            })
        })
     
        // event.target.message.value.clear()
    }

    onChange = (event) => {
        this.setState({
            message: event.target.value
        })
    }

    render(){
        console.log(this.state.messages)
        let messages = null
        if(this.state.messages.length !== 0 ){
            messages = this.state.messages.map((message) => {
                if(message.user.username === this.props.username){
                    return <li className="my-message">{message.user.username} said: {message.content}</li>
                }
                else {
                    return <li className="other-message">{message.user.username} said: {message.content}</li>
                }
            })
        }
        
        return(
            <div className="chat">
                <h1>Chat</h1>
                <h3>With {this.state.otherUsername}</h3>
                <ul>
                    {messages ? messages : ""}
                </ul>
                <form onSubmit={(event) => this.onSubmit(event)}>
                    <input name="message" type="text" onChange={this.onChange} value={this.state.message}/>
                    <input type="submit"/>
                </form>
            </div>
        )
    }
}