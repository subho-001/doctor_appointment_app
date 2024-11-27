import React, { useRef, useState } from 'react';
import { IoIosArrowRoundBack } from "react-icons/io";
import { CiLocationOn } from "react-icons/ci";
import { IoPersonOutline } from "react-icons/io5";
import { GoClock } from "react-icons/go";
import { useLocation, useNavigate } from 'react-router-dom';
import { CiFilter } from "react-icons/ci";

type Doctor = {
  id: number;
  name: string;
  specialty: string;
  location: string;
  distance: number;
  queueStatus: number;
  waitTime: number;
  rating: number;
  availability: string;
  contact: string;
  fee: number;
  medicalCenterAddress: string;
};

const DoctorListingPage: React.FC = () => {

  // state to handle filter panel visibility
  const[isFilterOpen, setIsFilterOpen] = useState(false)

  //state to store the filter values
  const[filterDistance, setFilterDistance] = useState<number | null>(null);
  const[filterAvailability, setFilterAvailability] = useState<string>("");

  const[filteredDoctors, setFilteredDoctors] = useState<Doctor[] | null>(null)

  const ref = useRef("")

  let location = useLocation(); // Access the location object passed from the previous page.
  console.log(location);

  const [bookedDoctors, setBookedDoctors] = useState<number[]>([]);
  const [modal, setModal] = useState<{ isOpen: boolean; doctor?: Doctor; type?:"confirm"| "alreadyBooked"}>({ isOpen: false});

  const doctors: Doctor[] = location.state?.doctors || [];
  let navigate = useNavigate();
  console.log("Doctors list",doctors);

  const navigateToSearch = () => {
    navigate('/');
  };

  const handleBooking = (doctor: Doctor) => {
    if(!bookedDoctors.includes(doctor.id)) {
      setModal({isOpen:true, doctor, type:"confirm"})
      setBookedDoctors((prev)=>([...prev, doctor.id]))
    } else {
      setModal({ isOpen: true, doctor, type:"alreadyBooked"});
    }
  };

  const closeModal = () => {
    setModal({isOpen:false})
  };

  const cancelBooking = (did: number) => {
    // Cancel the booking by removing the doctor from the bookedDoctors list.
    setBookedDoctors(bookedDoctors.filter((id) => id !== did));
    setModal({ isOpen: false});
  };

  const getDayOfWeek =(date:Date):string=>{
    const days = ["Sun","Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    return days[date.getDay()];
  }

  const applyFilters =()=>{
    let filtered = doctors;

    if(filterDistance !== null) {
      filtered = filtered.filter((doctor)=>((doctor.distance * 1.60934) <= filterDistance))
    }

    const today = getDayOfWeek(new Date())//Get today's day

    const tomorrow = getDayOfWeek(new Date(new Date().setDate(new Date().getDate() +1))); //Get tomorrow's day

    if(filterAvailability === "Today") {
      filtered = filtered.filter((doctor)=>{
        const doctorDay = doctor.availability.split(" ")[0]
        return doctorDay === today;
      });
    } else if(filterAvailability === "Tomorrow") {
      filtered = filtered.filter((doctor)=>{
        const doctorDay = doctor.availability.split(" ")[0];
        return doctorDay === tomorrow;
      })
    }

    setFilteredDoctors(filtered)
    setIsFilterOpen(false)
  }

  const removeFilter =()=>{
    setFilterDistance(null)
    setFilterAvailability("")
    setFilteredDoctors(null)
    // setIsFilterOpen(false)
  }

  //Determine the list of doctors to display: filtered or original
  const doctorsToDisplay = filteredDoctors ?? doctors;

  return (
    <div className='bg-gray-100 min-h-screen p-6'>
      <div className='flex items-center space-x-2'>
        <button
          onClick={navigateToSearch}
          className='flex items-center mt-4 bg-yellow-500 text-white font-medium py-3 px-8 rounded-full shadow-md hover:bg-yellow-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50 transition'
        >
          <IoIosArrowRoundBack className='mr-2 text-2xl' />
          Back to Search
        </button>
      </div>

      <div>
        <h1 className='text-2xl font-bold text-center mt-6 mb-8 text-gray-800'>Doctors near Current Location</h1>

        <div className='flex justify-end mb-4'>
          <button className='flex items-center gap-2 bg-yellow-500 text-white font-medium py-2 px-5 rounded-lg shadow-md hover:bg-yellow-600 transition focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50' onClick={()=>{setIsFilterOpen(true)}}>
          <CiFilter className='text-xl'/>
          Filter
          </button>
        </div>
        

        {isFilterOpen && 
        <div
        className={`fixed inset-y-0 right-0 bg-white w-72 p-6 shadow-lg transition-transform duration-300 ease-in-out ${
          isFilterOpen ? "translate-x-0" : "translate-x-full"
        }`}>
          <h2 className='text-xl font-semibold mb-4 text-gray-800'>Filter Results</h2>
          <button onClick={()=>setIsFilterOpen(false)} className='text-red-500 font-semibold mb-6 text-sm hover:underline'>Close</button>

          <div className='mb-6'>
            <label className='block text-gray-700 font-medium mb-2'>Distance</label>

            <select className='w-full p-2 border rounded-lg focus:ring focus:ring-yellow-300 focus:outline-none' value={filterDistance || ""} onChange={(e)=>setFilterDistance(Number(e.target.value) || null)}>
              <option value="">Select distance</option>
              <option value="5">Within 5 km</option>
              <option value="10">Within 10 km</option>
              <option value="25">Within 20 km</option>
            </select>
          </div>

          <div className='mb-6'>
            <label className='block text-gray-700 font-medium mb-2'>Availability</label>
            <select className='w-full p-2 border rounded-lg focus:ring focus:ring-yellow-300 focus:outline-none' value={filterAvailability} onChange={(e)=>setFilterAvailability(e.target.value)}>
              <option value="">Select Availability</option>
              <option value="Today">Available Today</option>
              <option value="Tomorrow">Available Tommorrow</option>
            </select>
          </div>

          <button onClick={applyFilters} className='w-full bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50 mb-2'>Apply Filters</button>

          <button onClick={removeFilter} className='w-full bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50'>Clear Filter</button>

        </div> }

        {doctorsToDisplay.length > 0 ? (
          <div className='space-y-6'>
            {doctorsToDisplay.map((doctor) => (
              <div
                key={doctor.id}
                className='flex justify-between items-center border p-4 rounded-lg bg-white shadow-md hover:shadow-lg transition'
              >
                <div>
                  <h2 className='text-lg font-bold text-gray-800'>{doctor.name}</h2>
                  <p className='text-gray-600 font-semibold'>{doctor.specialty}</p>
                  <p className='text-gray-600 flex items-center mt-1'> <span className='mr-2'><CiLocationOn /></span>
                    {doctor.medicalCenterAddress} ({(doctor.distance * 1.60934).toFixed(1)} km away)
                  </p>
                  <p className='text-gray-600 flex items-center mt-1'><span className='mr-2'><IoPersonOutline /></span> Current queue: {doctor.queueStatus} patients</p>
                  <p className='text-gray-600 flex items-center mt-1'><span className='mr-2'><GoClock /></span> Estimated wait: {doctor.waitTime} mins</p>
                  <div className='flex mt-2 gap-4' >
                    <p className="text-gray-600">Rating: ⭐ {doctor.rating}</p>
                    <p className="text-gray-600">Fee: ${doctor.fee}</p>
                  </div>
                </div>

                <div className='text-right'>
                  <p className='text-sm text-gray-600 font-medium'><span className='font-bold'>Available:</span> {doctor.availability}</p>
                  <p className='text-sm text-gray-600 font-medium'><span className='font-bold'>Contact:</span> {doctor.contact}</p>
                  <button
                    className='mt-4 bg-yellow-500 text-white font-semibold px-4 py-2 rounded-lg shadow hover:bg-yellow-600 transition'
                    onClick={() => { handleBooking(doctor); }}
                  >
                    {bookedDoctors.includes(doctor.id) ? "Booked" : "Booking Appointment"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className='text-center text-gray-500 text-lg mt-10'>No Doctors Found!</p>
        )}
      </div>

      {/* Modal Dialog for Booking Confirmation or Cancel Booking */}
      {modal.isOpen && modal.doctor && (
        <div className='fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 transition-opacity duration-300'>
          <div className='bg-white p-8 rounded-lg shadow-lg w-96'>
            {modal.type === "alreadyBooked" ? (
              <>
                <h2 className='text-xl font-bold mb-4'>Booking Confirmed</h2>
                <p className='mb-4'>
                  You have already booked an appointment with{" "}
                  <span className='font-semibold'>{modal.doctor.name}</span> ({modal.doctor.specialty}).
                </p>
                <p className='mb-4'>
                  The appointment is available at{" "}
                  <span className='font-semibold'>{modal.doctor.medicalCenterAddress}</span>.
                </p>
                <p className='mb-6'>
                  Please arrive within{" "}
                  <span className='font-semibold'>{modal.doctor.waitTime} minutes</span>.
                </p>
                <button onClick={closeModal} className='my-1 w-full bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition'>Close</button>
                <button onClick={() => {cancelBooking(modal.doctor!.id);}} className='my-1 w-full bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition'>
                  Cancel Booking
                </button>
              </>
            ) : (
              <>
                <h2 className='text-xl font-bold mb-4'>Booking Confirmed</h2>
                <p className='mb-4'>
                  You have successfully booked an appointment with{" "}
                  <span className='font-semibold'>{modal.doctor.name}</span> (
                  {modal.doctor.specialty}
                ).
                </p>
                <p className='mb-4'>
                  The appointment is available at{" "}
                  <span className='font-semibold'>{modal.doctor.medicalCenterAddress}</span>
                  .
                </p>
                <p className='mb-6'>
                  Please arrive within{" "}
                  <span className='font-semibold'>{modal.doctor.waitTime} minutes</span>.
                </p>
                <button
                  onClick={closeModal}
                  className='w-full bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition'
                >
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorListingPage;
