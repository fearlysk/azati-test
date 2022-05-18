import { useState, useEffect, useMemo } from "react";
import fetchData from "../../api/fetchData/fetchData";
import Repo from "../repo/Repo";
import "./Search.css";

const Search = () => {

    const [repos, setRepos] = useState([]);
    const [value, setValue] = useState(null);

    const searchRepos = useMemo(
        () => repos.filter((repo) => repo.name.toLowerCase().includes(value.toLowerCase())),
        [value, repos]
      );

    useEffect(() => {
        fetchData().then(data => setRepos(data.items))
    }, [])

    return (
        <div className="wrapper">
          <h1>Search Repositories</h1>
          <input
            type="text"
            placeholder="Search..."
            onChange={(event) => setValue(event.target.value)}
          />
           {value !== "" ? (
            <div>
              {searchRepos.map(repo =>
                <Repo key={repo.id} repo={repo}/>
              )}
            </div>
            ) : null}
        </div>
    )
}

export default Search;