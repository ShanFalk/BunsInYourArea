import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Review from "../Review";

function Reviews() {
    const { userId } = useParams()
    const sessionUser = useSelector(state => state.session.user)
    const reviews = useSelector(state => state.reviews)
    const reviewValues = Object.values(reviews)

    const myReviews = reviewValues.filter((review) => {
        return review.reviewee_id === parseInt(userId, 10)
    })

    return (
        <div>
            <h2 className="playfair reviews-heading">Reviews</h2>
            {myReviews.map((review) => {
                return (
                    <Review review={review} sessionUser={sessionUser} />
                )
            })}
        </div>
    )
}

export default Reviews;
