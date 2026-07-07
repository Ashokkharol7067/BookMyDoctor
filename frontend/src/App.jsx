import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Login from './pages/Login'
import About from './pages/About'
import Doctor from './pages/Doctor'
import MyAppointment from './pages/MyAppointments'
import MyProfile from './pages/MyProfile'
import Appointments from './pages/Appointments'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ToastContainer, toast } from 'react-toastify';
import AiDoctor from './pages/AiDoctor'

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/doctors' element={<Doctor/>} />
        <Route path='/doctors/:speciality' element={<Doctor/>} />
        <Route path='/my-appointment' element={<MyAppointment/>} />
        <Route path='/my-profile' element={<MyProfile/>} />
        <Route path='/appointment/:docId' element={<Appointments/>} />
        <Route path="/ai-doctor" element={<AiDoctor />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
