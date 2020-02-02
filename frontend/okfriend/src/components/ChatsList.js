import React from 'react';
import { ActionCable } from 'react-actioncable-provider';
import { API_ROOT } from '../constants';
// import NewChatForm from './NewChatForm';
import Chat from './Chat'
import MessagesArea from './MessagesArea';
import Cable from './Cable';

class ChatsList extends React.Component {
    state = {
        chats: [],
        activeChat: null
    };

    componentDidMount = () => {
        fetch(`${API_ROOT}/chats`)
            .then(res => res.json())
            .then(chats => this.setState({ chats }));
    };

    handleClick = id => {
        this.setState({ activeChat: id });
    };

    handleReceivedChat = response => {
        const { chat } = response;
        this.setState({
            chats: [...this.state.chats, chat]
        });
    };

    handleReceivedMessage = response => {
        const { message } = response;
        const chats = [...this.state.chats];
        const chat = chats.find(
            chat => chat.id === message.chat_id
        );
        chat.messages = [...chat.messages, message];
        this.setState({ chats });
    };

    render = () => {
        const { chats, activeChat } = this.state;
        return (
            <div className="chatsList">
                <ActionCable
                    channel={{ channel: 'ChatsChannel' }}
                    onReceived={this.handleReceivedChat}
                />
                {this.state.chats.length ? (
                    <Cable
                        chats={chats}
                        handleReceivedMessage={this.handleReceivedMessage}
                    />
                ) : null}
                <h2>Chats</h2>
                <ul>{mapChats(chats, this.handleClick)}</ul>
                <Chat />
                {activeChat ? (
                    <MessagesArea
                        chat={findActiveChat(
                            chats,
                            activeChat
                        )}
                    />
                ) : null}
            </div>
        );
    };
}

export default ChatsList;

// helpers

const findActiveChat = (chats, activeChat) => {
    return chats.find(
        chat => chat.id === activeChat
    );
};

const mapChats = (chats, handleClick) => {
    return chats.map(chat => {
        return (
            <li key={chat.id} onClick={() => handleClick(chat.id)}>
                Chat with {chat.user1_id.name} and {chat.user2_id.name}
            </li>
        );
    });
};