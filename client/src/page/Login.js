import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import signImg from '../assets/login3.gif'
import { BiShow } from 'react-icons/bi'
import { BiHide } from 'react-icons/bi'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import { loginRedux } from '../redux/userSlice'

const Login = () => {


  const [showPassword, setshowPassword] = useState(false)
  const [data, setData] = useState({
    email: '',
    password: '',

  })

  const navigate = useNavigate()

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user); // Replace with the actual selector path
  useEffect(() => {
    // console.log(userData); // Log the updated userData whenever it changes
  }, [userData]);

  const handlePassword = () => {
    setshowPassword(preve => !preve)
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


  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const { email, password } = data; // Extract email and password from 'data' object
    if (email && password) { // Check if both email and password are provided
      try {
        const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data) // Convert 'data' object to JSON and send as the request body
        });

        const dataRes = await fetchData.json(); // Parse the response JSON

        toast.success('Logged in successfully'); // Display a toast message with the response message

        if (dataRes.alert) { // Check if the response contains an 'alert'
          dispatch(loginRedux(dataRes)); // Dispatch a Redux action with the response data
          setTimeout(() => {
            navigate("/home"); // Navigate to the homepage after a delay of 1 second
          }, 1000);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    } else {
      alert('please fill all the fields');
    }
  }




  return (
    <div className='p-3 md:p-4 mt-3'>

      <h1 className='text-center mb-2 p-2 text-2xl font-bold bg-white max-w-sm w-full m-auto'>Login Form</h1>

      <div className="w-full max-w-sm bg-white m-auto flex items-center flex-col p-4">
        {/* <h1 className='text-center text-2xl font-bold'>Signup</h1> */}
        <div className="w-20 overflow-hidden rounded-full drop-shadow-md shadow-md">
          <img src={signImg} alt="sign_img" className='w-full' />
        </div>



        <form className='w-full py-3 flex flex-col' onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input type="email" id='email' name='email' className='mt-1 mb-2 w-full bg-slate-200 py-1 px-2 rounded focus-within:outline-blue-300' value={data.email} onChange={handleOnChange} />


          <label htmlFor="password">Password</label>
          <div className='flex py-1 px-2 bg-slate-200  rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300'>
            <input type={showPassword ? "text" : "password"} id='password' name='password' className=' w-full border-none outline-none bg-slate-200' value={data.password} onChange={handleOnChange} />
            <span className='flex text-xl cursor-pointer' onClick={handlePassword}>{showPassword ? <BiShow /> : <BiHide />}</span>
          </div>

          <button type='submit' className='w-full  m-auto  bg-indigo-400 hover:bg-indigo-500 text-xl font-medium hover:text-white cursor-pointer py-1 rounded-full mt-4'>Login</button>
        </form>


        <p className='text-sm'>Not registered yet ? <Link to={"/signup"} className='text-blue-600 font-bold underline'>Register</Link></p>
      </div>
    </div>
  )
}

export default Login