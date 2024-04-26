import Flag from 'react-world-flags'
import { useState } from 'react'

import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import styles from './styles.module.css';

import { msToTime } from '@/utils/msToTime';
import { format } from 'date-fns';
import { isMobile } from 'react-device-detect';
  
function Table({character, data, isLoading}) {
    const [pagination, setPagination] = useState(1);
    const pages = Math.ceil(data.length/10);
    const showData = data.slice((pagination-1)*10, (pagination)*10);

    if(isMobile) {
        return (
        <div className='flex flex-col h-full select-none px-3 '>
            <div className={`max-w-fit mx-auto text-2xl font-bold ${character == 'hiragana' ? 'text-orange-300' : 'text-green-300'}`}>
                { character == 'hiragana' ? 'ひらがな' : 'カタカナ'}
            </div>
            <div className={`${character == 'hiragana' ? 'bg-orange-200' : 'bg-green-200'}  mt-3 ${styles.card} flex flex-col text-sm min-h-[25rem] w-full`}>
                <div className={`${character == 'hiragana' ? 'bg-orange-400' : 'bg-green-400'} flex flex-row text-center p-1 font-bold mx-auto w-full`}>
                        <div className=' w-full'>
                            Name
                        </div>
                        <div className=' min-w-3'>
                            
                        </div>
                        <div className=' min-w-24'>
                            Time
                        </div>
                        <div className=' min-w-24 max-w-28'>
                            Date
                        </div>
                </div>
                <div className={`text-xs flex flex-col  ${isLoading? 'grow justify-center items-center' : ''}`}>	
                    {
                        isLoading
                        ? <div className='mx-auto font-bold text-xl'>Loading...</div>
                        :showData.map((score, index) => {
                            return (
                                <div key={index} className='flex flex-row items-center my-1'>
                                    <div className='px-2 flex flex-row gap-1 align-middle items-center justify-between w-full'>
                                        {score.username} 
                                        <div className=' min-w-5 text-md'>
                                            <Flag code={ score.country } />
                                        </div>
                                    </div>
                                    <div className='text-center  min-w-24'>
                                        {msToTime(score.time)}
                                    </div>
                                    <div className='text-center min-w-24'>
                                        {format(score.date, 'EEEEEE, MM/dd/yyyy')}
                                        <br/>
                                        {format(score.date, 'hh:mm bbb')}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className='flex flex-row justify-end gap-5 mt-2 mx-auto w-72'>
                <button 
                    className={`${character == 'hiragana' ? 'text-orange-400' : 'text-green-400'} text-xl font-bold`}
                    onClick={() => {
                        setPagination((prevState) => {
                            return prevState - 1;
                        })
                    }}
                    disabled={pagination == 1}
                    ><MdNavigateBefore/></button>
                <input 
                    className={`max-w-fit border-2 px-1 w-7 text-center ${character == 'hiragana' ? 'border-orange-200 placeholder-orange-400' : 'border-green-200 placeholder-green-400'}`}
                    placeholder='...'
                    onChange={(e) => {
                        setPagination(e.target.value)
                    }}
                    value={pagination}

                    >
                </input>
                <button 
                    className={`${character == 'hiragana' ? 'text-orange-400' : 'text-green-400'} text-xl font-bold`}
                    onClick={() => {
                        setPagination((prevState) => {
                            return prevState + 1;
                        })
                    }}
                    disabled={pagination == pages}
                ><MdNavigateNext/></button>
            </div>
        </div>
        )
    }
    return (
        <div className='flex flex-col h-full select-none'>
            <div className={`max-w-fit mx-auto text-2xl font-bold ${character == 'hiragana' ? 'text-orange-300' : 'text-green-300'}`}>
                { character == 'hiragana' ? 'ひらがな' : 'カタカナ'}
            </div>
            <div className={`${character == 'hiragana' ? 'bg-orange-200' : 'bg-green-200'}  mt-3 ${styles.card} min-h-[25rem] flex flex-col`}>
                <div className={`${character == 'hiragana' ? 'bg-orange-400' : 'bg-green-400'} flex flex-row text-center p-1 font-bold`}>
                        <div className='w-10'>
                            No.	
                        </div>
                        <div className=' w-48'>
                            Name
                        </div>
                        <div className='w-10'>
                            
                        </div>
                        <div className=' w-36'>
                            Time
                        </div>
                        <div className=' w-48'>
                            Date
                        </div>
                </div>
                <div className={`flex flex-col  ${isLoading? 'grow justify-center items-center' : ''}`}>	
                    {
                        isLoading
                        ? <div className='mx-auto font-bold text-xl'>Loading...</div>
                        :showData.map((score, index) => {
                            return (
                                <div key={index} className='flex flex-row items-center my-1'>
                                    <div className='text-center w-10'>
                                        {index+1}
                                    </div>
                                    <div className='px-2  w-48'>
                                        {score.username} 
                                    </div>
                                    <div className='text-center w-10'>
                                        <Flag code={ score.country } />
                                    </div>
                                    <div className='text-center  w-36'>
                                        {msToTime(score.time)}
                                    </div>
                                    <div className='text-center w-48'>
                                        {format(score.date, 'EEEEEE, MM/dd/yyyy hh:mm bbb')}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className='flex flex-row justify-end gap-5 mt-2'>
                <button 
                    className={`${character == 'hiragana' ? 'text-orange-400' : 'text-green-400'} text-xl font-bold`}
                    onClick={() => {
                        setPagination((prevState) => {
                            return prevState - 1;
                        })
                    }}
                    disabled={pagination == 1}
                    ><MdNavigateBefore/></button>
                <input 
                    className={`max-w-fit border-2 px-1 w-7 text-center ${character == 'hiragana' ? 'border-orange-200 placeholder-orange-400' : 'border-green-200 placeholder-green-400'}`}
                    placeholder='...'
                    onChange={(e) => {
                        setPagination(e.target.value)
                    }}
                    value={pagination}

                    >
                </input>
                <button 
                    className={`${character == 'hiragana' ? 'text-orange-400' : 'text-green-400'} text-xl font-bold`}
                    onClick={() => {
                        setPagination((prevState) => {
                            return prevState + 1;
                        })
                    }}
                    disabled={pagination == pages}
                ><MdNavigateNext/></button>
            </div>
        </div>
    )
}

export default Table
