import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from "axios" 
import toast from 'react-hot-toast';

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm(); 

  const onSubmit = async (data) => { 
        const userInfo = {
     name: data.name, 
     email: data.email, 
     password: data.password, 
    } 
    await axios.post("http://localhost:3000/user/login",userInfo).then((res)=>{
      console.log(res.data) 
      if(res.data){
        toast.success("Login Successfully") 
        setTimeout(()=>{
          document.getElementById("my_modal_3").close()  
          localStorage.setItem('User',JSON.stringify(res.data.user))  
          window.location.reload() 
        },1000)

      }
    }).catch((err)=>{
      if(err.response){
        toast.error("Error "+err.response.data.message) 
        setTimeout(()=>{},3000)
      }
    })
  };

  return (
    <div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form onSubmit={handleSubmit(onSubmit)} method='dialog'>
            <Link to="/" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => document.getElementById("my_modal_3").close()}
>✕</Link>
            <h3 className="font-bold text-lg">Login</h3>
            <div className="mt-4 space-y-2">
              <span>Email</span>
              <br />
              <input
                type="email"
                placeholder="Enter your Email"
                className="w-80 px-3 py-1 border rounded-md outline-none"
                {...register("email", { required: "Email is required" })}
              />
              <br />
              {errors.email && <span className="text-sm text-red-500">{errors.email.message}</span>}
            </div>

            <div className="mt-4 space-y-2">
              <span>Password</span>
              <br />
              <input
                type="password"
                placeholder="Enter your Password"
                className="w-80 px-3 py-1 border rounded-md outline-none"
                {...register("password", { required: "Password is required" })}
              />
              <br />
              {errors.password && <span className="text-sm text-red-500">{errors.password.message}</span>}
            </div>

            <div className="mt-4">
              <button className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200" type="submit">
                Login
              </button>
              <p className="mt-3">
                Not Registered? <Link to="/signup" className="underline text-blue-500 cursor-pointer">Signup</Link>
              </p>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default Login;


