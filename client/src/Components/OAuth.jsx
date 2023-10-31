import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app); // we give app to this function so that firebase recognises which application is creating the request

      const result = await signInWithPopup(auth, provider);

      console.log(result);
      const res = await fetch("/api/v1/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });

      const data = await res.json();
      console.log(res);
      if (res.status === 201) {
        dispatch(signInSuccess(data));
        Navigate("/");
      }
    } catch (error) {
      console.log("Coudnt sign in with google", error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className="bg-red-700 p-3 text-white rounded-lg hover:opacity-75"
    >
      Continue with Google
    </button>
    // we have used the type as button too prevent this button from submitting the details in the form since it is present in the form in signin and signup components
  );
};

export default OAuth;
