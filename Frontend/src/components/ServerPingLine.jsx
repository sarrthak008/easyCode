import React, { useState, useEffect } from 'react';
import Chart from "chart.js/auto";
import { Line } from 'react-chartjs-2';
import axios from 'axios';

const API_URl = import.meta.env.VITE_SERVER_URI;

const ServerPingLine = () => {
  const [timearr, setTimearr] = useState([]);
  const [timestamps, setTimestamps] = useState([]);

  const getPing = async () => {
    const firstTime = Date.now();
    const response = await axios.get(`${API_URl}/connect`);
    const secondTime = Date.now();
    
    const pingTime = secondTime - firstTime;
    const currentTimestamp = new Date().toLocaleTimeString();  // Format the timestamp
    
    if (timearr.length < 3) {
      setTimearr([...timearr, pingTime]);
      setTimestamps([...timestamps, currentTimestamp]);
    } else {
      setTimearr([pingTime]);
      setTimestamps([currentTimestamp]);
    }
  };

  // Run `getPing` every 20 seconds, clearing interval on unmount
  useEffect(() => {
    const interval = setInterval(() => {
      getPing();
    }, 20000);

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(interval);
  }, [timearr, timestamps]);

  const data = {
    labels: timestamps, // Dynamic labels for timestamps
    datasets: [{
      label: 'Server Ping in ms',
      data: timearr, // Dynamic ping data
      fill: false,
      borderColor: '#00db80',
      backgroundColor: 'black',
      tension: 0.6
    }]
  };

  return (
      <Line data={data} />
  );
};

export default ServerPingLine;
