import { useState, useEffect, useMemo, Suspense } from "react";
import fetchData from "../../api/fetchData/fetchData";
import Repo from "../repo/Repo";
import LazyReposLoading from "../UI/LazyReposLoading";
import "./Search.css";

const Search = () => {

    const [repos, setRepos] = useState([]);
    const [value, setValue] = useState("");

    const searchRepos = useMemo(
        () => repos.filter((repo) => repo.name.toLowerCase().includes(value.toLowerCase())),
        [value, repos]
      );

    const sortRepos = (option, order) => {
        if (order === "ASC") {
        const filteredByAsc = repos.sort((a,b) => a[option] - b[option]).slice();
        setRepos(filteredByAsc);
        }
        else if (order === "DESC") {
        const filteredByDesc = repos.sort((a,b) => b[option] - a[option]).slice();
        setRepos(filteredByDesc);
        }
    }

    useEffect(() => {
        fetchData().then(data => setRepos(data.items))
        console.log(repos);
    }, [])

    return (
        <div className="wrapper">
          <h1>Search Repositories</h1>
          <input
            type="text"
            placeholder="Search..."
            onChange={(event) => setValue(event.target.value)}
          />
          <div>
            <h3>Forks:</h3>
            <button onClick={() => sortRepos("forks_count", "ASC")}>Sort by forks ASC</button>
            <button onClick={() => sortRepos("forks_count", "DESC")}>Sort by forks DESC</button>
          </div>
          <div>
            <h3>Watchers:</h3>
            <button onClick={() => sortRepos("watchers_count", "ASC")}>Sort by watchers ASC</button>
            <button onClick={() => sortRepos("watchers_count", "DESC")}>Sort by watchers DESC</button>
          </div>
           {value !== "" ? (
            <div>
              {searchRepos.map(repo =>
                <Suspense key={repo.id} fallback={<LazyReposLoading />}>
                  <Repo key={repo.id} repo={repo}/>
                </Suspense>  
              )}
            </div>
            ) : null}
        </div>
    )
}

export default Search;