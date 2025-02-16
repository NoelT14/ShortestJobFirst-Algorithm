import React from 'react'
import InputForm from './InputForm';
import TableResult from './TableResult'
import { useState } from 'react';

import GanttChart from "./GanttChart";


export default function Simulator() {

  const [scheduledProcesses, setScheduledProcesses] = useState([]);
  const [inputProcessList, setInputProcessList] = useState([]);

  const onExecution = (processList) => {
    const processes = [...processList].map((p) => ({
      ...p,
      remainingTime: p.burstTime,
      completionTime: 0,
      turnaroundTime: 0,
      waitingTime: 0,
      startTime: 0, 
    }));
  
    let currentTime = 0;
    let completed = 0;
    const n = processes.length;
  
    while (completed !== n) {
      let shortestProcess = null;
      let minBurstTime = Infinity;
  
      for (const process of processes) {
        if (process.arrivalTime <= currentTime && process.remainingTime > 0) {
          if (process.remainingTime < minBurstTime) {
            shortestProcess = process;
            minBurstTime = process.remainingTime;
          }
        }
      }
  
      if (!shortestProcess) {
        currentTime++;
        continue;
      }
  
      // Set the start time for the process
      if (shortestProcess.remainingTime === shortestProcess.burstTime) {
        shortestProcess.startTime = currentTime;
      }
  
      shortestProcess.remainingTime--;
      currentTime++;
  
      if (shortestProcess.remainingTime === 0) {
        completed++;
        shortestProcess.completionTime = currentTime;
        shortestProcess.turnaroundTime =
          shortestProcess.completionTime - shortestProcess.arrivalTime;
        shortestProcess.waitingTime =
          shortestProcess.turnaroundTime - shortestProcess.burstTime;
      }
    }
  
    setScheduledProcesses(processes);
  };

  return (
    <div>
      <h1>SJF Preemptive Scheduling Simulator</h1>
      <InputForm
        onExecution={onExecution}
        onProcessListChange={setInputProcessList}
      />
      <TableResult
        processList={inputProcessList}
        scheduledProcesses={scheduledProcesses}
      />
      <GanttChart scheduledProcesses={scheduledProcesses} />
    </div>
  );
}