import React, { Component } from 'react'
import SearchUsers from './SearchUsers'
import zipcodes from 'zipcodes'


export default class Search extends Component {

    state = {
        gender: "",
        beginning_age: 0,
        ending_age: 0,
        interest: "",
        distance: 0,
        newUsers: [],
        zip_code: 0,
        nearbyZipCodes: []
    }

    componentDidMount() {
        fetch(`http://localhost:3000/users/${this.props.userID}`)
            .then(r => r.json())
            .then(resObj => {
                this.setState({
                    zip_code: resObj.zip_code
                })
            })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        let genderUsers;
        if(this.state.gender === "everybody"){
            genderUsers = this.props.allUsers 
        } else {
            genderUsers = this.props.allUsers.filter((user) => {
                return user.gender === this.state.gender
            })
        }
    
        const ageUsers = genderUsers.filter((user) => {
            return user.age >= parseInt(this.state.beginning_age) && user.age <= parseInt(this.state.ending_age)
        })
        const rad = zipcodes.radius(this.state.zip_code, this.state.distance)
        const nearbyUsers = ageUsers.filter((user) => {
            return rad.includes(user.zip_code)
        })
        const interestUsers = nearbyUsers.filter((user) => {
            for (var i = 0; i < user.interests.length; i++) {
                return user.interests[i]["name"] === this.state.interest
            }
        })
        debugger
        this.setState({
            newUsers: interestUsers
        })
    }

    render(){
        const interests = this.props.interests.map((interest) => {
            return <option key={interest.id} value={interest}>{interest}</option>
        })
        return(
            <div className="search">
                <h1>Search for Friends!</h1>
                <form className="search-form">
                    <p>I'm looking for 
                        <br />
                        <select onChange={this.handleChange} name="gender">
                            <option value="male">men</option>
                            <option value="female">women</option>
                            <option value="non-binary">non-binary people</option>
                            <option value="everybody">everybody</option>
                        </select>
                        <br />
                        who are between <input type="number" name="beginning_age" onChange={this.handleChange} /> and <input type="number" name="ending_age" onChange={this.handleChange} /> years old 
                        <br /> and are interested in 
                        <select name="interest" onChange={this.handleChange}>
                            {interests}
                        </select>  
                        <br /> within <input type="number" name="distance" onChange={this.handleChange}/> miles.</p>
                        <input id="submit" type="submit" onClick={(event) => this.handleSubmit(event)}/>
                </form>
                <h1>Results:</h1>
                {console.log(this.state.newUsers)}
                <SearchUsers allUsers={this.state.newUsers} setID={this.props.setID}/>
            </div>
        )
    }
}