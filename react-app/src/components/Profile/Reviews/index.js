import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Modal } from '../../../context/Modal';
import EditReview from "../EditReview";

function Reviews() {
    const { userId } = useParams()
    const sessionUser = useSelector(state => state.session.user)
    const reviews = useSelector(state => state.reviews)
    const reviewValues = Object.values(reviews)

    const myReviews = reviewValues.filter((review) => {
        return review.reviewee_id === parseInt(userId, 10)
    })

    const [showModal, setShowModal] = useState(false);

    const openModal = (e) => {
        e.stopPropagation();
        setShowModal(true);
    }

    return (
        <div>
            <h2 className="playfair">Reviews</h2>
            {myReviews.map((review) => {
                return (
                    <div key={review.id}>
                        <ul>
                            <li>{review.rating}</li>
                            <li>{review.content}</li>
                            <div>
                                <img alt="the user" src={review.reviewer.image_url} />
                                <li>{review.reviewer.username}</li>
                            </div>
                            {sessionUser.id === review.reviewer.id && (
                            <button onClick={openModal}>Edit</button>
                            )}
                        </ul>
                        {showModal && (
                            <Modal onClose={() => setShowModal(false)}>
                                <EditReview setShowModal={setShowModal} review={review}/>
                            </Modal>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

export default Reviews;
