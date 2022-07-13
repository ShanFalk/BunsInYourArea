import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [imgUrl, setImgUrl] = useState(null);
  const [bio, setBio] = useState('')
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();

    const payload = {
      firstname,
      lastname,
      username,
      email,
      password,
      image_url: imgUrl,
      biography: bio,
      city,
      state
    }
    console.log('THIS IS THE PAYLOAD IN THE FORM', payload)
    if (password === repeatPassword) {
      const data = await dispatch(signUp(payload));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateFirstName = (e) => setFirstName(e.target.value);
  const updateLastName = (e) => setLastName(e.target.value);
  const updateCity = (e) => setCity(e.target.value);
  const updateState = (e) => setState(e.target.value);
  const updateImage = (e) => setImgUrl(e.target.files[0]);
  const updateBio = (e) => setBio(e.target.value);

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/home' />;
  }

  return (
    <div className='form-container'>
      <form onSubmit={onSignUp}>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <h2 className='playfair'>Getting to know you...</h2>
        <div>
          <label htmlFor='firstname'>First Name<span className='required'>*</span></label>
          <input
            type='text'
            name='firstname'
            value={firstname}
            onChange={updateFirstName} />
          <label htmlFor='lastname'>Last Name<span className='required'>*</span></label>
          <input
            type='text'
            name='lasttname'
            value={lastname}
            onChange={updateLastName} />
          <label htmlFor='city'>City<span className='required'>*</span></label>
          <input
            type='text'
            name='city'
            value={city}
            onChange={updateCity} />
          <label htmlFor='state'>State<span className='required'>*</span></label>
          <select name='state' value={state} onChange={updateState}>
            <option disabled selected>--Please select one--</option>
            <option>AL</option>
            <option>AK</option>
            <option>AZ</option>
            <option>AR</option>
            <option>CA</option>
            <option>CO</option>
            <option>CT</option>
            <option>DE</option>
            <option>FL</option>
            <option>GA</option>
            <option>HI</option>
            <option>ID</option>
            <option>IL</option>
            <option>IN</option>
            <option>IA</option>
            <option>KS</option>
            <option>KY</option>
            <option>LA</option>
            <option>ME</option>
            <option>MD</option>
            <option>MA</option>
            <option>MI</option>
            <option>MN</option>
            <option>MS</option>
            <option>MO</option>
            <option>MT</option>
            <option>NE</option>
            <option>NV</option>
            <option>NH</option>
            <option>NJ</option>
            <option>NM</option>
            <option>NY</option>
            <option>NC</option>
            <option>ND</option>
            <option>OH</option>
            <option>OK</option>
            <option>OR</option>
            <option>PA</option>
            <option>RI</option>
            <option>SC</option>
            <option>SD</option>
            <option>TN</option>
            <option>TX</option>
            <option>UT</option>
            <option>VT</option>
            <option>VA</option>
            <option>WA</option>
            <option>WV</option>
            <option>WI</option>
            <option>WY</option>
          </select>
          <label htmlFor='image' className='file-input-label'>Profile Photo</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={updateImage}
            className='file-input'
          />
          <label htmlFor='bio'>About You</label>
          <textarea
            name="bio"
            value={bio}
            onChange={updateBio}
          />
          <br></br>
          <h2 className='playfair'>Account info</h2>
          <label>User Name<span className='required'>*</span></label>
          <input
            type='text'
            name='username'
            onChange={updateUsername}
            value={username}
          ></input>
        </div>
        <div>
          <label>Email<span className='required'>*</span></label>
          <input
            type='text'
            name='email'
            onChange={updateEmail}
            value={email}
          ></input>
        </div>
        <div>
          <label>Password<span className='required'>*</span></label>
          <input
            type='password'
            name='password'
            onChange={updatePassword}
            value={password}
          ></input>
        </div>
        <div>
          <label>Repeat Password<span className='required'>*</span></label>
          <input
            type='password'
            name='repeat_password'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
        </div>
        <button className='button blue' type='submit'>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
