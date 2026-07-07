import {useState, useContext, useEffect} from 'react'
import { data, useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import { toast } from 'react-toastify'
import axios from 'axios'

const Appointments = () => {

  const navigate = useNavigate()

  const {docId} = useParams()
  const {doctors, currencSymbol, token, backendUrl, getDoctorsData, currencySymbol} = useContext(AppContext)
  const daysOfWeek = ['SUN' ,'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')

  const fetchDocInfo = async () => {
    const docInfo = doctors.find(doc => doc._id === docId);
    setDocInfo(docInfo)
  }

  const getAvailableSlots = async ()=>{
    if (!docInfo) return;

    setDocSlots([])

    // getting current date
    let today = new Date()
    

    for (let i=0; i<7; i++) {
      // getting date with index
      let currentDate = new Date(today)
      
      currentDate.setDate(today.getDate()+i)
      // setting end time of the date with index
      let endTime = new Date()
      endTime.setDate(today.getDate()+i)
      endTime.setHours(21,0,0,0)
      // setting hour
      // if (today.getDate() === currentDate.getDate()){
      //   currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours()+1 : 10)
      //   currentDate.setMinutes( currentDate.getMinutes() > 30 ? 30 : 0 ) 
      // }else{
      //   currentDate.setHours(10)
      //   currentDate.setMinutes(0)
      // }

      if (today.getDate() === currentDate.getDate()) {

        const now = new Date();
    
        if (now.getMinutes() > 0 && now.getMinutes() <= 30) {
            now.setMinutes(30, 0, 0);
        } else if (now.getMinutes() > 30) {
            now.setHours(now.getHours() + 1);
            now.setMinutes(0, 0, 0);
        } else {
            now.setMinutes(0, 0, 0);
        }
    
        if (now.getHours() < 10) {
            now.setHours(10, 0, 0, 0);
        }
    
        currentDate = new Date(now);
      }else{
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      let timeSlots = []

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
        // add slots to the array

        let day = currentDate.getDate()
        let month = currentDate.getMonth()+1
        let year = currentDate.getFullYear()

        let slotDate = day + "_" + month + "_" + year

        const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(formattedTime) ? false : true

        if( isSlotAvailable ) {
          timeSlots.push({
            dateTime : new Date(currentDate),
            time : formattedTime
          })
        }

        // Increament tiem by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes()+30)
      }
      setDocSlots(prev => ([... prev, timeSlots]))
    }
  }

  const bookAppointment = async ()=> {
      if (!token) {
        toast.warn('Login to book an appointment.')
        return navigate('/login')
      }

      try {
        const date = docSlots[slotIndex][0].dateTime
        const day = date.getDate()
        const month = date.getMonth()+1
        const year = date.getFullYear()

        const slotDate = day + "_" + month + "_" + year

        const { data } = await axios.post(backendUrl + '/api/user/book-appointment', { docId, slotDate, slotTime }, {headers: {token}})


        if (data.success) {
          toast.success(data.message)
          getDoctorsData()
          navigate('/my-appointment')
        }else {
          toast.error(data.message)
        }
      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
  }
 
  useEffect(()=>{
    fetchDocInfo()
  }, [doctors, docId])

  useEffect( ()=>{
    getAvailableSlots()
  }, [docInfo])

  useEffect(()=>{
    // console.log(docSlots)
  }, [docSlots])

  return docInfo && (
    <div>
      {/* .... Doctors Details .... */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div>
          <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt="" />
        </div>
        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
          {/* ..... DoctInfo: name, degree, exper, fess  ..... */}
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
            {docInfo.name}
            <img className='w-4' src={assets.verified_icon} alt=""/> 
          </p>
          <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full '>{docInfo.experience}</button>
          </div>

          {/* ... About section ...  */}
          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'> 
              About 
              <img src={assets.info_icon} alt="" />
            </p>
            <p className='text-sm text-gray-500 max-w-[700px] mt-1'>
              {docInfo.about}
            </p>
          </div>
          <p className='text-gray-500 font-medium mt-4'>
            Appointment fee:
            <span className='text-gray-600'>{currencySymbol}{docInfo.fees}</span> 
          </p>
        </div>
      </div>

      {/* ... Booking slots ... */}
      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
        <p>Booking Slots</p>
        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
          {
            docSlots.length && docSlots.map((item, index)=>(
              <div onClick={()=>setSlotIndex(index)} key={index} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-gray-200'}`}>
                <p>{item[0] ? daysOfWeek[item[0].dateTime.getDay()] : 'Closed'} </p>
                <p>{item[0] && item[0].dateTime.getDate()} </p>
              </div>
            ))
          }
        </div>
        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
          {
            docSlots.length && docSlots[slotIndex].map((item, index)=>(
              <p onClick={()=> setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'text-gray-400 border border-gray-3 00'}`} key={index}>
                {item.time.toLowerCase()}
              </p>
            ))
          }
        </div>
        <button onClick={bookAppointment} className='border rounded-full my-6 px-14 py-3 font-light text-white text-sm  bg-primary'>Book an appointment</button>
      </div>
      {/* .... Listing Related doctors  .... */}
      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
    </div>
  )
}

export default Appointments
