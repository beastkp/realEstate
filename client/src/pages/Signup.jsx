import React from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {
  return (
    <div className="mx-auto max-w-lg p-3 m-3">
      <h1 className="text-3xl text-center font-bold">Sign up</h1>
      <form className="flex flex-col gap-4 p-3 m-3  ">
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg"
          id="username"
        />
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
        />
        <input
          type="password "
          placeholder="password "
          className="border p-3 rounded-lg"
          id="password"
        />
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-60">
          Sign up
        </button>
      </form>
      <div className="flex gap-2 m-3 p-3">
        <p className=''>Have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-800 hover:underline">Sign in</span>
        </Link>
      </div>
    </div>
  );
}

export default Signup