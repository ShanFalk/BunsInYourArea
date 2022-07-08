import React from 'react';
import { useSelector } from 'react-redux';

function BunniesList() {
    const bunnyState = useSelector(state => state.bunnies)
    const sessionUser = useSelector(state => state.session.user)
    const bunnies = Object.values(bunnyState)

    return (
        <div>
            <h2>Bunnies near {sessionUser.city}, {sessionUser.state}</h2>
            {bunnies.map((bunny) => {
                return (
                    <div key={bunny.id}>
                        <ul>
                            <li><img alt='a cute bunny' src={bunny.image_url}/></li>
                            <li>{bunny.name}</li>
                            <li>{bunny.breed}</li>
                        </ul>
                    </div>
                )
            })}
        </div>
    )
}

export default BunniesList
