import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import './Search.css';

function SearchBar() {
    const [search, setSearch] = useState("");
    const [errors, setErrors] = useState([]);
    const history = useHistory();

    const onSearch = (e) => {
        e.preventDefault()

        if (search) {
            history.push(`/search?query=${search}`)
            setSearch("");
        }
        else setErrors(['Please enter a search term'])
    }
    return (
       <div className="search-div">
        {errors.length > 0 && (
            <p>{errors[0]}</p>
        )}
        <form onSubmit={onSearch}>
            <input className="search-bar" value={search} type="search" onChange={(e) => setSearch(e.target.value)} placeholder="Search for a bunny..."/>
            <button className="button blue"><i className="fa-solid fa-magnifying-glass"></i></button>
        </form>
       </div>
    )
}

export default SearchBar;
