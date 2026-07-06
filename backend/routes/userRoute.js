import express from 'express'
import { loginUser, registerUser, updateProfile, userInfo, bookAppointment, listAppointment, calcelAppointment, paymentRazorpay, verifyRazorpay } from '../controllers/userController.js'
import authUser from '../middlewares/authUser.js'
import upload from '../middlewares/multer.js'

const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/user-info', authUser ,userInfo)
userRouter.post('/update-profile', upload.single('image'), authUser, updateProfile)
userRouter.post('/book-appointment', authUser, bookAppointment)
userRouter.get('/appointments', authUser, listAppointment)
userRouter.post('/cancel-appointment', authUser, calcelAppointment)
userRouter.post('/payment-razorpay', authUser, paymentRazorpay)
userRouter.post('/verify-razorpay', authUser, verifyRazorpay)

export default userRouter