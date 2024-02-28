'use client';


import LetterContainer from "@/components/letter_container";
import Time from "@/components/time";
import { hiraganaArray, katakanaArray, romajiArray } from "@/utils/letters.js"

import dynamic from 'next/dynamic'
 
const DraggableLetter = dynamic(() => import("@/components/draggable_letter"), { ssr: false })

export default function Home() {
	const shuffledHiragana = hiraganaArray.sort((a, b) => 0.5 - Math.random());

	let hiraganaArray1 = shuffledHiragana.slice(0, 23);
	let hiraganaArray2 = shuffledHiragana.slice(23, 46);

	

  	return (
		<div className="bg-white" id="canvas">
			<div className="flex flex-row flex-wrap w-72 mx-auto gap-1 absolute my-0">

				{
					hiraganaArray1.map((letter) =>{
						return (
							<DraggableLetter letter={letter} key={letter}/>
						)
					})
				}
			</div>
			<div className="flex flex-row flex-wrap w-72 mx-auto gap-1 absolute my-0 right-0 justify-end">
				{
					hiraganaArray2.map((letter) =>{
						return (
							<DraggableLetter letter={letter} key={letter}/>
						)
					})
				}
			</div>
			<div className=" max-w-fit m-auto mt-7 text-3xl font-bold select-none">KANA SPRINT</div>
			<div className=" max-w-fit m-auto mb-7 text-3xl select-none">～<span className="text-red-500">かな</span>スプリント～</div>

			<div  className="grid grid-rows-5 grid-cols-10 gap-2  m-auto w-fit max-h-fit grid-auto-flow">
				<LetterContainer letter={"WA"}/>
				<LetterContainer letter={"RA"}/>
				<LetterContainer letter={"YA"}/>
				<LetterContainer letter={"MA"}/>
				<LetterContainer letter={"HA"}/>
				<LetterContainer letter={"NA"}/>
				<LetterContainer letter={"TA"}/>
				<LetterContainer letter={"SA"}/>
				<LetterContainer letter={"KA"}/>
				<LetterContainer letter={"A"}/>

				<LetterContainer letter={""}/>
				<LetterContainer letter={"RI"}/>
				<LetterContainer letter={""}/>
				<LetterContainer letter={"MI"}/>
				<LetterContainer letter={"HI"}/>
				<LetterContainer letter={"NI"}/>
				<LetterContainer letter={"CHI"}/>
				<LetterContainer letter={"SHI"}/>
				<LetterContainer letter={"KI"}/>
				<LetterContainer letter={"I"}/>

				<LetterContainer letter={"WO"}/>
				<LetterContainer letter={"RU"}/>
				<LetterContainer letter={"YU"}/>
				<LetterContainer letter={"MU"}/>
				<LetterContainer letter={"FU"}/>
				<LetterContainer letter={"NU"}/>
				<LetterContainer letter={"TSU"}/>
				<LetterContainer letter={"SU"}/>
				<LetterContainer letter={"KU"}/>
				<LetterContainer letter={"U"}/>

				<LetterContainer letter={""}/>
				<LetterContainer letter={"RE"}/>
				<LetterContainer letter={""}/>
				<LetterContainer letter={"ME"}/>
				<LetterContainer letter={"HE"}/>
				<LetterContainer letter={"NE"}/>
				<LetterContainer letter={"TE"}/>
				<LetterContainer letter={"SE"}/>
				<LetterContainer letter={"KE"}/>
				<LetterContainer letter={"E"}/>

				<LetterContainer letter={"N"}/>
				<LetterContainer letter={"RO"}/>
				<LetterContainer letter={"YO"}/>
				<LetterContainer letter={"MO"}/>
				<LetterContainer letter={"HO"}/>
				<LetterContainer letter={"NO"}/>
				<LetterContainer letter={"TO"}/>
				<LetterContainer letter={"SO"}/>
				<LetterContainer letter={"KO"}/>
				<LetterContainer letter={"O"}/>
			</div>
			
			<Time/>
		</div>
	);
}
