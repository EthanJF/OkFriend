import React, { Component } from 'react'
import UserCard from './UserCard'

export default class InterestUsers extends Component {
    render() {
        const allUsers = this.props.allUsers.map((user) => {
            return <UserCard user={user} key={user.id} setID={this.props.setID}/>
        })
        return (
            <div className="interest-users">
                {allUsers}
            </div>
        )
    }
}