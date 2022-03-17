import React, {useContext} from 'react';
import CPUGauge from './graphs/CPUGauge.js';
import CPUGraph from './graphs/CPUGraph.js';
import JVMGraph from './graphs/JVMGraph.js';
import GCGraph from './graphs/GCGraph.js';
//import { connect } from 'http2';
import {appContext} from '../App.tsx';

const HealthMetricsChart = () => {

  //UNPACK CONNECTION STATE (TO GET whether cluster is Connected)
  const appState = useContext(appContext);
  const [connectionState, setConnectionState] = appState.connection;
  const connectionStatus = connectionState.isConnected;

  let renderedContent;
  if (connectionStatus === false){
    renderedContent = (
      <div className='flex-auto justify-center'>
        <div className="m-10 border-2 border-limeGreen/70 rounded bg-backgroundC-400 text-slate-800">
          Please Connect to see this page
        </div>
      </div>
      )
  } else {
    renderedContent = (
      <div> 
      {/* CPU USAGE GRAPHS */}
      <div className="w-fit h-fit grid grid-cols-2 gap-10 ">
        <div className="cols-span-1 bg-gray-800 border border-fontGray/40 rounded">
          <CPUGraph/>
        </div>
        <div className="cols-span-1 bg-gray-800 border border-fontGray/40 rounded">
          CPU Usage Gauge
          <CPUGauge/>
        </div>
      {/* </div> */}

      {/* JVM MEMORY GRAPHS */}
      {/* <div className="w-full h-full grid grid-cols-2 gap-5"> */}
        <div className="col-span-1 bg-gray-800 border border-fontGray/40 rounded">
          <JVMGraph/>
        </div>
        <div className="col-span-1 bg-gray-800 border border-fontGray/40 rounded">
          <GCGraph/>
        </div>
      {/* </div> */}
      </div>
    </div>
    )
  }

  return (
    <div>
      {renderedContent}
    </div>
    // <div> 
    //   {/* CPU USAGE GRAPHS */}
    //   <div className="w-full h-full grid grid-cols-2 px-2 py-1 ">
    //     <div className="col-span-1">
    //       <CPUGraph/>
    //     </div>
    //     <div className="bg-green-500 col-span-1">
    //       second column
    //       {/* <CPUGauge/> */}
    //     </div>
    //   </div>

    //   {/* JVM MEMORY GRAPHS */}
    //   <div className="w-full h-full grid grid-cols-2 px-2 py-1">
    //     <div className="col-span-1">
    //       <JVMGraph/>
    //     </div>
    //     <div className="bg-zinc-100 col-span-1">
    //       second column
    //       {/* <JVMGauge/> */}
    //     </div>
    //   </div>

    //   <div className="w-full h-full grid grid-cols-2 px-2 py-1">
    //     <div className="col-span-1">
    //       <GCGraph/>
    //     </div>
    //     <div className="bg-green-500 col-span-1">
    //       second column
    //       {/* <JVMGauge/> */}
    //     </div>
    //   </div>
    // </div>

  )
}

export default HealthMetricsChart;