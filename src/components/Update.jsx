import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../api/api";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../features/userDetailSlice";

const Update = () => {
  // const [error, setError] = useState("");

  // const { register, handleSubmit, reset } = useForm();
  // const { id } = useParams(); // it grab the id from URL

  // const navigate = useNavigate();

  // get SingleUser data  🚀🚀
  //  --- useCallback makes the function stable across renders so ESLint is happy:
  // const getSinglUser = useCallback(async () => {
  //   // const response = await fetch(`http://localhost:5000/${id}`);
  //   const response = await fetch(`${API_URL}/${id}`);

  //   const result = await response.json();

  //   if (!response.ok) {
  //     console.log(result.error);
  //     setError(result.error);
  //   }

  //   if (response.ok) {
  //     setError("");
  //     console.log("user updated : ", result);

  //     // 👇 pre fill the form with api data

  //     reset({
  //       name: result.name,
  //       email: result.email,
  //       age: result.age,
  //     });
  //   }
  // }, [id, reset]);

  // // send updated data to backend  🚀🚀
  // const onUpdate = async (data) => {
  //   // const response = await fetch(`http://localhost:5000/${id}`, {
  //   const response = await fetch(`${API_URL}/${id}`, {
  //     method: "PATCH",
  //     body: JSON.stringify(data),
  //     headers: { "Content-Type": "application/json" },
  //   });

  //   const result = await response.json();

  //   if (!response.ok) {
  //     setError(result.error);
  //     console.log(result.error);
  //   }

  //   if (response.ok) {
  //     //   console.log(result);
  //     setError("");
  //     navigate("/read");
  //   }
  // };

  // useEffect(() => {
  //   getSinglUser();
  // });

  //
  //
  //
  //
  //
  //
  //
  //     👉👉👉👉👉👉     REDUX - TOOLKIT  👈👈👈👈👈👈👈

  // with redux-toolkit

  // here we use 👉 react-hook-form so we not need to define state fro updated data
  // react form has 👉 reset() and setValue() 👈

  const { _id } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { users, error } = useSelector((state) => state.app);

  const { register, handleSubmit, reset } = useForm();

  // get SingleUser data  🚀🚀
  // Prefill form when user data is available
  useEffect(() => {
    if (_id) {
      const singelUser = users.find((user) => user._id === _id);

      if (singelUser) {
        // Set default values for react-hook-form
        reset({
          name: singelUser.name,
          email: singelUser.email,
          age: singelUser.age,
        });
      }
    }
  }, [users, _id, reset]);

  const onSubmit = (data) => {
    dispatch(updateUser({ ...data, _id }));
    navigate("/read");
  };

  return (
    <div className="container my-3">
      {error && <div className="alert alert-danger">{error}</div>}
      <h2 className="text-center">Update the data</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3 my-5">
          <label className="form-label">Name</label>
          <input type="text" className="form-control" {...register("name")} />
        </div>

        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input type="email" className="form-control" {...register("email")} />
        </div>

        <div className="mb-3">
          <label className="form-label">Age</label>
          <input type="number" className="form-control" {...register("age")} />
        </div>

        <div className="d-flex justify-content-center gap-5">
          <button type="submit" className="btn btn-primary px-5">
            Submit
          </button>
          <Link to={"/read"}>
            <button type="button" className="btn btn-primary px-5">
              Back
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Update;
