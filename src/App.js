import React, { useState } from "react";
import WelcomePage from "./Welcome";
import "./App.css";
import { useNavigate, Route, Routes } from "react-router-dom";

function App(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    console.log(data);
    setFormSubmitted(true);
    navigate("/welcome");
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  if (!formSubmitted) {
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="text"
              value={password}
              onChange={handlePasswordChange}
            />
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  } else {
    return (
      <div className="App">
        <Routes>
          <Route
            path="/welcome"
            element={<WelcomePage {...props} username={username} />}
          />
        </Routes>
      </div>
    );
  }
}

export default App;
