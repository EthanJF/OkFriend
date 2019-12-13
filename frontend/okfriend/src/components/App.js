import React, { Component } from 'react';
import MainDiv from './MainDiv'
import { BrowserRouter as Router } from 'react-router-dom'


export default class App extends Component {

  state = {
    showProfile: false,
    interests: ["hiking", "reading", "video games", "writing", "coding", "sports", "weight lifting", "crafting",
      "movies", "tv shows", "podcasts", "fitness", "politics", "biking", "skating", "cooking", "drinking",
      "ping pong", "computers", "fashion", "music", "food", "running", "veganism", "vegetarianism",
      "pets", "dogs", "cats", "books", "football", "baseball", "soccer", "beer", "knitting", "crocheting",
      "nature", "tattoos", "piercings", "guitar", "violin", "bass", "drums", "fishing", "kayaking", "boating",
      "science fiction", "fantasy", "literature", "singing", "karaoke", "baking", "board games", "dungeons and dragons",
      "magic the gathering", "activism", "social justice", "clubbing", "bars", "beach", "swimming", "acting"]
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
        <Router><MainDiv showProfile={this.state.showProfile} handleProfileClick={this.handleProfileClick} handleHomeClick={this.handleHomeClick} interests={this.state.interests}/></Router>
      </div>
    )
  }
}
