import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {useHistory} from "react-router-dom";

function Conversation({ conversation }) {

    const conversationId = parseInt(Object.keys(conversation)[0]);
    const participant = conversation[conversationId];
    const dispatch = useDispatch();
    const history = useHistory();

    const onClick = async (e) => {
        e.preventDefault();

        if(conversationId) {
           history.push(`/conversations/${conversationId}`)
        }


    }
    return (
        <div key={conversationId} className="convo-container cursor" onClick={onClick}>
            <div>
                <img className="chat-profile-pic" src={participant.image_url} alt="user" />
            </div>
            <p>{participant.username}</p>
        </div>
    )
}

export default Conversation;
