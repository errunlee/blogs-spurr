

import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Homepage from './pages/Home/Homepage';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import About from './pages/About';
import Create from './pages/createBlog/Create';
import BlogDetail from './pages/BlogDetail';
import Editpost from './pages/Editpost';

function RoutesWithAnimation() {
    const location=useLocation();
    console.log(location);

  return (
    <>
        <Routes location={location} key={location.key}>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path='/create-blog' element={<Create/>}></Route>
          <Route path='/viewblog/:id' element={<BlogDetail/>}/>
          <Route path='/edit-post/:id' element={<Editpost/>}/>
        </Routes>
    </>
  )
}

export default RoutesWithAnimation