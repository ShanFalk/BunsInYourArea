import React, { useEffect } from "react";
import { getAllConversations, clearConversations } from "../../../store/conversation";
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
        return () => {
            dispatch(clearConversations())
        }
    }, [dispatch, sessionUser])

    const conversationValues = Object.values(conversationState);

    const conversations = conversationValues.map((conversation) => {
        if (conversation?.creator_id === sessionUser?.id) {
            let participant = {};
            participant[conversation.id] = conversation?.participant;
            return participant;
        } else {
            let participant = {};
            participant[conversation.id] = conversation?.creator;
            return participant;
        }
    })
    return (
        <div>
            <div>
                {conversations.map((conversation) => {
                    return (
                        <Conversation key={parseInt(Object.keys(conversation)[0])} conversation={conversation}/>
                    )
                })}
            </div>
        </div>
    )
}

export default Conversations;
