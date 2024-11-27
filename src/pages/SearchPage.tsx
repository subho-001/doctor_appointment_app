import React from 'react';
import { mockDoctors } from '../mockData';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';

const specialties = ["Cardiology", "Pediatrics", "Dermatology", "Dentistry", "Orthopedics", "Neurology", "Psychiatry", "Gynecology","General Practice"];

const popularSpecialties = ["General Practice", "Dentistry", "Pediatrics", "Cardiology"];

type FormData = {
  location: string,
  specialty: string,
}


function SearchPage() {

  const {register, handleSubmit, formState:{errors}, watch} = useForm<FormData>()

  const navigate = useNavigate();

  let handleFormData: SubmitHandler<FormData>=(data)=>{
    console.log(data);
    
    const filteredDoctors = mockDoctors.filter((doctor)=>{
      const isLocationMatch = data.location ? doctor.location.toLowerCase().includes(data.location.toLowerCase()) : true;
      const isSpecialtyMatch = data.specialty ? doctor.specialty.toLowerCase().includes(data.specialty.toLowerCase()) : true;
      // const isDistanceMatch = doctor.distance <= data.distance

      return isLocationMatch && isSpecialtyMatch
    });

    navigate("/doctors",{state:{doctors:filteredDoctors}})
  }

  const handleSpecialtyClick=(specialty:string)=>{
    console.log("Specialty", specialty);
    
    const filteredDoctors = mockDoctors.filter((doctor)=>{
      return(
        doctor.specialty.toLowerCase() === specialty.toLowerCase()
      )
    })
    console.log("special filterization", filteredDoctors);
    
    navigate('/doctors',{state:{doctors:filteredDoctors}})
  }

  // const distance = watch("distance")

  return (
    <div className="bg-gray-100 min-h-screen p-6 flex flex-col justify-center items-center">
      {/* Heading Section */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-800 mb-2">Find Your Doctor</h1>
        <p className="text-lg text-gray-500">Book appointments with trusted healthcare providers</p>
      </div>

      {/* Form Section */}
      <form onSubmit={handleSubmit(handleFormData)} className='w-full max-w-xl bg-white p-8 rounded-lg shadow-lg'>
        {/* <div className="max-w-lg w-full bg-white p-6 rounded-lg shadow-lg"> */}
          <div className="mb-4">
            <input type="text" placeholder='Enter your location..' className='w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' {...register("location",{
                required:{value:true, message:"Location is required"}
              })} />
          </div>
          <div>
            {errors.location && <p className="text-red-500 text-sm mt-2">
              {String(errors.location.message)}
              </p>}
          </div>
          <div className="mb-4">
            <select id='specialty' {...register("specialty",{
              required:{value:true, message:"Specialty is required"}
            })} className='w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'>
              <option value="">Select a Specialty</option>
              {specialties.map((specialty, index)=>(
                <option key={index} value={specialty}>
                  {specialty}
                </option>
              ))}
            </select>
          </div>
          <div>
            <div>
              {errors.specialty && <p className="text-red-500 text-sm mt-2">
                {String(errors.specialty.message)}
              </p>}
            </div>
          </div>
          <button type="submit" className="bg-yellow-500 text-white font-semibold py-3 px-6 w-full rounded-lg hover:bg-yellow-600 transition duration-200">
            Search Doctors
          </button>
        {/* </div> */}
      </form>

      {/* popular specialty button */}
      <div className='mt-8'>
        <h2 className='text-center text-xl font-bold text-gray-800'>Popular Specializations</h2>
        <div className='flex justify-center space-x-4 mt-4'>
          {popularSpecialties.map((specialty, index)=>{
            return(
              <button key={index} onClick={()=>{handleSpecialtyClick(specialty)}} className='px-6 py-2 bg-white text-gray-800 font-medium border border-gray-300 rounded-full shadow-md hover:bg-yellow-100 focus:outline-none focus:ring focus:ring-yellow-400 transition'>
                {specialty}
              </button>
            )
          })}
        </div>
      </div>

      {/* Search Form Card */}
    </div>
  );
}

export default SearchPage;
