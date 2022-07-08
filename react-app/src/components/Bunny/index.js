import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Bunny() {
    const { bunId } = useParams();
    const bunny = useSelector(state => state.bunnies[bunId])
    return (
        <div>
            <ul>
                <li><img alt='An adorable bunny' src={bunny.image_url}/></li>
                <li>{bunny?.name}</li>
                <li>{bunny?.biography}</li>
                <li>{bunny?.breed}</li>
                <li>{bunny?.sex}</li>
                <li>{bunny?.age}</li>
            </ul>
        </div>
    )
}

export default Bunny;
