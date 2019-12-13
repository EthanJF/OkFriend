import React, { Component } from 'react'

export default class UserCard extends Component {
    render(){
        return(
            <div onClick={()=> this.props.setID(this.props.user.id)}>
                <img alt="profile" src={this.props.user.picture}/>
                <h3>{this.props.user.username}</h3>
            </div>
        )
    }
}