import React from 'react';

const WorkoutsTable = ({ workouts, updateWorkoutCompletion, updateWorkout, removeWorkout, isFinalized }) => {
  return (
    <table className="workouts-table">
      <thead>
        <tr>
          <th>Workout</th>
          <th>Sets</th>
          <th>Reps</th>
          <th>Weight</th>
          <th>Progress</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {workouts.map((workout) => (
          <tr key={workout.id} className={workout.completed ? 'completed' : ''}>
            <td><span className="workout-name">{workout.name}</span></td>
            <td>
              <input
                type="number"
                placeholder="Sets"
                value={workout.sets}
                onChange={(e) => updateWorkout(workout.id, 'sets', e.target.value)}
                className={workout.sets > 7 ? 'big-warning-sets' : (workout.sets > 4 ? 'warning-sets' : 'safe-sets')}
              />
            </td>
            <td>
              <input
                type="number"
                placeholder="Reps"
                value={workout.reps}
                onChange={(e) => updateWorkout(workout.id, 'reps', e.target.value)}
              />
            </td>
            <td>    
            <input
              type="number"
              placeholder="Weight"
              value={workout.weight || ''}
              onChange={(e)=> updateWorkout(workout.id, 'weight',e.target.value)}
            />  
            </td>
            <td>
              <div className="sets-progress">
                {[...Array(parseInt(workout.sets, 10) || 0)].map((_, i) => (
                  <input
                    key={i}
                    type="checkbox"
                    checked={workout.setsCompleted > i}
                    onChange={() => {
                      const newSetsCompleted = workout.setsCompleted > i ? i : i + 1;
                      updateWorkoutCompletion(workout.id, newSetsCompleted);
                    }}
                  />
                ))}
              </div>
            </td>
            <td>
              <button
                className="completion-button"
                onClick={() => {
                  const allSetsCompleted = workout.setsCompleted === parseInt(workout.sets, 10);
                  updateWorkoutCompletion(workout.id, allSetsCompleted ? 0 : parseInt(workout.sets, 10));
                }}
              >
                {workout.setsCompleted === parseInt(workout.sets, 10) ? 'Undo' : 'Complete'}
              </button>
            </td>
            <td>
              <button className="remove-button" onClick={() => removeWorkout(workout.id)} disabled={isFinalized}>
                Remove
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default WorkoutsTable;