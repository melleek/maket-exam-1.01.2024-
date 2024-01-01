import React from 'react'

function Card4({img, p}) {
  return (
    <div className='jkl lg:w-[379px] p-[35px] flex flex-col items-start gap-[10px]'>
        <img src={img} alt="" />
        <p className='text-[#bfbebe]'>{p}</p>
    </div>
  )
}

export default Card4
