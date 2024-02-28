'use client';

import Footer from "@/components/footer";
import MainButton from "@/components/mainMenu/mainButton";
import Link from "next/link";

export default function Home() {

  	return (
		<div className="bg-white" id="canvas">
			

			
			<div className="kana-sprint max-w-fit m-auto mt-11 text-3xl font-bold select-none">Kana Sprint</div>
			<div className=" max-w-fit m-auto text-3xl select-none font-bold mb-16">～<span className="text-red-500">かな</span>スプリント～</div>
			<div className="flex flex-col">
				<div className="flex flex-col gap-6">
					<Link href={'/hiragana'}>
						<MainButton text={"Hiragana"}/>
					</Link>
					<MainButton text={"Katakana"}/>
					<MainButton text={"Leaderboard"}/>
					<MainButton text={"About"}/>
				</div>
			</div>
			<Footer/>
		</div>
	);
}
