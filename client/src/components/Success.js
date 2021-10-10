import React, { useState } from "react";
import "./success.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Assignment } from "@material-ui/icons";
import { Button } from "@material-ui/core";

export default function Success({ shortUrl }) {
  const [copied, setCopied] = new useState(false);
  return (
    <div className="container justify-content-center text-center">
      <svg
        className="checkmark"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 52 52"
      >
        <circle
          className="checkmark__circle"
          cx="26"
          cy="26"
          r="25"
          fill="none"
        />
        <path
          className="checkmark__check"
          fill="none"
          d="M14.1 27.2l7.1 7.2 16.7-16.8"
        />
      </svg>
      <h4>
        Shortlink Successfully Created
        <br />
      </h4>
      <span className="font-weight-bold">
        <a href={`${shortUrl}`} target="_blank" rel="noreferrer">
          {shortUrl}
        </a>
      </span>{" "}
      <span>
        {!copied ? (
          <CopyToClipboard text={shortUrl} onCopy={() => setCopied(true)}>
            <button className="btn btn-success ml-2 font-weight-bold col col-md-2 col-lg-2">
              <i className="fa fa-clipboard"></i> Copy
            </button>
          </CopyToClipboard>
        ) : (
          <span className="badge badge-pill badge-success">
            {" "}
            Copied to Clipboard.
          </span>
        )}
      </span>
    </div>
  );
}
