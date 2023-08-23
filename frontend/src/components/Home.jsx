import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import FollowingPopup from "./FollowingPopup";
import Timeline from "./Timeline";
import MyTweets from "./MyTweets";
import axios from "axios";
import {BACKEND_URL} from "../config";
import Cookies from "js-cookie";

const Home = () => {
   const location = useLocation();
   const loc = location.state;
   const [Id, setId] = useState();
   const [activeTab, setActiveTab] = useState("timeline");
   const [name, setname] = useState("");

   useEffect(() => {
      if (loc) {
         console.log(loc);
         setId(loc);
      }
      getname(Id);
   }, []);

   const getname = async Id => {
      try {
         var token = Cookies.get("token");
         console.log("token", token);
         const response = await axios.get(`${BACKEND_URL}/api/name/${loc}`, {
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${token}`
            }
         });

         console.log("userr", response.data);
         setname(response.data.username);
      } catch (e) {
         console.log("error", e);
      }
   };

   const handleTabChange = tab => {
      setActiveTab(tab);
   };

   return (
      <div className="text-center m-10 h-screen">
         <div>
            <h1 className="border border-black  py-2 px-4 m-10 ">Name : {name}</h1>
            <button
               className="border border-black  py-2 px-4 mr-10 "
               onClick={() => handleTabChange("myTweets")}>
               My Tweets
            </button>
            <button
               className="border border-black  py-2 px-4  mr-10 "
               label="My Following"
               onClick={() => handleTabChange("following")}>
               My Following
            </button>
            <button
               className="border border-black  py-2 px-4 mr-10  "
               label="Timeline"
               onClick={() => handleTabChange("timeline")}>
               My Timeline
            </button>

            {/* Show the appropriate content based on the active tab */}
            {activeTab === "myTweets" && <MyTweets userId={Id} />}
            {activeTab === "following" && <FollowingPopup userId={Id} />}
            {activeTab === "timeline" && <Timeline userId={Id} />}
         </div>
      </div>
   );
};

export default Home;
