import React from 'react';
import './Sidebar.css';

const Sidebar = ({ setActiveView, activeView }) => {
  return (
    <div className="sidebar">
      <button className="sidebar-button" onClick={() => setActiveView(activeView ==='planWorkout' ?'home': 'planWorkout')}>Plan today's workout</button>
      
      <button
      key="premadePlans" 
        className="sidebar-button"
        onClick={() => setActiveView(activeView === 'premadePlans' ? 'home' : 'premadePlans')}
      >
        Pre-made plans
      </button>
      
    </div>
  );
};

export default Sidebar;