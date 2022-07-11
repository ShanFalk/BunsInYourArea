import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { like, unlike } from '../../../store/like';
import './LikeButton.css'

function LikesButton({ bunny, sessionUser, likes }) {
    let isLiked = false;
    if (likes[bunny.id]) isLiked = true;

    const [liked, setLiked] = useState(isLiked)
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch()



    const onClick = async () => {

        const payload = {
            user_id: sessionUser?.id,
            bunny_id: bunny?.id
        }

        if (!isLiked) {
            await dispatch(like(payload))
                .catch((async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                }));
                setLiked(true)
        }
        else {
            await dispatch(unlike(likes[bunny?.id]?.id))
                .catch((async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                }));
                setLiked(false)
        }

    }

    return (
        <button onClick={onClick} className={isLiked ? "selected" : ""}><i className="fa-solid fa-heart"></i></button>
    )
}

export default LikesButton;
