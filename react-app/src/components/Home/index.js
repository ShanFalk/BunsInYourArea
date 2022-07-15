import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import LikesButton from './LikesButton';
import { getLikes } from '../../store/like';
import './Home.css'
import '../../styles/display.css'


function BunniesList() {
    const bunnyState = useSelector(state => state.bunnies)
    const sessionUser = useSelector(state => state.session.user)
    const likes = useSelector(state => state.likes)
    const bunnies = Object.values(bunnyState)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getLikes(sessionUser?.id))

    }, [dispatch, sessionUser])

    //TO DO: ADD BACK IN AFTER ADDING SEARCH FEATURE
    // const localBunnies = bunnies.filter((bunny) => {
    //     return sessionUser.city === bunny.user.city && sessionUser.state === bunny.user.state;
    // })

    return (
        <div>
            {/* TO DO: ADD BACK IN AFTER ADDING SEARCH */}
            {/* <h1>Bunnies near {sessionUser.city}, {sessionUser.state}</h1> */}
            <h1>The Bunnies</h1>
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
        </div>
    )
}

export default BunniesList
