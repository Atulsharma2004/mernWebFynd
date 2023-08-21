import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import AllProduct from '../components/AllProduct'
import { addCartItem } from '../redux/productSlice'

const Menu = () => {
    const { filterby } = useParams()
    const navigate = useNavigate()
    const productData = useSelector(state => state.product.productList)

    const productDisplay = productData.filter(el => el._id && el._id === filterby)[0]

    const dispatch = useDispatch()
    const handleAddCart = (e) => {
        // e.stopPropagation()
        dispatch(addCartItem(productDisplay))
    }

    const handleBuy = () => {
        dispatch(addCartItem(productDisplay))
        navigate("/cart")
    }
    return (
        <div className='p-8 md:p-4'>
            <div className=" w-full max-w-4xl m-auto md:flex md:max-h-[320px]">
                <div className=" overflow-hidden md:max-w-lg max-h-[320px]">
                    <img src={productDisplay.image} alt="disp_img" className='hover:scale-105 transition-all h-full' />
                </div>
                <div className="flex flex-col gap-1 bg-white p-4 md:p-8">
                    <h3 className='font-semibold text-slate-700  capitalize text-2xl md:text-4xl'>{productDisplay.name}</h3>
                    <p className=' text-slate-500 font-medium capitalize text-2xl'>{productDisplay.category}</p>
                    <p className='md:text-2xl font-bold'><span className='text-green-600 '>₹</span><span>{productDisplay.price}</span>/-</p>
                    <div className="flex flex-col md:flex-row gap-3 pe-2">
                        <button className='bg-green-600 py-1 mt-2 rounded w-full hover:bg-green-800 hover:text-white min-w-[100px]' onClick={handleBuy}>Buy</button>
                        <button className='bg-green-600 py-1 mt-2 rounded w-full hover:bg-green-800 hover:text-white min-w-[100px]' onClick={handleAddCart}>Add Cart</button>
                    </div>
                    <div className="">
                        {
                            productDisplay.description ? <>
                                <p className='text-slate-600 font-medium'>Description : </p>
                                <p>{productDisplay.description}</p>
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

            <AllProduct heading={"Related Products"} />
        </div>
    )
}

export default Menu