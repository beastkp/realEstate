import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Header from "./Components/Header";
import PrivateRoute from "./Components/PrivateRoute";
import CreateListing from "./pages/CreateListing";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/sign-in" element={<Signin />} />
          <Route exact path="/sign-up" element={<Signup />} />
          <Route exact path="/about" element={<About />} />
          <Route exact element={<PrivateRoute />}>
            <Route exact path="/profile" element={<Profile />} />
          </Route>
          <Route exact element={<PrivateRoute />}>
            <Route exact path="/createListing" element={<CreateListing />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
