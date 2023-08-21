import React, { useEffect, useState } from 'react'
import FilterProduct from './FilterProduct'
import CardFeature from './CardFeature'
import { useSelector } from 'react-redux'

const AllProduct = ({ heading }) => {
    const productData = useSelector((state) => state.product.productList)
    const categoryList = [...new Set(productData.map(el => el.category))]
    // console.log(categoryList)

    const [filterby, setFilterby] = useState("");
    const [dataFilter, setDataFilter] = useState([])

    useEffect(() => {
        setDataFilter(productData)
    }, [productData])

    const handleFilterProduct = (category) => {
        setFilterby(category);
        const filter = productData.filter(el => el.category && el.category === category)
        setDataFilter(() => {
            return [
                ...filter
            ]
        })
        // setDataFilter(filter);
    }

    const loadingArrayFeature = new Array(10).fill(null)
    return (
        <div className="my-5">
            <h2 className='font-bold text-2xl text-slate-800 mb-4'>{heading}</h2>

            <div className="flex gap-4 justify-center overflow-scroll scrollbar-none">
                {
                    categoryList[0] ? categoryList.map((el, index) => {
                        return (
                            <FilterProduct
                                key={index}
                                category={el}
                                onClick={() => handleFilterProduct(el)}
                                isActive={el === filterby}
                            />
                        )
                    })
                        : (
                            <div className="min-h-[150px] flex justify-center items-center">
                                <p>Loading...</p>
                            </div>
                        )
                }
            </div>

            <div className="flex flex-wrap justify-center gap-4 my-4">
                {
                    dataFilter ? dataFilter.map(el => {
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
                                <CardFeature
                                    key={index + "floading"}
                                    loading={"loading..."}
                                />
                            )
                        })
                }
            </div>
        </div>
    )
}

export default AllProduct