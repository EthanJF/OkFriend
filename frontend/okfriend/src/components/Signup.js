import React from 'react'
import { NavLink } from 'react-router-dom'

class Signup extends React.Component {

    state = {
        username: "",
        email: "",
        password: "",
        age: 0,
        gender: "",
        location: 0,
        parties: "",
        picture: "",
        errors: []
    }

    onChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submitClick = event => {
        event.preventDefault()
        fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user: {
                    username: this.state.username,
                    password: this.state.password
                }
            })
        })
            .then(r => r.json())
            .then(resp => {
                if (resp.errors) {
                    this.setState({
                        errors: [...this.state.errors, resp.errors],
                        username: "",
                        password: ""
                    })
                } else {
                    fetch("http://localhost:3000/login", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            username: this.state.username,
                            password: this.state.password
                        })
                    })
                        .then(r => r.json())
                        .then(resp => {
                            if (resp.errors) {
                                this.setState({
                                    errors: [...this.state.errors, resp.errors],
                                    username: "",
                                    password: ""
                                })
                            } else {
                                this.props.setToken(resp)
                            }
                        })
                }
            })
    }

    componentWillUnmount() {
        this.setState({
            username: "",
            password: "",
        })
    }

    render() {
        return (
            <div className="login">

                {this.state.errors.map(error => <p>{error}</p>)}

                <h2>Signup</h2>
                <form>
                    <label>Username: </label>
                    <input onChange={this.onChange} name="username" type="text" />
                    <br />
                    <label>Email: </label>
                    <input onChange={this.onChange} name="email" type="text" />
                    <br />
                    <label>Password: </label>
                    <input onChange={this.onChange} name="password" type="password" />
                    <br />
                    <label>Age: </label>
                    <input onChange={this.onChange} name="age" type="number" />
                    <br />
                    <label>Gender: </label>
                    <select onChange={this.onChange} name="gender">
                        <option value="man">Man</option>
                        <option value="woman">Woman</option>
                        <option value="non-binary">Non-Binary</option>
                    </select>
                    <br />
                    <label>Zip Code: </label>
                    <input onChange={this.onChange} name="location" type="number" />
                    <br />
                    <label>What are you like at parties?: </label>
                    <select onChange={this.onChange} name="parties">
                        <option value=""></option>
                    </select>
                    <br />
                    <label>Picture: </label>
                    <input onChange={this.onChange} name="picture" type="text" />
                    <br />
                    <button onClick={this.submitClick}>{this.state.password === '' ? <NavLink to='/welcome'>Submit</NavLink> : <NavLink to='/home'>Submit</NavLink>}</button>

                </form>
            </div>
        )
    }

}

export default Signup