import React, {useEffect, useState} from "react";
import { useSelector } from 'react-redux';
import './LikeButton.css'

function LikesButton({ bunny, sessionUser }) {

    const likes = useSelector(state => state.likes)
    const [liked, setLiked] = useState(false)
    console.log(liked)
    console.log(likes[bunny?.id])

    useEffect(() => {
        if (likes[bunny?.id]) setLiked(true);
    }, [likes])

    const onClick = async () => {
        setLiked(!liked)

        // const payload = {
        //     user_id: sessionUser.id,
        //     bunny_id: bunny.id
        // }

        // if (liked) {
        //     await dispatch(like(payload))
        //         .catch((async(res) => {
        //             const data = await res.json();
        //             if (data && data.errors) setErrors(data.errors);
        //         }));
        // } else {
        //     await dispatch(unlike())
        // }

    }

    return (
        <button onClick={onClick} className={liked ? "selected" : ""}><i className="fa-solid fa-heart"></i></button>
    )
}

export default LikesButton;
