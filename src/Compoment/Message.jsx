import React, { useContext } from 'react'
import { PageContext } from '../Context/OptionPage'

export default function Message() {
    const [ , , , , Message, setMessage] = useContext(PageContext)

    const CloseMessage = () => {
        setMessage({
            OnShow: false,
            Content: ""
        })
    }
  return (
    <div className={Message.OnShow === true ? 'fixed flex z-[3] right-5 bottom-5 justify-center items-stretch bg-white rounded-3xl overflow-hidden duration-500 ease-in' : "fixed flex z-[3] right-5 bottom-5 justify-center items-stretch bg-white rounded-3xl overflow-hidden translate-x-[350px] duration-300 ease-in"}>
        <div>
            <button className='p-3 h-full' onClick={CloseMessage}>
               <i class="fa-solid fa-xmark text-[30px] p-1"></i> 
            </button>
        </div>
        <div className='w-[250px] bg-slate-800 text-white p-2 rounded-r-3xl flex justify-center items-center'>
            <div>
                <p className='text-wrap text-center'>{Message.Content}</p>
            </div>
            
        </div>
        <div className={ Message.OnShow === true ? 'absolute w-full h-[5px] bg-zinc-300 bottom-0 translate-x-full duration-[10s] ease-linear' : 'absolute w-full h-[5px] bg-zinc-300 bottom-0 duration-[10s] ease-linear'}></div>
    </div>
  )
}