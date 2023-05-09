import React, { useState, useContext } from "react";
import { UserContext } from "../context/user";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const { setUser} = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate()
  // const [admin, setAdmin] = useState("");

  const [_password_hash, setPasswordhash] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  function handleSubmit(e) {

    
    e.preventDefault();
    fetch("https://butchered.onrender.com/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        _password_hash,
        admin : false,
  
        password_confirmation: passwordConfirmation,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
        navigate("/")
       }else{
        alert("Username alsready taken")
      }
    });
  }
 
  return (
    <div className="flex flex-col justify-center h-screen items-center">
    <div className="w-[310px] h-[450px] flex flex-col justify-between rounded-lg border-2 text-white  ">
      <form  className="h-52 w-full p-4 space-y-3" onSubmit={handleSubmit}>
        <h1 className=" text-[#720E07] text-center md:text-5xl sm:text-2xl font-bold uppercase">Sign Up</h1>
        {/* <label className="text-xl text-white mx-4" htmlFor="username">Username</label> */}
        <input
        className="inputClass"
        placeholder="Username"
          type="text"
          id="username"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
         {/* <label className="text-xl text-white mx-4" htmlFor="email">Email</label> */}
        <input
        className="inputClass"
        placeholder="Email"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
         
        />
        {/* <label className="text-xl text-white mx-4" htmlFor="password">Password</label> */}
        <input
        className="inputClass"
        placeholder="Password"
          type="password"
          id="password"
          value={_password_hash}
          onChange={(e) => setPasswordhash(e.target.value)}
          autoComplete="current-password"
        />
        {/* <label className="text-xl text-white mx-4" htmlFor="password">Password Confirmation</label> */}
        <input
        className="inputClass"
        placeholder="Confirm Password"
          type="password"
          id="password_confirmation"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          autoComplete="current-password"
        />
        <button className=" bg-[#720E07] w-[200px] h-10 mx-11 mt-14 rounded-md font-medium  uppercase" type="submit">Sign Up</button>
      </form>
     
      <h2 className="cursor-pointer text-decoration-line: underline mx-4 pb-3" onClick={()=> navigate("/login")}>Already have an account, log in here!</h2>
    </div>
    </div>
  );
}

export default SignUp;