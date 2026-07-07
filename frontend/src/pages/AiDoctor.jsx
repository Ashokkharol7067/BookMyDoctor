import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AiDoctor = () => {
  const [symptoms, setSymptoms] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const navigate = useNavigate()

  const { backendUrl, doctors, getDoctorsData, token } = useContext(AppContext);

  useEffect(()=>{
    getDoctorsData()
  }, [token])

  const handleSubmit = async () => {
    if (symptoms.trim() === "") {
      alert("Please describe your symptoms.");
      return;
    }

    try {
      setLoading(true);

      const { data } = await axios.post(backendUrl + "/api/ai/recommend", {
        symptoms,
      });

      if (data.success) {
        setResult(data.result);
      }
    } catch (error) {
      console.log(error);

      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-5 py-16">
      <h1 className="text-4xl font-bold text-center">
        🤖 AI Doctor Recommendation
      </h1>

      <p className="text-center text-gray-600 mt-3">
        Describe your symptoms in detail and our AI will recommend the most
        suitable specialist.
      </p>

      <textarea
        rows={8}
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
        placeholder="Example: I have had a headache, fever and body pain for the last two days..."
        className="w-full mt-10 border rounded-xl p-5 outline-none resize-none"
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full disabled:opacity-50"
      >
        {loading ? "Analyzing Symptoms..." : "Find Doctor"}
      </button>

      <button
      onClick={() => {navigate(`/doctors/${result.specialization}`); scrollTo(0,0)}}
       className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full disabled:opacity-50">
        Get You Doctor
      </button>

      {result && (
        <div className="mt-10 border rounded-xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold">🩺 Recommended Specialist</h2>

          <p className="text-xl text-blue-600 mt-3">{result.specialization}</p>

          <h3 className="font-semibold mt-6">Possible Conditions</h3>

          <ul className="list-disc ml-6 mt-2">
            {result.conditions.map((condition, index) => (
              <li key={index}>{condition}</li>
            ))}
          </ul>

          <h3 className="font-semibold mt-6">Severity</h3>

          <p>{result.severity}</p>

          <h3 className="font-semibold mt-6">Advice</h3>

          <p>{result.advice}</p>
        </div>
      )}

    </div>
  );
};

export default AiDoctor;
