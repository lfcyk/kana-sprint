'use client';

// import dynamic from 'next/dynamic'
import Footer from '@/components/footer'
import NavBar from '@/components/navbar/navbar'
import Flag from 'react-world-flags'
import Table from './table'
import MainButton from '@/components/mainMenu/mainButton';

import useSWR from 'swr';
const fetcher = url => fetch(url, {cache: 'no-store'}).then(r => r.json())
// const Table = dynamic(() => import('./table'), { ssr: false });

function Leaderboard() {
	let hiraganaData = [], katakanaData = [];
	const { data, error, isLoading  } = useSWR(`/api/getLeaderboard`, fetcher)
	if (error) return <div>failed to load</div>
	if (!isLoading) {
		hiraganaData = data.hiraganaLeaderboard;
		katakanaData = data.katakanaLeaderboard;
	}
	return (
		<div className='bg-white flex flex-col  h-screen'>
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
