import React, { useState, useEffect } from 'react';
import {
  MDBInput,
  MDBBtn,
}
  from 'mdb-react-ui-kit';
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";

function Login() {

  const { userInfo } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (userInfo) {
      navigate('/MyProjects')
    }
  })

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {

      axios.post('http://localhost:5000/api/MyToDo/Login', {
        email: email,
        password: password
      }).then((response) => {
        if (response.data.error) {
          toast.error(response.data.error)
        } else {
          dispatch(setCredentials({ ...response.data }));
          navigate('/Myprojects')
        }
      })
      // Handle successful response
    } catch (error) {
      console.error('Error occurred:', error);
      // Handle error
    }
  };

  return (
    <>
      <div className="divider d-flex align-items-center my-4">
        <p className="text-center fw-bold mx-3 mb-0">Login to My Apps Todo</p>
      </div>

      <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg" value={email} onChange={handleEmailChange} />
      <MDBInput wrapperClass='mb-4' label='Password' id='PasswordId' type='password' size="lg" value={password} onChange={handlePasswordChange} />



      <div className='text-center text-md-start mt-4 pt-2'>
        <MDBBtn className="mb-0 px-5" size='lg' onClick={handleLogin}>Login</MDBBtn>
        <p className="small fw-bold mt-2 pt-1 mb-2">Don't have an account?<Link to={`/register`} className="link-danger">Register</Link> </p>
      </div>

    </>
  )
}

export default Login