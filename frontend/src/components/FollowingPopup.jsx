import React, {useState, useEffect} from "react";
import axios from "axios";
import {BACKEND_URL} from "../config";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";

const FollowingPopup = ({userId}) => {
   const navigate = useNavigate();
   const [followingList, setFollowingList] = useState([]);
   const [loading, setLoading] = useState(true);
   useEffect(() => {
      fetchData();
   }, [userId]);

   const fetchData = async () => {
      try {
         var token = Cookies.get("token");
         console.log("token", token);
         const response = await axios.get(`${BACKEND_URL}/api/following/${userId}`, {
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${token}`
            }
         });

         console.log("data ", response, response.data);

         if (Array.isArray(response.data.following)) {
            setFollowingList(response.data.following);
         }
         setLoading(false);
      } catch (error) {
         console.log("ERROR  PAGE LOADING ", error);
      }
   };

   const handleUnfollow = async followingId => {
      // Call the backend API to unfollow the user
      try {
         var token = Cookies.get("token");
         console.log("token", token);
         const response1 = await axios.post(
            `${BACKEND_URL}/api/unfollow/${userId}/${followingId}`,
            {
               headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`
               }
            }
         );
         setFollowingList(prevFollowingList =>
            prevFollowingList.filter(user => user._id !== followingId)
         );
      } catch (error) {
         console.error("Error unfollowing user:", error);
      }
   };
   const goto = userId => {
      navigate("/dhome", {state: userId});
   };

   return (
      <div className="py-20 ">
         <h2 className="text-center text-3xl text-gray-500" >Following List</h2>
         <div className=" ">
            {loading ? (
               <div>
                  <h1>LOADING......</h1>
               </div>
            ) : (
               <ul>
                  {followingList.map(user => (
                      <button className="container p-2 m-2   md:flex-row items-center justify-center bg-white border border-gray-300 rounded-lg shadow hover:bg-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700" key={user._id} onClick={() => goto(user._id)}>
                      <li >
                       
                           <p>{user.username}</p>
                        <button className="border border-red-600  py-2 px-4" onClick={() => handleUnfollow(user._id)}>Unfollow</button>
                     </li>
                    </button>

                  ))}
               </ul>
            )}
         </div>
      </div>
   );
};

export default FollowingPopup;
