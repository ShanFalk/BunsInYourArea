import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import AddBunny from './AddBunForm';

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
        </div>
    )
}

export default Profile;
