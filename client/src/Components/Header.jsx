import React, { useState } from "react";
import logo from "../assets/logo.jpg";
import { HiOutlineUserCircle } from "react-icons/hi";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AiOutlineMenu, AiOutlineCloseCircle } from "react-icons/ai";
import { useSelector } from "react-redux";

const Header = () => {
  const [toggle, setToggle] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  return (
    <header className="bg-slate-300 h-[90px] flex justify-between mx-auto max-w-full items-center">
      <div className="p-2 m-1 fixed">
        <Link to="/">
          <img src={logo} alt="" className="h-[70px]" />
        </Link>
      </div>
      {toggle ? (
        <div className="ml-96">
          <AiOutlineCloseCircle
            onClick={() => setToggle(!toggle)}
            className="text-slate-800 block md:hidden text-3xl "
          />
        </div>
      ) : (
        <div className="ml-96">
          <AiOutlineMenu
            onClick={() => setToggle(!toggle)}
            className="text-slate-800 block md:hidden text-3xl"
          />
        </div>
      )}

      <ul className="md:flex hidden gap-10 p-7 text-slate-700">
        <li className="hover:underline text-bold">
          <Link to="/">Home</Link>
        </li>
        <li className="hover:underline text-bold">
          <Link to="/about">About</Link>
        </li>
        <li className="hover:underline text-bold">
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

      <div>
        <div className=" md:flex justify-between gap-5 m-3 p-3 items-center hidden">
          <form
            action=""
            className="bg-slate-100 rounded-xl flex items-center "
          >
            <input
              type="text"
              placeholder="Search..."
              className=" border-black p-2 bg-transparent"
            />
            <span className="p-2">
              <FaSearch className="bg-transparent focus:outline-none" />
            </span>
          </form>
          {/* <HiOutlineUserCircle className="md:text-4xl" /> */}
          <Link to="/profile">
            {currentUser?.avatar ?
            (
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
      </div>
    </header>
  );
};

export default Header;
