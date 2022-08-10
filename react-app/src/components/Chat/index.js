import { io } from 'socket.io-client';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

//socket variable
let socket;

const Chat = () => {
    //use state to store all messages so we can display them
    const [messages, setMessages] = useState([]);
    //control form input
    const [chatInput, setChatInput] = useState("");
    //retrieve user info from redux store
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        //create websocket/connect
        socket = io();

        //listen for chat events
        socket.on("chat", (chat) => {
            //when we receive a chat, add it into our messages array in state
            setMessages(messages => [...messages, chat])
        });
        //when component unmounts, disconnect
        return (() => {
            socket.disconnect()
        })
    }, []);

    const sendChat = (e) => {
        e.preventDefault()
        //emit message, first arg must match backend, second arg is the data we want to send
        socket.emit("chat", {user: sessionUser.username, msg: chatInput });
        //clear the input field after the message is sent
        setChatInput("");
    }



    return (
        <div>
            <div>
                <form onSubmit={sendChat}>
                    <input
                        value ={chatInput}
                        onChange={setChatInput}
                    />
                    <button type="submit">Send</button>
                </form>
            </div>
            <div>
                {messages.map((message, idx) => (
                    <div key={idx}>{`${message.user}: ${message.msg}`}</div>
                ))}
            </div>

        </div>
    )
};

export default Chat;
