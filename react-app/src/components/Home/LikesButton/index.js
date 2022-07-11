import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { like, unlike } from '../../../store/like';
import './LikeButton.css'

function LikesButton({ bunny, sessionUser, likes }) {
    let isLiked = false;
    if (likes[bunny.id]) isLiked = true;

    const [liked, setLiked] = useState(isLiked)
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch()



    const onClick = async () => {
        // console.log(isLiked)
        // setLiked(!isLiked)
        // console.log(isLiked)

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
        <button onClick={onClick} className={liked ? "selected" : ""}><i className="fa-solid fa-heart"></i></button>
    )
}

export default LikesButton;
