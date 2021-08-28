import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import NavBar from '../components/Navbar';
import Nav from '../components/Nav';
import BG from '../images/bg-1.jpg';
import BG2 from '../images/bg-2.jpg';
import Logo from '../images/district-logo.png';
import LogoFlag from '../images/bg-2-4.png';
import { faUserClock, faHandHoldingHeart, faDonate, faMapMarkerAlt, faPhoneAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ScrollAnimation from 'react-animate-on-scroll';
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";
import Typewriter from 'typewriter-effect';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
import { Slide } from "react-slideshow-image";
import Footer from '../components/Footer';

export default function Index() {
	const [loading, setLoading] = useState(true);

	const handleClick = () => setLoading(false);

	const properties = {
		duration: 2000,
		autoplay: true,
		transitionDuration: 500,
		arrows: false,
		infinite: true,
		easing: "ease",
		indicators: true
	};

	const myLoader = ({ src }) => {
		return `${src}`;
	}

	const slideImages = [
		{
			img: require('../images/rip.jpg'),
			desc: 'Eodem modo typi, qui nunc nobis videntur parum clari, fiant sollemnes in futurum nunc putamus parum.',
			name: 'Rtn. Shekhar Mehta',
			desgn: 'RI President 2021 - 22'
		},
		{
			img: require('../images/dg.jpg'),
			desc: 'Eodem modo typi, qui nunc nobis videntur parum clari, fiant sollemnes in futurum nunc putamus parum.',
			name: 'Rtn. Prabir Chatterjee',
			desgn: 'District Governor 2021 - 22'
		},
		{
			img: require('../images/drr.jpg'),
			desc: 'Eodem modo typi, qui nunc nobis videntur parum clari, fiant sollemnes in futurum nunc putamus parum.',
			name: 'PP Rtr. | Rtn. Arka K. Nag',
			desgn: 'DRR 2021 - 22'
		},
		{
			img: require('../images/drcc.jpg'),
			desc: 'Eodem modo typi, qui nunc nobis videntur parum clari, fiant sollemnes in futurum nunc putamus parum.',
			name: 'Rtn. Sushanto Chakraborty',
			desgn: 'DRCC 2021 - 22'
		},
	];
		
	return (
		<>
			{
				(loading)
			?
				<div className="w-screen h-screen bg-theme-black text-center align-middle pt-32 md:pt-32 grid grid-rows-2 grid-cols-1" onClick={handleClick}>
					<div>
						<Image src={require('../images/main-loader.gif')} width={450} height={450} alt="Main Loader" />
					</div>
					<div>
						<button><p className="text-3xl font-sub-heading text-theme-white mt-32">Touch to Be The Change</p></button>
					</div>
				</div> 
			:
			<div className="w-full">
				<NavBar />

				<div className="w-full h-screen" style={{ position: 'relative' }}>
					<Image className="bg-screen" src={require('../images/bg-3.jpg')} alt="Header" objectFit="cover" layout="fill" quality={100} />
					<div className="grid grid-rows-1 grid-cols-6 md:grid-cols-12">
						<div className="hidden md:block md:col-start-3 md:col-end-5 text-center">
							<div className="w-full h-full text-center align-middle px-0 md:px-8">
								<Image className="" src={require('../images/logo-flag-01.png')} alt="Header" quality={100} />
							</div>
						</div>
						<div className="col-start-1 col-end-7 md:col-start-5 md:col-end-11 text-center md:text-left mt-40 md:mt-24">
							<div className="block md:hidden text-center">
								<div className="w-full h-full align-middle px-28">
									<Image className="" src={require('../images/drr-logo.png')} alt="Header" quality={100} />
								</div>
							</div>
							<div className="grid grid-flow-row grid-cols-1">
								<div className="m-1 rounded text-theme-white bg-theme-blac text-lg md:text-4xl font-heading my-2 py-8 px-4" style={{ letterSpacing: 4 }}>
									<Typewriter
										options={{ 
											cursor: '.',
											strings: ['Valar  Dohaeris', 'Serve  to  Change  Lives', 'Be  The  Change'],
											//strings: ['Serve  to  Change  Lives'],
											autoStart: true,
											loop: true,
										}}
									/>
								</div>
								<div className="m-1 rounded text-theme-white bg-theme-pink text-sm md:text-2xl font-heading py-3 md:py-4 md:px-4" style={{ letterSpacing: 2 }}>Rotaract District Organisation</div>
								<div className="m-1 rounded text-theme-white bg-theme-blue text-lg md:text-2xl font-normal md:font-bold font-body py-2 md:py-4 md:px-4" style={{ letterSpacing: 2 }}>Rotary International District 3291</div>
								<div className="m-1 rounded text-theme-blue bg-theme-gold text-lg md:text-2xl font-normal md:font-bold font-body py-2 md:py-4 md:px-4"><i>Kolkata, South Bengal & Andamans</i></div>
							</div>
						</div>
					</div>
				</div>

				<div className="bg-theme-pink py-8 grid grid-rows-1 md:grid-rows-1 grid-cols-1 md:grid-cols-5 text-center font-sub-heading">
					<div className="col-span-2 py-20 px-20 text-left">
						<div className="text-2xl text-theme-gold">July 1st, 2021 - Present</div>
						<div className="border-b-2 border-theme-blue text-theme-white text-5xl md:text-5xl py-3 max-w-max">ACHIEVEMENTS</div>
					</div>
					<div className="grid grid-cols-1 bg-theme-white my-2 mx-8 md:mx-4 p-8 border-4 shadow-xl border-theme-gold rounded">
						<div className="col-span-1">
								<FontAwesomeIcon size={'5x'} icon={faHandHoldingHeart} className="text-theme-blue" />
						</div>
						<div className="col-span-1 mt-8">
							<VisibilitySensor partialVisibility offset={{ bottom: 100 }}>
								{({ isVisible }) => (
									<div className="text-5xl h-16 font-bold">
										{isVisible ? <CountUp duration={1} end={1000} /> : null}
									</div>
								)}
							</VisibilitySensor>
							<p className="text-xl">Lives Served</p>
						</div>
					</div>
					<div className="grid grid-cols-1 bg-theme-white my-2 mx-8 md:mx-4 p-8 border-4 shadow-xl border-theme-gold rounded">
						<div className="col-span-1">
								<FontAwesomeIcon size={'5x'} icon={faDonate} className="text-theme-blue" />
						</div>
						<div className="col-span-1 mt-8">
							<VisibilitySensor partialVisibility offset={{ bottom: 100 }}>
								{({ isVisible }) => (
									<div className="text-5xl h-16 font-bold">
										{isVisible ? <CountUp duration={1} end={1000} /> : null}
									</div>
								)}
							</VisibilitySensor>
							<p className="text-xl font-sub-heading">Funds Donated</p>
						</div>
					</div>
					<div className="grid grid-cols-1 bg-theme-white my-2 mx-8 md:mx-4 p-8 shadow-xl border-4 border-theme-gold rounded">
						<div className="col-span-1">
							<FontAwesomeIcon size={'5x'} icon={faUserClock} className="text-theme-blue" />
						</div>
						<div className="col-span-1 mt-8">
							<VisibilitySensor partialVisibility offset={{ bottom: 100 }}>
								{({ isVisible }) => (
									<div className="text-5xl h-16 font-bold">
										{isVisible ? <CountUp duration={1} end={1000} /> : null}
									</div>
								)}
							</VisibilitySensor>
							<p className="text-xl font-sub-heading">Man Hours</p>
						</div>
					</div>
				</div>

				<div className="" style={{ position: 'relative' }}>
					<Image className="bg-screen" src={require('../images/about_bg.png')} alt="Header" objectFit="cover" layout="fill" quality={100} />
					<div className="grid grid-rows-1 md:grid-rows-1 grid-cols-1 md:grid-cols-3 font-sub-heading">
						<div className="py-12 md:py-16 mx-12 md:mx-16 text-center md:text-left">
							<div className="text-2xl text-theme-pink">Hello, there!</div>
							<div className="border-b-2 border-theme-gold text-5xl md:text-5xl py-3">WHO ARE WE?</div>
							<div className="text-lg md:text-2xl text-theme-black font-text py-2">
								Rotaract District Organisation, RID 3291 happens to be the largest youth organisation that is active in the city of Kolkata
								& it&apos;s suburbs with 92 active and running clubs with a membership count close to 2500. Formed in 2008, after it was
								redistricted from erstwhile district 3290. It covers Kolkata and 11 other revenue districts of
								Southern West Bengal and Andaman and Nicobar Islands in India.
							</div>
						</div>
						<div className="py-12 md:py-16 mx-12 md:mx-16">
							<div className="grid grid-rows-2 grid-cols-2">
								<div>
									<ParallaxProvider>
										<Parallax y={[-5, 5]} tagOuter="figure">
											<Image className="" src={require('../images/about_img_1.png')} alt="Header" quality={100} />
										</Parallax>
									</ParallaxProvider>
								</div>
								<div>
									<ParallaxProvider>
										<Parallax x={[30, 30]} y={[-10, 10]} tagOuter="figure">
											<Image className="" src={require('../images/about_img_4.png')} alt="Header" quality={100} />
										</Parallax>
									</ParallaxProvider>
								</div>
								<div>
									<ParallaxProvider>
										<Parallax y={[20, 10]} tagOuter="figure">
											<Image className="" src={require('../images/about_img_3.png')} alt="Header" quality={100} />
										</Parallax>
									</ParallaxProvider>
								</div>
								<div>
									<ParallaxProvider>
										<Parallax y={[10, -10]} tagOuter="figure">
											<div className="border-8 border-white-900 -mt-12 -ml-12">
												<Image className="border-4 border-theme-black" src={require('../images/about_img_2.png')} alt="Header" quality={100} />
											</div>
										</Parallax>
									</ParallaxProvider>
								</div>
							</div>
						</div>
						<div className="py-12 md:py-16 mx-2 md:mx-16">
							<div className="grid grid-cols-2 text-4xl pb-12 text-center">
								<div className="grid grid-cols-1 bg-theme-white my-2 mx-2 md:mx-4 p-4 shadow-xl border-4 border-theme-gold rounded">
									<div className="col-span-1">
										<Image src={require('../images/rotaract.svg')} alt="Clubs Icon" />
									</div>
									<div className="col-span-1 mt-3">
										<VisibilitySensor partialVisibility offset={{ bottom: 100 }}>
											{({ isVisible }) => (
												<div className="text-4xl align-middle h-8 font-bold">
													{isVisible ? <CountUp duration={1} end={130} /> : null}
												</div>
											)}
										</VisibilitySensor>
										<p className="text-xl mt-3 font-sub-heading">Clubs</p>
									</div>
								</div>
								<div className="grid grid-cols-1 bg-theme-white my-2 mx-2 md:mx-4 p-4 shadow-xl border-4 border-theme-gold rounded">
									<div className="col-span-1">
										<Image src={require('../images/members.svg')} alt="Members Icon" />
									</div>
									<div className="col-span-1 mt-3">
										<VisibilitySensor partialVisibility offset={{ bottom: 100 }}>
											{({ isVisible }) => (
												<div className="text-4xl align-middle h-8 font-bold">
													{isVisible ? <CountUp duration={1} end={3000} /> : null}
												</div>
											)}
										</VisibilitySensor>
										<p className="text-xl mt-3 font-sub-heading">Members</p>
									</div>
								</div>
								<div className="grid grid-cols-1 bg-theme-white my-2 mx-2 md:mx-4 p-4 shadow-xl border-4 border-theme-gold rounded">
									<div className="col-span-1">
										<Image src={require('../images/project.svg')} alt="Projects Icon" />
									</div>
									<div className="col-span-1 mt-3">
										<VisibilitySensor partialVisibility offset={{ bottom: 100 }}>
											{({ isVisible }) => (
												<div className="text-4xl align-middle h-8 font-bold">
													{isVisible ? <CountUp duration={1} end={3000} /> : null}
												</div>
											)}
										</VisibilitySensor>
										<p className="text-xl mt-3 font-sub-heading">Projects</p>
									</div>
								</div>
								<div className="grid grid-cols-1 bg-theme-white my-2 mx-2 md:mx-4 p-4 shadow-xl border-4 border-theme-gold rounded">
									<div className="col-span-1">
										<Image src={require('../images/zone.svg')} alt="Zones Icon" />
									</div>
									<div className="col-span-1 mt-3">
										<VisibilitySensor partialVisibility offset={{ bottom: 100 }}>
											{({ isVisible }) => (
												<div className="text-4xl align-middle h-8 font-bold">
													{isVisible ? <CountUp duration={1} end={8} /> : null}
												</div>
											)}
										</VisibilitySensor>
										<p className="text-xl mt-3 font-sub-heading">Zones</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="w-full h-1/4" style={{ position: 'relative' }}>
					<Image className="bg-screen" src={require('../images/causes_list_bg.jpg')} alt="Header" objectFit="cover" layout="fill" quality={100} />
					<div className="py-12 md:py-16 px-2 md:px-16 grid grid-cols-1 grid-flow-row text-center font-sub-heading">
					
						<div className="text-2xl text-theme-pink">Houses of RDO 3291!</div>
						<div className="text-5xl md:text-5xl text-theme-gold py-3">ZONES</div>
						<div className="grid grid-rows-4 md:grid-rows-2 grid-cols-2 md:grid-cols-4 mt-4">
							<div className="grid grid-cols-1 bg-theme-black my-2 mx-2 md:mx-4 p-4 shadow-xl border-4 zone rounded">
								<div className="col-span-1">
									<Image src={require('../images/zone-1.svg')} alt="Clubs Icon" width={200} height={200} />
								</div>
								<div className="col-span-1 mt-3">
									<p className="text-xl mt-3 font-sub-heading">House Baratheon - Zone 1</p>
								</div>
							</div>
							<div className="grid grid-cols-1 bg-theme-black my-2 mx-2 md:mx-4 p-4 shadow-xl border-4 zone rounded">
								<div className="col-span-1">
									<Image src={require('../images/zone-2.svg')} alt="Clubs Icon" width={200} height={200} />
								</div>
								<div className="col-span-1 mt-3">
									<p className="text-xl mt-3 font-sub-heading">House Martell - Zone 2</p>
								</div>
							</div>
							<div className="grid grid-cols-1 bg-theme-black my-2 mx-2 md:mx-4 p-4 shadow-xl border-4 zone rounded">
								<div className="col-span-1">
									<Image src={require('../images/zone-3.svg')} alt="Clubs Icon" width={200} height={200} />
								</div>
								<div className="col-span-1 mt-3">
									<p className="text-xl mt-3 font-sub-heading">House Greyjoy - Zone 3</p>
								</div>
							</div>
							<div className="grid grid-cols-1 bg-theme-black my-2 mx-2 md:mx-4 p-4 shadow-xl border-4 zone rounded">
								<div className="col-span-1">
									<Image src={require('../images/zone-4.svg')} alt="Clubs Icon" width={200} height={200} />
								</div>
								<div className="col-span-1 mt-3">
									<p className="text-xl mt-3 font-sub-heading">House Arryn - Zone 4</p>
								</div>
							</div>
							<div className="grid grid-cols-1 bg-theme-black my-2 mx-2 md:mx-4 p-4 shadow-xl border-4 zone rounded">
								<div className="col-span-1">
									<Image src={require('../images/zone-5.svg')} alt="Clubs Icon" width={200} height={200} />
								</div>
								<div className="col-span-1 mt-3">
									<p className="text-xl mt-3 font-sub-heading">House Targaryen - Zone 5</p>
								</div>
							</div>
							<div className="grid grid-cols-1 bg-theme-black my-2 mx-2 md:mx-4 p-4 shadow-xl border-4 zone rounded">
								<div className="col-span-1">
									<Image src={require('../images/zone-6.svg')} alt="Clubs Icon" width={200} height={200} />
								</div>
								<div className="col-span-1 mt-3">
									<p className="text-xl mt-3 font-sub-heading">House Lannister - Zone 6</p>
								</div>
							</div>
							<div className="grid grid-cols-1 bg-theme-black my-2 mx-2 md:mx-4 p-4 shadow-xl border-4 zone rounded">
								<div className="col-span-1">
									<Image src={require('../images/zone-7.svg')} alt="Clubs Icon" width={200} height={200} />
								</div>
								<div className="col-span-1 mt-3">
									<p className="text-xl mt-3 font-sub-heading">House Tyrell - Zone 7</p>
								</div>
							</div>
							<div className="grid grid-cols-1 bg-theme-black my-2 mx-2 md:mx-4 p-4 shadow-xl border-4 zone rounded">
								<div className="col-span-1">
									<Image src={require('../images/zone-8.svg')} alt="Clubs Icon" width={200} height={200} />
								</div>
								<div className="col-span-1 mt-3">
									<p className="text-xl mt-3 font-sub-heading">House Stark - Zone 8</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="w-full h-1/4" style={{ position: 'relative' }}>
					<Image className="bg-screen" src={require('../images/light_map_bg.jpg')} alt="Header" objectFit="cover" layout="fill" quality={100} />
					<div className="py-12 md:py-16 px-2 md:px-16 grid grid-cols-1 grid-flow-row text-center font-sub-heading">
					
						<div className="text-2xl text-theme-pink">Hear from the Leaders!</div>
						<div className="text-5xl md:text-5xl text-theme-black py-3">LEADERS SPEAK</div>
						<div className="slide-container">
							<Slide {...properties}>
								{slideImages.map((each, index) => (
								<div key={index} className="each-slide">
									<div className="grid grid-rows-1 grid-cols-4">
										<div className="col-start-2 col-end-4 bg-theme-blue py-4 text-center rounded">
											<Image className="rounded-full" src={each.img} width={150} height={150} alt="sample" />
											<div className="text-2xl font-text px-16 pt-2 text-theme-white">{each.desc}</div>
											<div className="text-3xl bg-theme-white p-1 mt-4 text-theme-pink">{each.name}</div>
											<div className="text-2xl bg-theme-black p-1 text-theme-gold">{each.desgn}</div>
										</div>
										<div className="col-start-2 col-end-4 bg-theme-blue bg-opacity-75 py-2 mx-8">
										</div>
										<div className="col-start-2 col-end-4 bg-theme-blue bg-opacity-50 py-2 mx-12">
										</div>
									</div>
								</div>
								))}
							</Slide>
						</div>
					</div>
				</div>

				<div className="w-full h-full" style={{ position: 'relative' }}>
					<Image className="bg-screen" src={require('../images/about-bg-2.png')} alt="Header" objectFit="cover" layout="fill" quality={100} />
					<div className="grid grid-rows-1 md:grid-rows-1 grid-cols-1 md:grid-cols-4 font-sub-heading">
						<div className="py-12 md:py-16 px-12 md:px-16 text-center md:text-left">
							<div className="text-2xl text-theme-pink">What We Do?</div>
							<div className="border-b-2 border-theme-gold text-theme-white text-5xl md:text-5xl py-3">AVENUES OF SERVICE</div>
							<div className="text-lg md:text-2xl text-theme-white font-text py-2">
								We channel our commitment to service at home and abroad through four Avenues of Service, which are the foundation of Rotaract club activity.
							</div>
						</div>
						<div className="col-span-3 py-12 md:py-16 px-2 md:px-16">
							<div className="grid grid-cols-2 text-4xl pb-12 text-left">
								<div className="grid grid-cols-3 bg-theme-white my-2 mx-2 md:mx-4 p-8 shadow-xl border-4 border-theme-gold rounded">
									<div className="col-span-1 py-8">
										<Image src={require('../images/help.svg')} width={100} height={100} alt="Clubs Icon" />
									</div>
									<div className="col-span-2">
										<p className="text-2xl font-sub-heading">Community Service</p>
										<p className="text-lg font-text">
											Community Service encourages every Rotaractor to find ways to improve the quality of life for people in their communities and to serve the public interest.
										</p>
									</div>
								</div>
								<div className="grid grid-cols-3 bg-theme-white my-2 mx-2 md:mx-4 p-8 shadow-xl border-4 border-theme-gold rounded">
									<div className="col-span-1 py-8">
										<Image src={require('../images/conference.svg')} width={100} height={100} alt="Clubs Icon" />
									</div>
									<div className="col-span-2">
										<p className="text-2xl font-sub-heading">Professional Development</p>
										<p className="text-lg font-text">
											Community Service encourages every Rotaractor to find ways to improve the quality of life for people in their communities and to serve the public interest.
										</p>
									</div>
								</div>
								<div className="grid grid-cols-3 bg-theme-white my-2 mx-2 md:mx-4 p-8 shadow-xl border-4 border-theme-gold rounded">
									<div className="col-span-1 py-8">
										<Image src={require('../images/world.svg')} width={100} height={100} alt="Clubs Icon" />
									</div>
									<div className="col-span-2">
										<p className="text-2xl font-sub-heading">International Service</p>
										<p className="text-lg font-text">
											International Service exemplifies our global reach in promoting peace and understanding. We support this service avenue by sponsoring or volunteering on international projects.
										</p>
									</div>
								</div>
								<div className="grid grid-cols-3 bg-theme-white my-2 mx-2 md:mx-4 p-8 shadow-xl border-4 border-theme-gold rounded">
									<div className="col-span-1 py-8">
										<Image src={require('../images/people.svg')} width={100} height={100} alt="Clubs Icon" />
									</div>
									<div className="col-span-2">
										<p className="text-2xl font-sub-heading">Club Service</p>
										<p className="text-lg font-text">
										Club Service focuses on making clubs strong. A thriving club is anchored by strong relationships and an active membership development plan.
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			
				<Footer />

			</div>
			}
		</>
	);
};
