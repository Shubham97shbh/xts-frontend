import React from 'react';

const InputForm = ({ state, updateState, handleStart }) => {
  return (
    <div className="container_sub">
      <h1>Trading Platform</h1>
      <div className="row">
        <div className="input-container">
          <label className='qty'>QUANTITY</label>
          <input type="number" id="qty" onChange={(e) => updateState("qty", e.target.value)} />
        </div>
        <div className="input-container">
          <label htmlFor="dropdown1">TRADE</label>
          <select id="dropdown1" className="index-select" value={state.trade} onChange={(e) => updateState("trade", e.target.value)}>
            <option value="">Select Trade</option>
            <option value="SELL">SELL</option>
            <option value="BUY">BUY</option>
          </select>
        </div>
        <div className="input-container">
          <label htmlFor="dropdown1">INDEX</label>
          <select id="dropdown1" className="index-select" value={state.index} onChange={(e) => updateState("index", e.target.value)}>
            <option value="">Select Index</option>
            <option value="BANKNIFTY">BANKNIFTY</option>
            <option value="NIFTY">NIFTY</option>
            <option value="FILNIFTY">FILNIFTY</option>
            <option value="FINNIFTY">FINNIFTY</option>
          </select>
        </div>
        <div className="input-container">
          <label htmlFor="slPercentage">SL %</label>
          <input type="number" id="slPercentage" min="0" max="100" onChange={(e) => updateState("slPercentage", e.target.value)} />
        </div>
      </div>
      <div className="row">
        <div className="input-container">
          <label htmlFor="ceRentry">CE RENTRY</label>
          <input type="number" id="ceRentry" min="0" onChange={(e) => updateState("ceRentry", e.target.value)} />
        </div>
        <div className="input-container">
          <label htmlFor="peRentry">PE RENTRY</label>
          <input type="number" id="peRentry" min="0" onChange={(e) => updateState("peRentry", e.target.value)} />
        </div>
        <div className="input-container">
          <label htmlFor="trailingSL">TRAILING SL</label>
          <input type="number" id="trailingSL" min="0" onChange={(e) => updateState("trailingSL", e.target.value)} />
        </div>
        <div className="input-container">
          <label htmlFor="trailingTP">TRAILING TP</label>
          <input type="number" id="trailingTP" min="0" onChange={(e) => updateState("trailingTP", e.target.value)} />
        </div>
      </div>
      <div className="row">
        <div className="input-container-selector">
          <label htmlFor="otm_gap">OTM</label>
          <input type="number" id="otm_gap" min="0" max="20" onChange={(e) => updateState("otmgap", e.target.value)} />
        </div>
        <div className="input-container-selector">
          <input type="checkbox" id="SLflag" name="SLflag" onChange={(e) => updateState("SLflag", e.target.checked)} value="true" />
          <label htmlFor="SLflag">SL-FLAG</label>
        </div>
        <div className="input-container-selector">
          <input type="checkbox" id="isPoint" name="isPoint" onChange={(e) => updateState("ispoint", e.target.checked)} value="true" />
          <label htmlFor="isPoint">Is Point</label>
        </div>
      </div>
      <div className="row">
        <div className="input-container">
          <button disabled={state.loading} id="startButton" onClick={handleStart}>Start</button>
        </div>
      </div>
      {state.error && <p className="error">{state.error}</p>}
    </div>
  );
};

export default InputForm;
