import Image from 'next/image';
import { faMapMarkerAlt, faPhoneAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faInstagram, faYoutube, faLinkedin } from '@fortawesome/free-brands-svg-icons';


export default function Footer() {
    return (            
        <div className="w-full h-full font-sub-heading" style={{ position: 'relative' }}>
            <Image className="bg-screen" src={require('../images/footer_dark_bg.png')} alt="Header" objectFit="cover" layout="fill" quality={100} />
            <div className="grid grid-rows-1 md:grid-rows-1 grid-cols-1 md:grid-cols-8">
                <div className="col-start-2 col-end-4 py-12 px-4">
                        <div className="text-theme-gold text-3xl py-1">Rotaract District Organisation</div>
                        <div className="text-theme-white text-2xl py-1 italic">Rotary International District 3291</div>
                        <br />
                        <div className="text-theme-white text-2xl py-1 grid grid-rows-1 grid-cols-1">
                            <div className="text-3xl text-theme-gold py-1"><FontAwesomeIcon className="mr-2" icon={faPhoneAlt} />Phone</div>
                            <div className="">
                                <a href="tel:+919073233810">+91-9073233810</a>
                                <br />PP Rtr. Tanmoy Banik
                                <br />Principal Secretary to DRR
                            </div>
                        </div>
                        <br />
                        <div className="text-theme-white text-2xl py-1 grid grid-rows-1 grid-cols-1">
                            <div className="text-3xl text-theme-gold py-1"><FontAwesomeIcon className="mr-2" icon={faMapMarkerAlt} />Address</div>
                            <div className="">
                                10/1B, Indra Roy Road<br />PO & PS Bhowanipore<br />
                                Kolkata - 700025
                            </div>
                        </div>
                </div>
                <div className="col-start-4 col-end-6 py-12 px-4">
                        <div className="text-theme-white text-3xl py-1">Explore</div>
                        <div className="text-theme-white text-2xl py-1">About Us</div>
                        <div className="text-theme-white text-2xl py-1">Rotary & Rotaract</div>
                        <div className="text-theme-white text-2xl py-1">DRR Theme</div>
                        <div className="text-theme-white text-2xl py-1">Annual Plan</div>
                        <div className="text-theme-white text-2xl py-1">District Council</div>
                        <div className="text-theme-white text-2xl py-1">House of Presidents</div>
                        <div className="text-theme-white text-2xl py-1">Clubs</div>
                        <div className="text-theme-white text-2xl py-1">Downloads</div>
                        <div className="text-theme-white text-2xl py-1">Leaderboard</div>
                </div>
                <div className="col-start-6 col-end-7 py-12 px-4">
                        <div className="text-theme-white text-3xl py-1">Subscribe</div>
                        <form>
                            <div className="text-theme-white text-2xl py-1 text-md grid grid-rows-1 grid-flow-col">
                                <div>
                                    <input className="p-2 rounded-l-md" placeholder="Enter your email" id="name" type="email" autoComplete="name" required />
                                </div>
                                <div className="bg-theme-gold p-2 rounded-r-md">
                                    Register
                                </div>
                            </div>
                        </form>
                        <br />
                        <div className="text-theme-white text-2xl py-1 text-md grid grid-rows-1 grid-cols-4 text-center">
                            <div className="bg-theme-white text-theme-pink mr-1 p-2"><FontAwesomeIcon icon={faFacebookF} /></div>
                            <div className="bg-theme-white text-theme-pink mx-1 p-2"><FontAwesomeIcon icon={faInstagram} /></div>
                            <div className="bg-theme-white text-theme-pink mx-1 p-2"><FontAwesomeIcon icon={faYoutube} /></div>
                            <div className="bg-theme-white text-theme-pink mx-1 p-2"><FontAwesomeIcon icon={faLinkedin} /></div>
                        </div>
                </div>
            </div>
        </div>
    );
}