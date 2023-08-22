import React from 'react'
import payment from '../assets/payment.gif'

const Success = () => {
    return (
        <div className='bg-green-200 w-full max-w-md m-auto h-36  shadow-2xl mt-14 border-slate-700'>
            <div className="flex flex-col font-semibold text-xl">
                <h1 className="text-center mb-5 mt-3">Payment Done Successfully...!</h1>
                <img src={payment} alt="payment_img" />
            </div>
        </div>
    )
}

export default Success