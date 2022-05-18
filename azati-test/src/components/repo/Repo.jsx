import "./Repo.css";

const Repo = (props) => {
    const repo = props.repo

    return (
        <div className="repo">
            <div className="repo-header">
                <div className="repo-header-name">{repo.name}</div>
                <div className="repo-header-stars">Stars: {repo.stargazers_count}</div>
                <div className="repo-header-forks">Forks: {repo.forks_count}</div>
            </div>
            <div className="repo-last-commit">Latest commit: {repo.updated_at}</div>
            <a href={repo.html_url} className="repo-link">Repository link: {repo.html_url}</a>
        </div>
    );
};

export default Repo;
