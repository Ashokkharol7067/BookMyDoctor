import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const DoctorDetails = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);

  const navigate = useNavigate()

  const doctor = doctors.find((doc) => doc._id === docId);

  if (!doctor) {
    return (
      <div className="text-center py-10 text-gray-500">
        Doctor not found
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-full max-w-sm mx-auto bg-blue-50"
          />
        </div>

        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
            {doctor.name}
          </h1>

          <p className="text-primary mt-2">
            {doctor.speciality}
          </p>

          <p className="text-gray-600 mt-2">
            {doctor.degree} · {doctor.experience} experience
          </p>

          <div className="border-t border-gray-200 my-6"></div>

          <h2 className="font-semibold text-gray-800 mb-2">
            About
          </h2>

          <p className="text-gray-600 leading-7">
            {doctor.about}
          </p>

          <div className="mt-6">
            <p className="text-gray-700">
              Appointment Fee
            </p>

            <p className="text-xl font-semibold text-gray-900 mt-1">
               ₹{doctor.fees}
            </p>
          </div>

          <button
            onClick={() => navigate(`/appointment/${docId}`)}
            className="mt-8 bg-primary text-white px-6 py-3 rounded-lg hover:opacity-90 transition-all"
          >
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;