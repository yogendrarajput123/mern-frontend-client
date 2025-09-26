import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "../pages/pages.css";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/authSlice";

const Login = () => {
  // 👉 👉 👉 👉 👉 👉  Normal Fetch 👈👈👈👈👈👈👈👈👈👈
  //
  //

  // const [loginInfo, setLoginInfo] = useState({
  //   email: "",
  //   password: "",
  // });

  // const navigate = useNavigate();

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   console.log(name, value);
  //   const copyLoginInfo = { ...loginInfo };
  //   copyLoginInfo[name] = value;
  //   setLoginInfo(copyLoginInfo);
  // };

  // console.log("LoginInfo -> ", loginInfo);

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   const { email, password } = loginInfo;

  //   if (!email || !password) {
  //     return handleError("email and pasword are required");
  //   }

  //   try {
  //     // const url = "http://localhost:8080/auth/login";
  //     const url =
  //       "https://mern-authentication-backend-dg5w.onrender.com/auth/login";

  //     const response = await fetch(url, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(loginInfo),
  //     });

  //     const result = await response.json();
  //     console.log(result);

  //     // here in result we got two things 👉 success, message, jwtToken, name, erro 👈 from 💡backend check AuthConroller.js.
  //     // // save the user in localstorage

  //     const { success, message, jwtToken, name, error } = result;
  //     if (success) {
  //       handleSuccess(message);
  //       localStorage.setItem("token", jwtToken);
  //       localStorage.setItem("loggedInUser", name);
  //       setIsAuthenticated(true);
  //       navigate("/create");
  //     } else if (error) {
  //       // show server side error and we get this directory from console from backend if we hit submit with password less than 4 character
  //       handleError(error?.details[0].message);
  //     } else if (!success) {
  //       handleError(message);
  //     }
  //   } catch (error) {
  //     handleError(error);
  //   }
  // };

  // 👉 👉 👉 👉 👉 👉  REDUX TOOLKIT 👈👈👈👈👈👈👈👈👈👈
  //
  //

  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  const { loading } = useSelector((state) => state.auth);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(loginInfo)).then((response) => {
      if (response.type === "auth/login/fulfilled") {
        toast.success("Login Successfully");
        setTimeout(() => navigate("/create"), 1000);
      } else {
        toast.error(response.payload || "Login Failed");
      }
    });
  };

  return (
    <div className="auth-wrapper">
      <div className="container">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="email">Email</label>

            <input
              onChange={handleChange}
              type="email"
              name="email"
              value={loginInfo.email}
              placeholder="Enter Your Email..."
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              value={loginInfo.password}
              placeholder="Enter Your Password..."
            />
          </div>
          <button className="btn" type="submit">
            {loading ? "Logging in..." : "Login"}
          </button>
          <span>
            Don't Hava An Account?<Link to="/signup"> Signup</Link>
          </span>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
