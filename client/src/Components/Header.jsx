import React, { useEffect, useState } from "react";
import logo from "../assets/logo.jpg";
import { HiOutlineUserCircle } from "react-icons/hi";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMenu, AiOutlineCloseCircle } from "react-icons/ai";
import { useSelector } from "react-redux";

const Header = () => {
  const Navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e)=>{
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search); // inbuilt javascript class for accessing the query parameters in the url, window .location.search is used to access the part of the url after the ?
    urlParams.set('searchTerm',searchTerm);
    const searchQuery = urlParams.toString();
    Navigate(`/search?${searchQuery}`);

  }
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl  = urlParams.get('searchTerm'); // onsubmit we set the urlparams to searchterm now we are getting it
    if(searchTermFromUrl){
      setSearchTerm(searchTermFromUrl);
    }

  },[location.search])
  return (
    <header className="bg-slate-300 h-[90px] flex justify-between mx-auto max-w-full items-center ">
      <div className="p-2">
        <Link to="/">
          <img src={logo} alt="" className="h-[70px] " />
        </Link>
      </div>
      {toggle ? (
        <div className="mr-3" >
          <AiOutlineCloseCircle
            onClick={() => setToggle(!toggle)}
            className="text-slate-800 block md:hidden text-3xl "
          />
        </div>
      ) : (
        <div className="mr-3">
          <AiOutlineMenu
            onClick={() => setToggle(!toggle)}
            className="text-slate-800 block md:hidden text-3xl"
          />
        </div>
      )}

      <ul className="md:flex hidden gap-5 text-slate-700">
        <li className="hover:underline text-bold p-3">
          <Link to="/">Home</Link>
        </li>
        <li className="hover:underline text-bold p-3">
          <Link to="/about">About</Link>
        </li>
        <li className="hover:underline text-bold p-3">
          {currentUser ? (
            <Link to="/profile">Profile</Link>
          ) : (
            <Link to="/sign-in">Sign-in</Link>
          )}
        </li>
      </ul>

      <ul
        className={`md:hidden fixed duration-500 w-full h-screen top-24 text-white bg-black p-4 ${
          toggle ? "left-[0]" : "left-[-100%]"
        }`}
      >
        <li className="p-3">
          <Link to="/">Home</Link>
        </li>
        <li className="p-3">
          <Link to="/about">About</Link>
        </li>
        <li className="p-3">
          <Link to="/sign-up">Sign In</Link>
        </li>
        <li className="p-3">
          <Link to="/profile">Profile</Link>
        </li>
      </ul>

   
        <div className=" md:flex justify-between gap-5 m-3 p-3 items-center hidden">
          <form
            action=""
            className="bg-slate-100 rounded-xl flex items-center "
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Search..."
              className=" border-black p-2 bg-transparent"
              default value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="p-2">
              <button>
                <FaSearch className="bg-transparent focus:outline-none" />
              </button>
            </span>
          </form>
          {/* <HiOutlineUserCircle className="md:text-4xl" /> */}
          <Link to="/profile">
            {currentUser?.avatar ? (
              <img
                src={currentUser.avatar}
                alt=""
                className="rounded-full h-9 w-9"
              />
            ) : (
              <HiOutlineUserCircle className="md:text-4xl" />
            )}
          </Link>
        </div>
    </header>
  );
};

export default Header;
