import React from 'react'
import Home from './pages/Home'
import Course from './pages/Course'
import { Navigate, Outlet, Route, Routes } from "react-router-dom"
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Signup from './pages/Signup'
import { Toaster } from 'react-hot-toast';
import { useAuth } from './context/AuthProvider'

function App() {
  const [authUser,setAuthUser] = useAuth(); 

  return (
    <>   
      <div className='dark:bg-slate-900 dark:text-white'> 
      <Routes>  
        <Route  path="/" 
        element={
        <>
        <Navbar/>  
        <Outlet/>
        <Footer/>
        </>} 
        > 

        <Route index element={<Home/>}/> 
        <Route path="course" element={authUser?<Course/>:<Navigate to="/signup" />}/> 
         
        </Route> 
        <Route path='/signup' element={<Signup/>} />
      </Routes>  
      <Toaster/>
      </div>

    </>
  )
}

export default App