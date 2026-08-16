import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Doctor = () => {
  const { speciality } = useParams();
  const [filterDoc, setfilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();

  const { doctors } = useContext(AppContext);

  const applyFilter = () => {
    if (speciality) {
      setfilterDoc(
        doctors.filter((doc) => doc.speciality === speciality)
      );
    } else {
      setfilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  const specialities = [
    "General Physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatricians",
    "Neurologist",
    "Gastroenterologist",
  ];

  const handleSpeciality = (selectedSpeciality) => {
    speciality === selectedSpeciality
      ? navigate("/doctors")
      : navigate(`/doctors/${selectedSpeciality}`);

    setShowFilter(false);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-10 py-6">
      <p className="text-gray-700 font-semibold text-lg sm:text-xl">
        Browse through the doctors specialist.
      </p>

      <div className="flex flex-col lg:flex-row items-start gap-6 mt-6">
        <div className="w-full lg:w-56 shrink-0">
          <button
            className={`w-full lg:hidden px-4 py-3 border rounded-xl text-sm font-medium transition-all ${
              showFilter
                ? "bg-primary text-white"
                : "bg-white text-gray-700"
            }`}
            onClick={() => setShowFilter((prev) => !prev)}
          >
            {showFilter ? "Close Filters" : "Show Filters"}
          </button>

          <div
            className={`mt-3 lg:mt-0 flex-col gap-3 text-sm text-gray-600 ${
              showFilter ? "flex" : "hidden lg:flex"
            }`}
          >
            <p className="font-semibold text-gray-800 text-base hidden lg:block mb-1">
              Specialities
            </p>

            {specialities.map((item) => (
              <button
                key={item}
                onClick={() => handleSpeciality(item)}
                className={`w-full text-left px-4 py-3 rounded-xl border transition-all duration-300 ${
                  speciality === item
                    ? "bg-primary text-white border-primary shadow-md"
                    : "bg-white border-gray-200 hover:border-primary hover:text-primary hover:bg-blue-50"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
          {filterDoc.length === 0 ? (
            <div className="sm:col-span-2 xl:col-span-3 text-center py-16">
              <p className="text-gray-500 text-lg">
                Doctor not found.
              </p>
            </div>
          ) : (
            filterDoc.map((item) => (
              <div
                key={item._id}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="bg-blue-50">
                  <img
                    className="w-full h-40 sm:h-60 object-cover object-top"
                    src={item.image}
                    alt={item.name}
                  />
                </div>
            
                <div className="p-3">
                  <h2 className="text-base font-semibold text-gray-900 truncate">
                    {item.name}
                  </h2>
            
                  <p className="text-primary text-sm mt-1 truncate">
                    {item.speciality}
                  </p>
            
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => navigate(`/doctor/${item._id}`)}
                      className="flex-1 border border-primary text-primary text-xs sm:text-sm font-medium py-2 rounded-lg hover:bg-primary hover:text-white transition-all"
                    >
                      View Profile
                    </button>
            
                    <button
                      onClick={() => navigate(`/appointment/${item._id}`)}
                      className="flex-1 bg-primary text-white text-xs sm:text-sm font-medium py-2 rounded-lg hover:opacity-90 transition-all"
                    >
                      Book Now
                    </button>
                  </div>
            
                  <div className="flex items-center justify-center gap-2 mt-3 pt-3 border-t border-gray-100">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span className="text-xs font-medium text-green-600">
                      Available
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctor;