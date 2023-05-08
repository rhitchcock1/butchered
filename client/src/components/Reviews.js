import React, { useState, useEffect, useContext} from "react"
import ReviewForm from "./ReviewForm"
import ReviewCard from "./ReviewCard"
import AdminReviewCard from "./AdminReviewCard"
import { UserContext } from "../context/user";
import {BsSearch} from 'react-icons/bs'




export default function Reviews(){

  const { user} = useContext(UserContext);
    const [reviews, setReviews] = useState([])
    const [search, setSearch] = useState("")

    function onDeleteReview(reviewToDelete){
      const updatedReviews= reviewArray.filter((review) =>review.id !== reviewToDelete.id)
      setReviews(updatedReviews)
    }

    const [reviewArray, setReviewArray] = useState([])


    useEffect(() => {
      fetch("https://butchered.onrender.com/reviews")
      .then ((r) => r.json())
      .then(setReviewArray)
    }, [])
    function onUpdateReview(updatedReview) {
      const updatedReviews = reviewArray.map((review) =>review.id === updatedReview.id ? updatedReview : review)
      setReviewArray(updatedReviews)
    }
  
    useEffect(() => {
      fetch("https://butchered.onrender.com/reviews")
      .then(respose => respose.json())
      .then(setReviews)
  
    }, [])

    const [formData, SetFormData] = useState({
        content:"",
        helpful:"",
        funny:"",
        image: "",
        user_id: "",
        salon_id: "",
      
  
      })
      
      function handleChange(e){
        SetFormData({
          ...formData,
          [e.target.name]: e.target.value
        })
      }
      function handleSubmit(e){
        e.preventDefault()
        const newReview = {
          content: formData.content,
          // helpful: formData.helpful,
          // funny: 0,
          image: formData.image,
          user_id: user.id,
          salon_id: formData.salon_id,
         
        }
        fetch('https://butchered.onrender.com/reviews', { // our specific link needs to be added
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(newReview)
        })
        .then(response => response.json())
        .then(onAddReview)
      }
      function onAddReview(newReview){
          setReviews([...reviews, newReview])
  
      } 
    const searchReviews = reviews.filter((review) => 
    review.content.toLowerCase().includes(search.toLowerCase()))
    
    function handleSChange(e){
      setSearch(e.target.value)
    }

    const reviewCards = searchReviews.map((review) =>{
        return <ReviewCard key={review.id} review={review} onUpdateReview={onUpdateReview}/>
      })
    const adminCards = searchReviews.map((review) =>{
      return <AdminReviewCard key={review.id} review={review} onUpdateReview={onUpdateReview} onDeleteReview= {onDeleteReview}/>
    })
    
      if (user.admin === "true" ){
        return(
          <div className="w-full bg-white py-16 px-4 ">
        <h1 className="text-4xl  text-[#8A1108] font-bold text-center uppercase">Admin Reviews</h1>
        <div
       className="relative w-max mx-auto"
       >
        <input 
        className=" relative peer z-10 bg-transparent rounded-full cursor-pointer w-12 h-12 font-bold text-[#720E07] 
        pl-12
        focus:w-full focus:border-gray-300 focus:cursor-text focus:pl-16  focus:pr-4
        "
        type="text" 
        placeholder="search reviews"
        value = {search}
        onChange = {handleSChange}></input>
        <svg className="absolute inset-y-0 my-auto h-8 w-12 px-3.5 border-r stroke-gray-500 border-transparent peer-focus:border-gray-400 peer-focus:stroke-gray-300">
        <BsSearch />
        </svg>
       </div>
        <div className="grid lg:grid-cols-2">
        {adminCards}
        <ReviewForm formData = {formData} handleSubmit={handleSubmit} handleChange= {handleChange} />
        </div>
        </div>
         )
      }
      return(
        <div className="w-full bg-white py-16 px-4">
        <h1 className="text-4xl  text-[#8A1108] font-bold text-center uppercase">Reviews</h1>
        <div
       className="relative w-max mx-auto"
       >
        <input 
        className=" relative peer z-10 bg-transparent rounded-full cursor-pointer w-12 h-12 font-bold text-[#720E07] 
        pl-12
        focus:w-full focus:border-gray-300 focus:cursor-text focus:pl-16  focus:pr-4 
        "
        type="text" 
        placeholder="search reviews"
        value = {search}
        onChange = {handleSChange}></input>
        <svg className="absolute inset-y-0 my-auto h-8 w-12 px-3.5 border-r stroke-gray-500 border-transparent peer-focus:border-gray-400 peer-focus:stroke-gray-300">
        <BsSearch />
        </svg>
       </div>
        <div className="grid lg:grid-cols-2">
        {reviewCards}
        <ReviewForm formData = {formData} handleSubmit={handleSubmit} handleChange= {handleChange}/>
        </div>
        </div>
    )
}