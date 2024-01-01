import React from 'react'

function Card3({h1, p, img}) {
  return (
    <div>
        <div className='flex flex-col gap-[10px] items-start'>
            <h1 className='text-[40px] font-[700]'>{h1}</h1>
            <p className='w-[110px]'>{p}</p>
        </div>
        <img src={img} className="mt-[200px]" />
    </div>
  )
}

export default Card3
