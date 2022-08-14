import React, { useEffect } from "react";
import { getAllConversations } from "../../../store/conversation";
import {useDispatch, useSelector} from 'react-redux';

function Conversation() {

    const dispatch = useDispatch();
    const conversationState = useSelector(state => state.conversations)
    console.log(conversationState);
    const sessionUser = useSelector(state => state.session.user)

    useEffect( () => {
        if (sessionUser.id) {
            dispatch(getAllConversations(sessionUser.id))
        }
    }, [dispatch, sessionUser])

    return (
        <div>
            <h1>Conversations</h1>
        </div>
    )
}

export default Conversation;
