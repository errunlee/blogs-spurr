import React from "react";
import authService from "../../firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { signUserOut } from "../../features/blogSlices";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

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
            <NavLink to="/" className="font-bold text-2xl text-yellow-400">Blogsspurr</NavLink>
          </li>
          <div className="flex gap-3">
            <NavLink className={({ isActive }) => (isActive ? 'text-slate-400 font-bold' : '')} to='/'>Home</NavLink>
            <NavLink className={({ isActive }) => (isActive ? 'text-slate-400 font-bold' : '')} to='/about'>About</NavLink>
            <NavLink className={({ isActive }) => isActive ? 'text-slate-400 font-bold' : ''}
              to='/create-blog'>Create Post</NavLink>
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
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
