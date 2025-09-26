import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { searchUser } from "../features/userDetailSlice";
import { logout } from "../features/authSlice";

const Navbar = ({ setIsAuthenticated }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // get all users to show length
  const allUsers = useSelector((state) => state.app.users);

  // get searchData from Redux:
  const searchData = useSelector((state) => state.app.searchData);

  // useEffect(() => {
  //   setUser(localStorage.getItem("loggedInUser"));
  // }, []);

  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("loggedInUser");
  //   handleSuccess("User Loggedout");
  //   setIsAuthenticated(false); // Update auth state
  //   setTimeout(() => {
  //     navigate("/login");
  //   }, 1000);
  // };

  // 👉 👉 👉 👉 👉 👉  REDUX TOOLKIT 👈👈👈👈👈👈👈👈👈👈
  //
  //


  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg shadow-lg"
      style={{
        background: "linear-gradient(90deg, #667eea, #764ba2)",
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
        <div className="d-flex align-items-center flex-grow-1 justify-content-between px-5">
          {/* Left menu */}
          <ul className="navbar-nav d-flex flex-row align-items-center gap-2 mb-0">
            <li className="nav-item">
              <Link
                to={"/create"}
                className="nav-link text-white fw-bold px-3 py-2 rounded"
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
                Create Users
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={"/read"}
                className="nav-link text-white fw-bold px-3 py-2 rounded"
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
                All Users ({allUsers.length})
              </Link>
            </li>
            <li>
              <input
                className="form-control"
                type="search"
                placeholder="Search Users"
                aria-label="Search"
                style={{
                  width: "300px",
                  borderRadius: "10px",
                  padding: "0.35rem 0.75rem",
                }}
                // onChange={(e) => setSearchData(e.target.value)}
                value={searchData}
                onChange={(e) => dispatch(searchUser(e.target.value))}
              />
            </li>
          </ul>

          {/* Right side: Search + User info */}
          <div className="d-flex align-items-center gap-4">
            {/* Logout + Username */}
            <div className="d-flex align-items-center gap-5">
              <div
                className="text-white d-flex align-items-center fw-bold gap-2"
                style={{
                  fontSize: "1.25rem",
                  whiteSpace: "nowrap",
                  textShadow: "5px 5px 2px rgba(0,0,0,0.3)",
                }}
              >
                <span>👨‍💼 </span>
                <span>{localStorage.getItem("loggedInUser")}</span>
              </div>
              <button
                className="btn btn-outline-light fw-semibold"
                type="button"
                style={{
                  borderRadius: "10px",
                  padding: "0.20rem 1rem",
                }}
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
