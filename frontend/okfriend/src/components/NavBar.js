import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class NavBar extends Component {
    render(){
        return(
            <div className="navbar">
                <h1 className="logo">OkFriend</h1>
                <NavLink exact to="/home">Home</NavLink>
                <NavLink exact to="/search">Search</NavLink>
                <NavLink exact to="/profile">Profile</NavLink>
            </div>
            
        )
    }
}