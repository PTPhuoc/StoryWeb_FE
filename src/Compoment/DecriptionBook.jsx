import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function DecriptionBook() {
    const [BookInfor, SetBookInfor] = useState({})
    useEffect(() => {
        const Name = window.localStorage.getItem("NameBook")
        axios.post("http://localhost:9000/Book/GetBookInfor", {Name: Name}).then( result => {
            SetBookInfor(result.data)
        }).catch( err => {
            console.log(err)
        })
    },[])

  return (
    <div className='flex flex-col fixed gap-[8px] right-0 top-[85px] h-full bg-neutral-200 w-[220px] justify-start items-center border-slate-500 border-l-4 border-r-4'>
        <div>
            <img className='w-full' alt='' src={"./Image/" + BookInfor.Image}></img>
        </div>
        <div className='w-full p-1'>
            <p>Tên: </p>
            <p className='text-center font-bold truncate'>{BookInfor.Name}</p>
        </div>
        <div className='w-full h-[3px] bg-black'></div>
        <div className='w-full p-1'>
            <p>Tác Giả: </p>
            <p className='text-center font-bold truncate'>{BookInfor.Author}</p>
        </div>
        <div className='w-full h-[3px] bg-black'></div>
        <div className='w-full p-1'>
            <p>Số Chương: </p>
            <p className='text-center font-bold'>{BookInfor.Chapter} Chương</p>
        </div>
        <div className='w-full h-[3px] bg-black'></div>
        <div className='w-full p-1'>
            <p>Lượt Xem: </p>
            <p className='text-center font-bold'>{BookInfor.Views} Lượt Xem</p>
        </div>
        <div className='w-full h-[3px] bg-black'></div>
        <div className='w-full p-1'>
            <p>Ngày Phát Hành: </p>
            <p className='text-center font-bold'>{BookInfor.Date}</p>
        </div>
    </div>
  )
}
