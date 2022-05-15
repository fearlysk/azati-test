import { useState } from "react";
import fetchData from "../../api/fetchData/fetchData";
import "./Search.css";

const Search = () => {

    const [repos, setRepos] = useState([]);

    const getData = () => {
        fetchData().then(data => setRepos(data));
        console.log(repos);
    }

    return (
        <div className="wrapper">
            <h1>App</h1>
            <button onClick={getData}>GET</button>
        </div>
    )
}

export default Search;