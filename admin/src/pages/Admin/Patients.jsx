import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const Patients = () => {

  const { patients, getPatientsData, aToken } = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getPatientsData()
    }
  }, [aToken])

  return (
    <div className='m-5'>

      <h1 className='text-lg font-medium mb-5'>
        All Patients
      </h1>

      <div className=' bg-white border rounded overflow-hidden'>

        <div className=' grid grid-cols-[0.5fr_2fr_2fr_2fr] bg-gray-100 py-3 px-4 font-medium text-gray-700'>
          <p>#</p>
          <p>Patient</p>
          <p>Email</p>
          <p>Phone</p>
        </div>

        {patients.length > 0 ? (
          patients.map((item, index) => (
            <div
              key={item._id}
              className='grid grid-cols-[0.5fr_2fr_2fr_2fr] items-center py-3 px-4 border-t hover:bg-gray-50 text-gray-600'
            >
              <p>{index + 1}</p>

              <div className='flex items-center gap-3'>
                <img
                  className='w-10 h-10 rounded-full object-cover'
                  src={item.image}
                  alt=""
                />
                <p>{item.name}</p>
              </div>

              <p>{item.email}</p>

              <p>{item.phone || 'Not Available'}</p>
            </div>
          ))
        ) : (
          <div className='p-5 text-center text-gray-500'>
            No patients found
          </div>
        )}

      </div>

    </div>
  )
}

export default Patients