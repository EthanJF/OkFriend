import React, { Component } from 'react'

export default class Chat extends Component {

    // state = {
    //     messages: [],
    //     message: ""
    // //     otherUsername: null
    // }

    // componentDidMount(){
    //     console.log(this.props.thisChat)
    //     this.setState({
    //         messages: this.props.thisChat.messages,
    //         message: "",
    //         // otherUsername: this.props.thisChat.user1.id === this.props.userID ? this.props.thisChat.user2.username : this.props.thisChat.user1.username
    //     })
    // }

    // onSubmit = (event) => {
    //     event.preventDefault()
    //     fetch("http://localhost:3000/messages", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Accept": "application/json"
    //         },
    //         body: JSON.stringify({
    //             message: {
    //                 user_id: this.props.userID,
    //                 chat_id: this.props.thisChat.id,
    //                 content: event.target.message.value
    //             }
    //         })
    //     })
    //     .then( r=> r.json())
    //     .then(resObj => {
    //         this.setState({
    //             messages: [...this.state.messages, resObj],
    //             message: ""
    //         })
    //     })
     
    //     // event.target.message.value.clear()
    // }

    // onChange = (event) => {
    //     this.setState({
    //         message: event.target.value
    //     })
    // }

    render(){
        // console.log(this.props.thisChat)
        // console.log(this.props.thisChat.messages)
        const thisChat = this.props.thisChat
        const theseMessages = this.props.thisChatMessages
        let otherUsername
        if(thisChat.user1){
            otherUsername = thisChat.user1.id === this.props.userID ? this.props.thisChat.user2.username : this.props.thisChat.user1.username

        }

        // console.log(this.state.messages)
        // this.setState({
        //     messages: this.props.thisChat.messages,
        //     message: "",
        //     // otherUsername: this.props.thisChat.user1.id === this.props.userID ? this.props.thisChat.user2.username : this.props.thisChat.user1.username
        // })
        let messages = null
        if(theseMessages){

            messages = theseMessages.map((message) => {
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
                {console.log(thisChat)}
                {console.log(otherUsername)}
                {console.log(theseMessages)}
                <h1>Chat</h1>
                <h3>With {otherUsername}</h3>
                <ul>
                    {messages ? messages : ""}
                </ul>
                <form onSubmit={(event) => this.props.onChatSubmit(event)}>
                    <input name="message" type="text" onChange={this.props.onMessageChange} value={this.props.message}/>
                    <input type="submit"/>
                </form>
            </div>
        )
    }
}