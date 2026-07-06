import doctorModel from "../models/doctorModel.js"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import appointmentModel from "../models/appointmentModel.js"

const changeAvailability = async (req, res) =>{
    try {

        const {docId} = req.body

        const docData = await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId, {available: !docData.available})
        res.json({success: true, message: "Availabilty is changed"}) 

    } catch (error) {

        console.log(error)
        res.json({success: false, message: error.message})

    }
}

const doctorList = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select(['-password', '-email'])
        res.json({success: true, doctors})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

// Api for doctor login
const loginDoctor = async (req, res) => {
    try {

        const { email, password } = req.body;

        const doctor = await doctorModel.findOne({ email });

        if (!doctor) {
            return res.json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const isMatch = await bcrypt.compare(password, doctor.password);

        if (!isMatch) {
            return res.json({
                success: false,
                message: "Password is wrong"
            });
        }

        const token = jwt.sign(
            { id: doctor._id },
            process.env.JWT_SECRET
        );

        res.json({
            success: true,
            token
        });

    } catch (error) {
        console.log(error);

        res.json({
            success: false,
            message: error.message
        });
    }
};

// api for to get all appointments docotrs..
const appointmentDoctors = async (req, res)=> {
    try {

        const docId = req.docId;
        const appointments = await appointmentModel.find({docId})
        console.log(appointments.length)

        res.json({success: true, appointments})

    } catch (error) {
        console.log(error);

        res.json({
            success: false,
            message: error.message
        });
    }
}

// API to mark appointment completed for doctor panel
const appointmentComplete = async (req, res) => {
    try {

        const docId = req.docId

        const { appointmentId } = req.body;

        const appointmentData = await appointmentModel.findById(appointmentId);

        if (appointmentData && appointmentData.docId === docId) {

            await appointmentModel.findByIdAndUpdate(
                appointmentId,
                { isCompleted: true }
            );

            return res.json({
                success: true,
                message: "Appointment Completed"
            });

        } else {

            return res.json({
                success: false,
                message: "Mark Failed"
            });

        }

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        });
    }
};

// API to cancel appointment completed for doctor panel
const appointmentCancel = async (req, res) => {
    try {

        const docId = req.docId

        const { appointmentId } = req.body;

        const appointmentData = await appointmentModel.findById(appointmentId);

        if (appointmentData && appointmentData.docId === docId) {

            await appointmentModel.findByIdAndUpdate(
                appointmentId,
                { cancelled: true }
            );

            return res.json({
                success: true,
                message: "Appointment cancelled"
            });

        } else {

            return res.json({
                success: false,
                message: "cancellation Failed"
            });

        }

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        });
    }
};

// API for getting dashboard data for doctor panel..
const doctorDashboardData = async (req, res) => {
    try {

        const docId = req.docId
        const appointments = await appointmentModel.find({docId})

        let earning = 0;
        let patients = []
        appointments.map((item) => {
            if (item.isCompleted || item.payment) {
                earning += item.amount
            }
            if (!patients.includes(item.userId)) {
                patients.push(item.userId)
            }
        })

        const dashData = {
            earning,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointments: appointments.reverse().slice(0,5)
        }

        res.json({success: true, dashData})
        
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        });
    }
}

// API to get doctor profile for doctor panel
const doctorProfile = async(req, res)=> {
    try {

        const docId = req.docId

        const profileData = await doctorModel.findById(docId).select('-password')

        res.json({success: true, profileData})
        
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        });
    }
}

// API to update doctor profile data from doctor panel
const updateDoctorProfile = async (req, res)=> {
    try {
        const {docId, fees, address, available} = req.body
        await doctorModel.findByIdAndUpdate(docId, {fees, address, available})
        res.json({success: true, message: "profile updated successfully."})
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        });
    }
}

export {changeAvailability, doctorList, loginDoctor, appointmentDoctors,
     appointmentComplete, appointmentCancel, doctorDashboardData, doctorProfile, updateDoctorProfile}