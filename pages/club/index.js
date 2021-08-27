import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import NavBar from '../../components/Navbar';
import { faCalendarAlt, faCertificate } from '@fortawesome/free-solid-svg-icons'
import { faInstagram, faYoutube, faLinkedin, faFacebookSquare, faInstagramSquare, faTwitterSquare, faLinkedinIn, faYoutubeSquare } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import ClubsData from '../../components/data/club_details.json';
import Footer from '../../components/Footer';

import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";


export default function Clubs() {    
    const [zone, setZone] = useState(1);
    //Council.map((c) => console.log(c.photo));

    const handleChange = (event) => {
        console.log(event.target.value);
        setZone(event.target.value);
    }

    return (
        <div className="w-full">

            <NavBar />
            <div className="w-full h-full bg-theme-blue border-b-4 border-theme-gold" style={{ position: 'relative' }}>
                {/*<Image className="bg-screen" src={require('../../images/clubs_cover/Central Calcutta.jpg')} alt="Header" objectFit="cover" layout="fill" quality={100} />*/}
                <div className="grid grid-rows-1 grid-cols-12">
                    <div className="col-start-2 col-end-7 grid grid-flow-row grid-cols-1 place-content-center">
                        <div className="text-3xl text-theme-gold bg-theme-black font-text max-w-max p-4 font-bold rounded-t-lg">
                            Rotaract Club of
                        </div>
                        <div className="text-5xl text-theme-white bg-theme-pink p-4 font-sub-heading">
                            Government College of Engineering and Leather Technology
                        </div>
                        <div className="grid grid-rows-1 grid-cols-4 text-xl text-theme-blue bg-theme-white font-sub-heading rounded-b-lg">
                            <div className="col-span-2 grid grid-flow-col">
                                <div className="p-4">
                                    <FontAwesomeIcon icon={faCalendarAlt} /><span className="ml-4">24-Sep-2020</span>
                                </div>
                                <div className="text-center p-4">
                                    <FontAwesomeIcon icon={faCertificate} /><span className="ml-4">325413</span>
                                </div>
                            </div>
                            <div className="col-span-2 grid grid-flow-col justify-items-center">
                                <a href='https://facebook.com' rel="noreferrer" target="_blank"><div className="hvr-fade rounded p-4"><FontAwesomeIcon icon={faFacebookSquare} /></div></a>
                                <a href='https://facebook.com' rel="noreferrer" target="_blank"><div className="hvr-fade rounded p-4"><FontAwesomeIcon icon={faInstagram} /></div></a>
                                <a href='https://facebook.com' rel="noreferrer" target="_blank"><div className="hvr-fade rounded p-4"><FontAwesomeIcon icon={faTwitterSquare} /></div></a>
                                <a href='https://facebook.com' rel="noreferrer" target="_blank"><div className="hvr-fade rounded p-4"><FontAwesomeIcon icon={faLinkedinIn} /></div></a>
                                <a href='https://facebook.com' rel="noreferrer" target="_blank"><div className="hvr-fade rounded p-4"><FontAwesomeIcon icon={faYoutube} /></div></a>
                                <a href='https://facebook.com' rel="noreferrer" target="_blank"><div className="hvr-fade rounded p-4"><FontAwesomeIcon icon={faGlobe} /></div></a>
                            </div>
                        </div>
                    </div>
                    <div className="col-start-9 col-end-12 w-full h-full border-l-4 border-r-4 border-theme-gold">
                        <Image className="" src={require('../../images/clubs/RCCIIT.jpg')} alt="Header" layout="responsive" quality={100} />
                    </div>
                </div>

            </div>

            <div className="grid grid-flow-rows grid-cols-12 bg-theme-pink">
                <div className="col-start-2 col-end-12 grid grid-flow-rows grid-cols-6 bg-theme-white">
                    <div className="col-span-4 grid grid-cols-1 grid-flow-row p-12 place-content-start">
                        <div className="text-4xl text-theme-blue border-b-4 border-theme-pink max-w-max font-sub-heading">
                            About Us
                        </div>
                        <div className="text-xl text-theme-black font-text mt-8">
                            "Small opportunities are often the beginning of great enterprises."
                            RC Ballygunge Greens has commenced on a new journey to work together towards a difference to create a impact on the society. We are exhilarated to announce the Rota theme of the year: 2021-22
                            "Pioneer the change you envision."
                            We plan to implement new ideas which will bring about the changes we want to see in the society. We hope all of us work together to undertake new endeavours which will help us to work towards the change.
                        </div>
                        <div className="grid grid-rows-1 grid-flow-col justify-items-center gap-40 py-24">
                            <div className="">
                                <div className="rounded-xl bg-white shadow-xl hvr-underline-from-center hvr-float p-1">
                                    <Image className="rounded-xl" width={300} height={300} quality={100} src={require('../../images/presi.jpg')} alt='RCCIIT' />
                                </div>
                                <div className="text-center bg-theme-black text-theme-gold border-b-4 border-theme-blue rounded-t-lg py-2 text-2xl uppercase font-sub-heading mt-1">
                                    Ashmita Dey
                                </div>
                                <div className="text-center text-xl uppercase text-theme-white bg-theme-blue border-b-4 border-theme-pink rounded-b-lg font-sub-heading">
                                    President
                                </div>
                                <div className="grid grid-flow-col justify-items-center text-theme-blue">
                                    <a href='https://facebook.com' rel="noreferrer" target="_blank"><div className="hvr-fade rounded p-4"><FontAwesomeIcon icon={faFacebookSquare} /></div></a>
                                    <a href='https://facebook.com' rel="noreferrer" target="_blank"><div className="hvr-fade rounded p-4"><FontAwesomeIcon icon={faInstagram} /></div></a>
                                    <a href='https://facebook.com' rel="noreferrer" target="_blank"><div className="hvr-fade rounded p-4"><FontAwesomeIcon icon={faTwitterSquare} /></div></a>
                                    <a href='https://facebook.com' rel="noreferrer" target="_blank"><div className="hvr-fade rounded p-4"><FontAwesomeIcon icon={faLinkedinIn} /></div></a>
                                    <a href='https://facebook.com' rel="noreferrer" target="_blank"><div className="hvr-fade rounded p-4"><FontAwesomeIcon icon={faYoutube} /></div></a>
                                    <a href='https://facebook.com' rel="noreferrer" target="_blank"><div className="hvr-fade rounded p-4"><FontAwesomeIcon icon={faGlobe} /></div></a>
                                </div>
                            </div>
                            <div>
                                <div className="rounded-xl border- border-theme-pink bg-white shadow-xl hvr-underline-from-center hvr-float p-1">
                                    <Image className="rounded-xl" width={300} height={300} quality={100} src={require('../../images/secy.jpg')} alt='RCCIIT' />
                                </div>
                                <div className="text-center bg-theme-black text-theme-gold border-b-4 border-theme-blue rounded-t-lg py-2 text-2xl uppercase font-sub-heading mt-1">
                                    Suman Mohapatra
                                </div>
                                <div className="text-center text-xl uppercase text-theme-white bg-theme-blue border-b-4 border-theme-pink rounded-b-lg font-sub-heading">
                                    Secretary
                                </div>
                                <div className="grid grid-flow-col justify-items-center text-theme-blue">
                                    <a href='https://facebook.com' rel="noreferrer" target="_blank"><div className="hvr-fade rounded p-4"><FontAwesomeIcon icon={faFacebookSquare} /></div></a>
                                    <a href='https://facebook.com' rel="noreferrer" target="_blank"><div className="hvr-fade rounded p-4"><FontAwesomeIcon icon={faInstagram} /></div></a>
                                    <a href='https://facebook.com' rel="noreferrer" target="_blank"><div className="hvr-fade rounded p-4"><FontAwesomeIcon icon={faTwitterSquare} /></div></a>
                                    <a href='https://facebook.com' rel="noreferrer" target="_blank"><div className="hvr-fade rounded p-4"><FontAwesomeIcon icon={faLinkedinIn} /></div></a>
                                    <a href='https://facebook.com' rel="noreferrer" target="_blank"><div className="hvr-fade rounded p-4"><FontAwesomeIcon icon={faYoutube} /></div></a>
                                    <a href='https://facebook.com' rel="noreferrer" target="_blank"><div className="hvr-fade rounded p-4"><FontAwesomeIcon icon={faGlobe} /></div></a>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 text-4xl pb-12 text-center font-sub-heading text-theme-blue">
                            <div className="grid grid-cols-1 bg-theme-white my-2 mx-2 md:mx-4 p-4 shadow-xl hvr-underline-from-center hvr-float rounded">
                                <div className="col-span-1">
                                    <Image src={require('../../images/members.svg')} alt="Members Icon" />
                                </div>
                                <div className="col-span-1 mt-3">
                                    <VisibilitySensor partialVisibility offset={{ bottom: 100 }}>
                                        {({ isVisible }) => (
                                            <div className="text-4xl align-middle h-8 font-bold">
                                                {isVisible ? <CountUp duration={1} end={50} /> : null}
                                            </div>
                                        )}
                                    </VisibilitySensor>
                                    <p className="text-xl mt-3 font-sub-heading">Members</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 bg-theme-white my-2 mx-2 md:mx-4 p-4 shadow-xl hvr-underline-from-center hvr-float rounded">
                                <div className="col-span-1">
                                    <Image src={require('../../images/project.svg')} alt="Projects Icon" />
                                </div>
                                <div className="col-span-1 mt-3">
                                    <VisibilitySensor partialVisibility offset={{ bottom: 100 }}>
                                        {({ isVisible }) => (
                                            <div className="text-4xl align-middle h-8 font-bold">
                                                {isVisible ? <CountUp duration={1} end={100} /> : null}
                                            </div>
                                        )}
                                    </VisibilitySensor>
                                    <p className="text-xl mt-3 font-sub-heading">Projects</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 bg-theme-white my-2 mx-2 md:mx-4 p-4 shadow-xl hvr-underline-from-center hvr-float rounded">
                                <div className="col-span-1">
                                    <Image src={require('../../images/meeting.svg')} alt="Zones Icon" />
                                </div>
                                <div className="col-span-1 mt-3">
                                    <VisibilitySensor partialVisibility offset={{ bottom: 100 }}>
                                        {({ isVisible }) => (
                                            <div className="text-4xl align-middle h-8 font-bold">
                                                {isVisible ? <CountUp duration={1} end={15} /> : null}
                                            </div>
                                        )}
                                    </VisibilitySensor>
                                    <p className="text-xl mt-3 font-sub-heading">Meetings</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 bg-theme-white my-2 mx-2 md:mx-4 p-4 shadow-xl hvr-underline-from-center hvr-float rounded">
                                <div className="col-span-1">
                                    <Image src={require('../../images/bulletin.svg')} alt="Zones Icon" />
                                </div>
                                <div className="col-span-1 mt-3">
                                    <VisibilitySensor partialVisibility offset={{ bottom: 100 }}>
                                        {({ isVisible }) => (
                                            <div className="text-4xl align-middle h-8 font-bold">
                                                {isVisible ? <CountUp duration={1} end={8} /> : null}
                                            </div>
                                        )}
                                    </VisibilitySensor>
                                    <p className="text-xl mt-3 font-sub-heading">Bulletins</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2 grid grid-cols-1 grid-flow-row p-12 place-content-start">
                        <div className="text-2xl text-theme-blue font-sub-heading">
                            Type of Club
                        </div>
                        <div className="text-xl text-theme-black font-text mt-2">
                            Community Based
                        </div>
                        <div className="text-2xl text-theme-blue font-sub-heading mt-8">
                            Meets At
                        </div>
                        <div className="text-xl text-theme-black font-text mt-2">
                            NK Tower, Prince Anwar Shah Road, Tollygunge, Kolkata - 700033
                        </div>
                        <div className="text-2xl text-theme-blue font-sub-heading mt-8">
                            Meets On
                        </div>
                        <div className="text-xl text-theme-black font-text mt-2">
                            Saturday, once in 2 weeks.
                        </div>
                        <div className="text-2xl text-theme-blue font-sub-heading mt-8">
                            Meets From
                        </div>
                        <div className="text-xl text-theme-black font-text mt-2">
                            5PM Onwards
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
 
        </div>
    )
}