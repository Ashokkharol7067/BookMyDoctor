import React, { useContext, useState, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import  Axios  from "axios";

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData } =
    useContext(DoctorContext);
  const { calculateAge, slotDateFormate, currencySymbol } =
    useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false)  

  const updateProfile = async () => {
    try {
  
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available
      };
  
      const { data } = await axios.post(
        backendUrl + '/api/doctor/update-profile',
        updateData,
        {
          headers: { dToken }
        }
      );
  
      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }
  
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  return (
    profileData && (
      <div className="max-w-5xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 flex flex-col md:flex-row gap-8">
         
          <div className="flex justify-center">
            <img
              src={profileData.image}
              alt=""
              className="w-64 h-64 rounded-2xl object-cover border-4 border-indigo-100 shadow-md"
            />
          </div>

          {/* Doctor Details */}
          <div className="flex-1 space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">
                {profileData.name}
              </h2>

              <div className="flex flex-wrap items-center gap-3 mt-3">
                <span className="px-4 py-1 rounded-full bg-indigo-100 text-indigo-700 font-medium">
                  {profileData.degree}
                </span>

                <span className="px-4 py-1 rounded-full bg-green-100 text-green-700 font-medium">
                  {profileData.speciality}
                </span>

                <span className="px-4 py-1 rounded-full bg-orange-100 text-orange-700 font-medium">
                  {profileData.experience}
                </span>
              </div>
            </div>

            {/* About */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                About
              </h3>

              <p className="text-gray-600 leading-7">{profileData.about}</p>
            </div>

            <div className="flex items-center gap-2">
              <p className="font-semibold text-gray-700">Appointment Fees:</p>

              <span className="text-2xl font-bold text-indigo-600">
                {currencySymbol}
                { isEdit ?
                  <input type="number"
                    onChange={(e) => setProfileData(prev => ({...prev, fees: e.target.value}))}
                    value={profileData.fees}
                    name="" id="" />
                  : profileData.fees}
              </span>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Address
              </h3>

              <p className="text-gray-600">
                { isEdit?
                  <input type="text" onChange={(e) => setProfileData(prev => ({...prev, address: {...prev.address, line1:e.target.value }}))} value={profileData.address.line1} name="" id="" />
                : profileData.address.line1}
                <br />
                { isEdit?
                  <input type="text" onChange={(e) => setProfileData(prev => ({...prev, address: {...prev.address, line2:e.target.value }}))} value={profileData.address.line2} name="" id="" />
                : profileData.address.line2}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <input
                onChange={() => isEdit && setProfileData(prev => ({...prev, available: !prev.available}))}
                type="checkbox"
                checked={profileData.available}
                className="w-5 h-5 accent-indigo-600 cursor-pointer"
              />

              <label className="text-gray-700 font-medium">
                Available for Appointments
              </label>
            </div>

            {
              isEdit
              ? <button onClick={() => setIsEdit(false)} className="px-8 py-3 rounded-xl  font-semibold hover:bg-indigo-700 transition duration-300 shadow-md hover:shadow-lg">
                  Save Profile
                </button>
              : <button onClick={() => setIsEdit(true)} className="px-8 py-3 rounded-xl  font-semibold hover:bg-indigo-700 transition duration-300 shadow-md hover:shadow-lg">
                  Edit Profile
                </button>   
            }

          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;
