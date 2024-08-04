import React from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,

}
  from 'mdb-react-ui-kit';
import { useLocation } from "react-router-dom";
import Login from '../components/Login';



function LoginPage() {
  const location = useLocation();


  return (
    <>
      <MDBContainer fluid className="p-3 my-5 h-custom">

        <MDBRow>

          <MDBCol col='10' md='4'>
            <img src="https://imgs.search.brave.com/e2I2Q9fgpKw8wyBSdw1LDTmAlIgo92yD0DI8jjzMtGY/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9vbmVz/aXhlaWdodGxvbmRv/bi5jb20uYXUvY2Ru/L3Nob3AvZmlsZXMv/MzIxMDMuYWx0XzEu/anBnP3Y9MTcxMTU1/MTI3MiZ3aWR0aD0x/MjAw" class="img-fluid" alt="Sample image" />
          </MDBCol>

          <MDBCol col='4' md='6'>
            <Login />
          </MDBCol>

        </MDBRow>



      </MDBContainer>
    </>
  )
}

export default LoginPage