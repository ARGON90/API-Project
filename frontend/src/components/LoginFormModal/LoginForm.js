import React, { useState, useContext } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { getState } from '../../store/session';
import { useHistory } from "react-router-dom";

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    console.log('INSIDE HANDLE SUBTMI')
    // dispatch(getState())
    await dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  const setCurrent = () => {
    history.push('/spots/')
  }

  return (
    <div className='form-container'>
      <form className='form' onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>

        <div className="
      grey-border
      width-90
      margin-bottom-30
      font-grey">
          <div className='border-bottom
          padding-topbottom-10'>
            <label>
              Username or Email
              <div>
                <input
                  type="text"
                  value={credential}
                  onChange={(e) => setCredential(e.target.value)}
                  required
                  className="inputs font-grey"
                />
              </div>
            </label>
          </div>
          <div className="padding-topbottom-10">
            <label>
              Password
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="inputs font-grey"
                />
              </div>
            </label>
          </div>
        </div>

        <div className='
        width-90'>
          <button className='login-button' onClick={setCurrent} type="submit">Continue</button>
        </div>

      </form>
    </div>
  );
}

export default LoginForm;
