import React from 'react';
import { eventEmitter } from "../services/eventEmitter.js";

const Filter = () => {
  return (
    <div>
      <button onClick={() => eventEmitter.emit("filter", "all")}>Все</button>
      <button onClick={() => eventEmitter.emit("filter", "active")}>Активные</button>
      <button onClick={() => eventEmitter.emit("filter", "blocked")}>Заблокированные</button>
    </div>
  );
};

export default Filter;