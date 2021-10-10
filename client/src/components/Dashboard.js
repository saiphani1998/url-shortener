import React, { useState } from "react";

export default function Dashboard() {
  const [shortUrls, setShortUrls] = useState([
    {
      _id: { $oid: "61221aa2b54a6a0016eaa1e9" },
      clicks: 2,
      fullUrl: "https://github.com/saiphani1998",
      shortUrl: "phani-github",
      __v: 0,
    },
  ]);

  // const [reload, setReload] = useState(false);

  // useEffect(() => {
  //   effect
  //   return () => {
  //     cleanup
  //   }
  // }, [reload])

  return (
    <div className="container">
      <div className="row justify-content-center">
        {shortUrls.length > 0 ? (
          <div className="col table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="table-primary">
                <tr>
                  <th>Full URL</th>
                  <th>Slug</th>
                  <th>Clicks</th>
                </tr>
              </thead>
              <tbody>
                {shortUrls.map((shortUrl) => (
                  <tr key={shortUrl._id}>
                    <td>
                      <a
                        href={shortUrl.fullUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {shortUrl.fullUrl}
                      </a>
                    </td>
                    <td>
                      <a
                        href={shortUrl.shortUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {shortUrl.shortUrl}
                      </a>
                    </td>
                    <td>{shortUrl.clicks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
