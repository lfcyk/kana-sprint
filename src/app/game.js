'use client';


import LetterContainer from "@/components/letter_container";
import Time from "@/components/time";
import { hiraganaArray, katakanaArray, romajiArray, letConRomaji, kunjawHiragana, kunjawKatakana } from "@/utils/letters.js"

import dynamic from 'next/dynamic'
import { useEffect, useState } from "react";
 
const DraggableLetter = dynamic(() => import("@/components/draggable_letter"), { ssr: false })

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

import Footer from "@/components/footer";
import NavBar from "@/components/navbar/navbar";

import Modal from 'react-modal';
import styles from './styles.module.css';
import Link from "next/link";
import { msToTime } from "@/utils/msToTime";

import { useRouter } from 'next/navigation'
import { MobileView, isMobile } from "react-device-detect";

const shuffledHiragana = hiraganaArray.sort((a, b) => 0.5 - Math.random());
const shuffledKatakana = katakanaArray.sort((a, b) => 0.5 - Math.random());

export default function Game({characters}) {
	const router = useRouter()

    let characterArray;
	let kunjaw;

    if(characters == 'hiragana') {
        characterArray = shuffledHiragana;
		kunjaw = kunjawHiragana;
    } else {
        characterArray = shuffledKatakana;
		kunjaw = kunjawKatakana;
    }
	
	const [isFinished, setIsFinished] = useState(false);
	const [country, setCountry] = useState('');
	const [elapsedTime, setElapsedTime] = useState(0);
	const [playerName, setPlayerName] = useState("");
	const [submitButtonActive, setSubmitButtonActive] = useState(false);

	let enteredAnswer = {};
	letConRomaji.forEach((romaji) => {
		enteredAnswer[romaji] = "";
	})

	let countCorrect = 0;

	

	useEffect(() => {
		async function getUserCountry()  {
			const response = await fetch('https://ipapi.co/json/?key=obDgy9eP5bb7mSRiFRqo2FN1ryprud9BKr4gjeFxvponzmQL3P', {
				method: "GET",
			});
			const data = await response.json();
	
			setCountry(data.country);
		}
		
		getUserCountry();
	}, []);

	function letConColorTo(color, letterCon) {
		// console.log(letterCon);
		if(color == 'red') {
			letterCon.children[0].classList.remove('bg-white');
			letterCon.children[0].classList.remove('bg-green-200');
			letterCon.children[0].classList.add('bg-red-200');
		} else if(color == 'green') {
			letterCon.children[0].classList.remove('bg-red-200');
			letterCon.children[0].classList.remove('bg-white');
			letterCon.children[0].classList.add('bg-green-200');

		} else if(color == 'white'){
			letterCon.children[0].classList.remove('bg-red-200');
			letterCon.children[0].classList.remove('bg-green-200');
			letterCon.children[0].classList.add('bg-white');
		}
	}
	
	function calculateScore() {
		countCorrect = 0;
		letConRomaji.forEach((romajiKey) => {
			if((enteredAnswer[romajiKey] == kunjaw[romajiKey]) && (romajiKey != "")) {
				countCorrect+=1;
			}
		})
		if(countCorrect == 46) {
			setIsFinished(true);
			
		}
		// console.log({countCorrect, enteredAnswer});
	}

	// console.log(enteredAnswer);

	let slicedCharactersArray1 = characterArray.slice(0, 23);
	let slicedCharactersArray2 = characterArray.slice(23, 46);

	let letCon;
	// console.log(country);
	useGSAP((context) => {
		letCon = document.querySelectorAll('.letCon');

		gsap.registerPlugin(Draggable);
		Draggable.create(".kana-card", {
			type: "x,y",
			bounds: document.getElementById("canvas"),	
			onDragStart: function(e) {
				for (const [key, value] of Object.entries(enteredAnswer)) {
					if(value == this.target.textContent) {
						enteredAnswer[key] = "";
					}
				}				
			},	  
			onDrag:	function(e) {
				// console.log(e);
				this.target.children[0].classList.remove('text-green-600');
				this.target.children[0].classList.add('text-red-600');

				for(var i = 0; i < letCon.length; i++) {
					if(this.hitTest(letCon[i], "50%") && (letCon[i].textContent != "") && (enteredAnswer[letCon[i].textContent] == "")) {
						if(letCon[i].textContent != '') {
							letConColorTo('green', letCon[i]);
						}
					} else {
						letConColorTo('white', letCon[i]);
					}
				}
				
			},
			onDragEnd: function (e) {
				for(var i = 0; i < letCon.length; i++) {
					if(this.hitTest(letCon[i], "50%") && (letCon[i].textContent != "") && (enteredAnswer[letCon[i].textContent] == "")) {
						if(letCon[i].textContent != '') {
							var rect1 = this.target.getBoundingClientRect();
							var rect2 = letCon[i].getBoundingClientRect();

							var x = "+=" + (rect2.left - rect1.left);
							var y = "+=" + (rect2.top - rect1.top);
							
							// console.log(x,y);

							gsap.to(this.target, {
								duration: 0.3,
								x: x,
								y: y,
							})

							letConColorTo('green', letCon[i]);

							enteredAnswer[letCon[i].textContent] = this.target.textContent;
							// console.log(enteredAnswer);
						}

						// console.log(this.target.children[0]);
						if(this.target.textContent == kunjaw[letCon[i].textContent]) {
							this.target.children[0].classList.remove('text-red-600');
							this.target.children[0].classList.add('text-green-600');
						}
					} else {
						letConColorTo('white', letCon[i]);
					}
				}
				calculateScore();
			},
			
			
		});    

	});

	const onSubmitScore = async (e) => {
		setSubmitButtonActive(true);

		const body = {country, playerName, elapsedTime, characters};
		await fetch('/api/postLeaderboard', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
            'content-type': 'application/json'
            }
        })
        .then((response) => {
            return {
                text: response.text(),
                isOk: response.ok,
            }
        })
		setTimeout(() => setSubmitButtonActive(false), 2000);

		router.push('/leaderboard');
	}

  	return (
		<div className="bg-white" id="canvas">
			<Modal
				isOpen={isFinished}
				ariaHideApp={false}				
				style={{
					overlay: {
						zIndex:'3000',
					},
					content: {
						boxShadow: '5px 5px black',
						width: '23rem',
						height: '16rem',
						alignSelf: 'center',
						margin: 'auto',
						
					},
				
				}}
				>
				<div className="flex flex-col">
					<div className="flex flex-row justify-between">
						<h1 className="font-bold mb-3">Congratulations!</h1>
						<Link href="/">
							<button className=" self-start -mt-3 -mr-2 @apply shadow-[2px_2px_black] w-32  text-white transition-transform duration-[0.2s,box-shadow] delay-[0.2s] hover:shadow-[1px_1px_black] bg-fuchsia-600">main menu</button>
						</Link>
					</div>
					<div className="mb-4">You have completed the {characters} puzzle!</div>
					<div>Your time:  <span className="text-green-400 ml-3">{msToTime(elapsedTime)}</span></div>
					<form action={onSubmitScore}>
						<input
							required={true} 
							type='text' 
							className="border border-black mt-4 h-9 px-2 w-full" 
							placeholder="Enter your name here." 
							onChange={(e) => {
								setPlayerName(e.target.value)
							}}/>
						<div className="flex flex-row gap-2 mt-4 justify-center">
							<button 
								disabled={submitButtonActive}
								className={`bg-green-400 w-full py-2 text-white font-bold ${styles.modalButton} ${submitButtonActive? styles.disabledButton : ''}`} 
								>{submitButtonActive? 'Submitting...' :'Submit Score' }</button>
						</div>
					</form>
				</div>
			</Modal>
			
            <NavBar/>
			{
			isMobile
			? <>
				<div className="kana-sprint pt-[80px] font-bold select-none text-center">{(characters == 'hiragana') ? 'Hiragana / ひらがな' : 'Katakana / カタカナ' }</div>
				<div className="m-auto mb-7 select-none px-3 text-center text-xs max-w-80">Drag the <span>{(characters == 'hiragana') ? 'hiragana' : 'katakana' }</span> card and drop it into the corresponding romaji cards.</div>
			</>
			:<>
				<div className="flex flex-row flex-wrap w-72 mx-auto gap-1 absolute my-0">

					{
						slicedCharactersArray1.map((letter, index) =>{
							return (
								<div 
								className="kana-card border-2 border-black size-16 align-middle flex items-center select-none bg-white"
								key={index}
								>
									<DraggableLetter letter={letter} />
								</div>
							)
						})
					}
				</div>
				<div className="flex flex-row flex-wrap w-72 mx-auto gap-1 absolute my-0 right-0 justify-end">
					{
						slicedCharactersArray2.map((letter, index) =>{
							return (
								<div 
								className="kana-card border-2 border-black size-16 align-middle flex items-center select-none bg-white"
								key={index}
								>
									<DraggableLetter letter={letter} />
								</div>
							)
						})
					}
				</div>
				<div className="kana-sprint max-w-fit m-auto mt-7 text-3xl font-bold select-none">{(characters == 'hiragana') ? 'Hiragana / ひらがな' : 'Katakana / カタカナ' }</div>
				<div className="max-w-fit m-auto mb-7 select-none">Drag the <span>{(characters == 'hiragana') ? 'hiragana' : 'katakana' }</span> card and drop it into the corresponding romaji cards.</div>

			</>
			}
			{
				isMobile
				?<div  className="grid grid-rows-5 grid-cols-10 gap-[2px] m-auto grid-auto-flow max-w-[390px] px-[5px]">
					{
						letConRomaji.map((letter, index) => {
							return (
								<div className="letCon" key={index}>
									<LetterContainer letter={letter}/>
								</div>
							)
						})
					}
				</div>
				:
				<div  className="grid grid-rows-5 grid-cols-10 gap-2  m-auto w-fit max-h-fit grid-auto-flow">
					{
						letConRomaji.map((letter, index) => {
							return (
								<div className="letCon" key={index}>
									<LetterContainer letter={letter}/>
								</div>
							)
						})
					}
				</div>
			}
			<div className="my-6">
				<Time isFinished={isFinished} setElapsedTime={setElapsedTime} elapsedTime={elapsedTime}/>
			</div>
			<MobileView>
				<div className="flex flex-row flex-wrap justify-center max-w-[390px] mx-auto">

					{
						slicedCharactersArray1.concat(slicedCharactersArray2).map((letter, index) =>{
							return (
								<div 
								className="kana-card border border-black size-8 align-middle flex items-center select-none bg-white mr-1"
								key={index}
								>
									<DraggableLetter letter={letter} />
								</div>
							)
						})
					}
				</div>
			</MobileView>
			<Footer/>
		</div>
	);
}
