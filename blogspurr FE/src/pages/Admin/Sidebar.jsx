
import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='flex flex-col h-screen fixed left-0 bg-slate-800 text-white gap-3 text-lg p-1 pt-3'>
    <Link to='./manageusers' className='border-b  px-3'>Manage Users</Link>
    <Link to='./reports' className=' border-b px-3'>Reported Blogs</Link>
    </div>

  )
}

export default Sidebar