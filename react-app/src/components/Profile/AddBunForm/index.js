import React, { useState } from "react";
import { useSelector } from "react-redux";

function AddBunny() {
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [sex, setSex] = useState("");
    const [breed, setBreed] = useState("");
    const [bio, setBio] = useState("");
    const [imgUrl, setImgUrl] = useState(null);
    const [isAdoptable, setIsAdoptable] = useState(false);

    const updateName = (e) => setName(e.target.value);
    const updateAge = (e) => setAge(e.target.value);
    const updateSex = (e) => setSex(e.target.value);
    const updateBreed = (e) => setBreed(e.target.value);
    const updateBio = (e) => setBio(e.target.value);
    const updateImage = (e) => setImgUrl(e.target.files[0]);
    const updateAdoptable = (e) => setIsAdoptable(e.target.value);


    const sessionUser = useSelector(state => state.session.user);

    return (
        <div>
            <h2>Add a New Bunny</h2>
            <form>
                {errors.length > 0 && <ul className='errors'>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>}
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    name="name"
                    required
                    value={name}
                    onChange={updateName}
                />
                <label htmlFor="age">Age</label>
                <input
                    type="number"
                    name="age"
                    step="0.10"
                    value={age}
                    min="0.10"
                    max="25.00"
                    onWheel={e => e.currentTarget.blur()}
                    required
                    onChange={updateAge}
                />
                <label htmlFor="sex">Sex</label>
                <select name="sex" onSelect={updateSex}>
                    <option value="" selected>--Please choose an option--</option>
                    <option selected={sex === "Female"} value="Female">Female</option>
                    <option selected={sex === "Male"} value="Male">Male</option>
                </select>
                <label htmlFor="breed">Breed</label>
                <input
                    type="text"
                    name="breed"
                    required
                    value={breed}
                    onChange={updateBreed}
                />
                <label htmlFor="bio">Biography</label>
                <textarea
                    name="bio"
                    value={bio}
                    onChange={updateBio}
                />
                <label htmlFor="image">Image</label>
                <input
                    type="file"
                    name="image"
                    value={imgUrl}
                    required
                    accept="image/*"
                    onChange={updateImage}
                />
                <legend>Adoptable?</legend>
                    <input
                        type="radio"
                        name="adoptableNo"
                        value={false}
                        onClick={updateAdoptable}
                        checked={isAdoptable === false}
                    />
                    <label htmlFor="adoptableNo">No</label>
                    <input
                        type="radio"
                        name="adoptableYes"
                        value={true}
                        onClick={updateAdoptable}
                        checked={isAdoptable === true}
                    />
                    <label htmlFor="adoptableYes">Yes</label>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default AddBunny;
