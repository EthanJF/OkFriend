import React, { Component } from 'react'
import UserCard from './UserCard'
import zipcodes from 'zipcodes'

export default class AreaUsers extends Component {

    state = {
        nearbyZipCodes: []
    }

    componentDidMount(){
        fetch(`http://localhost:3000/users/${this.props.userID}`)
        .then(r => r.json())
        .then( resObj => {
            const rad = zipcodes.radius(resObj.zip_code, 5)
            this.setState({
                nearbyZipCodes: rad
            })
        })
    }

    render(){
        const nearbyUsers = this.props.allUsers.filter((user) => {
            return this.state.nearbyZipCodes.includes(user.zip_code)
        })
        let rand = Math.floor(Math.random() * nearbyUsers.length)
        const allUsers = nearbyUsers.slice(rand,(rand + 8)).map((user) => {
            return <UserCard user={user} key={user.id} setID={this.props.setID}/>
        })
        return(
            <div className="area-users">
                {allUsers}
            </div>
        )
    }
}