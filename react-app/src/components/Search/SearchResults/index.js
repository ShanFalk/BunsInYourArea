import React, { useEffect } from "react";
import {useLocation, Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { getLikes } from '../../../store/like';
import LikesButton from "../../Home/LikesButton";

function SearchResults() {
    let search = useLocation().search;
    const results = search.slice(7);
    const query = search.slice(7).toLowerCase().split(" ");
    const dispatch = useDispatch();

    const likes = useSelector(state => state.likes)
    const sessionUser = useSelector(state => state.session.user)
    const bunnyState = useSelector(state => state.bunnies);
    const bunnyValues = Object.values(bunnyState);

    const bunnies = bunnyValues.filter((bunny)=> {

        for (let term of query) {
            if (bunny.name.toLowerCase().includes(term) ||
                bunny.age.toString().includes(term) ||
                bunny.breed.toLowerCase().includes(term) ||
                bunny.biography.toLowerCase().includes(term)||
                bunny.sex.toLowerCase().includes(term) ||
                bunny.user.username.toLowerCase().includes(term)) {

                    return true;

                }
        }
    })

    useEffect(() => {
        if (sessionUser) {
            dispatch(getLikes(sessionUser?.id))
        }

    }, [dispatch, sessionUser])

    return (
        <div>
            <h1>Results for "{results}"</h1>
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

export default SearchResults;
