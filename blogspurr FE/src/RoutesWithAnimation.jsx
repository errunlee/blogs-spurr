import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Homepage from "./pages/Home/Homepage";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import About from "./pages/About";
import Create from "./pages/createBlog/Create";
import BlogDetail from "./pages/BlogDetail";
import Editpost from "./pages/Editpost";
import Dashboard from "./pages/Admin/Dashboard";
import ManageUsers from "./pages/Admin/ManageUsers";
import Reports from "./pages/Admin/Reports";
import ViewBlog from "./components/forHome/ViewBlog";
import { useSelector } from "react-redux";
import ViewUser from "./pages/Admin/ViewUser";

function RoutesWithAnimation({ role }) {
  const location = useLocation();

  return (
    <>
      <Routes location={location} key={location.key}>
        <Route path="/" element={<Homepage />} />
        <Route path="/filter/:tag" element={<Homepage />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/create-blog" element={<Create />}></Route>
        <Route path="/viewblog/:id" element={<BlogDetail />} />
        <Route path="/viewblog" element={<ViewBlog />} />
        <Route path="*" element={<p>Path not found</p>}></Route>
        <Route path="/edit-post/:id" element={<Editpost />} />
        {role == "ADMIN" && (
          <Route path="/admin/dashboard/*" element={<Dashboard />}>
            <Route path="manageusers" element={<ManageUsers />}></Route>
            <Route path="user/:id" element={<ViewUser />} />

            <Route path="reports" element={<Reports />} />
          </Route>
        )}
      </Routes>
    </>
  );
}

export default RoutesWithAnimation;
