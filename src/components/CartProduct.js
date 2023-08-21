import React from 'react'
import { FaPlus } from 'react-icons/fa'
import { FaMinus } from 'react-icons/fa'
import { AiFillDelete } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { deleteCartItem, increaseQty, decreaseQty } from '../redux/productSlice'

const CartProduct = ({ id, name, image, category, description, qty, price, total }) => {
    const dispatch = useDispatch()
    return (
        <>
            <div className='bg-slate-200 p-2 md:flex gap-4 m-4 rounded border border-slate-300 max-w-3xl'>
                <div className=" flex-shrink-0 bg-white p-3 rounded overflow-hidden ">
                    <img src={image} alt="prod_img" className=' md:h-[180px] md:w-40 ' />
                </div>

                <div className="flex-grow flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                        <h3 className='font-semibold text-slate-700  capitalize text-lg md:text-xl'>{name}</h3>
                        <span className='font-bold text-xl text-slate-700 hover:text-red-700 p-2 cursor-pointer' onClick={() => dispatch(deleteCartItem(id))}><AiFillDelete /></span>
                    </div>
                    <p className=' text-slate-500 font-medium capitalize text-base'>{category}</p>
                    <p className='md:text-xl font-bold'><span className='text-green-600 '>₹</span><span>{price}</span>/-</p>



                    <div className='flex justify-between items-center'>
                        <div className="flex gap-3 items-center">
                            <button className='bg-slate-300 rounded  hover:bg-slate-500 hover:text-white p-2' onClick={() => dispatch(increaseQty(id))}><FaPlus /></button>
                            <p className='font-semibold p-1'>{qty}</p>
                            <button className='bg-slate-300 rounded  hover:bg-slate-500 hover:text-white p-2' onClick={() => dispatch(decreaseQty(id))}><FaMinus /></button>
                        </div>
                        <div className="flex items-center gap-3 font-bold text-slate-700">
                            <p>Total : </p>
                            <p><span className='text-green-600 '>₹</span> {total}</p>
                        </div>
                    </div>

                    <div className="mt-2">
                        {
                            description ? <>
                                <p className='text-slate-600 font-medium'>Description : </p>
                                <p>{description}</p>
                            </>
                                :
                                <>
                                    <p className='text-slate-600 font-medium'>Description : </p>
                                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda, qui!</p>
                                </>
                        }
                    </div>

                </div>
            </div>
        </>
    )
}

export default CartProduct