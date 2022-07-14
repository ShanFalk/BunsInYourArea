import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import AddBunny from './AddBun';
import Reviews from './Reviews';
import ReviewForm from './AddReview';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './Profile.css'

function Profile() {
    const [showModal, setShowModal] = useState(false);
    const sessionUser = useSelector(state => state.session.user);
    const bunnyState = useSelector(state => state.bunnies);
    const { userId } = useParams()

    const bunnies = Object.values(bunnyState)
    const bunny = bunnies.find((bunny) => bunny.user.id === parseInt(userId))

    const openModal = (e) => {
        e.preventDefault();
        setShowModal(true);
    }

    return (
        <div className='profile'>
            <div className='user-profile-pic-container'>
                <img className='user-profile-pic' src={bunny?.user.image_url}/>
                <h1>{bunny?.user.username}</h1>
            </div>
            <div className='user-details'>
                <p>{bunny?.user.city}, {bunny?.user.state}</p>
                <p>{bunny?.user.biography}</p>
            </div>
            {sessionUser?.id === parseInt(userId) && (
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
