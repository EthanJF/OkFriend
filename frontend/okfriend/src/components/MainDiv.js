import React, { Component } from 'react'
import Profile from './Profile'
import HomePage from './HomePage'

export default class MainDiv extends Component {

    state = {
        allUsers: [],
        selectedUserID: 46
    }

    setID = (id) => {
        this.setState({
            selectedUserID: id
        }, () => this.props.handleProfileClick())
    }

    componentDidMount(){
        fetch("http://localhost:3000/users")
        .then(r => r.json())
        .then(resObj => {
            console.log(resObj)
            this.setState({
                allUsers: resObj
            })
        })
    }

    render(){
        return(
            <div>
              { this.props.showProfile ? (<Profile selectedUserID={this.state.selectedUserID}/>) : (<HomePage allUsers={this.state.allUsers} selectedUserID={this.state.selectedUserID} setID={this.setID}/>)}
            </div>
        )
    }
}