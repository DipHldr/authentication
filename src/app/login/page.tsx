'use client'
import React from 'react'
import {useEffect, useState} from 'react'
import axios from 'axios';
import {toast} from 'react-hot-toast'
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const LoginPage = () => {
  const router=useRouter()
  const [user,setUser]=useState({
    email:"",
    password:""
  })
  const [buttonDisabled,setButtonDisabled]=useState(false)
  const [loading,setLoading]=useState(false)
  const onLogin=async ()=>{
    try {
      setLoading(true)
      const response=await axios.post(`/api/users/login`,user)
      setLoading(false)
      console.log("login success: ",response.data)
      router.push('/profile')
    } catch (error:any) {
      console.log("login failed")      
      toast.error(error.message)
    }
  }
useEffect(()=>{
  if(user.email.length>0 && 
    user.password.length>0){
      setButtonDisabled(false)
  }else{
    setButtonDisabled(true)
  }
},[user])
  return (
    <div className='flex flex-col items-center
    justify-center min-h-screen py-2'>
        <h1>{loading?"Processing":"Login"}</h1>
        <hr />
        
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

         <button disabled={buttonDisabled} onClick={onLogin}
          className="signup-btn p-2 border border-gray-300
          rounded-lg mt-4 focus:outline-none
          focus:border-gray-600">
          {buttonDisabled?"fill the form":"Login"}
         </button>

         <Link className='mt-5' href="/signup">Signup</Link>
      
    </div>
  )
}

export default LoginPage


