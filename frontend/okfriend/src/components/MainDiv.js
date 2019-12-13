import React, { Component } from 'react'
import Profile from './Profile'
import HomePage from './HomePage'
import Search from './Search'
import NavBar from './NavBar'
import { Route, Switch, Redirect } from 'react-router-dom'

export default class MainDiv extends Component {

    state = {
        allUsers: [],
        selectedUserID: 46,
        redirect: false
    }

    setID = (id) => {
        this.setState({
            selectedUserID: id,
            redirect: true
        })
    }

    resetRedirect = () => {
        this.setState({
            redirect: false
        })
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
        const { redirect } = this.state
        return(
            <div>
                <NavBar showProfile={this.props.showProfile} handleProfileClick={this.props.handleProfileClick} handleHomeClick={this.props.handleHomeClick} />
    
                {redirect ? (<Redirect to="/profile"/>) : ""}
                <Switch>
                    <Route path="/profile" render={(props) => <Profile {...props} selectedUserID={this.state.selectedUserID} resetRedirect={this.resetRedirect}/>}/>
                    <Route path="/search" render={(props) => <Search {...props} interests={this.props.interests} allUsers={this.state.allUsers} setID={this.setID}/>}/>
                    <Route path="/home" render={(props) => <HomePage {...props} allUsers={this.state.allUsers} selectedUserID={this.state.selectedUserID} setID={this.setID} />}/>
                </Switch>
            </div>
        )
    }
}