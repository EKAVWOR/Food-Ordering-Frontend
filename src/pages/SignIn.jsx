import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await axios.post("http://localhost:5000/api/signin", formData);
  //     localStorage.setItem("token", res.data);
  //     setMessage("Login successful");
  //     setSuccess(true);
  //     setTimeout(() => {
  //       navigate("/dashboard");
  //     }, 1500);
  //   } catch (err) {
  //     console.error(err);
  //     setMessage(err.response.data.message || "Login failed");
  //     setSuccess(false);
  //   }


  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("http://localhost:5000/api/signin", formData);
    // Save token and user info
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("userId", res.data.userId);
    localStorage.setItem("name", res.data.name);
    localStorage.setItem("email", res.data.email);

    setMessage("Login successful");
    setSuccess(true);
    setTimeout(() => {
      navigate("/checkout");
    }, 1500);
  } catch (err) {
    console.error(err);
    setMessage(err.response?.data?.message || "Login failed");
    setSuccess(false);
  }


};

  return (
    <div className="flex items-center justify-center min-h-screen bg-orange-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-80 flex flex-col gap-4">
        <h2 className="text-2xl font-bold mb-4">Sign In</h2>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="border border-orange-300 bg-orange-400 p-2 rounded"
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
          Sign In
        </button>
        {message && (
          <p className={success ? "text-green-500" : "text-red-500"}>{message}</p>
        )}

        <div>
            <p className="text-sm text-orange-600">Don't Have An Account ? <Link className="text-black hover:text-orange-500" to="/signup">SignUp</Link> </p>
            
      </div>
      </form>
      
    </div>
  );
};

export default SignIn;