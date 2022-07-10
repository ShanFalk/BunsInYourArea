import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import AddBunny from './AddBun';
import Reviews from './Reviews';
import ReviewForm from './AddReview';

function Profile() {
    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
    }

    return (
        <div>
            <button onClick={openModal}>Add a Bunny</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <AddBunny setShowModal={setShowModal}/>
                </Modal>
            )}
            <ReviewForm />
            <Reviews />
        </div>
    )
}

export default Profile;
