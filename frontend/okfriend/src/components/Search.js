import React, { Component } from 'react'
import SearchUsers from './SearchUsers'

export default class Search extends Component {

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
                            <input type="checkbox" id="women" name="women"/>
                            <label htmlFor="women">women</label>
                            <input type="checkbox" id="men" name="men"/>
                            <label htmlFor="men">men</label>
                            <input type="checkbox" id="non-binary people" name="non-binary people"/>
                            <label htmlFor="non-binary people">non-binary people</label>
                        <br />
                        who are between <input type="number"/> and <input type="number"/> years old 
                        <br /> and are interested in 
                        <select name="interest">
                            {interests}
                        </select>  
                        <br /> within <input type="number"/> miles.</p>
                        <input id="submit" type="submit"/>
                </form>
                <h1>Results:</h1>
                <SearchUsers allUsers={this.props.allUsers} setID={this.props.setID}/>
            </div>
        )
    }
}