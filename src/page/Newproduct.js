import React, { useState } from 'react'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { ImagetoBase64 } from '../utility/ImagetoBase64'
import { toast } from 'react-hot-toast'

const Newproduct = () => {
    const [data, setData] = useState({
        name: '',
        category: '',
        image: '',
        price: '',
        description: ''
    })

    const handleOnchange = (e) => {
        const { name, value } = e.target;
        setData((preve) => {
            return {
                ...preve,
                [name]: value
            };
        })
    }

    const uploadImage = async (e) => {
        const data = await ImagetoBase64(e.target.files[0])
        setData((preve) => {
            return {
                ...preve,
                image: data
            };
        })
        // console.log(data)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(data)
        const { name, image, category, price } = data;
        try {
            if (name && image && category && price) {
                const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/saveProduct`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data),
                })
                const fetchRes = await fetchData.json()
                console.log(fetchRes)
                toast.success(fetchRes.message)

                setData(() => {
                    return {
                        name: '',
                        category: '',
                        image: '',
                        price: '',
                        description: ''
                    }
                })
            } else {
                toast.error("Please enter required fields")
            }
        } catch (err) {
            console.error("Error in saving product")
        }
    }

    return (
        <div className=''>
            <form action="" className='m-auto w-full max-w-md p-3 shadow flex flex-col bg-white' onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" className='bg-slate-200 p-1 my-1' onChange={handleOnchange} value={data.name} />

                <label htmlFor="category">Category</label>
                <select name="category" id="category" className='bg-slate-200 p-1 my-1' onChange={handleOnchange} value={data.category}>
                    <option value={"other"}>Select Category</option>
                    <option value={"fruits"}>Fruits</option>
                    <option value={"vegetables"}>Vegetables</option>
                    <option value={"iceCream"}>Ice-Cream</option>
                    <option value={"cake"}>Cake</option>
                    <option value={"pizza"}>Pizza</option>
                    <option value={"rice"}>Rice</option>
                </select>

                <label htmlFor="image">Image
                    <div className="h-40  w-full bg-slate-200 rounded flex items-center justify-center cursor-pointer" >

                        {
                            data.image ? <img src={data.image} alt="data_img" className='h-full' /> : <span className='text-5xl'><FaCloudUploadAlt /></span>
                        }


                        <input type="file" accept='image/*' onChange={uploadImage} id='image' className='hidden' />
                    </div>
                </label>

                <label htmlFor="price" className='my-1'>Price</label>
                <input type="text" name="price" id="price" className='bg-slate-200 p-1 my-1' onChange={handleOnchange} value={data.price} />

                <label htmlFor="description">Description</label>
                <textarea name="description" id="description" rows="2" className='bg-slate-200 p-1 my-1 resize-none' onChange={handleOnchange} value={data.description}></textarea>

                <button className="bg-indigo-400 hover:bg-indigo-500 text-lg font-medium hover:text-white cursor-pointer  rounded-full my-2 ">Save</button>
            </form>
        </div>
    )
}

export default Newproduct