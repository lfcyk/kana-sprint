'use client';

import { isMobile } from "react-device-detect";

export default function DraggableLetter(props) {

	return (
		<>
			{
				isMobile
				?
				<div className="mx-auto text-xl text-red-600 font-bold select-none">{props.letter}</div>
				:
				<div className="mx-auto text-3xl text-red-600 font-bold select-none">{props.letter}</div>
			}
		</> 
	)
}
