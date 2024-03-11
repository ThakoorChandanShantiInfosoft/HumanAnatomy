import React, { useState } from 'react';
import './HumanModal.css';

const HumanModal = ({ onSubmit, onClose }) => {
  const [partName, setPartName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ partName, description });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              Part Name:
              <input type="text" value={partName} onChange={(e) => setPartName(e.target.value)} required />
            </label>
          </div>
          <div className="form-group">
            <label>
              Description:
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
            </label>
          </div>
          <div className="buttons-container">
            <button type="submit">Submit</button>
            <button type="button" onClick={onClose}>Close</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default HumanModal;
