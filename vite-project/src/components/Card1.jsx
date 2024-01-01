import React from 'react'

function Card1({img, h1, p}) {
  return (
    <div className='px-[25px]'>
        <div className='flex justify-end'>
        <img src={img} className="" />
        </div>
        <div className='pt-[60px] pb-[20px]'>
            <h1 className='text-[30px]'>{h1}</h1>
            <p>{p}</p>
        </div>
    </div>
  )
}

export default Card1
