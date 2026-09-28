import React from 'react'
import { useNavigate } from 'react-router-dom'
import {useContext} from 'react'
import { AppContext } from '../context/AppContext';

const TopDoctors = () => {

  const navigate = useNavigate(); 

  const { doctors } = useContext(AppContext)

  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
      <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
      <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted doctors.</p>
      <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
        {
            doctors.slice(0, 4).map((item) => (
              <div
                key={item._id}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="bg-blue-50">
                  <img
                    className="w-full h-40 sm:h-60 object-cover object-top"
                    src={item.image}
                    alt={item.name}
                  />
                </div>
            
                <div className="p-3">
                  <h2 className="text-base font-semibold text-gray-900 truncate">
                    {item.name}
                  </h2>
            
                  <p className="text-primary text-sm mt-1 truncate">
                    {item.speciality}
                  </p>
            
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => navigate(`/doctor/${item._id}`)}
                      className="flex-1 border border-primary text-primary text-xs sm:text-sm font-medium py-2 rounded-lg hover:bg-primary hover:text-white transition-all"
                    >
                      View Profile
                    </button>
            
                    <button
                      onClick={() => navigate(`/appointment/${item._id}`)}
                      className="flex-1 bg-primary text-white text-xs sm:text-sm font-medium py-2 rounded-lg hover:opacity-90 transition-all"
                    >
                      Book Now
                    </button>
                  </div>
            
                  <div className="flex items-center justify-center gap-2 mt-3 pt-3 border-t border-gray-100">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span className="text-xs font-medium text-green-600">
                      Available
                    </span>
                  </div>
                </div>
              </div>
            ))
        }
      </div>
      <button onClick={() => {navigate('/doctors'); scrollTo(0,0)}} className='bg-blue-50 text-gray-500 px-12 py-3 rounded-full mt-10'>more</button>
    </div>
  )
}

export default TopDoctors
