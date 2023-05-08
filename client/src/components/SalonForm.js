
export default function SalonForm({handleChange, handleSubmit, formData}){

    return(
        <div className="flex flex-col justify-center h-screen items-center mt-3">
        <div className="w-[400px] h-[400px] flex flex-col justify-between bg-black  rounded-lg border-2 text-white  ">
        <form
         className="h-52 w-full p-4 space-y-4"
         onSubmit={ handleSubmit }>
             <h1 className=" text-[#720E07] text-center md:text-5xl sm:text-2xl font-bold uppercase">ADD Salon</h1>
            <input className="inputClass" placeholder="Salon Name" value ={formData.name} name="name" onChange={handleChange} ></input>
           

            <input className="inputClass" placeholder="Salon Borough" value ={formData.location} name ="location" onChange={handleChange} ></input>
         

            <input className="inputClass" placeholder="Salon Contact" value ={formData.contact} name ="contact" onChange={handleChange} ></input>
           

            <input className="inputClass" placeholder="Image" value ={formData.image} name = "image" onChange={handleChange} ></input>
          

            <button className=" bg-[#720E07] w-[200px] h-10 rounded-md ml-20 mt-15 font-medium m-auto uppercase" type='submit'>Submit Salon</button>

        </form>
        </div>
        </div>
    )
}