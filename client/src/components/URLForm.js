import React, { useState } from "react";
import { RestService } from "../services/RestService";
import Failure from "./Failure";
import Success from "./Success";

export default function URLForm() {
  const [urlInput, setUrlInput] = useState("");
  const [slugInput, setSlugInput] = useState("");
  const [response, setResponse] = useState(null);
  const restService = new RestService();

  const handleSubmit = async (e) => {
    setResponse(null);
    e.preventDefault();
    const res = await restService.postApi("/shorten", {
      fullUrl: urlInput,
      slug: slugInput,
    });

    if (res.status === 201) {
      setUrlInput("");
      setSlugInput("");
    }

    const body = await res.json();
    setResponse(body);
  };

  return (
    <div className="container card">
      <div className="card-body">
        <form className="my-4 form-inline row" onSubmit={handleSubmit}>
          <label htmlFor="fullUrl" className="sr-only">
            URL
          </label>
          <input
            required
            placeholder="URL"
            type="url"
            name="fullUrl"
            className="form-control mr-2 ml-2 col col-md-6 col-lg-6"
            id="fullUrl"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
          />
          <div className="w-100 d-md-none mt-2 d-xs-block"></div>
          <input
            placeholder="Slug (optional)"
            type="text"
            name="slug"
            className="form-control mr-2 ml-2 col col-md-3 col-lg-3"
            id="slug"
            value={slugInput}
            onChange={(e) => setSlugInput(e.target.value)}
          />
          <button
            className="btn btn-success mr-2 font-weight-bold col col-md-2 col-lg-2"
            type="submit"
          >
            <i className="fa fa-link"></i>
            <span>Shorten</span>
          </button>
        </form>
        {response && response.shortUrl ? (
          <div className="container justify-content-center text-center">
            <Success shortUrl={response.shortUrl} />
          </div>
        ) : (
          <></>
        )}
        {response && response.message ? (
          <div className="container justify-content-center text-center">
            <Failure failureMessage={response.message} />
          </div>
        ) : (
          <>
            <br />
          </>
        )}
        {/* <div className="d-flex justify-content-end font-weight-light">
          Have a short url? Checkout&nbsp;
          <a className="font-weight-normal" href="/url-clicks-counter">
            {" "}
            how many clicks it received!
          </a>{" "}
        </div> */}
      </div>
    </div>
  );
}
