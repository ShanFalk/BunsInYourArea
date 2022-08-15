import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import { io } from 'socket.io-client';
import {clearMessages} from '../../../store/message';

//socket variable
let socket;

function Messages() {
    const {isLoaded:isMessagesLoaded, ...messageState} = useSelector(state => state.messages)
    const sessionUser = useSelector(state => state.session.user);
    const [messages, setMessages] = useState([]);
    const dispatch = useDispatch();

    //control form input
    const [chatInput, setChatInput] = useState("");

    const conversationId = messages[0]?.conversation_id;

    useEffect(() => {
        if(isMessagesLoaded) {
            setMessages(Object.values(messageState))
        }
    }, [isMessagesLoaded])

    useEffect(() => {
        //create websocket/connect
        socket = io();

        //join the room after component mounts
        socket.on("connect", () => {
            socket.emit("join", { conversation: conversationId })
        })
        //listen for chat events
        socket.on("chat", (chat) => {
            //when we receive a chat, add it into our messages array in state
            setMessages(messages => [...messages, chat])
            console.log(chat);
        });
        //when component unmounts, leave the room and disconnect
        return () => {
            dispatch(clearMessages())
            socket.emit("leave", {conversation: conversationId })
            socket.disconnect()
        }
    }, []);

    const updateChatInput = (e) => {
        setChatInput(e.target.value)
    }

    const sendChat = (e) => {
        e.preventDefault()
        //emit message, first arg must match backend, second arg is the data we want to send
        socket.emit("chat", { sender: {id: sessionUser.id, username: sessionUser.username, image_url: sessionUser.image_url}, content: chatInput, conversation: conversationId });
        //clear the input field after the message is sent
        setChatInput("");
    }

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
            <div>
                    <form onSubmit={sendChat}>
                        <input
                            value ={chatInput}
                            onChange={updateChatInput}
                        />
                        <button type="submit">Send</button>
                    </form>
                </div>
        </div>
    )
}

export default Messages;
