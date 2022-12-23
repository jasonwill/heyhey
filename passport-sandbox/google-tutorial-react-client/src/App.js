import Navbar from "./components/Navbar";
import "./App.css";
import Home from "./pages/Home";
import Post from "./pages/Post";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { useState } from "react";
import { useEffect, useState } from "react";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let ignore = false;
    
    const getUser = () => {
      fetch("http://localhost:5000/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          }
          console.log('------------ERROR-----------THROW-----------')
          throw new Error("authentication has been failed!");// how is this handled, check fetch api ref
        })
        .then((resObject) => {
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log('------------ERROR-----------CAUGHT-----------')
          console.log(err);
        });
    };
    if (!ignore)
      getUser();
    return () => {
      ignore = true;
    };
  
  }, []);
  
  return (
  //   <button onClick={checkUser}>
  //   Check For User
  // </button>

    <BrowserRouter>
      <div>
        <Navbar user={user} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/post/:id"
            element={user ? <Post /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
