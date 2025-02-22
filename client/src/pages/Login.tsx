import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { login } from "../store/slices/authSlice";
import { useDispatch } from "react-redux";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post( "http://localhost:5000/api/v1/auth/login", {
        email,
        password,
      });
     
      const data = await res.data;
    
      toast.success(data.message);
      dispatch(login(data));
      navigate("/generate-task");
    } catch (e) {
      return toast.error(e.message);
    }
  };
  return (
    <div className="  bg-gray-700 sm:mt-0 min-h-screen flex items-center justify-center w-full">
      <div className="bg-white shadow-md rounded-3xl px-5 py-6 w-full sm:w-[27vw] ">
        <h1 className="text-2xl font-bold text-center mb-4 ">lets connect!</h1>
        <form onSubmit={handleLogin}>
          {/* email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email:{" "}
            </label>
            <input
              type="text"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="shadow-md rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-black focus:border-black"
            />
          </div>
          {/* password */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password:{" "}
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="shadow-md rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-black focus:border-black"
            />
          </div>
          <a href="#" className="text-xs text-gray-600 hover:text-black ">
            Forgot Password
          </a>

          <button className="w-full py-2 px-4 rounded-md shadow-md text-sm font-medium bg-black text-white mb-2">
            Login
          </button>
          {/* login with account */}
          <div className="flex items-center justify-end">
            <Link
              to="/signup"
              className="text-xs text-blue-700 font-bold hover:scale-110 transition-all duration-200 ease-linear "
            >
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;