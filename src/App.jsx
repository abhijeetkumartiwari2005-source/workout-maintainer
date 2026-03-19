import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import WorkoutsTable from './WorkoutsTable';
import Sidebar from './Sidebar';
import planImage1 from './assets/Gemini_Generated_Image_r8ct64r8ct64r8ct.png';
import planImage2 from './assets/Gemini_Generated_Image_35zbx835zbx835zb.png';
import planImage3 from './assets/Gemini_Generated_Image_bxccwcbxccwcbxcc.png';
import planImage4 from './assets/Gemini_Generated_Image_r8ct64r8ct64r8ct.png';
import CalorieTracker from './calorieTracker';


function App() {
  const [workouts, setWorkouts] = useState(() => {
    const savedWorkouts = localStorage.getItem('workouts');
    return savedWorkouts ? JSON.parse(savedWorkouts) : [];
  });
  const [name, setName] = useState('');
  const [isFinalized, setIsFinalized] = useState(false);
  const [activeView, setActiveView] = useState('home');

  useEffect(() => {
    localStorage.setItem('workouts', JSON.stringify(workouts));
  }, [workouts]);
  const [showPlan, setShowPlan] = useState(false);
  
  const addWorkout = (e) => {
    e.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) return;
    setWorkouts((prevWorkouts) => [
      ...prevWorkouts,
      {
        id: crypto.randomUUID(),
        name: trimmedName,
        reps: '',
        sets: '',
        weight:'',
        setsCompleted: 0,
        completed: false,
      },
    ]);
    setName('');
  };

  const removeWorkout = (id) => {
    setWorkouts((prevWorkouts) => prevWorkouts.filter((w) => w.id !== id));
  };

  const updateWorkout = (id, field, value) => {
    setWorkouts((prevWorkouts) =>
      prevWorkouts.map((w) => (w.id === id ? { ...w, [field]: value } : w))
    );
  };

  const updateWorkoutCompletion = (id, setsCompleted) => {
    setWorkouts((prevWorkouts) =>
      prevWorkouts.map((w) =>
        w.id === id
          ? {
              ...w,
              setsCompleted,
              completed: setsCompleted === parseInt(w.sets, 10),
            }
          : w
      )
    );
  };

  const renderContent = () => {
    switch (activeView) {
      case'home':
      return(
      <div className="welcome-message">
        <h2>Welcome to Workout Maintainer!</h2>
        <p> select an option to get started.</p>
        </div>
          );
      case 'planWorkout':
        
        return (
          <>
            {!isFinalized && (
              <form onSubmit={addWorkout} className="workout-form">
                <label htmlFor="workout-input" className="sr-only">
                  Workout Name
                </label>
                <input
                  id="workout-input"
                  type="text"
                  placeholder="New workout name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <button type="submit">Add</button>
              </form>
            )}
            
    
            {workouts.length > 0 && (
              <button
                className="finalize-toggle"
                onClick={() => setIsFinalized(!isFinalized)}
              >
                {isFinalized ? '← Edit Workout List' : 'Finalize & Add Details'}
              </button>
            )}
    
            {isFinalized ? (
              <WorkoutsTable
                workouts={workouts}
                updateWorkoutCompletion={updateWorkoutCompletion}
                updateWorkout={updateWorkout}
                removeWorkout={removeWorkout}
              />
            ) : workouts.length > 0 ? (
              <ul className="workout-list">
                {workouts.map((w) => (
                  <li key={w.id} className="workout-item">
                    <span className="workout-name">{w.name}</span>
                    <button
                      className="remove-button"
                      onClick={() => removeWorkout(w.id)}
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="empty-message">No workouts yet. Add one above.</p>
            )}
          </>
        );
      case 'premadePlans':
        return (
          <div>
            <h2>Pre-made Plans</h2>
            <div className="image-gallery-container">
              <img src={planImage1} alt="Workout Plan 1" />
              <img src={planImage2} alt="Workout Plan 2" />
              <img src={planImage3} alt="Workout Plan 3" />
              <img src={planImage4} alt="Workout Plan 4" />
            </div>
          </div>
        );
      case 'calorieTracker':
        return <CalorieTracker />;
      default:
        return <h2>Plan today's workout</h2>;
    }
  };
  
  

  return (
    <div className="app-container">
      <Sidebar setActiveView={setActiveView}
      activeView={activeView} />
      <div className="app">
        <header className="app-header">
          <h1>Workout Maintainer</h1>
          <h3>workout plan for {new Date().toLocaleDateString()}</h3>
          {activeView === 'home' && (
            <button 
              className="btn btn-primary shadow-sm"
              style={{ position: 'absolute', top: '20px', right: '20px' }}
              onClick={() => setActiveView('calorieTracker')}
            >
              Calorie Tracker
            </button>
          )}
        </header>
        <main className="app-main">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;
