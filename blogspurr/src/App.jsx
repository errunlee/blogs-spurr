import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import { addBlog, signIn } from "./features/blogSlices";
import Homepage from "./pages/Home/Homepage";
import authService from "./firebase/auth";
import { signOut } from "firebase/auth";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Navbar from "./components/Navbar/Nav";
import Create from "./pages/createBlog/Create";
import BlogDetail from "./pages/BlogDetail";
import Signup from "./pages/auth/Signup";
import Footer from "./components/Footer/Footer";
import About from "./pages/About";
import Editpost from "./pages/Editpost";
import { AnimatePresence } from "framer-motion";
import RoutesWithAnimation from "./RoutesWithAnimation";
import LocationProvider from "./LocationProvider";
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
        <LocationProvider>
          <RoutesWithAnimation />
        </LocationProvider>
        <Footer />
      </Router>
    </>
  );
}

export default App;
