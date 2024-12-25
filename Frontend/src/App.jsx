import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from '@mui/material';
import './app.css';
import './index.css';

function App() {
  return (
    <div className="p-4">
      <Button
        variant="contained"
        className="text-white bg-red-600 hover:bg-red-200" // Tailwind classes
      >
        Material UI with Tailwind
      </Button>
    </div>
  );
}

export default App;
