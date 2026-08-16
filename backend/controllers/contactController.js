import contactModel from "../models/contactModel.js";

const sendContactMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.json({
        success: false,
        message: "All fields are required"
      });
    }

    const newMessage = new contactModel({
      name,
      email,
      subject,
      message
    });

    await newMessage.save();

    res.json({
      success: true,
      message: "Message sent successfully"
    });

  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message
    });
  }
};

export { sendContactMessage };