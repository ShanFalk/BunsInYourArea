import { Link } from 'react-router-dom';
import './Footer.css';
import '../../styles/display.css'

function Footer() {
    return (
        <div className='footer'>
            <div className='footer-main'>
                <div className='about'>
                    <p className='playfair'>About</p>
                    <p><Link to='/about' className='no-decor nav-link-footer'>Buns In Your Area</Link></p>
                    <p><a href='http://linkedin.com/in/shannon-falk-16097a83' target='_blank' rel='noreferrer' className='no-decor nav-link-footer'><i className="fa-brands fa-linkedin"></i> LinkedIn</a></p>
                    <p><a href='https://github.com/ShanFalk' target='_blank' rel='noreferrer' className='no-decor nav-link-footer'><i className="fa-brands fa-github"></i> Github</a></p>
                </div>
                <div className='resources'>
                    <p className='playfair'>Rabbit Resources</p>
                    <p><a href='https://rabbit.org/' target='_blank' rel='noreferrer' className='no-decor nav-link-footer'>House Rabbit Society</a></p>
                    <p><a href='https://bunnylady.com/' target='_blank' rel='noreferrer' className='no-decor nav-link-footer'>The Bunny Lady</a></p>
                    <p><a href='https://shop.smallpetselect.com/' target='_blank' rel='noreferrer' className='no-decor nav-link-footer'>Small Pet Select</a></p>
                </div>
            </div>
        </div>
    )
}

export default Footer;
