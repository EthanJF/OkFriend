import React, { Component } from 'react'
import Profile from './Profile'

export default class MainDiv extends Component {
    render(){
        return(
            <div className="main-div">
                <h1>Hello from MainDiv</h1>
                <Profile />
            </div>
        )
    }
}