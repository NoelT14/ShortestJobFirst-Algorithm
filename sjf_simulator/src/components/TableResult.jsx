import React from 'react'

export default function TableResult({ processList = [], scheduledProcesses = [] }) {


  const displayProcesses = scheduledProcesses.length > 0 ? scheduledProcesses : processList;
 
  const totalTurnaroundTime = displayProcesses.reduce((sum, p) => sum + (p.turnaroundTime || 0), 0);
  const totalWaitingTime = displayProcesses.reduce((sum, p) => sum + (p.waitingTime || 0), 0);

  const averageTurnaroundTime = displayProcesses.length > 0 ? (totalTurnaroundTime / displayProcesses.length).toFixed(2) : "0";
  const averageWaitingTime = displayProcesses.length > 0 ? (totalWaitingTime / displayProcesses.length).toFixed(2) : "0";

  return (
    <div>
      <h3>Process Table</h3>
      <table>
        <thead>
          <tr>
            <th>Process</th>
            <th>Arrival Time</th>
            <th>Burst Time</th>
            <th>Completion Time</th>
            <th>Turn Around Time</th>
            <th>Waiting Time</th>
          </tr>
        </thead>
        <tbody>
          {displayProcesses.map((p) => (
            <tr key={p.id}>
              <td>P{p.id}</td>
              <td>{p.arrivalTime}</td>
              <td>{p.burstTime}</td>
              <td>{p.completionTime || "0"}</td>
              <td>{p.turnaroundTime || "0"}</td>
              <td>{p.waitingTime || "0"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      

      <div style={{ marginTop: "20px" }}>
        <p><strong>Average Turnaround Time:</strong> {averageTurnaroundTime}</p>
        <p><strong>Average Waiting Time:</strong> {averageWaitingTime}</p>
      </div>

    </div>
  );
}
