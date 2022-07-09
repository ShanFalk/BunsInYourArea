import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import EditBunny from './EditBunny';

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
            <div>
                <ul>
                    <li><img alt='An adorable bunny' src={bunny?.image_url}/></li>
                    <li>{bunny?.name}</li>
                    <li>{bunny?.biography}</li>
                    <li>{bunny?.breed}</li>
                    <li>{bunny?.sex}</li>
                    <li>{bunny?.age}</li>
                    {sessionUser.id === bunny?.user_id && <button onClick={() => setIsEditing(true)}>Edit</button>}
                </ul>
            </div>
            )}
            {isEditing && (
                <EditBunny bunny={bunny} endEdit={onEditEnd}/>
            )}
        </div>
    )
}

export default Bunny;
