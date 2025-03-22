import { useNavigate } from "react-router-dom";
import loginImage from "../../../images/logo-icon.png";
import "../../../styles/auth.css";
import { useState } from "react";
import Axios from "../../../Axios";
import { toast } from "react-toastify";
import { Axios_Node } from "../../../Axios";
const ResetPassword = () => {
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const token = queryParams.get("token");
  if (token === undefined || token === "") {
    toast.error("Invalid token. Please try again.");
    navigate("/");
  }
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password === "" || confirmPassword === "") {
        toast.error("Please provide email and password");
        return;
      } else if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      } else {
        const response = await Axios_Node.post(
          "/resetpassword",
          {
            userId: id,
            password: password,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success === true) {
          toast.success("Password reset successfully");
          navigate("/login");
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="login-page">
      <div className="login-div div1">
        <div className="login-box">
          <h1 className="login-heading">Reset Your Password</h1>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-div">
              <label htmlFor="password">New Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your new password"
              />
            </div>
            <div className="input-div">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your new password"
              />
            </div>
            <button className="login-button" type="submit">
              Reset Password
            </button>
          </form>
        </div>
      </div>
      <div className="login-div div2">
        <img className="login-image-r" src={loginImage} alt="image" />
      </div>
    </div>
  );
};

export default ResetPassword;
