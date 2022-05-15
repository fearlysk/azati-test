import http from "../../services/http";

function fetchData(searchQuery = "stars:%3E1") {
  const url = `https://api.github.com/search/repositories?q=${searchQuery}&sort=stars`;
  return http(`${url}`);
}

export default fetchData;