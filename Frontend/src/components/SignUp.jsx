
import React, { useState } from 'react';
import {
  MDBInput,
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol
}
  from 'mdb-react-ui-kit';
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';


function SignUp() {


  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('')

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleuserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleSignUp = async (e) => {
    // Access email and password here

    e.preventDefault();
    try {

      axios.post('http://localhost:5000/api/MyToDo/register', {
        userName: userName,
        email: email,
        password: password
      }).then((response) => {
        if (response.data.error) {
          toast.error(response.data.error)
        } else {
          navigate('/')
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

      <MDBContainer fluid className="p-3 my-5 h-custom">

        <MDBRow>

          <MDBCol col='10' md='4'>
            <img src="https://imgs.search.brave.com/e2I2Q9fgpKw8wyBSdw1LDTmAlIgo92yD0DI8jjzMtGY/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9vbmVz/aXhlaWdodGxvbmRv/bi5jb20uYXUvY2Ru/L3Nob3AvZmlsZXMv/MzIxMDMuYWx0XzEu/anBnP3Y9MTcxMTU1/MTI3MiZ3aWR0aD0x/MjAw" class="img-fluid" alt="Sample image" />
          </MDBCol>

          <MDBCol col='4' md='6'>
            <div className="divider d-flex align-items-center my-4">
              <p className="text-center fw-bold mx-3 mb-0">Sign up to My Apps Todo</p>
            </div>
            <MDBInput wrapperClass='mb-4' label='Name' id='formControlLg' type='text' size="lg" value={userName} onChange={handleuserNameChange} />
            <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg" value={email} onChange={handleEmailChange} />
            <MDBInput wrapperClass='mb-4' label='Password' id='PasswordId' type='password' size="lg" value={password} onChange={handlePasswordChange} />



            <div className='text-center text-md-start mt-4 pt-2'>
              <MDBBtn className="mb-0 px-5" size='lg' onClick={handleSignUp}>Sign Up</MDBBtn>
              <p className="small fw-bold mt-2 pt-1 mb-2">already have an account?<Link to={`/`} className="link-danger">Login</Link> </p>
            </div>

          </MDBCol>

        </MDBRow>



      </MDBContainer>



    </>
  )
}

export default SignUp