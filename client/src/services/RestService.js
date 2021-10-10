export class RestService {
  constructor() {
    this.url =
      window.location.hostname === "localhost"
        ? "http://localhost:5000/"
        : window.location.href;
    this.url = this.url + "api/v1";
  }

  getApi(route) {
    // this.addTokenHeader();
    return fetch(this.url + route, {
      method: "GET",
    });
  }

  postApi(route, obj) {
    // this.addTokenHeader();
    return fetch(this.url + route, {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // addTokenHeader() {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     this.httpOptions.headers = this.httpOptions.headers.set(
  //       "Authorization",
  //       "Bearer " + token
  //     );
  //   }
  // }
}
