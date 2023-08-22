import React from 'react'
import { Link } from 'react-router-dom'
import { addCartItem } from '../redux/productSlice'
import { useDispatch } from 'react-redux'

const CardFeature = ({ image, name, price, category, loading, id }) => {
    const dispatch = useDispatch()
    const handleAddCart = (e) => {
        // e.stopPropagation()
        dispatch(addCartItem({
            _id: id,
            name: name,
            image: image,
            price: price,
            category: category
        }))
    }
    return (
        <div className='w-full min-w-[220px] max-w-[220px] bg-white drop-shadow-lg hover:shadow-lg cursor-pointer py-5 px-4'>
            {/* <!-- card --> */}
            <Link to={`/menu/${id}`} onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}>
                <div className="h-36 flex flex-col justify-center items-center">
                    {
                        image ? <img src={image} alt="" className=' h-full' /> : <p className='flex justify-center items-center h-full'>{loading}</p>
                    }
                </div>

                <h3 className='font-semibold mt-3 text-slate-700 text-center capitalize text-lg'>{name}</h3>
                <p className='text-center text-slate-500 font-medium capitalize'>{category}</p>
            </Link>
            {
                name && <>
                    <p className='text-center font-bold'><span className='text-green-600 '>₹</span><span>{price}</span>/-</p>
                    <button className='bg-green-600 py-1 mt-2 rounded w-full hover:bg-green-800 hover:text-white' onClick={handleAddCart}>Add Cart</button>
                </>
            }


        </div>
    )
}

export default CardFeature