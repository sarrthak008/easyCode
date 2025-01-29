import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css';
import './index.css';
import Home from "./view/Home.jsx"
import Signupp from './view/Signup.jsx';
import Courses from './view/Courses.jsx';
import Login from './view/Login.jsx';
import Detiles from './view/Detiles.jsx';
import Admin from './view/Admin';
import { Storeprovider } from './context/Store.jsx';
import 'remixicon/fonts/remixicon.css'
import { SnackbarProvider, useSnackbar } from 'notistack';
import Settings from './view/Settings.jsx';
import Mainadmincomp from './view/Mainadmincomp.jsx';
import AddCourse from './view/AddCourse.jsx';
import CourseOpe from './view/CourseOpe.jsx';
import Notfound from './view/Notfound.jsx';
import AddQuiz from './view/AddQuiz.jsx';
import Dashboard from './view/Dashboard.jsx';
import Feedback from './view/Feedback.jsx';
import ViewQuiz from './view/ViewQuiz.jsx';
import StartQuiz from './view/StartQuiz.jsx';



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
            <Route path='/course/:id' element={<Detiles />} />
            <Route path='/admin' element={<Admin />} />
            <Route path='/setting' element={<CourseOpe/>} />
            <Route path='/homesetting' element={<Mainadmincomp/>}/>
            <Route path='/addcourse' element={<AddCourse/>}/>
            <Route path="/edit/:id" element={<Settings/>} />
            <Route path='/addquiz' element={<AddQuiz/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/feedback' element={<Feedback/>}/>
            <Route path='/viewquiz/:id' element={<ViewQuiz/>}/>
            <Route path='/viewquiz/:id' element={<StartQuiz/>}/>
            <Route path="*" element={<Notfound/>}  />
          </Routes>
        </SnackbarProvider>
      </Storeprovider>
    </BrowserRouter>
  );
}

export default App;
