import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const Contact = () => {

    const navigate = useNavigate()
    const user = useSelector(state => state.user)
    const [data, setData] = useState({
        fname: '',
        email: '',
        message: '',
    })

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
        e.preventDefault()
        const { fname, email, message } = data;
        if (fname && email && message) {

            const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/contact`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })

            if (user.email) {
                const dataRes = await fetchData.json()
                // console.log(dataRes)
                // alert(dataRes.message)
                toast(dataRes.message)
                if (dataRes.alert) {
                    navigate('/home')
                } else {
                    toast.error('Something wents wrong!')
                }
            } else {
                toast.error("Please login first!")
                navigate('/login')
            }

        } else {
            alert('please fill all the fields')
        }
    }
    return (
        <div className="flex flex-col items-center justify-center mt-16 bg-gray-100">
            <h2 className="max-w-2xl text-center p-2 text-3xl text-green-500 font-semibold mb-4 bg-white w-full">Feel free to Contact Us !</h2>
            <div className="max-w-2xl w-full p-6 bg-white rounded-md shadow-md">
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col space-y-1">
                        <label htmlFor="name" className="text-sm font-medium">
                            Name
                        </label>
                        <input
                            type="text"
                            id="fname"
                            name="fname"
                            className="px-3 py-2 border rounded-md "
                            placeholder="Your Name"
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="flex flex-col space-y-1">
                        <label htmlFor="email" className="text-sm font-medium">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="px-3 py-2 border rounded-md "
                            placeholder="you@example.com"
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="flex flex-col space-y-1">
                        <label htmlFor="message" className="text-sm font-medium">
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            rows="4"
                            className="px-3 py-2 border rounded-md "
                            placeholder="Your message here"
                            onChange={handleOnChange}
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="max-w-3xl w-full text-lg font-bold px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Contact;
