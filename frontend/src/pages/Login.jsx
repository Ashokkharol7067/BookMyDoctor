import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { token, setToken, backendUrl } = useContext(AppContext);
  const navigate = useNavigate();

  const [state, setState] = useState("Sign UP");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const clearInput = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === "Sign UP") {
        const { data } = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          clearInput();
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          clearInput();
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[360px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg ">
        <p className="text-2xl font-semibold">
          {state === "Sign UP" ? "Create Account" : "Login"}
        </p>
        <p>
          Please {state === "Sign UP" ? "sign up" : "Login"} to book appointment
        </p>

        <div className={`w-full ${state === "Login" && "hidden"}`}>
          <p>Full Name</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>

        <div className="w-full">
          <p>Email</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>

        {state === "Login" && (
          <div className="text-right mt-2">
            <button
            type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-sm text-primary hover:underline"
            >
              Forgot Password?
            </button>
          </div>
        )}

        <button
          type="submit"
          className="bg-primary text-white w-full py-2 rounded-md text-base"
        >
          {" "}
          {state === "Sign UP" ? "Create Account" : "Login"}{" "}
        </button>
        {state === "Sign UP" ? (
          <p>
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-primary underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        ) : (
          <p>
            Create a new account ?{" "}
            <span
              onClick={() => setState("Sign UP")}
              className="text-primary underline cursor-pointer"
            >
              click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
