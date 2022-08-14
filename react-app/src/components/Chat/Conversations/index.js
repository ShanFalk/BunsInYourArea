import React, { useEffect } from "react";
import { getAllConversations } from "../../../store/conversation";
import { useDispatch, useSelector } from 'react-redux';
import Conversation from "./Conversation";
import '../Chat.css';
import '../../Profile/Profile.css';

function Conversations() {

    const dispatch = useDispatch();
    const conversationState = useSelector(state => state.conversations);
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        if (sessionUser.id) {
            dispatch(getAllConversations(sessionUser.id))
        }
    }, [dispatch, sessionUser])

    const conversationValues = Object.values(conversationState);
    const conversations = conversationValues.map((conversation) => {
        if (conversation?.creator_id === sessionUser?.id) {
            return conversation?.participant;
        } else {
            return conversation?.creator;
        }
    })

    return (
        <div>
            <div>
                {conversations.map((conversation) => {
                    return (
                        <Conversation key={conversation.id} conversation={conversation}/>
                    )
                })}
            </div>
        </div>
    )
}

export default Conversations;
