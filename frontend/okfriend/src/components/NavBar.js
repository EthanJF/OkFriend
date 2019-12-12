import React, { Component } from 'react'

export default class NavBar extends Component {
    render(){
        return(
            <div className="navbar">
                <h1 className="logo">OkFriend</h1>
                <h2 onClick={this.props.handleHomeClick}>Home</h2>
                <h2>Search</h2>
                <h2 onClick={this.props.handleProfileClick}>Profile</h2>
            </div>
            
        )
    }
}