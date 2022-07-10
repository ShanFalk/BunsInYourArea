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
            .catch((async(res) => {
                const data = await res.json();
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
        <div>
            <h2>Edit Review</h2>
            <form onSubmit={onSubmit}>
            {errors.length > 0 && <ul className='errors'>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>}
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
                <button onClick={handleDelete}>Delete</button>
        </div>
    )
}

export default EditReview;
