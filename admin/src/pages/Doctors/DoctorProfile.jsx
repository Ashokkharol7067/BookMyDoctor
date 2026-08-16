import { useContext, useState, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorProfile = () => {
  const {
    dToken,
    profileData,
    setProfileData,
    getProfileData,
  } = useContext(DoctorContext);

  const { backendUrl, currencySymbol } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available,
      };

      const { data } = await axios.post(
        `${backendUrl}/api/doctor/update-profile`,
        updateData,
        {
          headers: { dToken },
        }
      );

      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        await getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const cancelEdit = async () => {
    setIsEdit(false);
    await getProfileData();
  };

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  if (!profileData) {
    return (
      <div className="py-10 text-center text-gray-500">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="w-full bg-white border border-gray-200 rounded-lg">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 lg:p-6 border-b border-gray-200">
          <div>
            <h1 className="text-xl font-semibold text-gray-800">
              My Profile
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              View and manage your profile information
            </p>
          </div>

          {!isEdit ? (
            <button
              onClick={() => setIsEdit(true)}
              className="w-full sm:w-auto px-5 py-2.5 text-sm font-medium border border-gray-300 rounded-md hover:bg-gray-50 transition-all"
            >
              Edit Profile
            </button>
          ) : (
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <button
                onClick={cancelEdit}
                className="w-full sm:w-auto px-5 py-2.5 text-sm font-medium border border-gray-300 rounded-md hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>

              <button
                onClick={updateProfile}
                className="w-full sm:w-auto px-5 py-2.5 text-sm font-medium bg-primary text-white rounded-md hover:opacity-90 transition-all"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>

        <div className="p-5 sm:p-6 lg:p-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-5 lg:gap-8 pb-6 lg:pb-8 border-b border-gray-200">
            <img
              src={profileData.image}
              alt={profileData.name}
              className="w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 object-cover rounded-lg bg-gray-100"
            />

            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900">
                {profileData.name}
              </h2>

              <p className="text-gray-600 mt-1">
                {profileData.speciality}
              </p>

              <p className="text-gray-500 text-sm mt-2">
                {profileData.degree} · {profileData.experience} experience
              </p>
            </div>
          </div>

          <div className="py-6 lg:py-8 border-b border-gray-200">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">
              ABOUT
            </h3>

            <p className="text-sm sm:text-base text-gray-600 leading-7 max-w-4xl">
              {profileData.about}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 py-6 lg:py-8 border-b border-gray-200">
            
            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-3">
                APPOINTMENT FEES
              </h3>

              {isEdit ? (
                <div className="flex items-center w-fit border border-gray-300 rounded-md">
                  <span className="px-3 text-gray-500">
                    {currencySymbol}
                  </span>

                  <input
                    type="number"
                    value={profileData.fees}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        fees: e.target.value,
                      }))
                    }
                    className="w-28 py-2.5 pr-3 text-sm outline-none"
                  />
                </div>
              ) : (
                <p className="text-gray-800 font-medium text-lg">
                  {currencySymbol}
                  {profileData.fees}
                </p>
              )}
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-800 mb-3">
                AVAILABILITY
              </h3>

              <label
                className={`flex items-center gap-3 ${
                  isEdit ? "cursor-pointer" : "cursor-default"
                }`}
              >
                <input
                  type="checkbox"
                  checked={profileData.available}
                  disabled={!isEdit}
                  onChange={() =>
                    setProfileData((prev) => ({
                      ...prev,
                      available: !prev.available,
                    }))
                  }
                  className="w-4 h-4 accent-primary"
                />

                <span className="text-sm text-gray-600">
                  Available for appointments
                </span>
              </label>
            </div>
          </div>

          <div className="pt-6 lg:pt-8">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">
              ADDRESS
            </h3>

            {isEdit ? (
              <div className="flex flex-col gap-3 w-full sm:max-w-xl">
                <input
                  type="text"
                  value={profileData.address?.line1 || ""}
                  placeholder="Address line 1"
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      address: {
                        ...prev.address,
                        line1: e.target.value,
                      },
                    }))
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm outline-none focus:border-primary"
                />

                <input
                  type="text"
                  value={profileData.address?.line2 || ""}
                  placeholder="Address line 2"
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      address: {
                        ...prev.address,
                        line2: e.target.value,
                      },
                    }))
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm outline-none focus:border-primary"
                />
              </div>
            ) : (
              <div className="text-sm sm:text-base text-gray-600 leading-7">
                <p>{profileData.address?.line1}</p>
                <p>{profileData.address?.line2}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;