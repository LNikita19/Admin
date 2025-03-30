import "./App.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import Navbar from "./component/Home/Navbar";
import Login from "./component/Login/login";
import Home from "./component/Home/Home";
import About from "./component/About/About";
import ContactUsPage from "./component/contact/contact";
import Author from "./component/Author/Author";
import Testimonials from "./component/Testimonials/Testimonial";
import Footer from "./component/Footer/Footer";
import Program from "./component/Program/Program";
import ProgramList from "./component/Program/ProgramLIst";
import OnlineClass from "./component/Onlineclass/OnlineClass";
import ClassList from "./component/Onlineclass/ClassList";
import ComboProgram from "./component/Program/Combo/Comboprogram";
import Existingprogram from "./component/Program/Existing/Existingprogram";

// ✅ Private Route Wrapper
const PrivateRoute = ({ element, isLoggedIn }) => {
  return isLoggedIn ? element : <Navigate replace to="/login" />;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // ✅ Check if token exists in localStorage
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <>
      <Router>
        <ToastContainer position="bottom-right" />
        <div className="flex w-full bg-[#FFF9E1]">
          {isLoggedIn && <Navbar />} {/* ✅ Show Navbar only when logged in */}
          <div className="flex-grow">
            <Routes>
              {/* Redirect "/" to Login or Home based on auth */}
              <Route path="/" element={isLoggedIn ? <Navigate replace to="/Home" /> : <Navigate replace to="/login" />} />

              {/* Public Route: Login */}
              <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />

              {/* Protected Routes */}
              <Route path="/Home" element={<PrivateRoute element={<Home />} isLoggedIn={isLoggedIn} />} />
              <Route path="/About" element={<PrivateRoute element={<About />} isLoggedIn={isLoggedIn} />} />
              <Route path="/ContactUsPage" element={<PrivateRoute element={<ContactUsPage />} isLoggedIn={isLoggedIn} />} />
              <Route path="/Author" element={<PrivateRoute element={<Author />} isLoggedIn={isLoggedIn} />} />
              <Route path="/Testimonials" element={<PrivateRoute element={<Testimonials />} isLoggedIn={isLoggedIn} />} />
              <Route path="/Footer" element={<PrivateRoute element={<Footer />} isLoggedIn={isLoggedIn} />} />

              {/* Programs */}
              <Route path="/Program" element={<PrivateRoute element={<Program />} isLoggedIn={isLoggedIn} />} />
              <Route path="/Program/:id" element={<PrivateRoute element={<Program />} isLoggedIn={isLoggedIn} />} />
              <Route path="/ProgramList" element={<PrivateRoute element={<ProgramList />} isLoggedIn={isLoggedIn} />} />

              {/* Online Classes */}
              <Route path="/OnlineClass" element={<PrivateRoute element={<OnlineClass />} isLoggedIn={isLoggedIn} />} />
              <Route path="/OnlineClass/:id" element={<PrivateRoute element={<OnlineClass />} isLoggedIn={isLoggedIn} />} />
              <Route path="/ClassList" element={<PrivateRoute element={<ClassList />} isLoggedIn={isLoggedIn} />} />

              {/* Combo & Existing Programs */}
              <Route path="/ComboProgram" element={<PrivateRoute element={<ComboProgram />} isLoggedIn={isLoggedIn} />} />
              <Route path="/ComboProgram/:id" element={<PrivateRoute element={<ComboProgram />} isLoggedIn={isLoggedIn} />} />
              <Route path="/Existingprogram" element={<PrivateRoute element={<Existingprogram />} isLoggedIn={isLoggedIn} />} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
