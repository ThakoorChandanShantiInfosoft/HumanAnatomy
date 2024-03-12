import React, { useState, useEffect } from 'react';
import { ReactComponent as HumanSvg } from './svgs/human.svg';
import './App.css';
import HumanModal from './Components/HumanModal';

function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    fetch('http://localhost:5000/api/annotations')
      .then((response) => response.json())
      .then((data) => setMarkers(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleSvgClick = (e) => {
    if (e.target instanceof SVGElement) {
      const svg = document.querySelector('.human-svg');
      const rect = svg.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;
      setClickPosition({ x: offsetX, y: offsetY });
      setModalVisible(true);
    }
  };

  const handleSubmit = (data) => {
    const newMarker = { ...data, ...clickPosition };
    fetch('http://localhost:5000/api/annotations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMarker),
    })
      .then((response) => response.json())
      .then((savedMarker) => {
        setMarkers([...markers, savedMarker]);
        setModalVisible(false);
      })
      .catch((error) => console.error('Error saving data:', error));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/annotations/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then(() => {
        setMarkers(markers.filter(marker => marker._id !== id));
      })
      .catch((error) => console.error('Error deleting data:', error));
  };

  const closeModal = () => setModalVisible(false);

  return (
    <div className="App">
      <HumanSvg className='human-svg' onClick={handleSvgClick} />
      {modalVisible && <HumanModal onSubmit={handleSubmit} onClose={closeModal} />}
      {markers.map((marker, index) => (
        <div key={marker._id} className="marker-container" style={{ left: marker.x, top: marker.y }}>
          <svg className="marker"></svg>
          <div className="tooltip">
            <div className='tooltip-title'>{marker.partName} :</div>
            <div className='tooltip-description'>{marker.description}</div>
            <button onClick={() => handleDelete(marker._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
