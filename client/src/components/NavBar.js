import React, {useContext, useState} from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/user";

import {AiOutlineClose, AiOutlineMenu} from 'react-icons/ai'


// const linkStyles = {
//   display: "inline-block",
//   width: "100px",
//   padding: "12px",
//   margin: "0 6px 6px",
//   background: "black",
//   textDecoration: "none",
//   color: "white",
// };

function NavBar() {
  const { user, setUser} = useContext(UserContext);
  const navigate = useNavigate()
  const [nav, setNav] = useState(true)
  const handleNav =() => {
    setNav(!nav)
  }
  
  function handleLogoutClick() {
    fetch("https://butchered.onrender.com/api/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
        navigate("/home")
      }
    });
  }

 

  return (

    <div className=" flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white">
       <h1 className='w-full text-3xl font-bold text-[#720E07]'>BUTCHERED✂️</h1>
       {/* <h1 className=" items-center inline-block ">Hi {user.username}!</h1> */}
       <div className="flex justify-between" > 
    
       </div>
      <div>
        {user ? (
          <ul className="hidden md:flex">
            <li className ="p-4">
           <NavLink
            to="/home"
       
        // style={linkStyles}
         >
        Home
        </NavLink>
      </li>
         <li className ="p-4">
          <NavLink
          to="/reviews"
          
          // style={linkStyles}
        
        >
          Reviews
        </NavLink>
        </li>
        <li className ="p-4">
        <NavLink
          to="/salons"
          
          // style={linkStyles}
         
        >
          Salons
        </NavLink>
        </li>
        <li className ="p-4">
        <button  onClick={handleLogoutClick}>Logout</button>
        </li>
          </ul>

        ) : (
          <div>
          <ul className = "hidden md:flex">
            <li className ="p-4 uppercase">
        <NavLink
        to="/home"
       
        // style={linkStyles}
      >
        Home
      </NavLink>
      </li>
      <li className ="p-4 uppercase">
      <NavLink
        to="/login"
       
        // style={linkStyles}
     
      >
        Login
      </NavLink>
      </li>
      <li className ="p-4 uppercase">
          <NavLink
        to="/signup"
        
        // style={linkStyles}
     
      >
        SignUp
      </NavLink>
      </li>
     
  
          </ul>
          
         </div>
        )}
        </div>
      {/* mobile screen menu */}
          < div onClick={handleNav} className="block md:hidden">
            {!nav ? <AiOutlineClose size={20}/> :  <AiOutlineMenu size={20}/>}
          
          </div>
          <div>
        {user ? (
              <div className={!nav ? "fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500": "fixed left-[-100%]" }>
              <h1 className='w-full text-3xl font-bold text-[#720E07] m-4'>BUTCHERED</h1>
              <ul className = " p-4 uppercase">
                <li className ="p-4 border-b border-gray-600">
           <NavLink
            to="/home"
       
        // style={linkStyles}
         >
        Home
        </NavLink>
      </li>
         <li className ="p-4">
          <NavLink
          to="/reviews"
          
          // style={linkStyles}
        
        >
          Reviews
        </NavLink>
        </li>
        <li className ="p-4">
        <NavLink
          to="/salons"
          
          // style={linkStyles}
         
        >
          Salons
        </NavLink>
        </li>
        <li className ="p-4">
        <button  onClick={handleLogoutClick}>Logout</button>
        </li>
          </ul>
          </div>

        ) : (
          <div className={!nav ? "fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500": "fixed left-[-100%]" }>
          <h1 className='w-full text-3xl font-bold text-[#720E07] m-4'>BUTCHERED</h1>
          <ul className = " p-4 uppercase">
            <li className ="p-4 border-b border-gray-600">
        <NavLink
        to="/home"
       
        // style={linkStyles}
      >
        Home
      </NavLink>
      </li>
      <li className ="p-4 border-b border-gray-600">
      <NavLink
        to="/login"
       
        // style={linkStyles}
     
      >
        Login
      </NavLink>
      </li>
      <li className ="p-4">
          <NavLink
        to="/signup"
        
        // style={linkStyles}
     
      >
        SignUp
      </NavLink>
      </li>
     
  
          </ul>
          
         </div>
        )}
        </div>
    





         </div>

   
       
   
 
  );
}

export default NavBar;