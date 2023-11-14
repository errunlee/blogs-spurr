import React from "react";
import authService from "../../firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { signUserOut } from "../../features/blogSlices";
import { Link, useNavigate } from "react-router-dom";

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
        <ul className="flex justify-around">
          <li>
            <Link to="/">Blogsspurr</Link>
          </li>
          <div className="flex gap-3">
            <li>Home</li>
            <li>About</li>
            <Link to='/create-blog'>Create Post</Link>
            {isLoggedIn ? (
              <button
                className=""
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <Link to="/login"> Login </Link>
            )}
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
