import React from "react";
import Typed from 'react-typed';
import { useNavigate } from "react-router-dom";
import homepage from "./images/homepage.png";


const Hero = () => {
    const navigate = useNavigate()
    return(
        <div className="text-white mx-auto">
           
            <div className = "max-w-[800px] w-full  mx-auto text-center flex flex-col justify-center ">
                {/* <div className="absolute w-full h-32 bg-gradient-to-t from-black to-transparent" /> */}
            
                 <img id="hImg" src={homepage} alt="bad-haircut" />
                
                <p className="font-bold p-2 text-2xl">NEW YORK CITY'S HAIRSALON REVIEW WEBSITE</p>
                <h1 className=" text-[#720E07] md:text-7xl sm:text-4xl font-bold md:py-6">BUTCHERED✂️</h1>
                {/* <p className ="" >
                <GiHairStrands size={40}  color="#720E07"/>
                </p> */}
               
                <div className="flex justify-center items-center">
                    <p className="md:text-4xl sm:text-4xl text-xl font-bold">Tell us about salons that were </p>
                    <Typed 
                    className="text-[#720E07] md:text-4xl sm:text-4xl text-xl font-bold pl-2"
                    strings={["A NIGHTMARE!", "TERRIBLE!", "OVERPRICED!", "JUST AWFUL!", "SO CHEAP!"]} 
                    typeSpeed={160} 
                    backSpeed={140} 
                    loop
                    />
                </div>
                <p className="font-bold p-2 pt-10 text-2xl">Login In or Sign Up to let other New Yorkers know! </p>
                <div>
                <button onClick={() => navigate("/login")} className="bg-[#720E07] w-[200px] rounded-md font-medium my-6 mx-auto py-2 ">LOGIN</button>
                <button onClick={() => navigate("/signup")} className=" bg-[#720E07] w-[200px] rounded-md font-medium my-2 mx-auto py-2 ml-4">SIGN UP</button>
                </div>
                </div>
          
         </div>
    )


}

export default Hero