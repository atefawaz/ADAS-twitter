import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { changeProfile, logout } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import app from "../../firebase";

const EditProfile = ({ setOpen }) => {
  const { currentUser } = useSelector((state) => state.user);

  const [img, setImg] = useState(null);
  const [imgUploadProgress, setImgUploadProgress] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const uploadImg = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImgUploadProgress(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {},
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          try {
            const updateProfile = await axios.put(`/users/${currentUser._id}`, {
              profilePicture: downloadURL,
            });

            console.log(updateProfile);
          } catch (error) {
            console.log(error);
          }

          console.log("downloaded " + downloadURL);
          dispatch(changeProfile(downloadURL));
        });
      }
    );
  };

  const handleDelete = async () => {
    const deleteProfile = await axios.delete(`/users/${currentUser._id}`);
    dispatch(logout());
    navigate("/signin");
  };

  useEffect(() => {
    img && uploadImg(img);
  }, [img]);

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-transparent">
    <div className="w-[600px] bg-slate-200 rounded-lg p-8 relative">
      <button
        onClick={() => setOpen(false)}
        className="absolute top-3 right-3 cursor-pointer"
      >
        X
      </button>
      <div className="mb-6">
        <h2 className="font-bold text-xl">Edit Profile</h2>
        <p>Choose a new profile picture</p>
        {imgUploadProgress > 0 ? (
          "Uploading " + imgUploadProgress + "%"
        ) : (
          <input
            type="file"
            className="bg-transparent border border-slate-500 rounded p-2 mt-2"
            accept="image/*"
            onChange={(e) => setImg(e.target.files[0])}
          />
        )}
      </div>
      <div className="border-t border-gray-400 pt-6">
        <h2 className="font-bold text-xl">Delete Account</h2>
        <p className="text-red-500 mb-2">
          All your information will be deleted, nothing will be saved !
        </p>
        <button
          className="bg-red-500 text-white py-1 px-3 rounded-full text-sm"
          onClick={handleDelete}
        >
          Delete Account
        </button>
      </div>
    </div>
  </div>
  );
};

export default EditProfile;
