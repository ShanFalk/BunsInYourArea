import React, { useEffect, useState } from 'react';
import { Modal } from '../../context/Modal';
import AddBunny from './AddBun';
import Reviews from './Reviews';
import ReviewForm from './AddReview';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUser } from '../../store/user';
import LikesList from './Likes';
import { clearUser } from '../../store/user';
import './Profile.css'

function Profile() {
    const [showModal, setShowModal] = useState(false);
    const sessionUser = useSelector(state => state.session.user);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const { userId } = useParams()
    const id = parseInt(userId)

    useEffect(() => {
        //on mount
        dispatch(getUser(id));
        //on unmount
        return () => {
            dispatch(clearUser());
        }
    }, [id])

    const openModal = (e) => {
        e.preventDefault();
        setShowModal(true);
    }

    return (
        <div className='profile'>
            <div className='user-profile-pic-container'>
                <img className='user-profile-pic' src={user?.image_url} alt='the user' />
                <h1>{user?.username}</h1>
            </div>
            <div className='user-details'>
                <p>{user?.city}, {user?.state}</p>
                <p>{user?.biography}</p>
            </div>
            {sessionUser?.id === parseInt(userId) && (
                <>
                    <button className='button blue add-bun' onClick={openModal}><i className="fa-solid fa-plus"></i>Add a Bunny</button>
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
            <Reviews username={user?.username}/>
        </div>
    )
}

export default Profile;
