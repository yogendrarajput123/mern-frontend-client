import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../api/api";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, showUser } from "../features/userDetailSlice";

const Read = () => {
  // const [data, setData] = useState([]);
  // const [error, setError] = useState("");

  // const [loading, setLoading] = useState(true); // loader state

  // const getData = async () => {
  //   // const response = await fetch("http://localhost:5000");
  //   const response = await fetch(API_URL);

  //   const result = await response.json();

  //   if (!response.ok) {
  //     console.log(result.error);
  //     setError(result.error);
  //   }

  //   if (response.ok) {
  //     setData(result);
  //   }

  //   setLoading(false); // stop loading
  // };

  // const getData = (data) => {
  //   dispatch(showUser(data));
  // };

  //   console.log(data);

  //   Delete Data Function
  // const handleDelete = async (id) => {
  //   // const response = await fetch(`http://localhost:5000/${id}`, {
  //   const response = await fetch(`${API_URL}/${id}`, {
  //     method: "DELETE",
  //   });

  //   const result = await response.json();

  //   if (!response.ok) {
  //     console.log(result.error);
  //     setError(result.error);
  //   }

  //   if (response.ok) {
  //     setError("✅ Task deleted successfully!");

  //     //   setTimeout(() => {
  //     //     setError("");
  //     //     getData(); // call read function again after delete data
  //     //   }, 1000);
  //   }
  // };

  //
  //
  //
  //
  //
  //
  //  👉👉👉👉👉👉     REDUX - TOOLKIT  👈👈👈👈👈👈👈

  const dispatch = useDispatch();

  // We are extracting users, searchData,error and loading from stotre(app)
  const { users, loading, error, searchData } = useSelector(
    (state) => state.app
  );

  useEffect(() => {
    dispatch(showUser());
  }, []);

  // Filter users inline
  const filteredUsers = users.filter((user) =>
    searchData.length === 0
      ? user
      : user.name.toLowerCase().includes(searchData.toLowerCase())
  );

  return (
    <div
      className="container-fluid min-vh-100 py-4"
      style={{
        background: "linear-gradient(135deg, #1e1e1e, #2c2c2c)",
        color: "#f1f1f1",
      }}
    >
      {error && (
        <div className="alert alert-info text-center fw-semibold">{error}</div>
      )}

      <h2 className="text-center fw-bold mb-5" style={{ color: "#00d4ff" }}>
        📋 All Users
      </h2>

      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "200px" }}
        >
          <div className="spinner-border text-info" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : filteredUsers.length === 0 ? (
        <p className="text-center text-muted">
          No tasks available. Please create one.
        </p>
      ) : (
        <div className="row g-4">
          {filteredUsers.map((user) => (
            <div key={user._id} className="col-md-4">
              <div
                className="card shadow-lg h-100 border-0 text-start"
                style={{
                  backgroundColor: "#2b2b2b",
                  color: "#f1f1f1",
                  borderRadius: "10px",
                }}
              >
                <div className="card-body">
                  <div className="d-flex mb-2 gap-2">
                    <span className="fw-semibold">Name : </span>
                    <span className="fw-bold">{user.name}</span>
                  </div>

                  <div className="d-flex mb-2 gap-2">
                    <span className="fw-semibold">Email : </span>
                    <span className="fw-semibold text-white">{user.email}</span>
                  </div>

                  <div className="d-flex mb-3 gap-2">
                    <span className="fw-semibold">Age : </span>
                    <span className="fw-semibold text-white">{user.age}</span>
                  </div>

                  <div className="d-flex justify-content-center gap-3 mt-3">
                    <Link
                      to={`/update/${user._id}`}
                      className="btn btn-sm btn-info fw-semibold"
                    >
                      ✏️ Update
                    </Link>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => dispatch(deleteUser(user._id))}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Read;
