import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class NavBar extends Component {
    render(){
        return(
            <div className="navbar">
                <h1 className="logo">OkFriend</h1>
                <h2>Welcome, {this.props.username}</h2>
                <NavLink exact to="/home">Home</NavLink>
                <NavLink exact to="/home/search">Search</NavLink>
                <NavLink exact to="/home/profile">Profile</NavLink>
                <NavLink exact to='/welcome'>Logout</NavLink>

            </div>
            
        )
    }
}