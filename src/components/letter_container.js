import { ItemTypes } from "@/utils/itemtypes"
import { useState } from "react"
import { isMobile } from "react-device-detect";

export default function LetterContainer(props) {
  const [isHover, setIsHover] = useState(false);

  return (
    <>
      {
        isMobile
        ?
        <div 
        className={`letter-container size-8 border align-middle flex items-center select-none ${props.letter == "" ? "border-white" : "border-black"} ${isHover && props.letter != ""? "bg-gray-200" : "bg-white"}`}
        onMouseEnter={() => {setIsHover(true)}}
        onMouseLeave={() => {setIsHover(false)}}
      >
        <div className="mx-auto text-sm font-bold">
            {props.letter}
        </div>
      </div>
        :
        <div 
        className={`letter-container border size-16 align-middle flex items-center select-none ${props.letter == "" ? "border-white" : "border-black"} ${isHover && props.letter != ""? "bg-gray-200" : "bg-white"}`}
        onMouseEnter={() => {setIsHover(true)}}
        onMouseLeave={() => {setIsHover(false)}}
      >
        <div className="mx-auto text-xl font-bold">
            {props.letter}
        </div>
      </div>
      }
      
    </>
  )
}
