import React, { useRef, useState } from "react";
import authService from "../../firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { signUserOut } from "../../features/blogSlices";
import { NavLink, useNavigate } from "react-router-dom";
import './Navbar.css'
const Navbar = () => {

  const navRef = useRef(null)
  const switchShowNav = () => {
    navRef.current.classList.toggle('show')
  }


  const isLoggedIn = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await authService.logUserOut();
      dispatch(signUserOut());
    } catch (e) {
      console.log("error logging out: ", error);
    }
  };
  return (
    <div>
      <nav className="bg-gray-700 text-white p-3">
        <ul className="flex justify-around items-center">
          <li>
            <NavLink  to="/" className="font-bold text-2xl text-yellow-400">Blogsspurr</NavLink>
          </li>
          <div className="flex gap-3 items-center ">
            <div ref={navRef} className={`flex  gap-3  nav-links items-center justify-center`}>
              <NavLink onClick={switchShowNav} className={({ isActive }) => (isActive ? 'text-slate-400 font-bold' : '')} to='/'>Home</NavLink>
              <NavLink onClick={switchShowNav} className={({ isActive }) => (isActive ? 'text-slate-400 font-bold' : '')} to='/about'>About</NavLink>
              <NavLink onClick={switchShowNav} className={({ isActive }) => isActive ? 'text-slate-400 font-bold' : ''}
                to='/create-blog'>Create Post</NavLink>
                <img onClick={switchShowNav} className="close-btn" width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/multiply.png" alt="multiply"/>
            </div>

            {isLoggedIn ? (
              <button
                className=""
                onClick={handleLogout}
              >
                Logout
              </button>

            ) : (
              <NavLink className={({ isActive }) => isActive ? 'text-slate-400 font-bold' : ''} to="/login"> Login </NavLink>
            )}
            <div className="toggle-nav block md:hidden" >
              <img onClick={switchShowNav} width="36" height="24" src="https://img.icons8.com/fluency/48/menu--v1.png" alt="menu--v1" />
            </div>
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
