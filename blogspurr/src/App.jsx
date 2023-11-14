import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import { addBlog, signIn } from "./features/blogSlices";
import Homepage from "./pages/Home/Homepage";
import authService from "./firebase/auth";
import { signOut } from "firebase/auth";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import  Navbar  from "./components/Navbar/Nav";
import Create from "./pages/createBlog/Create";
function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await authService.getCurrentUser();
        if (user) {
          dispatch(signIn({ user }));
        } else {
          dispatch(signOut());
        }
      } catch (error) {
        console.error("Error fetching current user:");
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  return (
    <>
      <Router>
      <Navbar />

        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path='/create-blog' element={<Create/>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
