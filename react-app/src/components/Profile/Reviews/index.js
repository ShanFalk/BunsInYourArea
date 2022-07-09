import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function Reviews() {
    const { userId } = useParams()
    const reviews = useSelector(state => state.reviews)
    const reviewValues = Object.values(reviews)

    const myReviews = reviewValues.filter((review) => {
        return review.reviewee_id === parseInt(userId, 10)
    })
    return (
        <div>
            <h2>Reviews</h2>
            {myReviews.map((review) => {
                return (
                    <div key={review.id}>
                        <ul>
                        <li>{review.rating}</li>
                        <li>{review.content}</li>
                        <div>
                            <img alt="the user" src={review.reviewer.image_url}/>
                            <li>{review.reviewer.username}</li>
                        </div>
                        </ul>
                    </div>
                )
            })}
        </div>
    )
}

export default Reviews;
