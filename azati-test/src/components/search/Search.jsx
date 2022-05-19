import { useState, useEffect, useMemo, Suspense, lazy } from "react";
import fetchData from "../../api/fetchData/fetchData";
import LazyReposLoading from "../UI/LazyReposLoading";
import "./Search.css";

const Search = () => {

    const Repo = lazy(() => import('../repo/Repo'));

    const [repos, setRepos] = useState([]);
    const [queryValue, setQueryValue] = useState("react");
    const [isLoading, setIsLoading] = useState(true);

    const setLoading = () => {
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 3000);
      };

    const searchRepos = useMemo(
        () => repos ? repos.filter((repo) => repo.name.toLowerCase().includes(queryValue.toLowerCase())) : [],
        [queryValue, repos]
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

    const setQuery = (value) => {
        setLoading();
        setQueryValue(value);
    }

    useEffect(() => {
        setLoading();
        if(queryValue) {
        const delayDebounceFn = setTimeout(() => {
            fetchData(queryValue).then(data => setRepos(data.items));  // debounce to avoid github error 403 because of many requests at almost same time 
          }, 1000) 
          return () => {
            clearTimeout(delayDebounceFn);
          }
        }
    }, [queryValue]);

    return (
        <div className="wrapper">
          {window.navigator.onLine ? null : <h1>No internet connection...</h1>}
          <h1>Search Repositories</h1>
          <span>Current query value:  </span>
          <input
            type="text"
            placeholder="Query..."
            value={queryValue}
            onChange={(event) => setQuery(event.target.value)}
          />
          <div className="sorting-section">
            <div className="sorting-section_item">
              <h3>Forks:</h3>
              <button className="sorting-section_item-btn" onClick={() => sortRepos("forks_count", "ASC")}>Sort by forks ASC</button>
              <button className="sorting-section_item-btn" onClick={() => sortRepos("forks_count", "DESC")}>Sort by forks DESC</button>
            </div>
            <div className="sorting-section_item">
              <h3>Watchers/Stars:</h3>
              <button className="sorting-section_item-btn" onClick={() => sortRepos("watchers_count", "ASC")}>Sort by watchers/stars ASC</button>
              <button className="sorting-section_item-btn" onClick={() => sortRepos("watchers_count", "DESC")}>Sort by watchers/stars DESC</button>
            </div>
          </div>
          {isLoading && <LazyReposLoading />}
          {searchRepos.length && queryValue ? <h1>Results: </h1> : <h1>No Repositories Found</h1>}
           {queryValue !== "" ? (
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
