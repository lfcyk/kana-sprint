'use client';

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";


export default function DraggableLetter(props) {
	var droppables = document.querySelectorAll(".letter-container");

  	useGSAP((e) => {
		gsap.registerPlugin(Draggable);
		Draggable.create(".kana-card", {
			bounds: document.getElementById("canvas"),
			onDragEnd: (e) => {
				console.log(e);
				if(Draggable.hitTest('.kana-card', "#canvas")) {
					console.log('hit');
				}
				
			},
		});

    
	});

	return (
		<div 
			className="kana-card border-2 border-black size-16 align-middle flex items-center select-none bg-white"
			>
			<div className="mx-auto text-3xl text-red-600 font-bold select-none">{props.letter}</div>
		</div> 
	)
}
