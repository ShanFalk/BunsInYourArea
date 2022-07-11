import React, {useState} from "react";

function LikesButton() {

    const [liked, setLiked] = useState(false)

    const onClick = () => {
        setLiked(!liked)


    }

    return (
        <button onClick={onClick} className={liked ? "selected" : ""}><i class="fa-regular fa-heart"></i></button>
    )
}

export default LikesButton;
