import React, { useEffect, useState } from 'react';
import { Modal } from '../../context/Modal';
import AddBunny from './AddBun';
import Reviews from './Reviews';
import ReviewForm from './AddReview';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUser } from '../../store/user';
import LikesList from './Likes';
import './Profile.css'

function Profile() {
    const [showModal, setShowModal] = useState(false);
    const sessionUser = useSelector(state => state.session.user);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const { userId } = useParams()
    const id = parseInt(userId)

    useEffect(() => {
        dispatch(getUser(id))
    }, [id])

    const openModal = (e) => {
        e.preventDefault();
        setShowModal(true);
    }

    return (
        <div className='profile'>
            <div className='user-profile-pic-container'>
                <img className='user-profile-pic' src={user?.image_url} />
                <h1>{user?.username}</h1>
            </div>
            <div className='user-details'>
                <p>{user?.city}, {user?.state}</p>
                <p>{user?.biography}</p>
            </div>
            {sessionUser?.id === parseInt(userId) && (
                <>
                    <button className='button blue add-bun' onClick={openModal}><i class="fa-solid fa-plus"></i>Add a Bunny</button>
                    <LikesList sessionUser={sessionUser} />
                </>
            )}
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <AddBunny setShowModal={setShowModal} />
                </Modal>
            )}
            {sessionUser?.id && sessionUser?.id !== parseInt(userId) && (
                <ReviewForm />
            )}
            <Reviews />
        </div>
    )
}

export default Profile;
