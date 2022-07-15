import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import EditBunny from './EditBun';
import './Bunny.css';
import '../../styles/display.css'

function Bunny() {
    const { bunId } = useParams();
    const bunny = useSelector(state => state.bunnies[bunId]);
    const sessionUser = useSelector(state => state.session.user);
    const [isEditing, setIsEditing] = useState(false);

    const onEditEnd = () => {
        setIsEditing(false);
    }

    return (
        <div>
            {!isEditing && (
                <>
                    <h1>{bunny?.name}</h1>
                    <div className='two-col-grid'>
                        <div className='bunny-profile-pic'>
                            <img className='bunny-pic' alt='An adorable bunny' src={bunny?.image_url} />
                        </div>
                        <div className='bunny-details'>
                            <ul className='thumbnail-details'>
                                <h3>Organization: <Link className='no-decor org-name' to={`/profile/${bunny?.user.id}`}>{bunny?.user.username}</Link></h3>
                                <li>Breed: {bunny?.breed}</li>
                                <li>Sex: {bunny?.sex}</li>
                                <li>Age: {bunny?.age} years</li>
                                <div>
                                <p>{bunny?.biography}</p>
                                </div>
                                {sessionUser?.id === bunny?.user_id && <button className="button pink" onClick={() => setIsEditing(true)}>Edit</button>}
                            </ul>
                        </div>
                    </div>
                </>
            )}
            {isEditing && (
                <EditBunny bunny={bunny} endEdit={onEditEnd} />
            )}
        </div>
    )
}

export default Bunny;
