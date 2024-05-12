import React, { useState } from 'react';
import './App.css';

function App() {
  const [processes, setProcesses] = useState([]);
  const [boxes, setBoxes] = useState([]);
  const [nextId, setNextId] = useState(1); // State to manage the next unique ID
  const [index, setIndex] = useState(""); // State for INDEX input value
  const [slPercentage, setSlPercentage] = useState(""); // State for SL % input value
  const [ceRentry, setCeRentry] = useState(""); // State for CE RENTRY input value
  const [peRentry, setPeRentry] = useState(""); // State for PE RENTRY input value
  const [trailingSL, setTrailingSL] = useState(""); // State for TRAILING SL input value
  const [trailingTP, setTrailingTP] = useState(""); // State for TRAILING TP input value
  const [error, setError] = useState(""); 

  const handleStart = async () => {
    if (!index || !slPercentage || !ceRentry || !peRentry || !trailingSL || !trailingTP) {
      setError("All fields are required.");
      return;
    }    
    try {
      // Generate a unique digit
      const uniqueDigitValue = Math.floor(Math.random() * 1000);

      // Send a POST request to start the process with the dynamic unique digit
      const response = await fetch("http://localhost:8000/api/xts/start_app", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          process_id: uniqueDigitValue,
          index: index,
          slPercentage: slPercentage,
          ceRentry: ceRentry,
          peRentry: peRentry,
          trailingSL: trailingSL,
          trailingTP: trailingTP
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to start the process. Status: " + response.status);
      }

      const data = await response.json();

      // Add the new process to the processes array
      console.log("Adding new process:", data.process_id);
      setProcesses((prevProcesses) => [
        ...prevProcesses,
        { processId: data.process_id, uniqueDigit: uniqueDigitValue },
      ]);

      // Add a new box with a unique ID
      console.log("Adding new box:", uniqueDigitValue);
      setBoxes((prevBoxes) => [
        ...prevBoxes,
        { id: nextId, uniqueDigit: uniqueDigitValue,  trade:data.trade } // Use the nextId as the unique ID
      ]);
      setNextId(prevId => prevId + 1); // Increment nextId for the next box
    } catch (error) {
      console.error('Error starting the process:', error.message);
    }
  };

  const handleClick = () => {
    if (index && slPercentage && ceRentry && peRentry && trailingSL && trailingTP) {
      setBoxes((prevBoxes) => [...prevBoxes, { id: Date.now() }]);
    } else {
      setError("All fields are required.");
    }
  };

  const handleDelete = (id) => {
    console.log("Deleting box:", id);
    setBoxes((prevBoxes) => prevBoxes.filter((box) => box.id !== id));
  };

  const handleIndexChange = (e) => {
    console.log("Selected Index:", e.target.value);
    setIndex(e.target.value);
  };

  return (
    <div  className="container_main">
      <div  className="container_sub">
      <h1>Trading Platform</h1>
      <div className="row">
        <div className="input-container">
          <label htmlFor="dropdown1">INDEX</label>
          <select id="dropdown1" value={index} onChange={handleIndexChange}>
            <option value="">Select Index</option> {/* Default option */}
            <option value="BANKNIFTY">BANKNIFTY</option>
            <option value="NIFTY">NIFTY</option>
            <option value="FILNIFTY">FILNIFTY</option>
            <option value="FINNIFTY">FINNIFTY</option>
          </select>
        </div>
        <div className="input-container">
          <label htmlFor="slPercentage">SL %</label>
          <input type="number" id="slPercentage" min="0" max="100" onChange={(e) => setSlPercentage(e.target.value)} />
        </div>
      </div>
      <div className="row">
        <div className="input-container">
          <label htmlFor="ceRentry">CE RENTRY</label>
          <input type="number" id="ceRentry" min="0" onChange={(e) => setCeRentry(e.target.value)} />
        </div>
        <div className="input-container">
          <label htmlFor="peRentry">PE RENTRY</label>
          <input type="number" id="peRentry" min="0" onChange={(e) => setPeRentry(e.target.value)} />
        </div>
      </div>
      <div className="row">
        <div className="input-container">
          <label htmlFor="trailingSL">TRAILING SL</label>
          <input type="number" id="trailingSL" min="0" onChange={(e) => setTrailingSL(e.target.value)} />
        </div>
        <div className="input-container">
          <label htmlFor="trailingTP">TRAILING TP</label>
          <input type="number" id="trailingTP" min="0" onChange={(e) => setTrailingTP(e.target.value)} />
        </div>
      </div>
      <div className="row">
        <div className="input-container">
          <button id="startButton" onClick={handleStart}>Start</button>
        </div>
        <div className="input-container">
          <input type="checkbox" id="isPoint" name="isPoint" value="true" />
          <label htmlFor="isPoint">Is Point</label>
        </div>
      </div>
      </div>
      <div>
      {boxes.map((box) => (
        <div key={box.id} className="new-row">
          <label>Process ID: {box.uniqueDigit} Trade: {box.trade}</label>
          <button className="delete-button" onClick={() => handleDelete(box.id)}>Square off</button>
        </div>
      ))}
      </div>
    </div>
  );
}

export default App;
