import { io } from 'socket.io-client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../store/users';
import './Chat.css';

//socket variable
let socket;

const Chat = () => {
    //use state to store all messages so we can display them
    const [messages, setMessages] = useState([]);
    //control form input
    const [chatInput, setChatInput] = useState("");
    //use state to store the recipient information
    const [recipient, setRecipient] = useState("");
    console.log(recipient);
    //retrieve user info from redux store
    const sessionUser = useSelector(state => state.session.user);

    const dispatch = useDispatch();

    const users = useSelector(state => state.users.users)

    useEffect(() => {
        //create websocket/connect
        socket = io();

        socket.on("connect", () => {
            socket.emit("join", { username: sessionUser.username })
        })

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

    useEffect(async () => {
        await dispatch(getAllUsers())
    }, [dispatch])

    const updateChatInput = (e) => {
        setChatInput(e.target.value)
    }

    const sendChat = (e) => {
        e.preventDefault()
        //emit message, first arg must match backend, second arg is the data we want to send
        socket.emit("chat", { user: sessionUser.username, msg: chatInput, recipient });
        //clear the input field after the message is sent
        setChatInput("");
    }

    if (users === undefined) {
        return null;
    }

    return (
        <div className='chat-grid'>
            {/* user list part of grid */}
            <div className='chat-grid-left'>
                {users.map((user, idx) => (
                    <div key={idx} onClick={() => setRecipient(user.username)}>
                        {user.username}
                    </div>
                ))}
            </div>
            {/* chat part of grid */}
            <div className='chat-grid-right'>
                <div>
                    {messages.map((message, idx) => (
                        <div key={idx}>{`${message.user}: ${message.msg}`}</div>
                    ))}
                </div>
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

        </div>
    )
};

export default Chat;
