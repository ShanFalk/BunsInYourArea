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
        }
        else setErrors(['Please enter a search term'])
    }
    return (
       <div className="search-div">
        {errors.length > 0 && (
            <p>{errors[0]}</p>
        )}
        <input className="search-bar" type="search" onChange={(e) => setSearch(e.target.value)} onSubmit={onSearch} placeholder="Search for a bunny..."/>
        <button className="button" onClick={onSearch}><i class="fa-solid fa-magnifying-glass"></i></button>
       </div>
    )
}

export default SearchBar;
