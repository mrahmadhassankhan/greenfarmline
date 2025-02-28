import { Link, useNavigate } from "react-router-dom";
import loginImage from "../../../images/adminLoginImage-bg_rem.png";
import "../../../styles/auth.css";
import { useContext, useState } from "react";
import { Axios_Node } from "../../../Axios";
import { AuthContext } from "../../../../authContext/auth";
import { toast } from "react-toastify";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [user, setUser] = useState({ email: "", password: "", role: "admin" });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (user.email === "" || user.password === "") {
        toast.error("Please provide email and password");
        return;
      }
      const response = await Axios_Node.post("/admin/adminLogin", {
        email: user.email,
        password: user.password,
        role: user.role,
      });
      login(response.data.token, response.data.user);
      toast.success("Login Successful");
      navigate("/admin");
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Invalid name or Password");
    }
  };
  return (
    <div className="login-page ">
      <div className="login-div div1">
        <div className="login-box">
          <h1 className="login-heading">Log in to your account</h1>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-div">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={user.email}
                onChange={(e) =>
                  setUser({ ...user, email: e.target.value.trim() })
                }
                placeholder="Enter your email"
              />
            </div>
            <div className="input-div">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={user.password}
                onChange={(e) =>
                  setUser({ ...user, password: e.target.value.trim() })
                }
                name="password"
                placeholder="Enter your password"
              />
            </div>
            <button
              onClick={handleSubmit}
              className="login-button"
              type="submit"
            >
              Login
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

export default AdminLogin;
