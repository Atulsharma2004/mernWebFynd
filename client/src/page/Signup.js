import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import signImg from '../assets/login3.gif'
import { BiShow } from 'react-icons/bi'
import { BiHide } from 'react-icons/bi'
import { ImagetoBase64 } from '../utility/ImagetoBase64'
import { toast } from 'react-hot-toast';

const Signup = () => {
    const navigate = useNavigate()
    const [showPassword, setshowPassword] = useState(false)
    const [showConfirmPassword, setshowConfirmPassword] = useState(false)
    const [data, setData] = useState({
        fname: '',
        lname: '',
        email: '',
        password: '',
        cpassword: '',
        image: '',

    })
    const handlePassword = () => {
        setshowPassword(preve => !preve)
    }

    const handleConfirmPassword = () => {
        setshowConfirmPassword(preve => !preve)
    }

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const handleProfileImage = async (e) => {
        const data = await ImagetoBase64(e.target.files[0])
        setData((preve) => {
            return {
                ...preve,
                image: data
            }
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const { fname, email, password, cpassword } = data;
        if (fname && email && password && cpassword) {
            if (password === cpassword) {
                const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/signup`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })

                const dataRes = await fetchData.json()
                // console.log(dataRes)
                // alert(dataRes.message)
                toast(dataRes.message)
                if (dataRes.alert) {
                    navigate('/login')
                }
            } else {
                alert('passwords did not match')
            }
        } else {
            alert('please fill all the fields')
        }
    }

    return (
        <div className='p-3 md:p-4 mt-3'>
            <h1 className='text-center mb-2 p-2 text-2xl font-bold bg-white max-w-sm w-full m-auto'>SignUp Form</h1>
            <div className="w-full max-w-sm bg-white m-auto flex items-center flex-col p-4">
                {/* <h1 className='text-center text-2xl font-bold'>Signup</h1> */}
                <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md relative">
                    <img src={data.image ? data.image : signImg} alt="sign_img" className='w-full h-full' />
                    <label htmlFor="profileImage">
                        <div className="absolute bottom-0 h-1/3 bg-slate-400 bg-opacity-50 w-full text-center cursor-pointer">
                            <p className='text-sm p-1 text-white'>Upload</p>
                        </div>
                        <input type="file" accept='image/*' name="profileImage" id="profileImage" className='hidden' onChange={handleProfileImage} />
                    </label>
                </div>

                <form className='w-full py-3 flex flex-col' onSubmit={handleSubmit}>
                    <label htmlFor="fname">First Name</label>
                    <input type="text" id='fname' name='fname' className='mt-1 mb-2 w-full bg-slate-200 py-1 px-2 rounded focus-within:outline-blue-300' value={data.fname} onChange={handleOnChange} />

                    <label htmlFor="lname">Last Name</label>
                    <input type="text" id='lname' name='lname' className='mt-1 mb-2 w-full bg-slate-200 py-1 px-2 rounded focus-within:outline-blue-300' value={data.lname} onChange={handleOnChange} />

                    <label htmlFor="email">Email</label>
                    <input type="email" id='email' name='email' className='mt-1 mb-2 w-full bg-slate-200 py-1 px-2 rounded focus-within:outline-blue-300' value={data.email} onChange={handleOnChange} />


                    <label htmlFor="password">Password</label>
                    <div className='flex py-1 px-2 bg-slate-200  rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300'>
                        <input type={showPassword ? "text" : "password"} id='password' name='password' className=' w-full border-none outline-none bg-slate-200' value={data.password} onChange={handleOnChange} />
                        <span className='flex text-xl cursor-pointer' onClick={handlePassword}>{showPassword ? <BiShow /> : <BiHide />}</span>
                    </div>

                    <label htmlFor="cpassword">Confirm Password</label>
                    <div className='flex py-1 px-2 bg-slate-200  rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300'>
                        <input type={showConfirmPassword ? "text" : "password"} id='cpassword' name='cpassword' className=' w-full border-none outline-none bg-slate-200' value={data.cpassword} onChange={handleOnChange} />
                        <span className='flex text-xl cursor-pointer' onClick={handleConfirmPassword}>{showConfirmPassword ? <BiShow /> : <BiHide />}</span>
                    </div>

                    <button type='submit' className='w-full  m-auto  bg-indigo-400 hover:bg-indigo-500 text-xl font-medium hover:text-white cursor-pointer py-1 rounded-full mt-4'>Signup</button>
                </form>

                <p className='text-sm'>Already have account ? <Link to={"/login"} className='text-blue-600 font-bold underline'>Login</Link></p>
            </div>
        </div>
    )
}

export default Signup