import React from 'react'
import payment from '../assets/cancelled.png'


const Cancel = () => {
    return (
        <div className='bg-red-200 w-full max-w-sm m-auto h-36 w-max-[200px]  shadow-2xl mt-14 border-slate-700 '>
            <div className="flex flex-col font-semibold text-xl">
                <h1 className="text-center mb-5 mt-3">Payment Cancelled...!</h1>
                <img src={payment} alt="payment_img" className='h-[300px]' />
            </div>
        </div>
    )
}

export default Cancel