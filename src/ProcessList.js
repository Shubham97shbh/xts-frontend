import React from 'react';
import Process from './Process';

const ProcessList = ({ state, handleDelete, handleBoxHover }) => {
  return (
    <div>
      {state.boxes.map(box => (
        <Process key={box.id} box={box} logs={state.logs} handleDelete={handleDelete} handleBoxHover={handleBoxHover} />
      ))}
    </div>
  );
};

export default ProcessList;
