import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "https://photo-book2.herokuapp.com";

function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [postCode, setPostCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handleAddress = (e) => setAddress(e.target.value);
  const handlePostCode = (e) => setPostCode(e.target.value);
  const handleCity = (e) => setCity(e.target.value);
  const handleCountry = (e) => setCountry(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password, name, address, postCode, city, country };
    console.log(requestBody)

    // Make an axios request to the API
    // If POST request is successful redirect to login page
    // If the request resolves with an error, set the error message in the state
    axios.post(`${API_URL}/auth/signup`, requestBody)
      .then((response) => {
        navigate('/login');
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })
  };

  return (
    <div className="backgroundSignupColor">
      <div className="SignupPage">
        <h1>Sign Up</h1>

        <form onSubmit={handleSignupSubmit}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleEmail}
          />

          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
          />

          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleName}
          />

          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={address}
            onChange={handleAddress}
          />

          <label>Post Code:</label>
          <input
            type="number"
            name="postCode"
            value={postCode}
            onChange={handlePostCode}
          />

          <label>City:</label>
          <input
            type="text"
            name="city"
            value={city}
            onChange={handleCity}
          />

          <label>Country:</label>
          <input
            type="text"
            name="country"
            value={country}
            onChange={handleCountry}
          />

          <button type="submit">Sign Up</button>
        </form>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <p>* all fields are mandatory</p>
        <p>Already have account?</p>
        <Link to={"/login"}> Login</Link>
      </div>
    </div>
  )
}

export default SignupPage;
