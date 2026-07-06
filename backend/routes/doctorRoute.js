import express from 'express'
import { appointmentCancel, appointmentComplete, appointmentDoctors, doctorDashboardData, doctorList, doctorProfile, loginDoctor, updateDoctorProfile,  } from '../controllers/doctorController.js'
import authDoctor from '../middlewares/authDoctor.js'
import { calcelAppointment } from '../controllers/userController.js'

const doctorRouter = express.Router()

doctorRouter.get('/list', doctorList)
doctorRouter.post('/login', loginDoctor)
doctorRouter.get('/appointments', authDoctor, appointmentDoctors)
doctorRouter.post('/cancel-appointments', authDoctor, appointmentCancel)
doctorRouter.post('/complete-appointments', authDoctor, appointmentComplete)
doctorRouter.get('/dashboard', authDoctor, doctorDashboardData)
doctorRouter.get('/profile', authDoctor, doctorProfile)
doctorRouter.post('/update-profile', authDoctor, updateDoctorProfile)

export default doctorRouter

