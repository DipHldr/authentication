'use client'
import {useEffect, useState} from 'react'
import axios from 'axios';
import {toast} from 'react-hot-toast'
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const SignupPage = () => {
  const router=useRouter()
  const [user,setUser]=useState({
    email:"",
    password:"",
    userName:""
  })
  const [buttonDisabled,setButtonDisabled]=useState(false)
  const [loading,setLoading]=useState(false)
  const onSignup=async ()=>{
    try {
      setLoading(true)
      const response=await axios.post(`/api/users/signup`,user)
      setLoading(false)
      console.log("signup success: ",response.data)
      router.push('/login')
    } catch (error:any) {
      console.log("signup failed")      
      toast.error(error.message)
    }
  }
useEffect(()=>{
  if(user.email.length>0 && 
    user.password.length>0 && 
    user.userName.length>0){
      setButtonDisabled(false)
  }else{
    setButtonDisabled(true)
  }
},[user])
  return (
    <div className='flex flex-col items-center
    justify-center min-h-screen py-2'>
        <h1>{loading?"Processing":"Signup"}</h1>
        <hr />
        <label htmlFor="userName">username</label>
        <input className="p-2 border border-gray-300 rounded-lg
        mb-4 focus:outline-none focus:border-gray-600 text-black"
         type="text"
        id="userName"
        value={user.userName}
        onChange={(e)=>{setUser({...user,userName:e.target.value})}}
        placeholder="username"

         />
        <label htmlFor="email">email</label>
        <input className="p-2 border border-gray-300 rounded-lg
        mb-4 focus:outline-none focus:border-gray-600 text-black"
         type="text"
        id="email"
        value={user.email}
        onChange={(e)=>{setUser({...user,email:e.target.value})}}
        placeholder="email"

         />
        <label htmlFor="password">password</label>
        <input className="p-2 border border-gray-300 rounded-lg
        mb-4 focus:outline-none focus:border-gray-600 text-black"
         type="text"
        id="password"
        value={user.password}
        onChange={(e)=>{setUser({...user,password:e.target.value})}}
        placeholder="password"

         />

         <button disabled={buttonDisabled} onClick={onSignup}
          className="signup-btn p-2 border border-gray-300
          rounded-lg mt-4 focus:outline-none
          focus:border-gray-600">
          {buttonDisabled?"fill the form":"Signup"}
         </button>

         <Link className='mt-5' href="/login">Visit Login Page</Link>
      
    </div>
  )
}

export default SignupPage
