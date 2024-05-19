import React from "react";
import { Link, NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="flex flex-col h-screen fixed left-0 bg-slate-800 text-white gap-1 text-lg  pt-3">
      <NavLink
        to="./manageusers"
        className={({ isActive }) =>
          isActive ? "bg-slate-400 font-bold px-3" : "  px-3"
        }
      >
        Manage Users
      </NavLink>
      <NavLink
        to="./reports"
        className={({ isActive }) =>
          isActive ? "bg-slate-400 font-bold px-3" : "  px-3"
        }
      >
        Reported Blogs
      </NavLink>
    </div>
  );
};

export default Sidebar;
