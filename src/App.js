import React, { useState } from 'react';
import { ReactComponent as HumanSvg } from './svgs/human.svg';
import './App.css';
import HumanModal from './Components/HumanModal';

function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });

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
    setMarkers([...markers, { ...data, ...clickPosition }]);
    setModalVisible(false);
  };

  const closeModal = () => setModalVisible(false);

  return (
    <div className="App">
      <HumanSvg className='human-svg' onClick={handleSvgClick} />
      {modalVisible && <HumanModal onSubmit={handleSubmit} onClose={closeModal} />}
      {markers.map((marker, index) => (
        <div key={index} className="marker-container" style={{ left: marker.x, top: marker.y }}>
          <svg className="marker"></svg>
          <div className="tooltip">
            <div className='tooltip-title'>{marker.partName} :</div> <div className='tooltip-description'>{marker.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
