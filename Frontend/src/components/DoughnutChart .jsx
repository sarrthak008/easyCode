import React from 'react'
import Chart from "chart.js/auto";
import { Doughnut } from 'react-chartjs-2';


const DoughnutChart  = () => {

    let totalcapacity = 3000
    let totaluser = 1500
    let remamingcapacity = totalcapacity - totaluser

    
    const data = {
        labels: ['user',"capacity"],
        datasets: [
          {
            data: [totaluser,remamingcapacity],
            backgroundColor: ['#36A2EB',"#00db80"], 
            hoverBackgroundColor: ['#FF6384', '#36A2EB'],
            borderWidth: 0
          },
        ],
      };
    

  return (
    <Doughnut data={data}/>
  )
}

export default DoughnutChart 