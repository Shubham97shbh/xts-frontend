import React, { useState } from 'react';
import './App.css';

function App() {
  const [processes, setProcesses] = useState([]);
  const [boxes, setBoxes] = useState([]);
  const [nextId, setNextId] = useState(1); // State to manage the next unique ID
  const [index, setIndex] = useState(""); // State for INDEX input value
  const [trade, setTrade] = useState(""); // State for Trade input value
  const [slPercentage, setSlPercentage] = useState(""); // State for SL % input value
  const [ceRentry, setCeRentry] = useState(""); // State for CE RENTRY input value
  const [peRentry, setPeRentry] = useState(""); // State for PE RENTRY input value
  const [trailingSL, setTrailingSL] = useState(""); // State for TRAILING SL input value
  const [trailingTP, setTrailingTP] = useState(""); // State for TRAILING TP input value
  const [otmgap, setOtmgap] = useState(""); // State for TRAILING TP input value
  const [ispoint, isPoint] = useState(""); // State for TRAILING TP input value
  const [SLflag, SLFlag] = useState(""); // State for TRAILING TP input value
  const [error, setError] = useState(""); 
  const [qty, setqty] = useState("") // lot input

  const handleStart = async () => {
    if (!index || !slPercentage || !ceRentry || !peRentry || !trailingSL || !trailingTP || !trade) {
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
          qty:qty,
          trade:trade,
          otm_gap:otmgap,
          slPercentage: slPercentage,
          ceRentry: ceRentry,
          peRentry: peRentry,
          trailingSL: trailingSL,
          trailingTP: trailingTP,
          isPoint:ispoint,
          SLflag:SLflag
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
        { id: nextId, uniqueDigit: uniqueDigitValue,  trade:trade,
          strike_ce:data.strike_ce,strike_pe: data.strike_pe,
        ce_instrument_id: data.ce_instrument_id, pe_instrument_id:data.pe_instrument_id} // Use the nextId as the unique ID
      ]);
      setNextId(prevId => prevId + 1); // Increment nextId for the next box
    } catch (error) {
      console.error('Error starting the process:', error.message);
    }
  };

  const handleClick = () => {
    if (index && slPercentage && ceRentry && peRentry && trailingSL && trailingTP &&qty) {
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
  const handleTradeChange = (e) => {
    console.log("Selected Trade:", e.target.value);
    setTrade(e.target.value);
  };
  
  return (
    <div  className="container_main">
      <div  className="container_sub">
      <h1>Trading Platform</h1>
      <div className="row">
      <div className="input-container">
          <label className='qty'>QUANTITY</label>
          <input type="number" id="qty" onChange={(e) => setqty(e.target.value)} />
        </div>
        <div className="input-container">
          <label htmlFor="dropdown1">TRADE</label>
          <select id="dropdown1" className="index-select" value={trade} onChange={handleTradeChange}>
            <option value="">Select Trade</option> {/* Default option */}
            <option value="BANKNIFTY">SELL</option>
            <option value="NIFTY">BUY</option>
          </select>
        </div>
        <div className="input-container">
          <label htmlFor="dropdown1">INDEX</label>
          <select id="dropdown1" className="index-select" value={index} onChange={handleIndexChange}>
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
        <div className="input-container-selector">
            <label htmlFor="trailingTP">OTM</label>
            <input type="number" id="otm_gap" min="0" max="20" onChange={(e) => setOtmgap(e.target.value)} />
          </div>
          <div className="input-container-selector">
          <input type="checkbox" id="SLflag" name="SLflag" onChange={(e) => SLFlag(e.target.value)} value="true" />
          <label htmlFor="isPoint">SL-FLAG</label>
          </div>
        <div className="input-container-selector">
          <input type="checkbox" id="isPoint" name="isPoint" onChange={(e) => isPoint(e.target.value)} value="true" />
          <label htmlFor="isPoint">Is Point</label>
        </div>
      </div>
      <div className="row">
        <div className="input-container">
          <button id="startButton" onClick={handleStart}>Start</button>
        </div>
      </div>
      </div>
      <div>
      {boxes.map((box) => (
        <div key={box.id} className="new-row">
          <label>Process ID: {box.uniqueDigit} Trade: {box.trade} Strike CE: {box.strike_ce} Strike PE: {box.strike_pe}</label>
          <button className="delete-button" onClick={() => handleDelete(box.id)}>Square off</button>
        </div>
      ))}
      </div>
    </div>
  );
}

export default App;
