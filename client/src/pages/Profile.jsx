import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
  deleteUserStart,
  deleteUserFailure,
  deleteUserSuccess,
} from "../redux/user/userSlice";
import axios from "axios";
import {useNavigate} from "react-router-dom"

// things to change in firebase rules for storage
//allow read;
//allow write: if
//request.resource.size < 2*1024*1024 &&
//request.resource.contentType.matches('image/.*')

const Profile = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [fileperc, setFileperc] = useState(0);
  const [fileError, setFileerror] = useState(false);
  const fileRef = useRef(null);
  const [formData, setformData] = useState({});
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  // console.log(formData);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name; // this will give unique files everytime in case the user uploads 2 files

    const storageRef = ref(storage, fileName); // specifies where to store the app
    const uploadTask = uploadBytesResumable(storageRef, file); // useful in showinf percentage

    // console.log(storageRef);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFileperc(Math.round(progress));
        // console.log("Upload is" + Math.round(progress) + "% done");
      },
      (error) => {
        setFileerror(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setformData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };

  const handleDelete = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await axios.delete(
        `http://localhost:3000/api/v1/user/delete/${currentUser._id}`,
        {
          withCredentials: true,
        }
      );
      console.log(res);
      if(res.status === 200){
        dispatch(deleteUserSuccess());
        Navigate('/sign-up')
      }
      else{

        dispatch(deleteUserFailure("Cannot delete user"));
      }

    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  const handleChange = (e) => {
    setformData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await axios.patch(
        `http://localhost:3000/api/v1/user/update/${currentUser._id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        dispatch(updateUserSuccess(res.data));
        console.log(res);
      } else {
        console.log("There was a problem");
      }
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form
        action=""
        className="flex flex-col align-center gap-5"
        onSubmit={handleSubmit}
      >
        <img
          src={formData.avatar || currentUser.avatar}
          alt="Profile"
          className="rounded-full h-24 w-24 object-cover self-center"
          onClick={() => fileRef.current.click()}
        />
        <p className="text-sm text-center">
          {fileError ? (
            <span className="text-red-700">
              {" "}
              Error Uploading the image (Size must be less than 5MB)
            </span>
          ) : fileperc > 0 && fileperc < 100 ? (
            <span className="text-slate-700">{`Uploading ${fileperc}`}</span>
          ) : fileperc == 100 ? (
            <span className="text-green-500">Successfully Uploaded</span>
          ) : (
            ""
          )}
        </p>
        {/* for text you use text-center for image you use self-center */}
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])} // choose the first file
        />
        <input
          type="text"
          placeholder="username"
          id="username"
          defaultValue={currentUser.username}
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="email"
          id="email"
          defaultValue={currentUser.email}
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <button className="bg-slate-700 p-3 rounded-lg text-white uppercase hover:opacity-75">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer" onClick={handleDelete}>
          Delete Account
        </span>
        <span className="text-red-700 cursor-pointer">Sign out</span>
      </div>
      {error ? (
        <p className="text-red-500 mt-2">`${error}`</p>
      ) : (
        <p className="text-green-500 mt-2">User updated Successfully!</p>
      )}
    </div>
  );
};

export default Profile;
