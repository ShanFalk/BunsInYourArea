import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createBunny } from "../../../store/bunny";

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
    const updateAdoptable = (e) => setIsAdoptable(e.target.value.toLowerCase() === 'true');

    const dispatch = useDispatch()
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user);

    const onSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            user_id: sessionUser.id,
            name,
            age,
            sex,
            breed,
            biography: bio,
            image_url: imgUrl,
            is_adoptable: isAdoptable
        }

        let createdBunny = await dispatch(createBunny(payload)).catch(async(res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
        });

        if (createdBunny) {
            history.push(`/bunnies/${createdBunny.id}`)
        }
    }

    return (
        <div>
            <h2>Add a New Bunny</h2>
            <form onSubmit={onSubmit}>
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
                <select name="sex" onChange={updateSex} value={sex} required>
                    <option value="" disabled selected>--Please choose an option--</option>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
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
                    required
                    accept="image/*"
                    onChange={updateImage}
                />
                <legend>Adoptable?</legend>
                    <input
                        type="radio"
                        name="adoptable"
                        value={false}
                        onClick={updateAdoptable}
                        required
                    />
                    <label htmlFor="adoptableNo">No</label>
                    <input
                        type="radio"
                        name="adoptable"
                        value={true}
                        onClick={updateAdoptable}
                    />
                    <label htmlFor="adoptableYes">Yes</label>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default AddBunny;
