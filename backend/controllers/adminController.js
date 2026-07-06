import validator from 'validator' 
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js'
import userModel from '../models/userModel.js'


// API for adding doctors: 

const addDoctor = async (req, res)=>{
    try{
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body
        const imageFile = req.file

        if ( !name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address ) {
            return res.json( {success: false, message: "Missing Details"} )
        }

        // Validing email formate
        if ( !validator.isEmail(email)){
            return res.json( {success: false, message: "Please Enter valid email."} )
        }

        // validate passcode
        if(password.length < 8) {
            return res.json( {success: false, message: "Please enter a strong passcode."} )
        }

        // Hashing doctor password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt) 
        
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type: "image"})
        const imageUrl = imageUpload.secure_url

        const doctorData = {
            name,
            email, 
            image: imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            fees,
            about,
            experience,
            address: JSON.parse(address),
            date: Date.now()
        }

        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save()

        res.json({success: true, message: "Doctor added."})

    }catch(error){
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

// API for the admin login
const loginAdmin = async (req, res) =>{
    try {
        const {email, password} = req.body

        // console.log("Received email:", email);
        // console.log("Received password:", password);
        // console.log("ADMIN_EMAIL from env:", process.env.ADMIN_EMAIL);
        // console.log("ADMIN_PASSWORD from env:", process.env.ADMIN_PASSWORD);
        // console.log("Type check:", typeof process.env.ADMIN_EMAIL, typeof process.env.ADMIN_PASSWORD);

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email+password, process.env.JWT_SECRET)
            res.json({success: true, token})
        }else {
            res.json({success: false, message: "Invalid Credential"})
        }
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

// Api to get all doctorList for admin panel
const allDoctors = async (req, res) =>{
    try {
        const doctors = await doctorModel.find({}).select('-password')
        res.json({success:true, doctors})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

// API to get all appointments list
const appointmentsAdmin = async (req, res) => {

    try {
        const appointments = await appointmentModel.find({})
        res.json({ success: true, appointments })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// api for cancel an appointment...
const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    // releasing doctor slot
    const { docId, slotDate, slotTime } = appointmentData;
    const docData = await doctorModel.findById(docId);

    let slots_booked = docData.slots_booked;
    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (e) => e != slotTime,
    );

    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({
      success: true,
      message: "Appointment is canceled successfully.",
    });
  } catch (error) {
    console.log("error is: " + error);
    res.json({ success: false, message: error.message });
  }
};

// api for dashboard data....
const adminDashboard = async (req, res) => {
    try {
        const doctors = await doctorModel.find({})
        const appointments = await appointmentModel.find({})
        const users = await userModel.find({})
        const dashData = {
            doctors: doctors.length,
            appointments: appointments.length,
            users: users.length,
            latestAppointments: appointments.reverse().slice(0,5)
        }
        res.json({success: true, dashData})
    } catch (error) {
        console.log("error is: " + error);
        res.json({ success: false, message: error.message });
    }
}

export {addDoctor, loginAdmin, allDoctors, appointmentsAdmin, appointmentCancel, adminDashboard}