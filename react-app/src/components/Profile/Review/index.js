import React, { useState } from "react"
import { Modal } from "../../../context/Modal";
import EditReview from "../EditReview";

function Review({review, sessionUser}) {

    const [showModal, setShowModal] = useState(false);

    const openModal = (e) => {
        e.stopPropagation();
        setShowModal(true);
    }

    return (
        <div className='review-container' key={review.id}>
            <p>{review.rating}</p>
            <p>{review.content}</p>
            <div className="reviewer-details">
                <img className='user-profile-pic-small' alt="the user" src={review.reviewer.image_url} />
                <p>{review.reviewer.username}</p>
            </div>
            {sessionUser.id === review.reviewer.id && (
                <button className='button pink' onClick={openModal}>Edit</button>
            )}
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditReview setShowModal={setShowModal} review={review} />
                </Modal>
            )}
        </div>
    )
}

export default Review;
