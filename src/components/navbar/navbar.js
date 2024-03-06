import { buttonData } from "@/data/buttonData.js";
import NavbarButton from "./navbarButton";

function NavBar() {

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
