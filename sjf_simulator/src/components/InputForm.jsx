import React, { useState } from 'react'

export default function InputForm({ onExecution, onProcessListChange }) {

  
  const [processList, setProcessList] = useState([]);
  const [newProcess, setNewProcess] = useState({
    id: "",
    arrivalTime: "",
    burstTime: "",
  });

  const addProcess = () => {
    const updatedProcessList = [
      ...processList,
      { ...newProcess, id: processList.length + 1 },
    ];
    setProcessList(updatedProcessList);
    setNewProcess({ id: "", arrivalTime: "", burstTime: "" });

    
    onProcessListChange(updatedProcessList);
  };

  const handleExecution = () => {
    onExecution(processList);
  };

  const reset = () => {
    setNewProcess({ id: "", arrivalTime: "", burstTime: "" });
    setProcessList([]);
    onProcessListChange([]);
  };

  return (
    <div>

      <div>
        <label>Arrival Time: </label>
        <input
          type="number"
          value={newProcess.arrivalTime}
          onChange={(e) =>
            setNewProcess({
              ...newProcess,
              arrivalTime: parseInt(e.target.value, 10),
            })
          }
        />
      </div>

      <div>
        <label>Burst Time: </label>
        <input
          type="number"
          value={newProcess.burstTime}
          onChange={(e) =>
            setNewProcess({
              ...newProcess,
              burstTime: parseInt(e.target.value, 10),
            })
          }
        />
      </div>

      <button onClick={addProcess}>Add process</button>
      <button onClick={handleExecution}>Execute Scheduler</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
