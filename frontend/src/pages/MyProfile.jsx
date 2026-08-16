import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext.jsx';
import axios from 'axios';
import { assets } from '../assets/assets.js';
import { toast } from 'react-toastify';

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const { backendUrl, userData, setUserData, token, loadUserProfileData } =
    useContext(AppContext);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append('name', userData.name);
      formData.append('phone', userData.phone);
      formData.append('address', JSON.stringify(userData.address));
      formData.append('gender', userData.gender);
      formData.append('dob', userData.dob);

      image && formData.append('image', image);

      const { data } = await axios.post(
        backendUrl + '/api/user/update-profile',
        formData,
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setImage(false);
        setIsEdit(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    userData && (
      <div className="flex justify-center py-6 bg-gray-50 min-h-screen">
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-md border border-gray-200 p-6">
          {/* Header */}
          <div className="flex justify-between items-start">
            <h1 className="text-xl font-bold text-gray-500">User Profile</h1>
            <button
              onClick={() => {
                if (isEdit) {
                  updateUserProfileData();
                } else {
                  setIsEdit(true);
                }
              }}
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-primary hover:text-white transition flex items-center justify-center text-sm"
            >
              {isEdit ? '✔' : '✏'}
            </button>
          </div>

          {/* Avatar + Name */}
          <div className="flex items-center gap-4 mt-6">
            {isEdit ? (
              <label htmlFor="image" className="cursor-pointer">
                <img
                  src={image ? URL.createObjectURL(image) : userData.image}
                  alt=""
                  className="w-16 h-16 rounded-full object-cover border"
                />
                <input
                  hidden
                  id="image"
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </label>
            ) : (
              <img
                src={userData.image}
                alt=""
                className="w-20 h-20 rounded-full object-cover border"
              />
            )}

            <div>
              {isEdit ? (
                <input
                  value={userData.name}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  className="text-2xl font-bold border-b outline-none"
                />
              ) : (
                <h2 className="text-2xl font-bold text-gray-900">
                  {userData.name}
                </h2>
              )}
              <p className="text-sm text-gray-500 mt-0.5">{userData.email}</p>
            </div>
          </div>

          {/* Details */}
          <div className="mt-6 space-y-4">
            {/* Full Name */}
            <div>
              <label className="text-xs font-medium text-gray-700 uppercase tracking-wider">
                Full Name
              </label>
              {isEdit ? (
                <input
                  value={userData.name}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              ) : (
                <div className="w-full mt-1 border rounded-lg px-3 py-1.5 bg-gray-50 text-sm">
                  {userData.name}
                </div>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="text-xs font-medium text-gray-700 uppercase tracking-wider">
                Email
              </label>
              <div className="w-full mt-1 border rounded-lg px-3 py-1.5 bg-gray-50 text-sm">
                {userData.email}
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="text-xs font-medium text-gray-700 uppercase tracking-wider">
                Phone Number
              </label>
              {isEdit ? (
                <input
                  value={userData.phone}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      phone: e.target.value,
                    }))
                  }
                  className="w-full mt-1 border rounded-lg px-3 py-1.5 text-sm"
                />
              ) : (
                <div className="w-full mt-1 border rounded-lg px-3 py-1.5 bg-gray-50 text-sm">
                  {userData.phone}
                </div>
              )}
            </div>

            {/* Address */}
            <div>
              <label className="text-xs font-medium text-gray-700 uppercase tracking-wider">
                Address
              </label>
              {isEdit ? (
                <div className="space-y-2 mt-1">
                  <input
                    className="w-full border rounded-lg px-3 py-1.5 text-sm"
                    value={userData.address.line1}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: {
                          ...prev.address,
                          line1: e.target.value,
                        },
                      }))
                    }
                  />
                  <input
                    className="w-full border rounded-lg px-3 py-1.5 text-sm"
                    value={userData.address.line2}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: {
                          ...prev.address,
                          line2: e.target.value,
                        },
                      }))
                    }
                  />
                </div>
              ) : (
                <div className="w-full mt-1 border rounded-lg px-3 py-1.5 bg-gray-50 text-sm">
                  {userData.address.line1}
                  <br />
                  {userData.address.line2}
                </div>
              )}
            </div>

            {/* Gender + Birthday */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Gender
                </label>
                {isEdit ? (
                  <select
                    value={userData.gender}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        gender: e.target.value,
                      }))
                    }
                    className="w-full mt-1 border rounded-lg px-3 py-1.5 text-sm"
                  >
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                ) : (
                  <div className="w-full mt-1 border rounded-lg px-3 py-1.5 bg-gray-50 text-sm">
                    {userData.gender}
                  </div>
                )}
              </div>

              <div>
                <label className="text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Birthday
                </label>
                {isEdit ? (
                  <input
                    type="date"
                    value={userData.dob}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        dob: e.target.value,
                      }))
                    }
                    className="w-full mt-1 border rounded-lg px-3 py-1.5 text-sm"
                  />
                ) : (
                  <div className="w-full mt-1 border rounded-lg px-3 py-1.5 bg-gray-50 text-sm">
                    {userData.dob}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default MyProfile;