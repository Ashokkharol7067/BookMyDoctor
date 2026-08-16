import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

const ContactForm = () => {
  const { backendUrl } = useContext(AppContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
  
    try {
      const { data } = await axios.post(
        backendUrl + "/api/contact/send-message",
        formData
      );
  
      if (data.success) {
        toast.success(data.message);
  
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="mt-4 w-full">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Send us a Message
      </h2>

      <form onSubmit={onSubmitHandler} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={onChangeHandler}
          placeholder="Your Name"
          className="border border-gray-300 rounded-md p-3 outline-none focus:border-primary"
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={onChangeHandler}
          placeholder="Your Email"
          className="border border-gray-300 rounded-md p-3 outline-none focus:border-primary"
        />

        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={onChangeHandler}
          placeholder="Subject"
          className="border border-gray-300 rounded-md p-3 outline-none focus:border-primary"
        />

        <textarea
          rows="5"
          name="message"
          value={formData.message}
          onChange={onChangeHandler}
          placeholder="Your Message"
          className="border border-gray-300 rounded-md p-3 outline-none resize-none focus:border-primary"
        />

        <button
          type="submit"
          className="bg-primary text-white py-3 rounded-md hover:opacity-90 duration-300"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
