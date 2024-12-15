import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Login from '../components/Login'
import { useForm } from 'react-hook-form';
import axios from 'axios'; 
import toast from 'react-hot-toast';


function Signup() {
  
  const { register, handleSubmit, formState: { errors } } = useForm(); 
  const navigate = useNavigate(); 

  const onSubmit = async (data) => {
    const userInfo = {
     name: data.name, 
     email: data.email, 
     password: data.password, 
    } 
    await axios.post("http://localhost:3000/user/signup",userInfo).then((res)=>{
      console.log(res.data) 
      if(res.data){
          toast.success("Login Successfully");  
          localStorage.setItem('User',JSON.stringify(res.data.user))  
          navigate('/') 

        }
    }).catch((err)=>{
      if(err.response){
        console.log(err) 
        toast.error("Error "+err.response.data.message) 

      }
    })
  };

  return (
    <>
<div className='flex h-screen items-center justify-center'>
<div >
  <div className="modal-box">
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* if there is a button in form, it will close the modal */}
      <Link to='/' className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" >✕</Link>
    <h3 className="font-bold text-lg">Signup</h3>  
    
    <div className='mt-4 space-y-2'>
        <span>Name</span>  
        <br />
        <input type="text" placeholder='Enter your Name' className='w-80 px-3 py-1 border rounded-md outline-none'
        {...register("name", { required: "Name is required" })}
        />  
        {errors.name && <span className="text-sm text-red-500">{errors.name.message}</span>}


    </div> 


    <div className='mt-4 space-y-2'>
        <span>Email</span>  
        <br />
        <input type="email" placeholder='Enter your Email' className='w-80 px-3 py-1 border rounded-md outline-none'
        {...register("email", { required: "Email is required" })}
        /> 
        {errors.email && <span className="text-sm text-red-500">{errors.email.message}</span>}


    </div> 
        <div className='mt-4 space-y-2'>
        <span>Password</span>  
        <br />
        <input type="password" placeholder='Enter your Password' className='w-80 px-3 py-1 border rounded-md outline-none'
        {...register("password", { required: "Password is required" })}
        /> 
        {errors.password && <span className="text-sm text-red-500">{errors.password.message}</span>}


    </div> 
    <div className='mt-4'>
        <button className='bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200' type='submit'>Signup</button> 
        <p className='mt-3'>Have Account?<button type="button" className='underline text-blue-500 cursor-pointer' onClick={()=>document.getElementById("my_modal_3").showModal()}>Login</button>
        </p>
       
    </div>
    </form>
  </div>
</div> 
</div> 
        <Login/>

    </>
  )
}

export default Signup