import Home from "./Home"
import Reviews from "./Reviews";
import Salons from "./Salons";
import NavBar from "./NavBar";
import SignUp from "./SignUp";
import Login from "./Login";

import "../index.css"
// import { useNavigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import React, {useState, useEffect} from "react";
import { UserContext} from "../context/user";





function App() {
  const [user, setUser] = useState();
  
 useEffect(() => {
  fetchUser()
 }, )
  const fetchUser = () => {
    fetch("https://butchered.onrender.com/check_session", {

   })
    .then(res => {
      if (res.ok) {
        // res.json().then((user) => setUser(user));
        setUser(user);
        console.log("did it work")
      }
    } );

  }

  
  return (
    // <div className=" flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white">
    //      <UserContext.Provider value={{ user, setUser }}>
    //   <header>
    //     <h1 className='w-full text-3xl font-bold text-[#720E07]'>BUTCHERED</h1>
    //     <p><GiHairStrands color="#720E07"/></p>
        <div>
             <UserContext.Provider value={{ user, setUser }}>
    {user ? (
        <div>
          <p>Welcome, {user.username}!</p>
        </div>
         
      ) : (
        <h4>Log in Or Sign Up to Review Salons</h4>
     
      )}
    
     
      <NavBar />
     
      {user ? (
       
      <Routes>

        <Route path="/" >
        <Route index element={<Home />}/>
        </Route>
       
        <Route path="/Reviews">
         <Route index element={<Reviews />}/>
        </Route>

        <Route path="/Salons">
        <Route index element={<Salons />}/>
        </Route>
      
      </Routes>
     
      
      ) : (
     
        <Routes>
        
          <Route path="/signup">
         <Route index element={<SignUp />}/>
        </Route>
        
        <Route path="/Login">
         <Route index element={<Login />}/>
        </Route>
      
        <Route path="/" >
        <Route index element={<Home />}/>
        </Route>
        
        </Routes>
       
       )}

    
      
      </UserContext.Provider>
    </div>
  
  );
}

export default App;

