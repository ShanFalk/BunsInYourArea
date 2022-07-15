import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { getLikes } from '../../../store/like'
import LikesButton from "../../Home/LikesButton"

function LikesList({ sessionUser }) {
    const dispatch = useDispatch()
    const likes = useSelector(state => state.likes)
    const userLikes = Object.keys(likes)
    const bunnies = useSelector(state => state.bunnies)

    const likedBunnies = userLikes.map((like => {
        return bunnies[like]
    }))

    useEffect(() => {
        dispatch(getLikes(sessionUser?.id))

    }, [dispatch])

    return (
        <div>
            <h2 className="playfair">Favorites</h2>
            <div className="bunnies-container">
                {likedBunnies.map((bunny) => {
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
                            <LikesButton likes={likes} bunny={bunny} sessionUser={sessionUser} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default LikesList;
