import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      className="navbar navbar-expand-lg shadow-sm"
      style={{ background: "linear-gradient(90deg, #667eea, #764ba2)" }}
    >
      <div className="container-fluid">
        {/* Brand */}
        <Link to={"/read"} className="navbar-brand text-white fw-bold fs-4">
          TaskMaster
        </Link>

        {/* Toggler */}
        <button
          className="navbar-toggler bg-light"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu Items */}
        <div className="collapse navbar-collapse justify-content-end px-5">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to={"/"} className="nav-link text-white fw-bold px-3">
                Create Task
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={"/read"}
                className="nav-link text-white fw-bold px-3"
              >
                All Tasks
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

// import React from "react";
// import { Link } from "react-router-dom";

// const Navbar = () => {
//   return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-light">
//       <div className="container-fluid">
//         <Link to={"/"} className="navbar-brand" href="#">
//           MERN
//         </Link>
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarNav"
//           aria-controls="navbarNav"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarNav">
//           <ul className="navbar-nav">
//             <li className="nav-item">
//               <Link to={"/"} className="nav-link" >
//                 Create Post
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link to={"/read"} className="nav-link">
//                 All Post
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
