import React from 'react'
import { useSelector } from 'react-redux'
import CartProduct from '../components/CartProduct'
import { Link, useNavigate } from 'react-router-dom'
// import cartmen2 from '../assets/cartmen2.png'
import cartem2 from '../assets/cartem.gif'
import { toast } from 'react-hot-toast'
import { loadStripe } from '@stripe/stripe-js'

const Cart = () => {
    const productCartItem = useSelector((state) => state.product.cartItem)
    // console.log(productCartItem)
    const user = useSelector(state => state.user)
    const navigate = useNavigate()
    const totalPrice = productCartItem.reduce((acc, curr) => acc + parseInt(curr.total), 0)
    const totalQty = productCartItem.reduce((acc, curr) => acc + parseInt(curr.qty), 0)

    const handlePayment = async () => {

        if (user.email) {
            const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)
            const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/checkout-payment`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(productCartItem)
            })

            if (res.statusCode === 500) return;
            const data = await res.json()
            // console.log(data)

            toast("Redirecting to payment Gateway...!")
            stripePromise.redirectToCheckout({ sessionId: data })
        } else {
            toast.error('Please login first...!')
            setTimeout(() => {
                navigate('/login')
            }, 1000)
        }

    }

    return (

        <div className='p-4 md:p-8'>
            {
                productCartItem[0] ?
                    <>
                        <h2 className='text-lg md:text-2xl font-bold text-slate-600 mb-4'>Your Added Items</h2>
                        <div className="md:flex md:gap-4">
                            {/*display cart items */}
                            <div className="w-full max-w-3xl">
                                {
                                    productCartItem.map(el => {
                                        return (
                                            <CartProduct
                                                key={el._id}
                                                id={el._id}
                                                name={el.name}
                                                qty={el.qty}
                                                price={el.price}
                                                image={el.image}
                                                total={el.total}
                                                category={el.category}
                                                description={el.description}
                                            />
                                        )
                                    })

                                }
                            </div>

                            {/* total cart items */}
                            <div className="md:w-full max-w-md   ml-auto">
                                <h2 className='bg-blue-500 text-white p-2 text-lg'>Summary</h2>
                                <div className="flex w-full py-2 text-lg border-b">
                                    <p>Total Qty : </p>
                                    <p className='ml-auto w-32 font-bold'>{totalQty}</p>
                                </div>
                                <div className="flex w-full py-2 text-lg border-b">
                                    <p>Total Price : </p>
                                    <p className='ml-auto w-32 font-bold'><span className='text-green-600 '>₹</span> {totalPrice}</p>
                                </div>
                                <button className="bg-green-400 w-full text-lg font-bold py-2 hover:bg-green-700 hover:text-white" onClick={handlePayment}>Payment</button>
                            </div>
                        </div>
                    </>
                    :
                    <div className="p2 md:p-4 mt-4">
                        <div className="flex flex-col justify-center items-center">
                            <h1 className="text-3xl font-bold mb-2 text-center">Cart Empty 🙁</h1>
                            <p className="text-gray-500 text-lg mb-12">Lorem, ipsum dolor sit amet consectetur adipisicing elit. <br /> Fugiat dolorem maxime harum voluptatibus architect.</p>
                            <img className="w-1/5 mx-auto" src={cartem2} alt="cartman_img" />
                            <Link to={"/home"} className="inline-block  mt-12 "><button className='px-6 py-2 rounded-full  font-bold bg-slate-500 hover:bg-slate-800 hover:text-white'>Go Back</button></Link>
                        </div>
                    </div>
            }
        </div>
    )
}

export default Cart
