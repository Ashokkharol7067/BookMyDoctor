import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import razorpay from "razorpay";

// API to register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password || !name) {
      res.json({ success: false, message: "Missing details" });
    }

    if (!validator.isEmail(email)) {
      res.json({ success: false, message: "You have entered invalid email." });
    }

    if (password.length < 8) {
      res.json({ success: false, message: "Entered a strong password." });
    }

    // hashing user password..
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// api for user login

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "user does not exists." });
    }
    // console.log(user)
    // console.log(password)
    // console.log(user.password)
    // console.log(user.email)
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credetials." });
    }
  } catch (error) {
    console.log("error is: " + error);
    res.json({ success: false, message: error.message });
  }
};

// api for getting user
const userInfo = async (req, res) => {
  try {
    const userId = req.userId;

    const userData = await userModel.findById(userId).select("-password");

    res.json({ success: true, userData });
  } catch (error) {
    console.log("error is: " + error);
    res.json({ success: false, message: error.message });
  }
};

// Api to update userProfile..
const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;

    if (!name || !phone || !dob || !gender) {
      return res.json({ success: false, message: "Data is missing." });
    }

    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address: JSON.parse(address),
      dob,
      gender,
    });

    // updating appointment after successfully updating user profile..
    const updatedUser = await userModel.findById(userId);

    await appointmentModel.updateMany(
      { userId },
      {
        $set: {
          userData: updatedUser,
        },
      },
    );

    if (imageFile) {
      // upload image on cloudinary..
      const imageUplaod = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageUrl = imageUplaod.secure_url;

      await userModel.findByIdAndUpdate(userId, { image: imageUrl });
    //   updating image ......
      await appointmentModel.updateMany(
        { userId },
        {
          $set: {
            "userData.image": imageUrl,
          },
        }
      );
    }

    res.json({ success: true, message: "profile updated successfully." });
  } catch (error) {
    console.log("error is: " + error);
    res.json({ success: false, message: error.message });
  }
};

// Api to book an appointment...
const bookAppointment = async (req, res) => {
  try {
    const userId = req.userId;
    const { docId, slotDate, slotTime } = req.body;

    const docData = await doctorModel.findById(docId).select("-password");

    if (!docData.available) {
      return res.json({ success: true, message: "Doctor is not available" });
    }

    let slots_booked = docData.slots_booked;
    // console.log(docData.slots_booked)

    // checking for slots availability....
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: "Slot is already booked." });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }

    const userData = await userModel.findById(userId).select("-password");

    delete docData.slots_booked;

    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotTime,
      slotDate,
      date: Date.now(),
    };

    // const newAppointment = new appointmentModel(appointmentData)

    // await newAppointment.save()

    // changes....
    try {
      const newAppointment = new appointmentModel(appointmentData);

      await newAppointment.save();
    } catch (error) {
      if (error.code === 11000) {
        return res.json({
          success: false,
          message: "Slot already booked.",
        });
      }

      throw error;
    }

    // save new slot data in docData
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment is booked." });
  } catch (error) {
    console.log("error is: " + error);
    res.json({ success: false, message: error.message });
  }
};

// get all appointment doctors ...
const listAppointment = async (req, res) => {
  try {
    const userId = req.userId;
    const appointmentList = await appointmentModel.find({ userId });
    res.json({ success: true, appointmentList });
  } catch (error) {
    console.log("error is: " + error);
    res.json({ success: false, message: error.message });
  }
};

// api for cancel an appointment...
const calcelAppointment = async (req, res) => {
  try {
    const userId = req.userId;
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    // verify appointment user
    if (appointmentData.userId !== userId) {
      return res.json({ success: false, message: "Unauthorized action" });
    }

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

const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// API to make payment of appointment using razorpay
const paymentRazorpay = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData || appointmentData.cancelled) {
      return res.json({
        success: false,
        message: "Appointment Cancelled or not found",
      });
    }

    // creating options for razorpay payment
    const options = {
      amount: appointmentData.amount * 100,
      currency: process.env.CURRENCY,
      receipt: appointmentId,
    };

    // creation of an order
    const order = await razorpayInstance.orders.create(options);

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Api to verify payment of razorpay
const verifyRazorpay = async (req, res) => {
  try {
    const { razorpay_order_id } = req.body;
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

    if (orderInfo.status === "paid") {
      await appointmentModel.findByIdAndUpdate(orderInfo.receipt, {
        payment: true,
      });
      res.json({ success: true, message: "Payment successfull" });
    } else {
      res.json({ success: false, message: "Payment failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export {
  registerUser,
  loginUser,
  userInfo,
  updateProfile,
  bookAppointment,
  listAppointment,
  calcelAppointment,
  paymentRazorpay,
  verifyRazorpay,
};
