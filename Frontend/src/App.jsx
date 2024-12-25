import React from 'react';
import {BrowserRouter ,Routes ,Route} from "react-router-dom"
import './app.css';
import './index.css';
import Home from "./view/Home.jsx"
import { Storeprovider } from './context/Store.jsx';

function App() {
  return (
     <BrowserRouter>
      <Storeprovider>
         <Routes>
           <Route path='/' element={<Home/>}/>

         </Routes>
        </Storeprovider>
     </BrowserRouter>
  );
}

export default App;
