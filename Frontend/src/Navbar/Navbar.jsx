import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <header class="text-gray-900 bg-gray-200  text-lg">
      <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link to={"/"} className="text-2xl">
          Home
        </Link>
        <nav class="md:ml-auto flex flex-wrap items-center gap-4 justify-center">
          {localStorage.getItem("token") ? (
            <>
              <button onClick={handleLogout}>Logout</button>
              <Link to={"/addpost"}>Add Post</Link>
            </>
          ) : (
            <>
              <Link to={"/login"}>Login</Link>
              <Link to={"/signup"}>Signup</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
