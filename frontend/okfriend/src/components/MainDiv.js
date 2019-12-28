import React, { Component } from 'react'
import EditProfile from './EditProfile'
import MyProfile from './MyProfile'
import UserProfile from './UserProfile'
import HomePage from './HomePage'
import Search from './Search'
import CalendarPage from './CalendarPage'
import NavBar from './NavBar'
import FriendsChatPanel from './FriendsChatPanel'
import { Route, Switch, Redirect } from 'react-router-dom'

export default class MainDiv extends Component {

    state = {
        allUsers: [],
        selectedUserID: null,
        redirect: false,
        username: "",
        zip_code: 0,
        interests: [],
        myFriends: [],
        showChatPanel: false
    }

    setID = (id) => {
        this.setState({
            selectedUserID: id,
            redirect: true
        })
    }

    resetRedirect = () => {
        this.setState({
            redirect: false
        })
    }

    componentDidMount(){
        fetch("http://localhost:3000/users")
        .then(r => r.json())
        .then(resObj => {
            const myUsers = resObj.filter((user) => {
                return user.id !== this.props.userID
            })
            this.setState({
                allUsers: myUsers
            })
        })
        fetch(`http://localhost:3000/users/${this.props.userID}`)
        .then( r=> r.json())
        .then(resObj => {
            this.setState({
                username: resObj.username,
                zip_code: resObj.zip_code,
                interests: resObj.interests,
                myFriends: resObj.all_friendships
            })
        })
    }

    deleteAUser = () => {
        fetch(`http://localhost:3000/users/${this.props.userID}`,{
            method: "DELETE"
        })
        .then( r => r.json())
        .then(resObj => {
            const newUsers = this.state.allUsers.filter((user) => {
                return user.id !== resObj.id
            })
            this.setState({
                allUsers: newUsers
            }, () => this.props.logOutClick())
        })
    }

    addAFriend = () => {
        if (!this.state.myFriends.find(element => element.user1_id === this.props.selectedUserID || element.user2_id === this.state.selectedUserID)){
            fetch('http://localhost:3000/friendships', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    friendship: {
                        user1_id: this.props.userID,
                        user2_id: this.state.selectedUserID
                    }

                })
            })
                .then(r => r.json())
                .then(resObj => {
                    this.setState({
                        myFriends: [...this.state.myFriends, resObj]
                    })
                })
        } else {
            alert("This person is already your friend!")
        }
    }

    removeAFriend = () => {
        const friendshipID = this.state.myFriends.find(element => element.user1_id === this.props.selectedUserID || element.user2_id === this.state.selectedUserID)
        if(friendshipID){
            fetch(`http://localhost:3000/friendships/${friendshipID.id}`, {
                method: "DELETE"
            })
                .then(r => r.json())
                .then(resObj => {
                    const newFriends = this.state.myFriends.filter((friend) => {
                        return friend.id !== resObj.id
                    })
                    this.setState({
                        myFriends: newFriends
                    })
                })
        } else {
            alert("This person is not your friend!")
        }

    }

    startChat = () => {
        // if (this.state.myFriends.find(element => element.user1_id === this.props.selectedUserID || element.user2_id === this.state.selectedUserID)) {
            this.setState({
                showChatPanel: true
            }, () => console.log("chat started"))
        // } else {
        //     alert("You must be friends to start a chat with someone!")
        // }
    }

    startChatFromLI = (otherUserID) => {
        // if (this.state.myFriends.find(element => element.user1_id === this.props.selectedUserID || element.user2_id === this.state.selectedUserID)) {
        this.setState({
            showChatPanel: true,
            selectedUserID: otherUserID
        }, () => console.log("chat started"))
        // } else {
        //     alert("You must be friends to start a chat with someone!")
        // }
    }

    render(){
        const profileRoutes = this.state.allUsers.map((user) => {
            return <Route exact path={`/home/user-profile/${user.username}`} render={(props) => <UserProfile {...props} selectedUserID={user.id} resetRedirect={this.resetRedirect} deleteAUser={this.deleteAUser} userID={this.props.userID} addAFriend={this.addAFriend} removeAFriend={this.removeAFriend} myFriends={this.state.myFriends} startChat={this.startChat} />} />
        })
        return(
            <div>
                <NavBar showProfile={this.props.showProfile} handleProfileClick={this.props.handleProfileClick} handleHomeClick={this.props.handleHomeClick} onClick={this.props.logOutClick} username={this.state.username}/>
                <FriendsChatPanel userID={this.props.userID} friends={this.state.myFriends} setID={this.setID} username={this.state.username} showChatPanel={this.state.showChatPanel} selectedUserID={this.state.selectedUserID} startChat={this.startChat} startChatFromLI={this.startChatFromLI}/>
                <div className="main-div">
                    <Switch>
                        <Route exact path="/home/my-profile/edit" render={(props) => <EditProfile {...props} userID={this.props.userID} />} />
                        <Route exact path="/home/my-profile" render={(props) => <MyProfile {...props} selectedUserID={this.state.selectedUserID} resetRedirect={this.resetRedirect} deleteAUser={this.deleteAUser} userID={this.props.userID} interests={this.props.interests} />} />
                       {profileRoutes}
                        {/* <Route path="/home/user-profile" render={(props) => <UserProfile {...props} selectedUserID={this.state.selectedUserID} resetRedirect={this.resetRedirect} deleteAUser={this.deleteAUser} userID={this.props.userID} addAFriend={this.addAFriend} removeAFriend={this.removeAFriend} myFriends={this.state.myFriends} startChat={this.startChat}/>} /> */}
                        <Route exact path="/home/search" render={(props) => <Search {...props} interests={this.props.interests} allUsers={this.state.allUsers} setID={this.setID} userID={this.props.userID} />} />
                        <Route exact path="/home/calendar" render={(props) => <CalendarPage {...props} userID={this.props.userID} myFriends={this.state.myFriends} />} />
                        <Route exact path="/home" render={(props) => <HomePage {...props} allUsers={this.state.allUsers} selectedUserID={this.state.selectedUserID} setID={this.setID} zip_code={this.state.zip_code} userID={this.props.userID} interests={this.state.interests} />} />
                    </Switch>
                </div>
                
            </div>
        )
    }
}