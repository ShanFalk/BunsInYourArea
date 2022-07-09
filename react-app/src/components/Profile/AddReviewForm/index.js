import React, { useState } from "react";
import {useSelector, useDispatch} from "react-redux";
import { useParams } from "react-router-dom";
import { createReview } from "../../../store/review";

function ReviewForm() {
    const [rating, setRating] = useState('');
    const [content, setContent] = useState('');
    const [errors, setErrors] = useState([]);

    const updateRating = (e) => (setRating(e.target.value))
    const updateContent = (e) => (setContent(e.target.value))

    const sessionUser = useSelector(state => state.session.user)
    const { userId } = useParams()
    const revieweeId = parseInt(userId)
    const dispatch = useDispatch()

    const onSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            reviewer_id: sessionUser.id,
            reviewee_id: revieweeId,
            rating,
            content,
        }

        const createdReview = await dispatch(createReview(payload))
            .catch((async(res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            }));


        // if (createdReview) {
        //     history.push
        // }

    }

    return (
        <div>
            <h2>Leave a Review</h2>
            <form onSubmit={onSubmit}>
                <label htmlFor="rating">Rating</label>
                <input
                    type="number"
                    name="rating"
                    max="5"
                    min="1"
                    value={rating}
                    required
                    onChange={updateRating}
                />
                <label htmlFor="review">Review</label>
                <textarea
                    name="review"
                    value={content}
                    onChange={updateContent}
                    required
                />
                <button>Submit</button>
            </form>
        </div>
    )
}

export default ReviewForm;
