import React, {useContext} from "react";
import { UserContext } from "../context/user";
import Hero from "./Hero"



export default function Home() {
  const { user} = useContext(UserContext);


        if (user) {
         
          return(
            <div className="w-full bg-white py-16 px-4">
               <h1 className="text-5xl text-[#8A1108] font-bold text-center uppercase pb-4">Welcome, {user.username}!</h1>
             <h2 className= "text-3xl font-bold text-center uppercase">Your Reviews</h2>
            < div className = "max-w-[900px] mx-auto py-10 px-20  ">
            <div className="w-full pb-3 px-2 py-2 shadow-2xl rounded-lg ">
         
       
             <div>{user.reviews?.map((review) => ( 
              <div key={review.id} >
                 <h2 className="text-2xl font-bold text-center py-2">Salon:{review.salon.name}</h2>
              <h2 className=" text-[#8A1108] font-bold text-xl px-1 pb-2">Review:{review.content}</h2>
              <h2 className="text-xl font-bold px-1">Rating:{review.rating}</h2>
            
             <img id="rImg" className=" mx-auto "  src ={review.image} alt = {review.content} />
              <h3 className="text-xl font-bold px-1 pt-1 border-b-2 border-black">{review.created_at}</h3>
              </div>
              
               ))}</div>
              
            </div>
          </div>
          </div>
      
          )
        }
        return (
          <div>
           <Hero />
        </div>

        )
      
      }
      
