'use client'
import React,{useEffect,useState} from 'react'
import axios from 'axios';
import Link from 'next/link'
import {toast} from 'react-hot-toast'
import {useRouter} from 'next/navigation'
const ProfilePage =() => {
   const router=useRouter()
   const [data,setData]=useState("nothing")
   const getUserDetails=async()=>{
    try {
        
        const response=await axios.post("/api/users/me")
        console.log(response.data.data._id)
        setData(response.data.data._id)
    } catch (error) {
        console.log("could not get user data")
        toast.error("could not get user data")
    }
   }

   const logout=async()=>{
    try {
        await axios.get("/api/users/logout")
        toast.success("logout success")
        router.push("/login")
    } catch (error:any) {
        console.log(error.message)
        toast.error(error.message)
        
    }
   }
  return (
    // <Link href={`/profile/${data}`}>Test {data}</Link>
    <div className='flex flex-col items-center
    justify-center min-h-screen py-2'>
        <h1>Profile Page</h1>
        <hr />
       <h2>{data==="nothing"?"Nothing to display":<Link href={`/profile/${data}`}>{data}</Link>}</h2>
       <hr />
       <button className='bg-blue-500 mt-4 hover:bg-blue-700
       text-white font-bold py-2 px-4 rounded' 
       onClick={logout}>Logout</button>
       <button className='bg-red-500 mt-4 hover:bg-red-700
       text-white font-bold py-2 px-4 rounded' 
       onClick={getUserDetails}>Get User Details</button>
    </div>
  )
}

export default ProfilePage
