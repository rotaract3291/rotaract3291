import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useContext, useEffect } from "react";
import { Account, AccountContext } from "../components/Account";
import Login from '../components/Login';
import NavbarAdmin from './NavbarAdmin';
import { MEMBERS_API, MEETINGS_API, PROJECTS_API, BULLETINS_API, PARTICPATIONS_API, PARTICIPATIONS_API } from './urls';
import axios from 'axios';

export default function Dashboard() {
    const [data, setData] = useState({
        'members': 0,
        'projects': 0,
        'meetings': 0,
        'bulletins': 0,
        'participations': 0,
    });
    const [session, setSession] = useState();

    const { getSession, logout } = useContext(AccountContext);
  
    useEffect(() => {
        getSession().then((sessionData) => {
            debugger;
            console.log("Session: ", sessionData);
            setSession(sessionData);
            const club_name = sessionData['idToken']['payload']['name'].toLowerCase();
            var membersRequest = axios.get(MEMBERS_API + '/members-by-club/' + club_name);
            var projectsRequest = axios.get(PROJECTS_API + '/projects-by-club/' + club_name);
            var meetingsRequest = axios.get(MEETINGS_API + '/meetings-by-club/' + club_name);
            var bulletinsRequest = axios.get(BULLETINS_API + '/bulletins-by-club/' + club_name);
            var participationsRequest = axios.get(PARTICIPATIONS_API + '/participations-by-club/' + club_name);
            axios.all([membersRequest, projectsRequest, meetingsRequest, bulletinsRequest, participationsRequest]).then(
                axios.spread((...responses) => {
                    debugger;
                    setData({
                        'members': responses[0].data,
                        'projects': responses[1].data,
                        'meetings': responses[2].data,
                        'bulletins': responses[3].data,
                        'participations': responses[4].data,
                    })
                })
            );
        });
    }, []);

    useEffect(() => {
        console.log('data: ', data);
    }, [data]);

    return (
        <>
            {(session) ?
                <div className="w-full">
                    <NavbarAdmin session={session} />
                    <div className="grid grid-flow-row grid-cols-1 my-16">
                        <div className="col-span-1 text-center text-3xl text-theme-black font-sub-heading my-8">
                            Rotaract Club of {session['idToken']['payload']['name']}
                        </div>
                        <div className="grid grid-cols-3 px-12 text-4xl pb-12 text-center font-sub-heading text-theme-blue">
                            <Link href="/members/">
                                <div className="grid grid-cols-1 bg-theme-white my-2 mx-2 md:mx-4 p-4 shadow-xl hvr-underline-from-center hvr-float rounded">
                                    <div className="col-span-1">
                                        <Image src={require('../images/members.svg')} alt="Members Icon" />
                                    </div>
                                    <div className="col-span-1 mt-3">
                                                <div className="text-4xl align-middle h-8 font-bold">
                                                    {data['members'].length}
                                                </div>
                                        <p className="text-xl mt-3 font-sub-heading">Members</p>
                                    </div>
                                </div>
                            </Link>
                            <Link href="/projects/">
                                <div className="grid grid-cols-1 bg-theme-white my-2 mx-2 md:mx-4 p-4 shadow-xl hvr-underline-from-center hvr-float rounded">
                                    <div className="col-span-1">
                                        <Image src={require('../images/project.svg')} alt="Projects Icon" />
                                    </div>
                                    <div className="col-span-1 mt-3">
                                                <div className="text-4xl align-middle h-8 font-bold">
                                                    {data['projects'].length}
                                                </div>
                                        <p className="text-xl mt-3 font-sub-heading">Projects</p>
                                    </div>
                                </div>
                            </Link>
                            <Link href="/meetings/">
                                <div className="grid grid-cols-1 bg-theme-white my-2 mx-2 md:mx-4 p-4 shadow-xl hvr-underline-from-center hvr-float rounded">
                                    <div className="col-span-1">
                                        <Image src={require('../images/meeting.svg')} alt="Zones Icon" />
                                    </div>
                                    <div className="col-span-1 mt-3">
                                        <div className="text-4xl align-middle h-8 font-bold">
                                            {data['meetings'].length}
                                        </div>
                                        <p className="text-xl mt-3 font-sub-heading">Meetings</p>
                                    </div>
                                </div>
                            </Link>
                            <Link href="/bulletins/">
                                <div className="grid grid-cols-1 bg-theme-white my-2 mx-2 md:mx-4 p-4 shadow-xl hvr-underline-from-center hvr-float rounded">
                                    <div className="col-span-1">
                                        <Image src={require('../images/bulletin.svg')} alt="Zones Icon" />
                                    </div>
                                    <div className="col-span-1 mt-3">
                                        <div className="text-4xl align-middle h-8 font-bold">
                                                    {data['bulletins'].length}
                                        </div>
                                        <p className="text-xl mt-3 font-sub-heading">Bulletins</p>
                                    </div>
                                </div>
                            </Link>
                            <Link href="/participations/">
                                <div className="grid grid-cols-1 bg-theme-white my-2 mx-2 md:mx-4 p-4 shadow-xl hvr-underline-from-center hvr-float rounded">
                                    <div className="col-span-1">
                                        <Image src={require('../images/bulletin.svg')} alt="Zones Icon" />
                                    </div>
                                    <div className="col-span-1 mt-3">
                                        <div className="text-4xl align-middle h-8 font-bold">
                                                    {data['participations'].length}
                                        </div>
                                        <p className="text-xl mt-3 font-sub-heading">Participation</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                :
                <Login />
            }
        </>
    );
}