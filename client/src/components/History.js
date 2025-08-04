import React from 'react';
import { FaTimes } from 'react-icons/fa';

const History = ({ history, onSelect, onClose }) => {
  return (
    <div className="history-overlay">
      <button className="close-history-button" onClick={onClose}>
        <FaTimes />
      </button>
      <h2>History</h2>
      <ul>
        {history.map((item, index) => (
          <li key={index} onClick={() => onSelect(item)}>
            {item.expression} = {item.result}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;