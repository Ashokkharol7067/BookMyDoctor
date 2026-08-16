import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const { backendUrl } = useContext(AppContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      const { data } = await axios.post(
        backendUrl + "/api/user/forgot-password",
        {
          email,
        }
      );

      if (data.success) {
        toast.success(data.message);
        setEmail("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="min-h-[80vh] flex items-center"
    >
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[360px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
        
        <p className="text-2xl font-semibold">Forgot Password?</p>

        <p>
          Enter your email address and we will send you a password reset link..
        </p>

        <div className="w-full">
          <p>Email</p>

          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-white w-full py-2 rounded-md text-base"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        <button
          type="button"
          onClick={() => navigate("/login")}
          className="text-primary underline cursor-pointer"
        >
          Back to Login
        </button>
      </div>
    </form>
  );
};

export default ForgotPassword;