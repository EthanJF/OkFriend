import React, { Component } from 'react'
import AreaUsers from './AreaUsers'
import InterestUsers from './InterestUsers'

export default class HomePage extends Component {
    render(){
        return(
            <div className="homepage">
                <h1>Friends In Your Area</h1>
                <AreaUsers allUsers={this.props.allUsers} setID={this.props.setID}/>
                <h1>Friends With Similar Interests</h1>
                <InterestUsers allUsers={this.props.allUsers} setID={this.props.setID}/>
            </div>
        )
    }
}