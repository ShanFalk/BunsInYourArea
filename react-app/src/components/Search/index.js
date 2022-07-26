import React, {useState} from "react";
import { useHistory } from "react-router-dom";

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
       <div>
        {errors.length > 0 && (
            <p>{errors[0]}</p>
        )}
        <input type="search" onChange={(e) => setSearch(e.target.value)}/>
        <button onClick={onSearch}><i class="fa-solid fa-magnifying-glass"></i></button>
       </div>
    )
}

export default SearchBar;
