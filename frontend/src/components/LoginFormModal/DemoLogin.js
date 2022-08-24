import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { count } from "../Navigation";

function DemoLogin() {
  const dispatch = useDispatch();
  const [demoCredential, setDemoCredential] = useState("Demo-lition");
  let credential = 'Demo-lition'
  let password = 'password'
  const [demoPassword, setDemoPassword] = useState("password");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <label>
        Username or Email
        <input
          type="text"
          value={demoCredential}
          onChange={(e) => setDemoCredential(e.target.value)}
          required
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={demoPassword}
          onChange={(e) => setDemoPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">Demo Login</button>
    </form>
  );
}

export default DemoLogin;
