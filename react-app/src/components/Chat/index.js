import React from 'react';
import Conversations from './Conversations';
import Messages from './Messages';
import './Chat.css';

const Chat = () => {

    return (
        <div className='chat-grid'>
            {/* user list part of grid */}
            <div className='chat-grid-left'>
                <h3>Direct Messages</h3>
                <Conversations />
            </div>
            {/* chat part of grid */}
            <div className='chat-grid-right'>
                <div>
                    <Messages />
                </div>
            </div>
        </div>
    )
};

export default Chat;
