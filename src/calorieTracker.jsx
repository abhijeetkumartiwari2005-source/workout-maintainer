import React, { useState,useEffect,useRef } from 'react';
import fatguy from './assets/fatguy.png';
import originalImg from './assets/Gemini_Generated_Image_arlxhparlxhparlx.png';

const CalorieTracker = () => {
  const [goal, setGoal] = useState(2500);
  const [consumed, setConsumed] = useState(0);
  const [addAmount, setAddAmount] = useState('');
  const [goalInput, setGoalInput] = useState('');
  const isInitialMount = useRef(true);

  useEffect(()=>{
    const savedData = localStorage.getItem('calorieData');
    if(savedData){
      const {goal: savedGoal, consumed: savedConsumed} = JSON.parse(savedData);
      if(savedGoal !=null){
        setGoal(savedGoal);
      }
      if(savedConsumed !=null){
        setConsumed(savedConsumed);
      }
    }},[]);
        useEffect(() => {
      const bgImage = consumed > goal 
        ? `url(${fatguy})`
        : `url(${originalImg})`;
      
      document.documentElement.style.setProperty('--bg-image', bgImage);
    }, [consumed, goal]);
     useEffect(()=>{
      if(isInitialMount.current){
        isInitialMount.current=false;
      }
      else{
      localStorage.setItem('calorieData',JSON.stringify({goal,consumed}));
    }
    },[goal,consumed]
    
    
    );

  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min((consumed / goal) * 100, 100) || 0; 
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const handleAddCalories = (e) => {
    e.preventDefault();
    if (addAmount) {
      const amount = parseInt(addAmount, 10);
      setConsumed(Math.max(0, consumed + amount));
      setAddAmount('');
    }
  };

  const handleSetGoal = (e) => {
    e.preventDefault();
    if (goalInput && parseInt(goalInput, 10) > 0) {
      setGoal(parseInt(goalInput, 10));
      setGoalInput('');
    }
  };

  const handleReset = () => {
    setConsumed(0);
  };
  //copied below from bootstrap

  return (
    <div className="container py-4 d-flex justify-content-center">
      <div className="card shadow-sm border-0 text-center" style={{ width: '300px' }}>
        <div className="card-body">
          <h4 className="fw-bold mb-4">Daily Calories</h4>

          <div className="position-relative d-inline-block mb-3">
            <svg width="150" height="150" viewBox="0 0 150 150">
              <circle cx="75" cy="75" r={radius} stroke="#e9ecef" strokeWidth="12" fill="none" />
              <circle cx="75" cy="75" r={radius} stroke={consumed>goal ?'#dc3545': '#0d6efd' } strokeWidth="12" fill="none" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round" transform="rotate(-90 75 75)" style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }} />
            </svg>
            
            <div className="position-absolute top-50 start-50 translate-middle w-100">
              <h3 className={`mb-0 fw-bold ${consumed > goal ? 'text-danger' : 'text-primary'}`}>{consumed}</h3>
              <small className="text-muted">/ {goal} kcal</small>
            </div>
          </div>

          <form onSubmit={handleAddCalories} className="mt-3">
            <div className="input-group">
              <input type="number" className="form-control" placeholder="Enter kcal" value={addAmount} onChange={(e) => setAddAmount(e.target.value)} />
              <button className="btn btn-primary" type="submit">Add</button>
            </div>
          </form>

          <form onSubmit={handleSetGoal} className="mt-2">
            <div className="input-group">
              <input type="number" className="form-control" placeholder="Set daily goal" value={goalInput} onChange={(e) => setGoalInput(e.target.value)} min="1" />
              <button className="btn btn-outline-secondary" type="submit">Set Goal</button>
            </div>
          </form>
          <button className="btn btn-danger mt-2" onClick={handleReset}>Reset</button>
        </div>
      </div>
    </div>
  );
};

export default CalorieTracker;