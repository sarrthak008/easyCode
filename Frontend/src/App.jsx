import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css';
import './index.css';
import Home from "./view/Home.jsx"
import Signupp from './view/Signup.jsx';
import Courses from './view/Courses.jsx';
import Login from './view/Login.jsx';
import { Storeprovider } from './context/Store.jsx';
import 'remixicon/fonts/remixicon.css'
import { SnackbarProvider, useSnackbar } from 'notistack';

function App() {
  return (
    <BrowserRouter>
      <Storeprovider>
        <SnackbarProvider>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/singup' element={<Signupp />} />
            <Route path='/login' element={<Login />} />
            <Route path='/course' element={<Courses />} />
          </Routes>
        </SnackbarProvider>
      </Storeprovider>
    </BrowserRouter>
  );
}

export default App;
