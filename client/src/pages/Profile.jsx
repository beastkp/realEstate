import React, { useState,useRef,useEffect } from "react";
import { useSelector } from "react-redux";
import {app} from '../firebase';
import {getStorage, ref, uploadBytesResumable} from 'firebase/storage'


// things to change in firebase rules for storage
//allow read;
//allow write: if
//request.resource.size < 2*1024*1024 &&
//request.resource.contentType.matches('image/.*')

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const fileRef = useRef(null);

  useEffect(()=>{
    if(file){
      handleFileUpload(file);
    }
  },[file]);

  const handleFileUpload = (file)=>{
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name; // this will give unique files everytime in case the user uploads 2 files 

    const storageRef = ref(storage,fileName); // specifies where to store the app
    const uploadTask = uploadBytesResumable(storageRef,file) // useful in showinf percentage

    uploadTask.on('state_changed', (snapshot)=>{
      const progress = (snapshot.bytesTransferred/snapshot.totalBytes) * 100;
      console.log('Upload is' + progress + '% done')

    })
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form action="" className="flex flex-col align-center gap-5">
        <img
          src={currentUser.avatar}
          alt="Profile"
          className="rounded-full h-24 w-24 object-cover self-center"
          onClick={() => fileRef.current.click()}
        />
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
          className="border p-3 rounded-lg"
        />
        <input
          type="text"
          placeholder="email"
          id="email"
          className="border p-3 rounded-lg"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="border p-3 rounded-lg"
        />
        <button className="bg-slate-700 p-3 rounded-lg text-white uppercase hover:opacity-75">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign out</span>
      </div>
    </div>
  );
  d;
};

export default Profile;
