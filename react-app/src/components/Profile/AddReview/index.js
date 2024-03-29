import React, { useState } from "react";
import {useSelector, useDispatch} from "react-redux";
import { useParams } from "react-router-dom";
import { createReview } from "../../../store/review";
import '../Profile.css'

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
            .catch((async(data) => {
                if (data && data.errors) setErrors(data.errors);
            }));

        if (createdReview) {
            setRating('')
            setContent('')
            setErrors([])
        }

    }

    return (
        <div className="review-form-container">
            <h2 className="playfair">Tell us about your adoption experience!</h2>
            <form id='review-form' className="form" onSubmit={onSubmit}>
            {errors.length > 0 && <ul className="no-list-style no-padding">
                    {errors.map((error, idx) => <li className='required' key={idx}>{error}</li>)}
                </ul>}
                <label htmlFor="rating">Rating<span className='required'>*</span></label>
                <input
                    type="number"
                    name="rating"
                    max="5"
                    min="1"
                    value={rating}
                    required
                    onChange={updateRating}
                />
                <label htmlFor="review">Review<span className='required'>*</span></label>
                <textarea
                    name="review"
                    value={content}
                    onChange={updateContent}
                    required
                />
                <button className="button blue">Submit</button>
            </form>
        </div>
    )
}

export default ReviewForm;
