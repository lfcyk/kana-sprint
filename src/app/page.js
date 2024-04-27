'use client';

import Footer from "@/components/footer";
import MainButton from "@/components/mainMenu/mainButton";
import Link from "next/link";

export default function Home() {
	
  	return (
		<div className="bg-white" id="canvas">
			<div className="flex flex-col h-[100vh] justify-center">
				<div className="kana-sprint mx-auto text-3xl font-bold select-none ">Kana Sprint</div>
				<div className="mx-auto text-3xl select-none font-bold mb-20">～<span className="text-red-500">かな</span>スプリント～</div>
				<div className="flex flex-col pb-20  ">
					<div className="flex flex-col gap-6">
						<Link href={'/hiragana'}>
							<MainButton text={"Hiragana"} bgColor={'bg-orange-500'}/>
						</Link>
						<Link href={'/katakana'}>
							<MainButton text={"Katakana"} bgColor={'bg-green-500'}/>
						</Link>
						<Link href={'/leaderboard'}>
							<MainButton text={"Leaderboard"} bgColor={'bg-cyan-500'}/>
						</Link>
						<Link href={'/about'}>
							<MainButton text={"About"} bgColor={'bg-yellow-500'}/>
						</Link>
					</div>
				</div>
			</div>
			<Footer/>
		</div>
	);
}
