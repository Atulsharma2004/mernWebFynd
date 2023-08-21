
import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { setDataProduct } from './redux/productSlice';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch= useDispatch()
  // const productData=useSelector((state)=>state.product)
  // console.log(productData)
  useEffect(()=>{
    (async()=>{
      const res= await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/product`)
      const resData=await res.json()
      // console.log(resData)
      dispatch(setDataProduct(resData))
    })()
  },[dispatch])
  return (
    <>
      <Toaster/>
      <Header/>
      <main className='pt-16 bg-slate-100 min-h-[calc(100vh)]'>
        <Outlet/>
      </main>
    </>
  );
}

export default App;
