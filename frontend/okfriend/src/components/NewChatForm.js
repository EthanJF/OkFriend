import React from 'react';
import { API_ROOT, HEADERS } from '../constants';

class NewChatForm extends React.Component {
    state = {
        user1_id: null,
        user2_id: null
    };

    handleChange = e => {
        this.setState({ title: e.target.value });
    };

    handleSubmit = e => {
        e.preventDefault()
        fetch(`${API_ROOT}/chats`, {
            method: 'POST',
            headers: HEADERS,
            body: JSON.stringify(this.state)
        });
        this.setState({ title: '' });
    };

    render = () => {
        return (
            <div className="newChatForm">
                <form onSubmit={this.handleSubmit}>
                    <label>New Chat:</label>
                    <br />
                    <input
                        type="text"
                        value={this.state.title}
                        onChange={this.handleChange}
                    />
                    <input type="submit" />
                </form>
            </div>
        );
    };
}

export default NewChatForm;