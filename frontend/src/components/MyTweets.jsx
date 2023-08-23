import React, {useState, useEffect} from "react";
import axios from "axios";
import {BACKEND_URL} from "../config";
import Cookies from "js-cookie";

const MyTweets = ({userId}) => {
   const [myTweets, setMyTweets] = useState([]);
   const [tweetContent, setTweetContent] = useState("");
   const [load, setload] = useState(false);
   const [name, setname] = useState("");
   const [editingTweetId, setEditingTweetId] = useState("");
   const [editedTweetContent, setEditedTweetContent] = useState("");

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
   const handleTweetSubmit = async () => {
      var token = Cookies.get("token");
      const data = {
         userId: userId,
         content: tweetContent
      };
      axios({
         method: "post",
         url: `${BACKEND_URL}/api/tweet`,
         data: data,
         headers: {
             Authorization: `Bearer ${token}`
         }
      })
         .then(() => {
            setTweetContent("");
            alert("Tweet posted successfully!");
            setload(true);
         })
         .catch(error => {
            console.error("Error posting tweet:", error);
         });
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
   const handleDeleteTweet = async tweetId => {
      var token = Cookies.get("token");
      try {
         await axios.delete(`${BACKEND_URL}/api/tweet/${tweetId}`, {
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${token}`
            }
         });
         alert("Tweet deleted successfully!");
         setload(true);
      } catch (error) {
         console.error("Error deleting tweet:", error);
      }
   };

   const handleEditClick = (tweetId, content) => {
      setEditingTweetId(tweetId);
      setEditedTweetContent(content);
   };

   const handleUpdateClick = async tweetId => {
      var token = Cookies.get("token");
      try {
         await axios.patch(`${BACKEND_URL}/api/tweet/${tweetId}`, {content: editedTweetContent}, {
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${token}`
            }
         });
         alert("Tweet updated successfully!");
         setload(true);
         setEditingTweetId(null);
         setEditedTweetContent("");
      } catch (error) {
         console.error("Error updating tweet:", error);
      }
   };
   return (
      <div className="py-20 ">
                     <h2>Write Tweet</h2>
         <div className="flex m-5 text-center justify-center">

            <textarea
            className="border border-black m-2    px-4"
               rows="4"
               cols="50"
               value={tweetContent}
               onChange={e => setTweetContent(e.target.value)}
               placeholder="What's happening?"></textarea>
            <button className="border border-green-600  m-1 py-2 px-4 " onClick={handleTweetSubmit}>Post Tweet</button>
         </div>

         <ul>
            <h2 className="text-center text-3xl text-gray-500">My Tweets</h2>
            {myTweets.map(tweet => (
               <li key={tweet._id}>
                  {editingTweetId === tweet._id ? (

                     <div className="flex m-2 border-green-500 text-center justify-center">
                           <p className="mr-2">Posted by: {name}</p>
                        <p className="mr-2">Created At : {tweet.createdAt}</p>
                        <textarea
                        className="border border-green-600  m-3 py-2 px-4"
                           rows="2"
                           cols="50"
                           value={editedTweetContent}
                           onChange={e => setEditedTweetContent(e.target.value)}></textarea>
                        <button className="border border-green-600  py-2 px-4" onClick={() => handleUpdateClick(tweet._id)}>Update</button>
                     </div>
                  ) : (
                     <div className="container p-2 m-2   md:flex-row items-center justify-center bg-white border border-gray-300 rounded-lg shadow hover:bg-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700" >
                      
                        <p>Posted by: {name}</p>
                        <p>Created At : {tweet.createdAt}</p>
                        <p className="border border-black  m-1 py-2 px-4" >Content: {tweet.content}</p>
                        <button className="border border-green-600  mr-10 py-2 px-4" onClick={() => handleEditClick(tweet._id, tweet.content)}>
                           Edit
                        </button>
                        <button className="border border-red-600  py-2 px-4" onClick={() => handleDeleteTweet(tweet._id)}>Delete</button>
                     </div>
                  )}
               </li>
            ))}
         </ul>
      </div>
   );
};

export default MyTweets;
