import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './app.css';
import './index.css';
import Home from "./view/Home.jsx"
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
            <Route path='/login' element={<Login />} />
          </Routes>
        </SnackbarProvider>
      </Storeprovider>
    </BrowserRouter>
  );
}

export default App;
