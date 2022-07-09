import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import AddBunny from './AddBunForm';
import Reviews from './Reviews';

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
            <Reviews />
        </div>
    )
}

export default Profile;
