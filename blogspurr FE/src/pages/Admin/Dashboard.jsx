import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

const   Dashboard = ({children}) => {
  return (
    <div>
        <Sidebar/> 
      <div className='ms-[15%]'>  <Outlet/>   </div>
    </div>
  )
}

export default Dashboard