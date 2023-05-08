
export default function SalonCard({salon}){

    return(
        < div className = "max-w-[1240px] mx-auto columns py-10 px-20 ">
         <div className="w-full shadow-2xl rounded-lg hover:scale-110 duration-300">
        <h1 className="text-2xl font-bold text-center py-2">{salon.name}</h1>
        <h2 className=" text-[#8A1108] text-center font-bold text-2xl">Salon Id: {salon.id}</h2>
        <img className="w-30 mx-auto " src = {salon.image} alt={salon.name} />
        
        <h2 className="text-center font-bold text-xl">{salon.location}</h2>
        <h4 className="text-center text-xl pb-2">{salon.contact}</h4>
       
        
        </div>
        </div>
    )
}