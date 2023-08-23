import React, {useState, useEffect} from "react";
import axios from "axios";
import {BACKEND_URL} from "../config";
import Cookies from "js-cookie";

const DTweets = ({userId}) => {
   const [myTweets, setMyTweets] = useState([]);
   const [load, setload] = useState(false);
   const [name, setname] = useState("");

   useEffect(() => {
      fetchData();
      getname(userId);
   }, [userId, load]);

   const fetchData = async () => {
      try {
         var token = Cookies.get("token");
          console.log("token", token);
         const response = await axios.get(`${BACKEND_URL}/api/user/${userId}`, {
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${token}`
            }
         });

         console.log("Tweet data ", response, response.data);

         if (Array.isArray(response.data)) {
            setMyTweets(response.data);
         }
         setload(false);
      } catch (error) {
         console.log("ERROR  PAGE LOADING ", error);
      }
   };

   const getname = async Id => {
      try {
         var token = Cookies.get("token");
         const response = await axios.get(`${BACKEND_URL}/api/name/${userId}`, {
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

   return (
      <div className="py-20 ">
         <ul>
            <h2 className="text-center text-3xl text-gray-500" >{name} Tweets</h2>
            {myTweets.map(tweet => (
               <li  className="container p-2 m-2   md:flex-row items-center justify-center bg-white border border-gray-300 rounded-lg shadow hover:bg-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"  key={tweet._id}>
                  <p>Content: {tweet.content}</p>
                  <p>Posted by: {name}</p>
                  <p>Created At : {tweet.createdAt}</p>
               </li>
            ))}
         </ul>
      </div>
   );
};

export default DTweets;
