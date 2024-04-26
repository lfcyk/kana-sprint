'use client';

import { useEffect, useState, useRef } from "react";
import { isMobile } from "react-device-detect";

export default function Time({isFinished, setElapsedTime, elapsedTime}) {
    const [startTime, setStartTime] = useState(Date.now());
    let timeHandler = useRef()

    let currentTime;

    if(isFinished) {
        stop();
    }
    
    useEffect(() => {
        timeInc();
        return () => clearInterval(timeHandler.current)
    })
    
    
    function timeInc() {
        timeHandler.current = setInterval(() => {
            if(!isFinished) {
                currentTime = new Date().getTime();
                setElapsedTime(currentTime - startTime);
            }
        }, 10)
    }

    function stop() {
        clearInterval(timeHandler.current);
        const timer = document.querySelector('.timer');
        timer.classList.add('text-green-500');
        // onGameComplete();
    }
        
    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
    let seconds = Math.floor(elapsedTime / 1000 % 60);
    let milliseconds = Math.floor(elapsedTime % 1000);
    
    hours = String(hours).padStart(2, '0');
    minutes = String(minutes).padStart(2, '0');
    seconds = String(seconds).padStart(2, '0');
    milliseconds = String(milliseconds).padStart(3, '0');
    
    
    return (
        <>
            {
                isMobile
                ?
                <div className={`timer mx-auto text-lg font-bold w-7/12 select-none`}>
                    <div className=" mx-auto  flex flex-row gap-0 justify-evenly">
                        <div className="">{hours}</div>
                        <div>:</div>
                        <div className="">{minutes}</div>
                        <div>:</div>
                        <div className="">{seconds}</div>
                        <div>:</div>
                        <div className="">{milliseconds}</div>
                    </div>
                </div>
                :
                <div className={`timer mx-auto mt-14 text-8xl w-7/12 select-none`}>
                    <div className=" mx-auto text-8xl flex flex-row gap-2 justify-evenly">
                        <div className="w-32">{hours}</div>
                        <div>:</div>
                        <div className="w-32">{minutes}</div>
                        <div>:</div>
                        <div className=" w-32">{seconds}</div>
                        <div>:</div>
                        <div className="w-44">{milliseconds}</div>
                    </div>
                </div>
            }
        </>
    )
}