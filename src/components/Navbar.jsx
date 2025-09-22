import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { searchUser } from "../features/userDetailSlice";
import { useEffect, useState } from "react";

const Navbar = () => {
  const dispatch = useDispatch();

  // get all users to show lenght
  const allUsers = useSelector((state) => state.app.users);

  // get searchData from Redux:
  const searchData = useSelector((state) => state.app.searchData);

  return (
    <nav
      className="navbar navbar-expand-lg shadow-lg"
      style={{
        background: "linear-gradient(90deg, #667eea, #764ba2)",
        padding: "0.75rem 1.5rem",
      }}
    >
      <div className="container-fluid d-flex align-items-center justify-content-between">
        {/* Brand */}
        <Link
          to={"/read"}
          className="navbar-brand text-white fw-bold fs-3"
          style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.3)" }}
        >
          TaskMaster
        </Link>

        {/* Menu & Search */}
        <div className="d-flex align-items-center">
          <ul className="navbar-nav me-4 d-flex flex-row align-items-center gap-3">
            <li className="nav-item">
              <Link
                to={"/"}
                className="nav-link text-white fw-semibold px-3 py-2 rounded"
                style={{
                  transition: "0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "rgba(255,255,255,0.2)")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "transparent")
                }
              >
                Create Task
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={"/read"}
                className="nav-link text-white fw-semibold px-3 py-2 rounded"
                style={{
                  transition: "0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "rgba(255,255,255,0.2)")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "transparent")
                }
              >
                All Tasks ({allUsers.length})
              </Link>
            </li>
          </ul>

          {/* Search */}
          <div className="d-flex align-items-center gap-2">
            <input
              className="form-control"
              type="search"
              placeholder="Search Users"
              aria-label="Search"
              style={{
                width: "350px",
                borderRadius: "10px",
                padding: "0.35rem 0.75rem",
              }}
              // onChange={(e) => setSearchData(e.target.value)}
              value={searchData}
              onChange={(e) => dispatch(searchUser(e.target.value))}
            />
            {/* <button
              className="btn btn-outline-light"
              type="submit"
              style={{ borderRadius: "10px", padding: "0.35rem 2rem" }}
            >
              Search
            </button> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
