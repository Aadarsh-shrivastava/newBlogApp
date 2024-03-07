import React from "react";
import Navbar from "./Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import SignUp from "./SignUp/SignUp";
import Login from "./Login/Login.jsx";
import Home from "./Home/Home.jsx";
import Home2 from "./Home/Home2.jsx";
import AddPage from "./AddPage/AddPage.jsx";

function App() {
  const user = localStorage.getItem("token");

  return (
    <div>
      <Navbar />
      <Routes>
        {user && <Route path="/" element={<Home2 />} />}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/addPost" element={<AddPage />} />
      </Routes>
    </div>
  );
}

export default App;
