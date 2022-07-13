import React from 'react';
import '../../index.css'
import './Splash.css'

function Splash() {
    return (
        <div className='splash-container'>
            <div className='splash-info'>
                <h1 className='playfair'>
                    There's somebun for everyone
                </h1>
                <p>
                    Ready to meet your new BBF (Best Bunny Friend)?
                </p>
                <p>
                    Buns in your area finds adoptable rabbits local to you!
                </p>
            </div>
            <div>
            <iframe width="520" height="415"
                src="https://www.youtube.com/embed/FcwHMB2IhHQ?controls=0&autoplay=1&mute=1&loop=1&playlist=FcwHMB2IhHQ">
            </iframe>
            </div>
        </div>
    )
}

export default Splash;
