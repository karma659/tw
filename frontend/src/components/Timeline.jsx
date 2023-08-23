import Cookies from "js-cookie";
import React, {useEffect, useState} from "react";
import {BACKEND_URL} from "../config";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Timeline = ({userId}) => {
   const navigate = useNavigate();

   const [cards, setcards] = useState([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      fetchData();
   }, [userId]);

   const fetchData = async () => {
      try {
         var token = Cookies.get("token");
          console.log("token", token);
         const response = await axios.get(`${BACKEND_URL}/api/timeline/${userId}`, {
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${token}`
            }
         });

         console.log("Tweet data ", response, response.data);

         if (Array.isArray(response.data)) {
            setcards(response.data);
         }
         setLoading(false);
      } catch (error) {
         console.log("ERROR  PAGE LOADING ", error);
      }
   };

   const goto = userId => {
      console.log(userId);
      navigate("/dhome", {state: userId});
   };
   return (
      <div>
         <div className="py-20 ">
            <h1 className="text-center text-3xl text-gray-500">TimeLine </h1>
            <div className=" ">
               {loading ? (
                  <div>
                     <h1>LOADING......</h1>
                  </div>
               ) : (
                  <div className="">
                     {cards?.map(card => (
                          <button key={card._id}  className="container p-2 m-2   md:flex-row items-center justify-center bg-white border border-gray-300 rounded-lg shadow hover:bg-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"  onClick={() => goto(card.userId._id)}>
                          <ul>
                           <div className="flex m-2">
                              <h1 className="mr-10">Posted by : {card.userId.username}</h1>
                  
                              <h1>{card.createdAt}</h1>
                              </div>
                           <h4 className="border border-green-600  py-2 px-4" >Content :{card.content}</h4>
                       
                        </ul>
                        </button>
                      
                     ))}
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};

export default Timeline;
