import { Axios_Node } from "../../../Axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../../../authContext/auth";
const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    role: "farmer",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleRoleChange = (role) => {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      role,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password, role } = credentials;

    try {
      // Sending login credentials as JSON
      const response = await Axios_Node.post(
        "/users/login",
        { email, password, role },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success("Login Successful");
      if (response.data.token) {
         localStorage.clear();
        login(response.data.token, response.data.user);
      }
      if (response.data.user.role === "seller") {
        navigate("/seller");
      }
      if (response.data.user.role === "farmer") {
        navigate("/");
      }
      if (response.data.user.role === "expert") {
        navigate("/expert");
      }
    } catch (error) {
      toast.error("Invalid Credientals");
    }
  };
  return (
    <div className=" text-black flex items-center justify-center min-h-screen bg-gray-100 dark:bg-slate-900 py-28 px-4">
      <div className="bg-white text-black dark:bg-slate-900 dark:border dark:text-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <div className="join flex justify-center mb-4">
          <button
            onClick={() => handleRoleChange("farmer")}
            className={`btn join-item rounded-l-full flex-1 p-2 text-center rounded ${
              credentials.role === "farmer"
                ? "bg-green-600 text-white"
                : "bg-gray-200"
            }`}
          >
            Farmer
          </button>
          <button
            onClick={() => handleRoleChange("seller")}
            className={`btn join-item flex-1 p-2 text-center rounded ${
              credentials.role === "seller"
                ? "bg-green-600 text-white"
                : "bg-gray-200"
            }`}
          >
            Seller
          </button>
          <button
            onClick={() => handleRoleChange("expert")}
            className={`btn join-item rounded-r-full flex-1 p-2 text-center rounded ${
              credentials.role === "expert"
                ? "bg-green-600 text-white"
                : "bg-gray-200"
            }`}
          >
            Expert
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1">
              Email:
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              required
              className="bg-white text-black block w-full p-2 border dark:text-white border-gray-300 dark:bg-slate-900 rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-1">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
              className="bg-white text-black block dark:text-white w-full p-2 border border-gray-300 dark:bg-slate-900 rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Login
          </button>
          <div className="flex flex-col md:flex-row justify-between mt-3">
            <a href="/forgetpassword">
              <p className="text-sm underline text-center">Forget password?</p>
            </a>
            <a href="/register">
              <p className="text-sm underline text-center">Create an account</p>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
