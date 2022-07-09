import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function BunniesList() {
    const bunnyState = useSelector(state => state.bunnies)
    const sessionUser = useSelector(state => state.session.user)
    const bunnies = Object.values(bunnyState)
    bunnies.map((bunny) => console.log(bunny.image_url))

    return (
        <div>
            <h2>Bunnies near {sessionUser.city}, {sessionUser.state}</h2>
            {bunnies.map((bunny) => {
                return (
                    <Link key={bunny.id} to={`/bunnies/${bunny.id}`}>
                    <div >
                        <ul>
                            <li><img alt='a cute bunny' src={bunny.image_url}/></li>
                            <li>{bunny.name}</li>
                            <li>{bunny.breed}</li>
                        </ul>
                    </div>
                    </Link>
                )
            })}
        </div>
    )
}

export default BunniesList
