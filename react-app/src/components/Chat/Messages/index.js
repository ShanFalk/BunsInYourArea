import React from "react";
import {useSelector} from "react-redux";

function Messages() {
    const {isLoaded:isMessagesLoaded, ...messageState} = useSelector(state => state.messages)
    const messages = Object.values(messageState);

    if(!isMessagesLoaded) {
        return null;
    }

    return (
        <div>
            {messages.map((message) => {
                return (
                    <div key={message.id} className="convo-container">
                        <div>
                            <img src={message.sender.image_url} alt="user" className="chat-profile-pic"/>
                        </div>
                        <div className="msg-container">
                            <p className="username">{message.sender.username}</p>
                            <p className="message">{message.content}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Messages;
