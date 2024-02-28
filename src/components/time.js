'use client';

import { useEffect, useState, useRef } from "react";

export default function Time() {
    const [elapsedTime, setElapsedTime]  = useState(0);
    const [startTime, setStartTime] = useState(Date.now())
    let currentTime;
    useEffect(() => {
        timeInc();
        return () => clearInterval(timeHandler.current)
    })
    
    let timeHandler = useRef()
    function timeInc() {
        timeHandler.current = setInterval(() => {
            currentTime = new Date().getTime();
            setElapsedTime(currentTime - startTime);
        }, 10)
    }

    function stop() {
        clearInterval(timeHandler.current);
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
        <div className="mx-auto mt-20 text-8xl w-7/12 select-none">
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
    )
    }
