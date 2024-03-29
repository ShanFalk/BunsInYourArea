import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { io } from 'socket.io-client';
import { clearMessages, getAllMessages } from '../../../store/message';


//socket variable
let socket;

function Messages() {
    const messageState = useSelector(state => Object.values(state.messages));
    const sessionUser = useSelector(state => state.session.user);
    const [tempMessages, setTempMessages] = useState([]);
    const { conversationId } = useParams();
    const id = parseInt(conversationId);
    const dispatch = useDispatch();

    //control form input
    const [chatInput, setChatInput] = useState("");
    useEffect(() => {
        //on mount
        dispatch(getAllMessages(id));
        setTempMessages([]);

    }, [id])

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
            setTempMessages(messages => [...messages, chat])
        });
        //when component unmounts, leave the room and disconnect
        return () => {
            dispatch(clearMessages())
            socket.emit("leave", { conversation: conversationId })
            socket.disconnect()
        }
    }, [id]);

    const updateChatInput = (e) => {
        setChatInput(e.target.value)
    }

    const sendChat = (e) => {
        e.preventDefault()
        //emit message, first arg must match backend, second arg is the data we want to send
        socket.emit("chat", { sender: { id: sessionUser.id, username: sessionUser.username, image_url: sessionUser.image_url }, content: chatInput, conversation: conversationId });
        //clear the input field after the message is sent
        setChatInput("");
    }

    return (
        <div>
            <div className='scroll-div'>
            {[...messageState, ...tempMessages].map((message, idx) => {
                return (
                    <div key={idx} className="convo-container">
                        <div>
                            <img src={message.sender.image_url} alt="user" className="chat-profile-pic" />
                        </div>
                        <div className="msg-container">
                            <p className="username">{message.sender.username}</p>
                            <p className="message">{message.content}</p>
                        </div>
                    </div>
                )
            })}
            </div>
            <div className="chat-div">
                <form onSubmit={sendChat}>
                    <input
                        value={chatInput}
                        onChange={updateChatInput}
                        className="hidden-input"
                        required
                        maxLength="1000"
                        type="text"
                    />
                    <button className="button blue plane" type="submit"><i className="fa-solid fa-paper-plane"></i></button>
                </form>
            </div>
            <p className="max-length">*maximum message length 1000 characters</p>
        </div>
    )
}

export default Messages;
