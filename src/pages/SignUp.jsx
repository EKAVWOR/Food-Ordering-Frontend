import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // clear old messages
    setSuccess(false);
    try {
      const res = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEDURL}/api/signup`, formData);
      console.log(res.data);
      
      setMessage(res.data.message || "Signup successful");
      setSuccess(true);
      setFormData({ username: "", email: "", password: "" });
      setTimeout(() => {
        navigate("/signin");
      }, 1000); // redirect after 2 seconds
    } catch (err) {
      console.log(err);
      setMessage(err.response?.data?.message || "Signup failed");
      setSuccess(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-80 flex flex-col gap-4">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <input
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="username"
          className="border border-orange-300 p-2 rounded"
          required
          type="name"
        />
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="border border-orange-300 p-2 rounded"
          required
        />
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="border border-orange-300 p-2 rounded"
          required
        />
        <button type="submit" className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-500">
          Sign Up
        </button>
        {message && (
          <p className={success ? "text-orange-500" : "text-orange-500"}>{message}</p>
        )}
      </form>
    </div>
  );
};

export default SignUp;