import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [Values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
  });
  const navigate = useNavigate();

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };

  const submit = async () => {
    try {
      if (!Values.username || !Values.email || !Values.password || !Values.address) {
        alert("All fields are required");
      } else {
        const response = await axios.post("http://localhost:1000/api/v1/sign-up",Values);
        alert(response.data.message);
        navigate("/LogIn")
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center px-4 py-6">
      <div className="bg-zinc-800 rounded-lg px-8 py-6 w-full md:w-3/6 lg:w-2/6">
        <p className="text-zinc-200 text-xl font-semibold">Sign Up</p>

        {/* Username */}
        <div className="mt-4">
          <label className="text-zinc-400">Username</label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="username"
            name="username"
            value={Values.username}
            onChange={change}
          />
        </div>

        {/* Email */}
        <div className="mt-4">
          <label className="text-zinc-400">Email</label>
          <input
            type="email"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="xyz@example.com"
            name="email"
            value={Values.email}
            onChange={change}
          />
        </div>

        {/* Password */}
        <div className="mt-4">
          <label className="text-zinc-400">Password</label>
          <input
            type="password"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="password"
            name="password"
            value={Values.password}
            onChange={change}
          />
        </div>

        {/* Address */}
        <div className="mt-4">
          <label className="text-zinc-400">Address</label>
          <textarea
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            rows="4"
            placeholder="address"
            name="address"
            value={Values.address}
            onChange={change}
          />
        </div>

        {/* Button */}
        <div className="mt-6">
          <button
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-all duration-300"
            onClick={submit}
          >
            Signup
          </button>
        </div>

        {/* Or */}
        <p className="flex mt-4 items-center justify-center text-zinc-200 font-semibold">
          Or
        </p>

        {/* Already have account */}
        <p className="flex mt-2 items-center justify-center text-zinc-500 font-semibold">
          Already have an account? &nbsp;
          <Link to="/login" className="hover:text-blue-500 underline">
            LogIn
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
