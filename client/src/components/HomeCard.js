import React from 'react'
import { Link } from 'react-router-dom'

const HomeCard = ({ name, image, category, price, loading, id }) => {
    return (
        <>
            <Link to={`/menu/${id}`} onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}>
                <div className='bg-white shadow-md p-2 rounded'>
                    <div className="w-40 h-36">
                        {
                            image ? <img src={image} alt="" className='w-full h-full' /> : <p className='flex justify-center items-center h-full'>{loading}</p>
                        }
                    </div>
                    <h3 className='font-semibold text-slate-700 text-center capitalize text-lg'>{name}</h3>
                    <p className='text-center text-slate-500 font-medium capitalize'>{category}</p>
                    {
                        name && <p className='text-center font-bold'><span className='text-green-600 '>₹</span><span>{price}</span>/-</p>
                    }
                </div>
            </Link>
        </>
    )
}

export default HomeCard