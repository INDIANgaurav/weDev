import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className=' w-full p-4 text-center gap-2 bg-gray-700 h-screen flex  flex-col items-center justify-center text-white font-roboto    '>
       
      <h1>Welcome to the <span className='font-bold text-2xl'>WeDev </span> Community 🙌 </h1>
      <span>Here you can find the tasks of what topic you want 😎  </span>
      <div className='flex items-center justify-center gap-10 '>
        <div className='flex flex-col'>

        <Link to="/login" className='border rounded-2xl bg-green-900 px-2 hover:scale-110 cursor-pointer' >
        <button   >Login</button>
        </Link>
        if registered
        </div>
        <div className='flex flex-col'>

        <Link  className='border rounded-2xl bg-blue-900 px-2 hover:scale-110 cursor-pointer'to="/signup">
        <button  >Signup</button>
        </Link>
    not registered ?
        </div>
      </div>
    </div>
  )
}

export default Home
