import React, { useState } from 'react';
import './App.css';
import InputForm from './InputForm';
import ProcessList from './ProcessList';
import loadingGif from './loading.gif'; // Import the loading GIF

function App() {
  const [state, setState] = useState({
    processes: [],
    boxes: [],
    nextId: 1,
    index: "",
    trade: "",
    slPercentage: "",
    ceRentry: "",
    peRentry: "",
    trailingSL: "",
    trailingTP: "",
    otmgap: "",
    ispoint: "",
    SLflag: "",
    error: "",
    qty: "",
    logs: {},
    loading: false
  });

  const updateState = (key, value) => {
    setState(prevState => ({
      ...prevState,
      [key]: value
    }));
  };

  const handleStart = async () => {
    if (!state.index || !state.slPercentage || !state.ceRentry || !state.peRentry || !state.trailingSL || !state.trailingTP || !state.trade) {
      updateState("error", "All fields are required.");
      return;
    }
    try {
      updateState("loading", true);
      const uniqueDigitValue = Math.floor(Math.random() * 1000);

      const response = await fetch("http://localhost:8000/api/xts/start_app", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          process_id: uniqueDigitValue,
          index: state.index,
          qty: state.qty,
          trade: state.trade,
          otm_gap: state.otmgap,
          slPercentage: state.slPercentage,
          ceRentry: state.ceRentry,
          peRentry: state.peRentry,
          trailingSL: state.trailingSL,
          trailingTP: state.trailingTP,
          isPoint: state.ispoint,
          SLflag: state.SLflag
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to start the process. Status: " + response.status);
      }

      const data = await response.json();

      setState(prevState => ({
        ...prevState,
        processes: [...prevState.processes, { processId: data.process_id, uniqueDigit: uniqueDigitValue }],
        boxes: [...prevState.boxes, {
          id: prevState.nextId,
          uniqueDigit: uniqueDigitValue,
          trade: state.trade,
          strike_ce: data.strike_ce,
          strike_pe: data.strike_pe,
          ce_instrument_id: data.ce_instrument_id,
          pe_instrument_id: data.pe_instrument_id
        }],
        nextId: prevState.nextId + 1,
        loading: false
      }));
    } catch (error) {
      updateState("loading", false);
      console.error('Error starting the process:', error.message);
    }
  };

  const handleDelete = (id) => {
    setState(prevState => ({
      ...prevState,
      boxes: prevState.boxes.filter(box => box.id !== id)
    }));
  };

  const handleBoxHover = async (uniqueDigit) => {
    try {
      updateState("loading", true);
      const response = await fetch(`http://localhost:8000/api/xts/logs/${uniqueDigit}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch logs. Status: " + response.status);
      }
      const data = await response.json();
      setState(prevState => ({
        ...prevState,
        logs: {
          ...prevState.logs,
          [uniqueDigit]: data.logs
        },
        loading:false
      }));
    } catch (error) {
      console.error('Error fetching logs:', error.message);
      updateState("loading", false);

    }
  };

  return (
    <div className="container_main">
      {state.loading && 
        <div className="loading-container">
          <img src={loadingGif} alt="Loading..." className="loading-icon" />
        </div>
      }
      <InputForm state={state} updateState={updateState} handleStart={handleStart} />
      <ProcessList state={state} handleDelete={handleDelete} updateState={updateState} handleBoxHover={handleBoxHover} />
    </div>
  );
}

export default App;
