import React from "react";
import { useDispatch } from "react-redux";
import { getAllMessages } from "../../../../store/message";

function Conversation({ conversation }) {

    const conversationId = parseInt(Object.keys(conversation)[0]);
    const participant = conversation[conversationId];
    const dispatch = useDispatch();

    const onClick = (e) => {
        e.preventDefault();

        if(conversationId) {
            dispatch(getAllMessages(conversationId))
        }


    }
    return (
        <div key={conversationId} className="convo-container" onClick={onClick}>
            <div>
                <img className="chat-profile-pic" src={participant.image_url} alt="user" />
            </div>
            <p>{participant.username}</p>
        </div>
    )
}

export default Conversation;
