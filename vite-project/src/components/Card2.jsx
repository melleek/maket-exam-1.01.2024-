import React from 'react'

function Card2({img, h1, ig, st}) {
  return (
    <div>
        <img src={img} className="" />
        <div className='pt-[20px] pb-[20px] flex items-center justify-between'>
            <h1>{h1}</h1>
            <img src={st} alt="" />
        </div>
        <img src={ig} alt="" />
    </div>
  )
}

export default Card2
