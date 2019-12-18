import React, { Component } from 'react'

export default class UserProfile extends Component {
    state = {
        currentUser: {},
        currentUserInterests: []
    }

    componentDidMount() {
        this.props.resetRedirect()
        fetch(`http://localhost:3000/users/${this.props.selectedUserID}`)
            .then(r => r.json())
            .then(resObj => {
                this.setState({
                    currentUser: resObj,
                    currentUserInterests: resObj.interests
                })
            })
    }

    render(){
        const user = this.state.currentUser
        const userInterests = this.state.currentUserInterests

        const interests = userInterests.map((interest) => {
            return <li key={interest.id}>{interest.name}</li>
        })
        return(
            <div>
                <h1>{user.username}</h1>
                <div className="image-div">
                    <img alt="profile" src={user.picture} />
                </div>
                <div className="detail-div">
                    <h3>Location: New York City</h3>
                    <h3>Age: {user.age}</h3>
                    <h3>Gender: {user.gender}</h3>
                </div>
                <br />
                <br />
                <br />
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
            </div>
        )
    }
}