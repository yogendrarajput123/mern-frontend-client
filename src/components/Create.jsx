import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { API_URL } from "./../api/api";

const Create = () => {
  // 1.....
  //   const [name, setName] = useState("");
  //   const [email, setEmail] = useState("");
  //   const [age, setAge] = useState("");
  //   console.log(name, email, age);

  //2.....
  //   const [users, setUsers] = useState({});

  //   const getUserData = (e) => {
  //     setUsers({ ...users, [e.target.name]: e.target.value });
  //     console.log(users);
  //   };

  //3.....

  //get error messge from the backend if res not go well during submit
  const { register, handleSubmit, reset } = useForm();

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onFormSubmit = async (data) => {
    console.log("User Data : ", data);
    // const response = await fetch("http://localhost:5000", {
    const response = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-type": "application/json" },
    });

    const result = await response.json();

    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    }

    if (response.ok) {
      console.log(result);
      setError("");
      reset(); // ✅ clear all fields after successful submit
      navigate("/read");
    }
  };

  return (
    <div className="container my-5 d-flex justify-content-center">
      <div
        className="card shadow-lg p-4"
        style={{ width: "100%", maxWidth: "500px", borderRadius: "15px" }}
      >
        {error && <div className="alert alert-danger">{error}</div>}
        <h2 className="text-center mb-4 text-primary fw-bold">Create User</h2>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Name</label>
            <input
              type="text"
              className="form-control rounded-pill"
              placeholder="Enter your name"
              // value={name}
              // onChange={(e) => setName(e.target.value)}
              // name="name"
              // onChange={getUserData}
              {...register("name")}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Email address</label>
            <input
              type="email"
              className="form-control rounded-pill"
              placeholder="Enter your email"
              // value={email}......//for usesate logic
              // onChange={(e) => setEmail(e.target.value)}
              // name="email".....// for spread login
              // onChange={getUserData}
              {...register("email")}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Age</label>
            <input
              type="number"
              className="form-control rounded-pill"
              placeholder="Enter your age"
              // value={age}
              // onChange={(e) => setAge(e.target.value)}
              // name="age"
              // onChange={getUserData}
              {...register("age")}
            />
          </div>

          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-primary rounded-pill fw-semibold"
            >
              🚀 Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
