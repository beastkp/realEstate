import React, { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import axios from 'axios'
import {useSelector,useDispatch} from 'react-redux'
import { useNavigate } from "react-router-dom";

const CreateListing = () => {

  const navigate = useNavigate()

  const {currentUser} = useSelector((state)=>state.user)
  const [files, setFiles] = useState([]);
  const [formdata, setFormdata] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [error,setError] = useState(false);
  const [loading,setLoading] = useState(false);

  // console.log(files);
  // console.log(formdata);
  const handleImageSubmit = () => {
    if (files.length > 0 && files.length + formdata.imageUrls.length < 7) {
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      console.log(promises);
      Promise.all(promises)
        .then((urls) => {
          // this waits for all promises to be resolved in the promises array.
          setFormdata({
            ...formdata,
            imageUrls: formdata.imageUrls.concat(urls), // we want to add different images to the array
          });
          setImageUploadError(false);
        })
        .catch((err) => {
          setImageUploadError("Image upload failed (2mb max per image)");
        });
    } else {
      setImageUploadError("You can upload only 6 images per listing");
    }
  };

  const handleDeleteImage = (index) => {
    setFormdata({
      ...formdata,
      imageUrls: formdata.imageUrls.filter((_, i) => i !== index),
    });
  };
  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress} done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      if(formdata.imageUrls.length<1){
        return setError("Please upload atleast one image")
      }
      if(+formdata.regularPrice < +formdata.discountPrice){ // + is used to convert string to number
        return setError('Discount price must be lower than Actual Price')
      }
      setLoading(true);
      setError(false);
      const res = await axios.post(
        "/api/v1/listing/create",
        { ...formdata, userRef: currentUser._id },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if(res.status === 201){
        setLoading(false);
        navigate(`/listing/${res.data.data._id}`)
      }
      else{
        setError(res.message)
        console.log("There was an error")
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }
  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormdata({ ...formdata, type: e.target.id });
    } // because we want only 1 to be checked sale or  rent and not both
    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setFormdata({ ...formdata, [e.target.id]: e.target.checked });
    }
    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormdata({ ...formdata, [e.target.id]: e.target.value }); // we add[] in e.target.id to get the name and not the value so if you dont use brackets, it will come as a string "type":rent but we want it as type:rent
    }
  };
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="font-bold text-3xl text-center my-7">Create Listing</h1>
      <form action="" className="flex flex-col sm:flex-row gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            id="name"
            maxLength="62"
            required
            className="border p-3 rounded-xl"
            onChange={handleChange}
            value={formdata.name}
          />
          <textarea
            type="text"
            placeholder="description"
            id="description"
            required
            className="border p-3 rounded-xl"
            onChange={handleChange}
            value={formdata.description}
          />
          <input
            type="text"
            placeholder="Address"
            id="address"
            required
            className="border p-3 rounded-xl"
            onChange={handleChange}
            value={formdata.address}
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2 ">
              <input
                type="checkbox"
                id="sale"
                className="w-5"
                onChange={handleChange}
                checked={formdata.type === "sale"}
              />
              <span>Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                onChange={handleChange}
                checked={formdata.type === "rent"}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                onChange={handleChange}
                checked={formdata.parking}
              />
              <span>Parking Spot</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                onChange={handleChange}
                checked={formdata.furnished}
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                onChange={handleChange}
                checked={formdata.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-400 rounded-lg"
                onChange={handleChange}
                value={formdata.bedrooms}
              />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="5"
                required
                className="p-3 border border-gray-400 rounded-lg"
                onChange={handleChange}
                value={formdata.bathrooms}
              />
              <p>Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                min="1"
                max="1000000"
                required
                className="p-3 border border-gray-400 rounded-lg"
                onChange={handleChange}
                value={formdata.regularPrice}
              />
              <div className="flex flex-col items-center">
                <p>Regular Price</p>
                <span className="text-xs">($ / month)</span>
              </div>
            </div>
            {formdata.offer && (

            <div className="flex items-center gap-2">
              <input
                type="number"
                id="discountPrice"
                min="1"
                max="1000000"
                required
                className="p-3 border border-gray-400 rounded-lg"
                onChange={handleChange}
                value={formdata.discountPrice}
              />
              <div className="flex flex-col items-center">
                <p>Discounted Price</p>
                <span className="text-xs">($ / month)</span>
              </div>
            </div>
            )}
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              The first Image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              className="p-3 border border-gray-300 w-full rounded"
              type="file"
              id="images"
              accept="image/*"
              multiple
              required
              onChange={(e) => setFiles(e.target.files)}
            />
            <button
              className="p-3 text-green-700 border border-green-700 hover:shadow-lg"
              type="button"
              onClick={handleImageSubmit}
            >
              Upload
            </button>
          </div>
          <p className="text-red-600">{imageUploadError}</p>
          {formdata.imageUrls.length > 0 &&
            formdata.imageUrls.map((url, index) => (
              <div
                className=" flex justify-between p-3 border items-center"
                key={url}
              >
                <img
                  src={url}
                  alt="listing image"
                  className="w-20 h-20 object-contain rounded-lg"
                />
                <button
                  className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75"
                  onClick={() => handleDeleteImage(index)}
                >
                  Delete
                </button>
              </div>
            ))}
          <button disabled={loading} className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-75">
            {loading? 'Creating ...':"Create Listing"}
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
