import React, { useState, useEffect } from 'react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  BarElement,
  BarController, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import regeneratorRuntime from "regenerator-runtime";
// import { timeStamp } from 'console';

ChartJS.register(
  CategoryScale, 
  BarElement,
  BarController, 
  Title, 
  Tooltip, 
  Legend
)

//Don't forget to change the query link!
const queryLink = 'https://9090-kayhill-cpdemo-ps7f5q3opnq.ws-us34.gitpod.io/api/v1/query?query='; //WED 2PM
// let query = '';

const CPUGauge = () => {
  const [CPU, setCPU] = useState({
    // labels: ['CPU Usage'],
    labels: ['Broker1', 'Broker2'],// 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: 'Broker 1',
      data: [10, 10],
      backgroundColor: ['rgba(255, 99, 132, 0.2)'],
      borderColor: ['rgba(255, 99, 132, 1)'],
      borderWidth: 1
    },
    {
      label: 'Broker 2',
      data: [15, 15],
      backgroundColor: 'orange', 
      borderColor:' red',
      borderWidth: 1, 
    }],
  });

  const [chartOptions, setChartOptions] = useState({});

  const dataForGraph = [];
  const indexTracker = 0;

  const [CPUData, setCPUData] = useState([10, 10], [15, 15]); //changed this from [10, 15]

  
  useEffect( () => {
    //CPU Usage
    const query = 'irate(process_cpu_seconds_total{job="kafka-broker",env="dev",instance=~"(kafka1:1234|kafka2:1234)"}[5m])*100';

    const useFetch = async () => {
      try {
        const json = await fetch(queryLink + query)
        const CPUData = await json.json(); // duplicate name but ok because it's in LEC
        // console.log(CPUData.data.result[0].value[1])
        let newState = [Math.floor(CPUData.data.result[0].value[1]), Math.floor(CPUData.data.result[1].value[1])]
        setCPUData(newState)
      }
      catch (error){
        console.log('ERROR IN CPU GAUGE FETCH: ', error)
      }
    }

    const timeoutMethod = setInterval(() => {
      useFetch();
    }, 1000);

    useFetch();

    return () => clearInterval(timeoutMethod);
  }, []
)

  //   const useFetch = async () => {
  //     try {
  //       const json = await fetch(queryLink + query)
  //       const CPUData = await json.json();
  //       console.log(CPUData.data.result[0].value[1])
  //       setCPUData(prevState => {
  //         console.log("CPU GAUGE state changed")
  //         console.log(prevState)
  //         let broker1NewState = prevState[0];
  //         let broker2NewState = prevState[1];
  //         broker1NewState.shift();
  //         broker2NewState.shift();
  //         broker1NewState.push(CPUData.data.result[0].value[1]);
  //         broker2NewState.push(CPUData.data.result[1].value[1]);
  //         let newState = [ broker1NewState, broker2NewState];
  //         return newState
  //       })
  //     }
  //     catch (error){
  //       console.log('ERROR IN CPU GAUGE FETCH: ', error)
  //     }
  //   }

  //   const timeoutMethod = setInterval(() => {
  //     useFetch();
  //   }, 1000);

  //   useFetch();

  //   return () => clearInterval(timeoutMethod);
  // }, []
// )

    


  useEffect(() => {
    console.log('CPU DATA GAUGE: ', CPUData)
        setCPU({
          // labels: ['CPU Usage'],
          labels: ['Broker1', 'Broker2'],// 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [{
            label: 'Broker 1',
            data: [CPUData[0]], 
            backgroundColor: ['rgba(255, 99, 132, 0.2)'],
            borderColor: ['rgba(255, 99, 132, 1)'],
            borderWidth: 1
          },
          {
            label: 'Broker 2',
            data: [CPUData[1]],
            backgroundColor: 'orange', 
            borderColor:' red',
          }],
        });

        setChartOptions({
          responsive: false,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              position: "top"
            }, 
            title: {
              display: true, 
              text: 'CPU Usage Gauge',
            }
          }, 
          scales: {
            y: {
              beginAtZero: true,
            }
          }, 
        })
      }, [CPUData]);



  return (
    <div>
      <div>test</div>
      {/* <div>{JSON.stringify(CPUData)}</div> */}
      <Bar data={CPU} options={chartOptions}/>  
    </div>
  )
}

export default CPUGauge;