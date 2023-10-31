import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";
import OAuth from "../Components/OAuth";

const Signin = () => {
  const [formData, setformData] = useState({});
  const {loading, error} = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);
    dispatch(signInStart());
    const res = await axios.post("/api/v1/auth/signin", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status === 201) {
      // setLoading(false);
      dispatch(signInSuccess(res.data)); // we need the data of the user in the payload for displying it on profile page
      navigate("/");
      console.log(res.data);
    } else {
      // setLoading(false);
      dispatch(signInFailure(res.message));
      console.log("Fill in the detais");
      console.log(res)
      return;
    }
  };

  return (
    <div className="mx-auto max-w-lg p-3 m-3">
      {loading ? (
        <h1 className="text-3xl text-center font-bold">Loading ...</h1>
      ) : (
        <h1 className="text-3xl text-center font-bold">Sign in</h1>
      )}
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
        <OAuth/>
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
