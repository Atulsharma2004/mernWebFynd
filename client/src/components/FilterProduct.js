import React from 'react'
import { GiKnifeFork } from 'react-icons/gi'

const FilterProduct = ({ category, onClick, isActive }) => {
    return (
        <div onClick={onClick}>
            <div className={`text-3xl p-6 bg-green-400 rounded-full cursor-pointer ${isActive && "bg-green-800 text-white"}`}>
                <GiKnifeFork />
            </div>
            <p className='text-center font-medium my-1 capatalize'>{category}</p>
        </div>
    )
}

export default FilterProduct
