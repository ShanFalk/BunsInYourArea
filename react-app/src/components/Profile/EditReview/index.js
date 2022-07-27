import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { updateReview, deleteReview } from "../../../store/review";

function EditReview({ review, setShowModal }) {
    const [rating, setRating] = useState(review.rating);
    const [content, setContent] = useState(review.content);
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();

    const updateRating = (e) => (setRating(e.target.value))
    const updateContent = (e) => (setContent(e.target.value))

    const onSubmit = async (e) => {
        e.preventDefault()
        const payload = {
            id: review.id,
            reviewer_id: review.reviewer_id,
            reviewee_id: review.reviewee_id,
            rating,
            content,
        }

        const createdReview = await dispatch(updateReview(payload))
            .catch((async(data) => {
                if (data && data.errors) setErrors(data.errors);
            }));

        if (createdReview) {
            setShowModal(false)
        }
    }

    const handleDelete = async () => {
        await dispatch(deleteReview(review.id))
        .then(
            setShowModal(false)
        )
    }

    return (
        <div className="edit-container">
            <h2 className="playfair">Edit Review</h2>
            <form className='form modal-form' onSubmit={onSubmit}>
            {errors.length > 0 && <ul className='no-list-style no-padding'>
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
            <div className="delete">
                <button className='button warning' onClick={handleDelete}>Delete</button>
            </div>
        </div>
    )
}

export default EditReview;
