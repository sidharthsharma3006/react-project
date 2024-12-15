import React from 'react'
import { useAuth } from '../context/AuthProvider'
import toast from 'react-hot-toast'

function Logout() { 
  const [authUser,setAuthUser] = useAuth()  
  const handleLogout = ()=>{
    try{
       setAuthUser({
        user:null
       }) 
       localStorage.removeItem("User") 
       toast.success("Logout Successfully") 
         setTimeout(()=>{ 
            window.location.reload(); 
        },2000)


     } 
    catch(error){
       toast.error("Error:"+error.message) 
       setTimeout(()=>{
        window.location.reload(); 
       },3000)  
    }
  }

  return (
    <div>
        <button className='px-3 py-2 bg-red-500 text-white rounded-md cursor-pointer' onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Logout