import React, { useState } from 'react'
import logo from '../assets/logo.jpg'
import { Link } from 'react-router-dom'
import { FaRegUserCircle } from 'react-icons/fa'
import { BsCartFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { logoutRedux } from '../redux/userSlice'
import toast from 'react-hot-toast'

const Header = () => {
	const [showMenu, setShowMenu] = useState(false)
	const userData = useSelector((state) => state.user)
	// console.log(userData.email)
	const dispatch = useDispatch()
	const handleShowMenu = () => {
		setShowMenu(preve => !preve);
	}
	const handleLogout = () => {
		dispatch(logoutRedux())
		toast.success('Logout successfully');
	}
	// console.log(process.env.REACT_APP_ADMIN_EMAIL)

	const cartItemNumer = useSelector(state => state.product.cartItem)
	return (
		<header className='fixed shadow-md w-full h-16 px-2 md:px-4 z-50 bg-white'>
			{/* desktop */}
			<div className="nav flex items-center h-full justify-between me-4">
				<Link to={"home"}>
					<div className="logo h-16 ms-4">
						<img src={logo} alt="img_logo" className='h-full' />
					</div>
				</Link>

				<div className='flex items-center gap-4 md:gap-7'>
					<nav className='hidden md:flex gap-4 md:gap-7 text-base md:text-lg'>
						<Link to={"home"}>Home</Link>
						<Link to={"menu/64dbb0ebb1bbda3aff314a49"}>Menu</Link>
						<Link to={"about"}>About</Link>
						<Link to={"contact"}>Contact</Link>
					</nav>

					<div className="text-2xl text-slate-600 relative cursor-pointer">
						<Link to={"cart"}>
							<BsCartFill />
							<div className="absolute -top-2 -right-1 text-white bg-red-500 h-5 text-sm w-4  text-center rounded-full p-0 m-0">
								{(cartItemNumer.length > 0 && <span>{cartItemNumer.length}</span>) || 0}
							</div>
						</Link>
					</div>
					<div className=' text-slate-600 ' onClick={handleShowMenu}>
						<div className="text-3xl cursor-pointer w-8 h-8 rounded-full overflow-hidden drop-shadow-md">
							{userData.image ? <img src={userData.image} className='h-full w-full' alt='profile_img' /> : <FaRegUserCircle />}
						</div>

						{
							showMenu && (
								<div className="absolute top-14  right-2 bg-white py-2  shadow drop-shadow-md flex flex-col min-w-[120px] text-center">
									{
										userData.email === process.env.REACT_APP_ADMIN_EMAIL && <Link to={'newproduct'} className='whitespace-nowrap cursor-pointer px-2'>New Product</Link>
									}

									{userData.image ? <p className='cursor-pointer text-white bg-red-500 px-2' onClick={handleLogout}>Logout ({userData.fname})</p> : <Link to={'login'} className='whitespace-nowrap cursor-pointer px-2'>Login</Link>}

									<nav className='flex flex-col text-base md:text-lg md:hidden'>
										<Link to={"home"} className='px-2 py-1'>Home</Link>
										<Link to={"menu/64dbb0ebb1bbda3aff314a49"} className='px-2 py-1'>Menu</Link>
										<Link to={"about"} className='px-2 py-1'>About</Link>
										<Link to={"contact"} className='px-2 py-1'>Contact</Link>
									</nav>
								</div>
							)
						}
					</div>

				</div>
			</div>


			{/* mobile */}
		</header>
	)
}

export default Header