import { UserContext } from "../context/user";
import React, {useContext} from "react";


export default function ReviewForm({handleChange, handleSubmit, formData}){
    // const [salon, setSalon] = useState([])
  
    // useEffect(() => {
    //   fetch("http://localhost:5555/salons")
    //   .then ((r) => r.json())
    //   .then(setSalon)
    // }, [])

    const { user} = useContext(UserContext);

    return(
        <div className="flex flex-col justify-evenly h-screen items-center mt-3">
        <div className="w-[400px] h-[400px] flex flex-col justify-between bg-black  rounded-lg border-2 text-white  ">
 
        <form 
        className="h-52 w-full p-4 space-y-4"
        onSubmit={ handleSubmit }>
        <h1 className=" text-[#720E07] text-center md:text-5xl sm:text-2xl font-bold uppercase">ADD Review</h1>
           <h2 className=" text-[#720E07] text-center text-xl" >Who butchered you {user.username}?</h2>
            <input 
            className="inputClass"
            placeholder="Write Review Here!"
            value ={formData.content} 
            name = "content" 
            onChange={handleChange} ></input>
          
       

            <input 
            className="inputClass"
            placeholder="Image"
            value ={formData.image}
             name = "image" 
            onChange={handleChange} ></input>
          

            <input 
            className="inputClass"
            placeholder="Salon ID"
            value ={formData.salon_id} 
            name = "salon_id" 
            onChange={handleChange} ></input>
          

            <button className=" bg-[#720E07] w-[200px] h-10 rounded-md ml-20 mt-15 font-medium m-auto uppercase" type='submit'>Submit Review</button>

        </form>
        </div>
        </div>
    )
}