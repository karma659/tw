import React, {useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";

import {Link, useNavigate} from "react-router-dom";
import {BACKEND_URL} from "../config";

const Login = () => {
   const navigate = useNavigate();
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [dataa, setdata] = useState("");

   const handleLogin = async () => {
      try {
         const response = await axios.post(`${BACKEND_URL}/api/login`, {
            email: email,
            password: password
         });

         console.log("response", response);
         if (response.status === 200) {
            setdata(response.data.msg);
            console.log("erdm", response.data.msg);
         } else if (response.status === 201) {
            const tok = response.data.token;
            console.log("LF token ", tok);

            Cookies.set("token", tok);
            document.cookie = `token=${tok}`;

            console.log("Login SUCCESSFULL");
            navigate("/Home",{state:response.data.ID});
         }
      } catch (error) {
         console.error("ERROR LOGIN", error);
      }
   };

   return (
      <div className="flex items-center justify-center h-screen w-screen bg-light m-30 ">
         <div className=" flex-col  " id="1">
            <label className=" flex-col ">
               <h6> Email</h6>
               <input
                  className=" border-2 border-neutral-400"
                  type="text"
                  placeholder="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
               />
            </label>
            <br />
            <label className=" flex-col ">
               <h6> Password</h6>
               <input
                  className=" border-2 border-neutral-400"
                  type="Password"
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
               />
            </label>
            <br />
            <button className="bg-green-700 rounded-md  text-white p-2 " onClick={handleLogin}>
               Log In
            </button>

            <h1>{dataa}</h1>
         </div>
      </div>
   );
};

export default Login;
