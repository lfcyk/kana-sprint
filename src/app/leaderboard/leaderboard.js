'use client';

import Footer from '@/components/footer'
import Table from './table'
import MainButton from '@/components/mainMenu/mainButton';
import styles from './styles.module.css';

import dynamic from 'next/dynamic'
const NavBar = dynamic(() => import("@/components/navbar/navbar"), { ssr: false })



import useSWR from 'swr';
import { isMobile } from 'react-device-detect';
const fetcher = url => fetch(url, {cache: 'no-store'}).then(r => r.json())

function Leaderboard() {
	let hiraganaData = [], katakanaData = [];
	const { data, error, isLoading  } = useSWR(`/api/getLeaderboard`, fetcher)
	if (error) return <div>failed to load</div>
	if (!isLoading) {
		hiraganaData = data.hiraganaLeaderboard;
		katakanaData = data.katakanaLeaderboard;
	}

	if(isMobile) {
		return (
		<div className='bg-white flex flex-col  h-screen'>
			<NavBar/>
			<div className={`mt-20 text-xl font-bold bg-cyan-500 shadow-[5px_5px_black] leading-9 text-white px-9 py-3 text-center max-w-[20rem] min-w-[10rem] mx-auto mb-10 ${styles.title}`}>Leaderboard</div>
			<div className='flex flex-col justify-center mt-5 gap-10 grow pb-16 min-w-[250px]'>
				<Table character={'hiragana'} data={hiraganaData} isLoading={isLoading}/>
				<Table character={'katakana'} data={katakanaData} isLoading={isLoading}/>
			</div>
			<Footer/>
		</div>

		)
	}


	return (
		<div className='bg-white flex flex-col  h-screen relative'>
			<NavBar/>
			<div className='m-5'>
				<MainButton  text={'Leaderboard'} bgColor={'bg-cyan-500'}/>
			</div>
			<div className='flex flex-row justify-center mt-5 gap-10 grow'>
				<Table character={'hiragana'} data={hiraganaData} isLoading={isLoading}/>
				<Table character={'katakana'} data={katakanaData} isLoading={isLoading}/>
			</div>
			<Footer/>
		</div>
	)
}

export default Leaderboard
