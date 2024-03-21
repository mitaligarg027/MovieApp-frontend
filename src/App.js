import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import './App.css';
import Login from "./components/Login";
import AddMovie from "./components/AddMovie";
import CreateMovie from "./components/CreateMovie";
import MyMovies from "./components/MyMovies"
import EditMovie from "./components/EditMovie"
import { ToastContainer } from "react-toastify";
// import Vector from './Vectors.svg'
// import Movies from "./components/Movies";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/AddMovie" element={<AddMovie />} />
          {/* <Route path="/Movies" element={<Movies />} /> */}

          <Route path="/my_movies" element={<MyMovies />} />
          <Route path="/CreateMovie" element={<CreateMovie />} />
          <Route path="/editMovie" element={<EditMovie />} />

          {/* </Route> */}
        </Routes>
      </Router>
      {/* <img src={Vector} className="fix" alt="logo" /> */}
      <ToastContainer />
    </>
  );
}

export default App;
