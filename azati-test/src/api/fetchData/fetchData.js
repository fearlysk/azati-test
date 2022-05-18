import http from "../../services/http";

function fetchData(searchQuery) {
  const url = `https://api.github.com/search/repositories?q=${searchQuery}`;
  return http(`${url}`);
}

export default fetchData;