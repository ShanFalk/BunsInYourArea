import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Review from "../Review";

function Reviews({ username }) {
    const { userId } = useParams()
    const sessionUser = useSelector(state => state.session.user)
    const reviews = useSelector(state => state.reviews)
    const reviewValues = Object.values(reviews)

    const myReviews = reviewValues.filter((review) => {
        return review.reviewee_id === parseInt(userId, 10)
    })

    const ratings = myReviews.map((review) => review?.rating)
    const sum = ratings.reduce((prevRating, currRating) => prevRating + currRating, 0)
    const average = Math.round(sum / myReviews.length) || 0

    return (
        <div className="reviews-div">
            <h2 className="playfair reviews-heading">What users are saying about {username} ({average} <i className="fa-solid fa-star"></i>)</h2>
            {myReviews.map((review) => {
                return (
                    <Review key={review.id} review={review} sessionUser={sessionUser} />
                )
            })}
        </div>
    )
}

export default Reviews;
