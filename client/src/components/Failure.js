import React from "react";
import "./failure.css";

export default function Failure({ failureMessage }) {
  return (
    <div className="container justify-content-center text-center">
      <svg
        className="crossmark"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 52 52"
      >
        <circle
          className="crossmark__circle"
          cx="26"
          cy="26"
          r="25"
          fill="none"
        />
        <path
          className="cross__path cross__path--right"
          fill="none"
          d="M16,16 l20,20"
        />
        <path
          className="cross__path cross__path--left"
          fill="none"
          d="M16,36 l20,-20"
        />
      </svg>
      <h4>
        Error - {failureMessage}
        <br />
      </h4>
    </div>
  );
}
