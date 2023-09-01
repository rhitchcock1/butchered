import React, {useState} from "react";
import {AiOutlineLike} from 'react-icons/ai'
import {FaRegLaughSquint} from 'react-icons/fa'


export default function ReviewCards({review, onUpdateReview}){
    const [help, setHelp] = useState(review.helpful)
    const [funny, setFunny] = useState(review.funny)

    function handleHLikeClick() {
        const updateObj = {
          helpful: help + 1,
        };
    
        fetch(`https://butchered.onrender.com/api/reviews/${review.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateObj),
        })
          .then((r) => r.json())
          .then((updatedReview) => {
            setHelp(updatedReview.helpful);
            onUpdateReview(updatedReview);
          });
        }
    function handleFLikeClick() {
            const updateObj = {
              funny: funny + 1,
            };
        
            fetch(`https://butchered.onrender.com/api/reviews/${review.id}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(updateObj),
            })
              .then((r) => r.json())
              .then((updatedReview) => {
                setFunny(updatedReview.funny);
                onUpdateReview(updatedReview);
              });
            }


    return(
        < div className = "max-w-[800px] mx-auto py-10 px-20">
        <div className="w-full pb-3 px-2 py-2 shadow-2xl rounded-lg hover:scale-110 duration-300">
        <h1 className="text-2xl font-bold text-center py-2">Salon:{review.salon.name}</h1>
        {/* <h1 className="text-xl font-bold px-1">Rating: {review.rating}</h1> */}
        <p className=" text-[#8A1108] font-bold text-xl px-1 pb-2">Review: {review.content}</p>
        <p className=" text-[#8A1108] font-bold text-xl px-1 pb-2"> {review.content}</p>
        <img id="rImg" className=" mx-auto " src = {review.image} alt = {review.review}/>
        <h4 className="text-xl font-bold px-1 pt-1">Review Date/Time: {review.created_at}</h4>
        <button className="bg-[#8A1108] w-[200px] rounded-md font-medium my-2 mx-2 py-2 " onClick={handleHLikeClick}> <AiOutlineLike className="ml-3  " size={30}/> Helpful: {help} </button>
        <button className="bg-[#8A1108] w-[200px] rounded-md font-medium my-2 mx-2 py-2 " onClick={handleFLikeClick}> < FaRegLaughSquint size={20}/> Funny: {funny} </button>
       
        </div>
        </div>
    )
}
