import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../index.css'
import '../../styles/display.css'

function Splash() {

    return (
        <div className={`two-col-grid`}>
            <div className={'two-col-info fade-in-text'}>
                <h1 className='playfair'>
                    There's somebun for everyone
                </h1>
                <p>
                    Ready to meet your new BBF (Best Bunny Friend)?
                </p>
                <p>
                    Buns In Your Area finds adoptable rabbits local to you!
                </p>
            </div>
            <div className={'splash-video fade-in-image'}>
            <iframe title='bunny-behaviour' width="520" height="415"
                src="https://www.youtube.com/embed/FcwHMB2IhHQ?controls=0&autoplay=1&mute=1&loop=1&playlist=FcwHMB2IhHQ">
            </iframe>
            </div>
        </div>
    )
}

export default Splash;
