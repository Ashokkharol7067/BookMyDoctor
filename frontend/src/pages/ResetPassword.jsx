import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const { backendUrl } = useContext(AppContext);
  const navigate = useNavigate();
  const { token } = useParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match.");
    }

    try {
      setLoading(true);

      const { data } = await axios.post(
        backendUrl + "/api/user/reset-password",
        {
          token,
          password,
        }
      );

      if (data.success) {
        toast.success(data.message);

        setPassword("");
        setConfirmPassword("");

        navigate("/login");
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

        <p className="text-2xl font-semibold">
          Reset Password
        </p>

        <p>
          Enter your new password below.
        </p>

        <div className="w-full">
          <p>New Password</p>

          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="w-full">
          <p>Confirm Password</p>

          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-white w-full py-2 rounded-md text-base"
        >
          {loading ? "Resetting..." : "Reset Password"}
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

export default ResetPassword;