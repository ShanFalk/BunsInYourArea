import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import { createConversation } from "../../../store/conversation";


function CreateConversation({sessionUser, user}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [errors, setErrors] = useState([]);
    console.log(errors)
    const onClick = async (e) => {
        e.preventDefault();

        const payload = {
            creator_id: sessionUser.id,
            participant_id: user.id
        }

        let createdConversation = await dispatch(createConversation(payload))
            .catch(async(data) => {
                console.log(data)
            if (data && data.errors) setErrors(data.errors);
        });

        if (createdConversation) {
            history.push('/messages')
        }
    }


    return (
            <div>
                {errors.length > 0 && (
                    <div>
                        <p>{errors}</p>
                    </div>
                )}
                <button disabled={errors.length > 0} onClick={onClick}>Start a Conversation</button>
            </div>
    )
}

export default CreateConversation;
