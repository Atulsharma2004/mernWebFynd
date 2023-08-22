import React, { useRef } from 'react'
import HomeCard from '../components/HomeCard'
import { useSelector } from 'react-redux'
import CardFeature from '../components/CardFeature'
import { GrPrevious, GrNext } from 'react-icons/gr'
import AllProduct from '../components/AllProduct'
import { Link } from 'react-router-dom'


const Home = () => {
    const productData = useSelector((state) => state.product)
    const homeProductList = productData.productList.slice(1, 5)
    const homeProductVegetablesList = productData.productList.filter(el => el.category === "vegetables", [])

    const loadingArray = new Array(4).fill(null)
    const loadingArrayFeature = new Array(10).fill(null)

    const slideProdectRef = useRef()
    const previousProduct = () => {
        slideProdectRef.current.scrollLeft -= 250
    }
    const nextProduct = () => {
        slideProdectRef.current.scrollLeft += 250
    }
    return (
        <>
            <div className="p-2 md:p-4">
                <div className="md:flex gap-4 py-2">


                    <div className="md:w-1/2 ">
                        <div className="flex gap-4 bg-green-200 w-64 px-5 items-center rounded-full">
                            <p className='text-sm font-medium'>Free Delivery upto 5kms...</p>
                            <img src="https://cdn2.iconfinder.com/data/icons/blue-transports-3/237/Untitled-1-512.png" alt="del_img" className='h-8' />
                        </div>
                        <h2 className='text-4xl md:text-7xl font-bold py-3 md:mt-6'>The Fastest Delivery to <span className='text-green-700'>Your Home</span></h2>
                        <p className="p-3 text-base mt-2">
                            Enjoy the convenience of having the freshest fruits, mouthwatering fast food, and a variety of nourishing vegetables delivered right to your doorstep. Our dedicated delivery services ensure that you get what you need, when you need it.
                            Whether you're looking to indulge in your favorite treats or maintain a balanced diet,Our selection is carefully curated to meet your cravings and dietary preferences.
                            Our commitment to quality and freshness guarantees that every item you receive will be of the highest standard. From farm-fresh produce to irresistible fast food options, your happiness is our priority.
                            <span className="font-semibold">Eat well, live well!</span>
                        </p>
                        <Link to={"/home"}><button className='font-bold bg-green-600 text-slate-100 px-4 rounded-md py-2 hover:text-white hover:bg-green-800 mt-6'>Order NOw</button></Link>
                    </div>


                    <div className="md:w-1/2 flex flex-wrap gap-5 p-4 justify-center">
                        {
                            homeProductList[0] ? homeProductList.map(el => {
                                return (
                                    <HomeCard key={el._id}
                                        id={el._id}
                                        image={el.image}
                                        name={el.name}
                                        price={el.price}
                                        category={el.category}
                                    />
                                )
                            })
                                : loadingArray.map((el, index) => {
                                    return (
                                        <HomeCard
                                            key={index}
                                            loading={"loading..."}
                                        />
                                    )
                                })
                        }
                    </div>
                </div>

                <div className="">
                    <div className="flex w-full items-center">
                        <h2 className='font-bold text-2xl text-slate-800 mb-4'>Freshy Vegetables</h2>
                        <div className='ml-auto flex gap-3'>
                            <button onClick={previousProduct} className='bg-slate-300 hover:bg-slate-500 text-lg p-1 rounded'><GrPrevious /></button>
                            <button onClick={nextProduct} className='bg-slate-300 hover:bg-slate-500 text-lg p-1 rounded'><GrNext /></button>
                        </div>
                    </div>
                    <div className="flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all" ref={slideProdectRef}>
                        {
                            homeProductVegetablesList[0] ? homeProductVegetablesList.map(el => {
                                return (
                                    <CardFeature
                                        key={el._id}
                                        id={el._id}
                                        image={el.image}
                                        name={el.name}
                                        price={el.price}
                                        category={el.category}
                                    />
                                )
                            })
                                : loadingArrayFeature.map((el, index) => {
                                    return (
                                        <HomeCard
                                            key={index + "hloading"}
                                            loading={"loading..."}
                                        />
                                    )
                                })
                        }

                    </div>
                </div>

                <AllProduct heading={"Your Products"} />
            </div>
        </>
    )
}

export default Home