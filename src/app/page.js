'use client';


import LetterContainer from "@/components/letter_container";
import Time from "@/components/time";
import { hiraganaArray, katakanaArray, romajiArray, letConRomaji } from "@/utils/letters.js"

import dynamic from 'next/dynamic'
import { useState } from "react";
import ReactModal from "react-modal";
 
const DraggableLetter = dynamic(() => import("@/components/draggable_letter"), { ssr: false })

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

export default function Home() {
	const shuffledHiragana = hiraganaArray.sort((a, b) => 0.5 - Math.random());

	let hiraganaArray1 = shuffledHiragana.slice(0, 23);
	let hiraganaArray2 = shuffledHiragana.slice(23, 46);

	let letCon;
	useGSAP((context) => {
		letCon = document.querySelectorAll('.letCon');

		gsap.registerPlugin(Draggable);
		Draggable.create(".kana-card", {
			type: "x,y",
			bounds: document.getElementById("canvas"),	
			
						  
			onDrag:	function(e) {
				console.log(e);
				let hittedBox = 0
				for(var i = 0; i < letCon.length; i++) {
					if(this.hitTest(letCon[i]) && (letCon[i].textContent != "")) {
						hittedBox+=1;
					} 					
				}

				for(var i = 0; i < letCon.length; i++) {
					if(this.hitTest(letCon[i]) && (letCon[i].textContent != "")) {
						if(hittedBox > 1) {
							if(letCon[i].textContent != '') {
								letCon[i].children[0].classList.remove('bg-green-200');
								letCon[i].children[0].classList.remove('bg-white');
								letCon[i].children[0].classList.add('bg-red-200');
							}	
						} else if(hittedBox == 1) {
							if(letCon[i].textContent != '') {
								letCon[i].children[0].classList.remove('bg-red-200');
								letCon[i].children[0].classList.remove('bg-white');
								letCon[i].children[0].classList.add('bg-green-200');
							}
						}
					} else {
						letCon[i].children[0].classList.remove('bg-red-200');
						letCon[i].children[0].classList.remove('bg-green-200');
						letCon[i].children[0].classList.add('bg-white');

					}
				}
				
				
			},
			onDragEnd: function (e) {
				let hittedBox = 0
				for(var i = 0; i < letCon.length; i++) {
					if(this.hitTest(letCon[i]) && (letCon[i].textContent != "")) {
						hittedBox+=1;
						console.log(letCon[i].textContent);
					} 					
				}

				for(var i = 0; i < letCon.length; i++) {
					if(this.hitTest(letCon[i]) && (letCon[i].textContent != "")) {
						if(hittedBox > 1) {
							if(letCon[i].textContent != '') {
								letCon[i].children[0].classList.remove('bg-green-200');
								letCon[i].children[0].classList.remove('bg-white');
								letCon[i].children[0].classList.add('bg-red-200');
							}	
						} else if(hittedBox == 1) {
							if(letCon[i].textContent != '') {
								//TODO: snap to container
								var rect1 = this.target.getBoundingClientRect();
      							var rect2 = letCon[i].getBoundingClientRect();

								var x = "+=" + (rect2.left - rect1.left);
								var y = "+=" + (rect2.top - rect1.top);
								
								console.log(x,y);

								gsap.to(this.target, {
									duration: 0.3,
									x: x,
									y: y,
								})

								letCon[i].children[0].classList.remove('bg-red-200');
								letCon[i].children[0].classList.remove('bg-white');
								letCon[i].children[0].classList.add('bg-green-200');
							}
						}
					} else {
						letCon[i].children[0].classList.remove('bg-red-200');
						letCon[i].children[0].classList.remove('bg-green-200');
						letCon[i].children[0].classList.add('bg-white');

					}
				}
				
			},
			
			
		});    

	});

  	return (
		<div className="bg-white" id="canvas">
			<div className="flex flex-row flex-wrap w-72 mx-auto gap-1 absolute my-0">

				{
					hiraganaArray1.map((letter, index) =>{
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
					hiraganaArray2.map((letter, index) =>{
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
			<div className="kana-sprint max-w-fit m-auto mt-7 text-3xl font-bold select-none">KANA SPRINT</div>
			<div className=" max-w-fit m-auto mb-7 text-3xl select-none">～<span className="text-red-500">かな</span>スプリント～</div>

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
			
			<Time/>
		</div>
	);
}
