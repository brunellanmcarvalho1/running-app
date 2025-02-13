import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import authMethods from "../../services/auth.service";

function SignUpPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password, name };

    axios
      .post("https://running-app-backend-zuaf.onrender.com/users", requestBody) // Make an axios request to the API
      .then(() => {
        navigate("/login"); // If the POST request is a successful redirect to the login page
      })
      .catch((error) => {
        // If the request resolves with an error, set the error message in the state}
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="SignupPage">
      <h1>Sign Up</h1>

      <form onSubmit={handleSignupSubmit}>
        <label>Email:</label>
        <input type="text" name="email" value={email} onChange={handleEmail} />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />

        <label>Name:</label>
        <input type="text" name="name" value={name} onChange={handleName} />

        <button type="submit">Sign Up</button>
      </form>

      {errorMessage && <p className="error-message"> {errorMessage} </p>}

      <p>Already have an account?</p>
      <Link to={"/login"}> Login</Link>
    </div>
  );
}

export default SignUpPage;
