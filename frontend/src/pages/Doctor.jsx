import {useContext, useState, useEffect} from 'react'
import {useNavigate,useParams} from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const Doctor = () => {

  const { speciality } = useParams()
  const [filterDoc, setfilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate()

  const {doctors} = useContext(AppContext)

  const applyFilter = ()=> {
    if(speciality) {
      setfilterDoc(doctors.filter((doc)=>doc.speciality === speciality))
    }
    else {
      setfilterDoc(doctors)
    }
  }

  useEffect(()=>{
    applyFilter()

  }, [doctors, speciality])

  return (
    <div>
      <p className='text-gray-600 font-medium'>Browse through the doctors specialist.</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button className={`px-3 py-1 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-primary text-white': ''}`} onClick={()=> setShowFilter(prev => !prev)}>Filters</button>
        <div className={` flex-col gap-2 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
          <p onClick={()=> speciality === 'General physician' ? navigate('/doctors') : navigate('/doctors/General physician')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all `}>General physician</p>
          <p onClick={()=> speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all `}>Gynecologist</p>
          <p onClick={()=> speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all `}>Dermatologist</p>
          <p onClick={()=> speciality === 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all `}>Pediatricians</p>
          <p onClick={()=> speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all `}>Neurologist</p>
          <p onClick={()=> speciality === 'Gastroenterlogist' ? navigate('/doctors') : navigate('/doctors/Gastroenterlogist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all `}>Gastroenterlogist</p>
        </div>
        <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
          {
            (filterDoc.length == 0)
            ? (<p className='text-center w-full'>Doctor not found.</p>)
            : 
            filterDoc.map((item, index)=>(
              <div onClick={()=>navigate(`/appointment/${item._id}`)} className='border border-blue-100 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
                  <img className='bg-blue-50' src={item.image} alt="" />
                  <div className='p-4'>
                      <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                          <p className='w-2 h-2 bg-green-500 rounded-full'></p><p>Available</p>
                      </div>
                      <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                      <p className='text-gray-600 text-sm'>{item.speciality}</p>
                  </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Doctor
