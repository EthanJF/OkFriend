import React, { Component } from 'react';
import NavBar from './NavBar'
import MainDiv from './MainDiv'

export default class App extends Component {

  state = {
    showProfile: false
  }

  handleProfileClick = () => {
    this.setState({
      showProfile: true
    })
  }

  handleHomeClick = () => {
    this.setState({
      showProfile: false
    })
  }

  render(){
    return (
      <div>
        <NavBar showProfile={this.state.showProfile} handleProfileClick={this.handleProfileClick} handleHomeClick={this.handleHomeClick}/>
        <MainDiv showProfile={this.state.showProfile} handleProfileClick={this.handleProfileClick}/>
      </div>
    )
  }
}
