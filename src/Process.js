import React from 'react';

const Process = ({ box, logs, handleDelete, handleBoxHover }) => {
  return (
    <div className="new-row" onMouseEnter={() => handleBoxHover(box.uniqueDigit)}>
      <label>Process ID: {box.uniqueDigit} Trade: {box.trade} Strike CE: {box.strike_ce} Strike PE: {box.strike_pe}</label>
      <button className="delete-button" onClick={() => handleDelete(box.id)}>Square off</button>
      <div className="logs-tab">
        {(logs[box.uniqueDigit] || []).map((log, index) => (
          <div key={index}>{log}</div>
        ))}
      </div>
    </div>
  );
};

export default Process;
