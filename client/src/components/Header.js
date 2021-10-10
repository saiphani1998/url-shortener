import React from "react";

export default function Header() {
  return (
    <div className="fluid text-center">
      <nav className="navbar navbar-dark bg-primary text-center">
        {/* Navbar content */}
        <div className="container text-center">
          <a className="navbar-brand font-weight-bold" href="#">
            URL Shortener
          </a>
        </div>
      </nav>
    </div>
  );
}
