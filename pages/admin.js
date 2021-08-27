import Image from 'next/image';
import Link from 'next/link';

export default function Admin() {

    return (
        <div className="w-full">
            <div className="grid grid-flow-row grid-cols-1 my-16">
                <div className="col-span-1 text-center text-3xl text-theme-black font-sub-heading my-8">
                    Rotaract Club of Tollygunge
                </div>
                <div className="grid grid-cols-3 px-12 text-4xl pb-12 text-center font-sub-heading text-theme-blue">
                    <Link href="/members/">
                        <div className="grid grid-cols-1 bg-theme-white my-2 mx-2 md:mx-4 p-4 shadow-xl hvr-underline-from-center hvr-float rounded">
                            <div className="col-span-1">
                                <Image src={require('../images/members.svg')} alt="Members Icon" />
                            </div>
                            <div className="col-span-1 mt-3">
                                        <div className="text-4xl align-middle h-8 font-bold">
                                            50
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
                                            100
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
                                <div className="text-4xl align-middle h-8 font-bold">15</div>
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
                                <div className="text-4xl align-middle h-8 font-bold">8</div>
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
                                <div className="text-4xl align-middle h-8 font-bold">8</div>
                                <p className="text-xl mt-3 font-sub-heading">Participation</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};