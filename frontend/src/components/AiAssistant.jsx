import React from "react";
import { useNavigate } from "react-router-dom";

const AiAssistant = () => {

    const navigate = useNavigate();

    return (
        <div className="mx-4 md:mx-10 lg:mx-20 my-10 bg-blue-50 rounded-xl p-8 text-center">

            <h2 className="text-3xl font-bold text-gray-800">
                🤖 AI Doctor Recommendation
            </h2>

            <p className="text-gray-600 mt-4">
                Not sure which doctor to consult?
            </p>

            <p className="text-gray-600">
                Describe your symptoms and let AI recommend the right specialist.
            </p>

            <button
                // onClick={() => navigate("/ai-doctor")}
                onClick={() => {
                    window.scrollTo(0, 0);
                    navigate("/ai-doctor");
                }}
                className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition"
            >
                Find Doctor with AI
            </button>

        </div>
    );
};

export default AiAssistant;