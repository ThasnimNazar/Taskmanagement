
import './App.css';

import { 
  Outlet,
 } from "react-router-dom";
 import { Container } from "react-bootstrap";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>

    <ToastContainer />
      <Outlet/>

  </>
  );
}

export default App;
