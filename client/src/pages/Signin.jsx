import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signin = () => {
  const [formData, setformData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const navigate = useNavigate();
  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await axios.post("/api/v1/auth/signin", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status === 201) {
      setLoading(false);
      navigate("/");
      console.log(res);
    } else {
      setLoading(false);
      console.log("Fill in the detais");
    }
  };

  return (
    <div className="mx-auto max-w-lg p-3 m-3">
      <h1 className="text-3xl text-center font-bold">Sign in</h1>
      <form className="flex flex-col gap-4 p-3 m-3" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password "
          placeholder="password "
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-60">
          Sign in
        </button>
      </form>
      <div className="flex gap-2 m-3 p-3">
        <p className="">Don't have an account?</p>
        <Link to="/sign-up">
          <span className="text-blue-800 hover:underline">Sign up</span>
        </Link>
      </div>
    </div>
  );
};

export default Signin;
