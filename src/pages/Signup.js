import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "../pages/pages.css";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../features/authSlice";

const Signup = () => {
  // 👉 👉 👉 👉 👉 👉  Normal Fetch 👈👈👈👈👈👈👈👈👈👈
  //
  //

  // const [signupInfo, setSignupInfo] = useState({
  //   name: "",
  //   email: "",
  //   password: "",
  // });

  // const navigate = useNavigate();

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   console.log(name, value);
  //   const copySignupInfo = { ...signupInfo };
  //   copySignupInfo[name] = value;
  //   setSignupInfo(copySignupInfo);
  // };

  // console.log("LoginInfo -> ", signupInfo);

  // const handleSignUp = async (e) => {
  //   e.preventDefault();
  //   const { name, email, password } = signupInfo;

  //   if (!name || !email || !password) {
  //     return handleError("name , email and pasword are required");
  //   }

  //   try {
  //     // const url = "http://localhost:8080/auth/signup";
  //     const url =
  //       "https://mern-authentication-backend-dg5w.onrender.com/auth/signup";
  //     const response = await fetch(url, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(signupInfo),
  //     });

  //     const result = await response.json();
  //     console.log(result);

  //     // here in result we got two things 👉 success and message 👈 in response from 💡backend check AuthConroller.js.  so extract both and error from result and bacend

  //     const { success, message, error } = result;
  //     if (success) {
  //       handleSuccess(message);
  //       setTimeout(() => {
  //         navigate("/login");
  //       }, 1000);
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

  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSignupInfo({ ...signupInfo, [e.target.name]: e.target.value });
  };

  const { loading } = useSelector((state) => state.auth);

  const handleSignUp = (e) => {
    e.preventDefault();

    dispatch(signup(signupInfo)).then((response) => {
      if (response.type === "auth/signup/fulfilled") {
        toast.success("Signup successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 1000);
      } else {
        toast.error(response.payload || "Signup failed");
      }
    });
  };

  return (
    <div className="auth-wrapper">
      <div className="container">
        <h1>Signup</h1>
        <form onSubmit={handleSignUp}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              onChange={handleChange}
              type="text"
              name="name"
              value={signupInfo.name}
              autoFocus
              placeholder="Enter Your Name..."
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>

            <input
              onChange={handleChange}
              type="email"
              name="email"
              value={signupInfo.email}
              placeholder="Enter Your Email..."
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              value={signupInfo.password}
              placeholder="Enter Your Password..."
            />
          </div>
          <button className="btn" type="submit">
            {loading ? "Signing up..." : "Signup"}
          </button>
          <span>
            Already have an account?<Link to="/login"> Login</Link>
          </span>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Signup;
