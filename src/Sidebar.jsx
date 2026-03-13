import React from 'react';
import './Sidebar.css';

const Sidebar = ({ setActiveView }) => {
  return (
    <div className="sidebar">
      <button className="sidebar-button" onClick={() => setActiveView('planWorkout')}>Plan today's workout</button>
      <button className="sidebar-button" onClick={() => setActiveView('premadePlans')}>Pre-made plans</button>
      <button className="sidebar-button" onClick={() => setActiveView('personalisedPlans')}>Personalised plans</button>
    </div>
  );
};

export default Sidebar;
