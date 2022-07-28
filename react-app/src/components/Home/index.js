import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import LikesButton from './LikesButton';
import { getLikes } from '../../store/like';
import './Home.css'
import '../../styles/display.css'
import tumbleweed from './tumbleweed.gif';


function BunniesList() {
    const bunnyState = useSelector(state => state.bunnies)
    const sessionUser = useSelector(state => state.session.user)
    const likes = useSelector(state => state.likes)
    const bunnyValues = Object.values(bunnyState)
    const dispatch = useDispatch()

    useEffect(() => {
        if (sessionUser) {
            dispatch(getLikes(sessionUser?.id))
        }

    }, [dispatch, sessionUser])


    const bunnies = bunnyValues.filter((bunny) => {
        return sessionUser?.city === bunny?.user.city && sessionUser?.state === bunny?.user.state;
    })


    return (
        <div>
            <h1>Bunnies near {sessionUser?.city}, {sessionUser?.state}</h1>
            {bunnies.length > 0 && (
                <div className='bunnies-container'>
                    {bunnies.map((bunny) => {
                        return (
                            <div key={bunny.id} className='thumbnail' >
                                <Link className='no-decor' to={`/bunnies/${bunny.id}`}>
                                    <img className='thumbnail-image' alt='a cute bunny' src={bunny.image_url} />

                                    <ul className='thumbnail-details'>
                                        <li>Name: {bunny.name}</li>
                                        <li>Breed: {bunny.breed}</li>
                                        {bunny.is_adoptable && (
                                            <li className='adopt'>adopt me!</li>
                                        )}
                                    </ul>
                                </Link>
                                {sessionUser && (
                                    <LikesButton likes={likes} bunny={bunny} sessionUser={sessionUser} />
                                )}
                            </div>
                        )
                    })}
                </div>
            )}
            {!bunnies.length && (
                <div className='simple-center-div'>
                    <img src={tumbleweed} alt="a tumbleweed" />
                    <h3>It's kinda empty in here...</h3>
                    <p>Search around to find bunnies!</p>
                </div>
            )}
        </div>
    )
}

export default BunniesList
