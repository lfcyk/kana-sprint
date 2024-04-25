'use client';

import { buttonData } from "@/data/buttonData.js";
import NavbarButton from "./navbarButton";
import { isMobile } from "react-device-detect";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import NavbarButtonMobile from "./navbarButtonMobile";



function NavBar() {
	const [isBarActive, setIsBarActive] = useState(false);

	function onTap() {
		setIsBarActive(!isBarActive);
	}

	if(isMobile) {
		return (
			<div className="flex flex-col fixed w-full z-20">
				<div className="flex flex-row justify-between py-3 bg-white border-2">
					<div className="ml-3">
						<div className="kana-sprint max-w-fit m-auto text-sm font-bold select-none">Kana Sprint</div>
						<div className=" max-w-fit m-auto text-xs select-none font-bold">～<span className="text-red-500">かな</span>スプリント～</div>
					</div>
					<div className="text-4xl mr-3">
						<FaBars onClick={onTap}/>
					</div>
				</div>
				{
					isBarActive?
					<div className="flex flex-col">
						{
							buttonData.map((button, index) => {
								return (
									<NavbarButtonMobile route={button.route} text={button.text} textColor={button.textColor} bgColorChill={button.bgColorChill} key={index}/>
								)
							})
							
						}
					</div>
					: ''	
				}
				
			</div>
		)
	}

	return (
		<div className="flex flex-row gap-5 mt-2 mx-5 justify-between">
			<div className="">
				<div className="kana-sprint max-w-fit m-auto text-lg font-bold select-none">Kana Sprint</div>
				<div className=" max-w-fit m-auto text-md select-none font-bold">～<span className="text-red-500">かな</span>スプリント～</div>
			</div>
			<div className="flex flex-row gap-5">
				{
					buttonData.map((button, index) => {
						return (
							<NavbarButton route={button.route} text={button.text} bgColor={button.bgColor} key={index}/>
						)
					})
				}
			</div>
		</div>
	)
}

export default NavBar
