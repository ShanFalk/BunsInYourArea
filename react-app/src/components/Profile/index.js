import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import AddBunny from './AddBun';
import Reviews from './Reviews';
import ReviewForm from './AddReview';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function Profile() {
    const [showModal, setShowModal] = useState(false);
    const sessionUser = useSelector(state => state.session.user);
    const { userId } = useParams()

    const openModal = () => {
        setShowModal(true);
    }

    return (
        <div>
            {sessionUser.id === parseInt(userId) && (
            <button onClick={openModal}>Add a Bunny</button>
            )}
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <AddBunny setShowModal={setShowModal}/>
                </Modal>
            )}
            {sessionUser.id !== parseInt(userId) && (
                <ReviewForm />
            )}
            <Reviews />
        </div>
    )
}

export default Profile;
