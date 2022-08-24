import React, { useState, useContext } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { getState } from '../../store/session';
import { ButtonContext } from "../../context/ButtonContext";


function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const {currentNum, setCurrentNum} = useContext(ButtonContext)


  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    console.log('INSIDE HANDLE SUBTMI')
    dispatch(getState())
    await dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
    setCurrentNum((num) => num + 1)
  };

  const setCurrent = () => {
    setCurrentNum((num) => num + 1)
  }

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
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button onClick={setCurrent} type="submit">Log In</button>
    </form>
  );
}

export default LoginForm;
