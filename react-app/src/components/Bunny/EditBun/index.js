import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateBunny, deleteBunny } from "../../../store/bunny";

function EditBunny({ bunny, endEdit }) {
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState(bunny?.name);
    const [age, setAge] = useState(bunny?.age);
    const [sex, setSex] = useState(bunny?.sex);
    const [breed, setBreed] = useState(bunny?.breed);
    const [bio, setBio] = useState(bunny?.biography);
    const [imgUrl, setImgUrl] = useState(null);
    const [isAdoptable, setIsAdoptable] = useState(bunny?.is_adoptable);


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
            id: bunny.id,
            user_id: sessionUser.id,
            name,
            age,
            sex,
            breed,
            biography: bio,
            image_url: imgUrl,
            is_adoptable: isAdoptable
        }

        let updatedBunny = await dispatch(updateBunny(payload))
            .catch(async (data) => {
                if (data && data.errors) setErrors(data.errors);
            });

        if (updatedBunny) {
            endEdit()
            history.push(`/bunnies/${updatedBunny.id}`)
        }
    }

    const handleDelete = async () => {
        await dispatch(deleteBunny(bunny.id))
            .then(
                history.push("/home")
            )
    }

    return (
        <div className="edit-bun-container">
            <h2 className="playfair">Update {bunny.name}</h2>
            <form className='no-modal-styles' onSubmit={onSubmit}>
                {errors.length > 0 && <ul className='required no-list-style'>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>}
                <label htmlFor="name">Name<span className='required'>*</span></label>
                <input
                    type="text"
                    name="name"
                    required
                    value={name}
                    onChange={updateName}
                />
                <label htmlFor="age">Age<span className='required'>*</span></label>
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
                <label htmlFor="sex">Sex<span className='required'>*</span></label>
                <select name="sex" onChange={updateSex} value={sex} required>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                </select>
                <label htmlFor="breed">Breed<span className='required'>*</span></label>
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
                <label className="file-input-label" htmlFor="image">Image<span className='required'>*</span></label>
                <label className='file-input-button'>
                    <span className="button lavender image-span">Select image</span>
            {imgUrl && (
              <i className="fa-solid fa-check"></i>
            )}
                <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={updateImage}
                    className="file-input"
                />
                </label>
                <legend>Adoptable?<span className='required'>*</span></legend>
                <div className="radio-container">
                    <label htmlFor="adoptableNo">No</label>
                    <input
                        type="radio"
                        name="adoptable"
                        value={false}
                        onClick={updateAdoptable}
                        defaultChecked={!isAdoptable}
                        required
                    />
                    <label htmlFor="adoptableYes">Yes</label>
                    <input
                        type="radio"
                        name="adoptable"
                        value={true}
                        onClick={updateAdoptable}
                        defaultChecked={isAdoptable}
                    />
                </div>
                <button className="button blue">Update</button>
            </form>
            <div className="edit-bun-buttons">
                <button className="button lavender" onClick={() => endEdit()}>Cancel</button>
                <button className="button warning" onClick={handleDelete}>Delete</button>
            </div>
        </div>
    )
}

export default EditBunny;
