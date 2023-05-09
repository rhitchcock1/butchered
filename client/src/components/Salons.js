import React, { useState, useEffect, useContext} from "react"
import SalonCard from "./SalonCard"
import SalonForm from "./SalonForm";
import AdminSalonCard from "./AdminSalonCard";
import { UserContext } from "../context/user";

function Salons(){
  const { user} = useContext(UserContext);
  const [salons, setSalons] = useState([])


  function onDeleteSalon(salonToDelete){
    const updatedSalons= salonArray.filter((salon) =>salon.id !== salonToDelete.id)
    setSalons(updatedSalons)
  }

  useEffect(() => {
    fetch("https://butchered.onrender.com/api/salons")
    .then(respose => respose.json())
    .then(setSalons)
    
    }, [])

  const [formData, SetFormData] = useState({
      name:"",
      location:"",
      contact: "",
      image: "",
   
      })
      
  function handleChange(e){
      SetFormData({
        ...formData,
        [e.target.name]: e.target.value
        })
      }
  function handleSubmit(e){
        e.preventDefault()
        const newSalon = {
          name: formData.name,
          location: formData.location,
          contact: formData.contact,
          image: formData.image,
         
        }
        fetch('https://butchered.onrender.com/api/salons', { 
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(newSalon)
        })
        .then(response => response.json())
        .then(onAddSalon)
      }
    function onAddSalon(newSalon){
        setSalons([...salons, newSalon])

    }
  const [salonArray, setSalonArray] = useState([])
  
    useEffect(() => {
      fetch("https://butchered.onrender.com/api/salons")
      .then ((r) => r.json())
      .then(setSalonArray)
    }, [])

    const salonCards = salons.map((salon) =>{
        return <SalonCard key={salon.id} salon={salon} />
      })
      const adminSalonCards = salons.map((salon) =>{
        return <AdminSalonCard key={salon.id} salon={salon} onDeleteSalon={onDeleteSalon}/>
      })  


    if (user.admin === "true" ){
        return(
          <div className="w-full bg-white py-16 px-4">
        <h1 className="text-4xl  text-[#8A1108] font-bold text-center uppercase">Admin Salon Directory</h1>
        {adminSalonCards}
        <SalonForm handleSubmit={handleSubmit} formData={formData} handleChange = {handleChange}/>
        </div>
        )
    } return (
      <div className="w-full bg-white py-16 px-4">
      <h1 className="text-4xl  text-[#8A1108] font-bold text-center uppercase">Salon Directory</h1>
      {salonCards}
      <SalonForm handleSubmit={handleSubmit} formData={formData} handleChange = {handleChange}/>
      </div>

    )
}

export default Salons