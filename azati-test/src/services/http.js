const http = async (url, method, data) => {
    try {
      const response = await fetch(`${url}`, {
        method,
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data),
      });
      return response.json();
    } catch (err) {
      return new Error("Data fetching error");
    }
  };
  export default http;