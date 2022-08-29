import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import * as sessionActions from "../../store/session";
import './SignupForm.css'


function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ firstName, lastName, email, username, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <div className='
        flex-box
        justify-content-center'>

      {/* // PAGE DIV */}
      <div className='font-family
        flex-column
        width-90'>

        <div className='
                flex-column
                align-items-center'>

          <div className='
                '>

            <h1>Confirm Your Details</h1>
          </div>

          {/* FORM DIV */}
          <div className='
                form-container'>

            <form onSubmit={handleSubmit} className='
                    form'>

              {errors.length > 0 && (<ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
              </ul>)}

              <div className='
                        width-65
                        flex-column
                        align-items-center'>
                <div
                  className='
                            grey-border
                            width-90
                            margin-bottom-30
                            font-grey
                            '>
                  <div>
                    <div>
                    <div className='padding-left-5' >First Name</div>
                      <div className='
                                border-bottom'>
                                  <div className='padding-left-5' >
                        <input
                          type="text"
                          placeholder="First Name"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          required
                          className='inputs'
                        />
                        </div>
                      </div>
                    </div>

                    <div>
                    <div className='padding-left-5' >Last Name</div>
                      <div className='
                                border-bottom'>
                                  <div className='padding-left-5' >
                        <input
                          type="text"
                          placeholder="Last Name"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          required
                          className='inputs'
                        />
                        </div>
                      </div>
                    </div>

                    <div>
                    <div className='padding-left-5' >Email</div>
                      <div className='
                                border-bottom'>
                                  <div className='padding-left-5' >
                        <input
                          type="text"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className='inputs'
                        />
                        </div>
                      </div>
                    </div>

                    <div>
                    <div className='padding-left-5' >Username</div>
                      <div className='
                                border-bottom'>
                                  <div className='padding-left-5' >
                        <input
                          type="text"
                          placeholder="Username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          required
                          className='inputs'
                        />
                        </div>
                      </div>
                    </div>

                    <div>
                    <div className='padding-left-5' >Password</div>
                      <div className='
                                border-bottom'>
                                  <div className='padding-left-5' >
                        <input
                          type="password"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className='inputs'

                        />
                        </div>
                      </div>
                    </div>

                    <div>
                    <div className='padding-left-5' >Confirm Password</div>
                      <div className='
                                height-30'>
                                  <div className='padding-left-5' >
                        <input
                          type="password"
                          placeholder="Confirm Password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                          className='inputs'
                          />
                          </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='
                                flex-row
                                width-90'>

                  <button type="submit" className='
                                    login-button'>
                    Sign Up
                  </button>
                </div>


              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

  );
}

export default SignupFormPage;
