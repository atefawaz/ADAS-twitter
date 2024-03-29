import React, { useState } from "react";
import TimelineTweet from "../TimelineTweet/TimelineTweet";
import { useSelector } from "react-redux";
import axios from "axios";

const MainTweet = () => {
  const [tweetText, setTweetText] = useState("");
  const [imageUrl, setImageUrl] = useState(""); // New state for image URL

  const { currentUser } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const tweetData = {
        userId: currentUser._id,
        description: tweetText,
        imageUrl: imageUrl, // Include the image URL in the tweet data
      };

      const submitTweet = await axios.post("/tweets", tweetData);
      window.location.reload(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {currentUser && (
        <p className="font-bold pl-2 my-2">{currentUser.username}</p>
      )}

      <form className="border-b-2 pb-6">
        <textarea
          onChange={(e) => setTweetText(e.target.value)}
          type="text"
          placeholder="What's happening"
          maxLength={280}
          className="bg-slate-200 rounded-lg w-full p-2"
        ></textarea>
        <input
          type="text"
          placeholder="Image URL" // Input for image URL
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          className="bg-black px-4 py-2 text-white rounded-full"
        >
          Tweet
        </button>
      </form>
      <TimelineTweet />
    </div>
  );
};

export default MainTweet;
