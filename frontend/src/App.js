import "tailwindcss/tailwind.css";
import Signup from "./components/Signup";
import Login from "./components/Login";

import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./components/Home";
import Timeline from "./components/Timeline";
import Dhome from "./components/Dhome";
import FollowingPopup from "./components/FollowingPopup";
import MyTweets from "./components/MyTweets";
import DTweets from "./components/DTweets";

function App() {
   return (
      <div className="App">
         <BrowserRouter>
            <Routes>
               <Route path="/" element={<Signup />} />
               <Route path="/login" element={<Login />} />
               <Route path="/home" element={<Home />} />
               <Route path="/followingpopup" element={<FollowingPopup />} />
               <Route path="/timeline" element={<Timeline />} />
               <Route path="/mytweets" element={<MyTweets />} />
               <Route path="/dtweets" element={<DTweets />} />
               <Route path="/dhome" element={<Dhome />} />
            </Routes>
         </BrowserRouter>
      </div>
   );
}

export default App;
