'use client';

import Footer from '@/components/footer'

import dynamic from 'next/dynamic'
const NavBar = dynamic(() => import("@/components/navbar/navbar"), { ssr: false })
const AboutCard = dynamic(() => import("@/app/about/about_card"), { ssr: false })


function About() {
	return (
		<div className='bg-white flex flex-col h-screen '>
			<NavBar/>
            <AboutCard/>
			<Footer/>
		</div>
	)
}

export default About
