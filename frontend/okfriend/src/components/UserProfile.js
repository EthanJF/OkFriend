import React, { Component } from 'react'

export default class UserProfile extends Component {

    render() {
        const user = this.props.currentUser
        const userInterests = this.props.currentUserInterests

        const interests = userInterests.map((interest) => {
            return <li key={interest.id}>{interest.name}</li>
        })

        const currentFriend = this.props.myFriends.find(element => element.user1_id === this.props.thisUserID || element.user2_id === this.props.thisUserID)
        return (
            <div className="user-profile">
                <h1>{user.username}</h1>
                <div className="image-div">
                    <img alt="profile" src={user.picture} />
                </div>
                <div className="detail-div">
                    <h3>Location: New York City</h3>
                    <h3>Age: {user.age}</h3>
                    <h3>Gender: {user.gender}</h3>
                </div>
                <div className="party-div">
                    <h2>What are you like at parties?</h2>
                    <p>{user.parties}</p>
                </div>
                <div className="interest-div">
                    <h2>My Interests</h2>
                    <ul>
                        {interests}

                    </ul>
                </div>
                <div className="about-me">
                    <h2>About Me</h2>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </div>
                <div className="friend-chat-div">
                    {currentFriend ? (<button onClick={() => this.props.removeAFriend(this.props.currentUser.id)}>Remove Friend</button>) : (<button onClick={() => this.props.addAFriend(this.props.currentUser.id)}>Add Friend</button>)}
                    <button onClick={() => this.props.addAChat(this.props.currentUser.id)}>Send Message</button>
                </div>

            </div>
        )
    }
}