import headshot from './shannon.jpeg'
import './About.css'

function AboutMe() {
    return (
        <div>
            <h2 className="playfair about-title">About Buns in your area</h2>
            <div className='about-grid'>
                <div className='about-pic'>
                    <img className='headshot' alt="A headshot of the website software engineer" src={headshot} />
                </div>
                <div className='about-text'>
                    <p>
                        Hi! I'm Shannon, an aspiring Software Engineer and lover of all things rabbit.
                    </p>
                    <p>
                        The idea for this project came about while on a walk with my significant other to look at wild rabbits.
                        I jokingly wished for an app that could tell you if there were rabbits around so you could find them more easily.
                        After beginning my Software Engineering journey at App Academy, I thought about this idea more and more.
                        Wouldn't it be great to help people find adoptable rabbits in the area more easily?
                        Something that can help them decide if a rabbit is the right pet for them?
                        Thus, Buns in your area was created! I hope visiting this website brings you as much joy as building it did for me.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default AboutMe;
