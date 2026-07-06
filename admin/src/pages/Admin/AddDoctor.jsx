import React, { useState, useContext } from "react";
import { assets } from "../../assets/assets.js";
import { AdminContext } from "../../context/AdminContext.jsx";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  const [docImage, setDocImage] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const { aToken, backendUrl } = useContext(AdminContext);



  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (!docImage) {
        return toast.error("Image is not selected.");
      }
      const formData = new FormData();
      formData.append("image", docImage);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("name", name);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append("experience", experience);
      formData.append("about", about);
      formData.append("fees", Number(fees));
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 }),
      );

      // Displaying form data....
      // formData.forEach((value, key) => {
      //   console.log(`${key} : ${value}`);
      // });

      const { data } = await axios.post(
        backendUrl + "/api/admin/add-doctor",
        formData,
        { headers: { aToken } },
      );
      if (data.success) {
        toast.success(data.message)
        setDocImage(false)
        setName('')
        setEmail('')
        setPassword('')
        setAbout('')
        setAddress1('')
        setAddress2('')
        setDegree('')
        setFees('')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  };

  return (
    <form  onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">Add Doctor</p>
      <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="doc-img">
            <img
              className="w-16 bg-gray-100 rounded-full cursor-pointer"
              src={
                docImage ? URL.createObjectURL(docImage) : assets.upload_area
              }
              alt=""
            />
          </label>
          <input
            onChange={(e) => setDocImage(e.target.files[0])}
            type="file"
            id="doc-img"
            hidden
          />
          <p>
            Upload Doctor <br /> picture
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Dcotor name</p>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="name"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Dcotor email</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="border rounded px-3 py-2"
                type="email"
                placeholder="Your email"
              
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Dcotor password</p>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="border rounded px-3 py-2"
                type="password"
                placeholder="Password"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Experience</p>
              <select
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
                className="border rounded px-3 py-2"
              >
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Year</option>
                <option value="3 Year">3 Year</option>
                <option value="4 Year">4 Year</option>
                <option value="5 Year">5 Year</option>
                <option value="6 Year">6 Year</option>
                <option value="7 Year">7 Year</option>
                <option value="8 Year">8 Year</option>
                <option value="9 Year">9 Year</option>
                <option value="10 Year">10 Year</option>
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Fees</p>
              <input
                onChange={(e) => setFees(e.target.value)}
                value={fees}
                className="border rounded px-3 py-2"
                type="number"
                placeholder="Your fees"
                required
              />
            </div>
          </div>

          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>speciality</p>
              <select
                onChange={(e) => setSpeciality(e.target.value)}
                value={speciality}
                className="border rounded px-3 py-2"
                name=""
                id=""
              >
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Education</p>
              <input
                onChange={(e) => setDegree(e.target.value)}
                value={degree}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Education"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Adress</p>
              <input
                onChange={(e) => setAddress1(e.target.value)}
                value={address1}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Address"
                required
              />
              <input
                onChange={(e) => setAddress2(e.target.value)}
                value={address2}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Address"
                required
              />
            </div>
          </div>
        </div>

        <div>
          <p className="mt-4 mb-2">About Doctor</p>
          <textarea
            onChange={(e) => setAbout(e.target.value)}
            value={about}
            className="w-full px-4 pt-2 border rounded"
            rows={5}
            placeholder="write about yourself"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-primary px-10 py-3 mt-4 text-white rounded-full"
        >
          Add Doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
