import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import LikesButton from './LikesButton';
import { getLikes } from '../../store/like';


function BunniesList() {
    const bunnyState = useSelector(state => state.bunnies)
    const sessionUser = useSelector(state => state.session.user)
    const likes = useSelector(state => state.likes)
    const bunnies = Object.values(bunnyState)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getLikes(sessionUser?.id))

    },[dispatch])

    return (
        <div>
            <h2>Bunnies near {sessionUser.city}, {sessionUser.state}</h2>
            {bunnies.map((bunny) => {
                return (
                    <div key={bunny.id} >
                        <Link to={`/bunnies/${bunny.id}`}>
                        <ul>
                            <li><img alt='a cute bunny' src={bunny.image_url}/></li>
                            <li>{bunny.name}</li>
                            <li>{bunny.breed}</li>
                        </ul>
                    </Link>
                    <LikesButton likes={likes} bunny={bunny} sessionUser={sessionUser}/>
                    </div>
                )
            })}
        </div>
    )
}

export default BunniesList
