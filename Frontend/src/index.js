import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import './index.css';
import App from './App';
import MyProjects from './screens/myProjects'
import LoginPage from './screens/LandingPage';
import SignUp from './components/SignUp';
import reportWebVitals from './reportWebVitals';
import store from './store.js';
import { Provider } from 'react-redux';

const router = createBrowserRouter(

  createRoutesFromElements(

    <Route path='/' element={<App/>} >

      { /* ===================================== User Routes ===================================== */ }

      <Route index={true} path='/' element={ <LoginPage/> } />
      
      <Route path='/register' element={ <SignUp /> } />
     
      <Route path='/MyProjects' element={ <MyProjects /> } />

    </Route>

  )

);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store} >

  <React.StrictMode>
    <RouterProvider router={ router } />
  </React.StrictMode>

  </Provider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
