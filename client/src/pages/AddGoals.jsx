import React, { useState } from 'react';

export default function AddGoals() {
  const [displayMode, setDisplayMode] = useState('grid'); // grid | table
  const [newGoal, setNewGoal] = useState({ title: '', target: '', category: 'Fitness' });

  // Mock Data
  const [goals, setGoals] = useState([
    { id: 1, title: 'Daily Steps', target: '10,000', progress: 70, category: 'Fitness' },
    { id: 2, title: 'Water Intake', target: '3L', progress: 40, category: 'Nutrition' }
  ]);

  return (
    <div className="container py-4">
      {/* Header & Display Toggle */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-0">Wellness Goals</h2>
          <p className="text-muted">Track your journey to better health.</p>
        </div>
        <div className="btn-group shadow-sm" role="group">
          <button 
            className={`btn ${displayMode === 'grid' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setDisplayMode('grid')}
          >
            Grid View
          </button>
          <button 
            className={`btn ${displayMode === 'table' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setDisplayMode('table')}
          >
            List View
          </button>
        </div>
      </div>

      {/* Add Goal Input Area */}
      <div className="card mb-4 border-0 shadow-sm p-3">
        <div className="row g-2">
          <div className="col-md-4">
            <input 
              type="text" className="form-control" 
              placeholder="Goal Name (e.g. Weight Loss)"
              onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
            />
          </div>
          <div className="col-md-3">
            <select className="form-select" onChange={(e) => setNewGoal({...newGoal, category: e.target.value})}>
              <option>Fitness</option>
              <option>Nutrition</option>
              <option>Mental Health</option>
            </select>
          </div>
          <div className="col-md-3">
            <input 
              type="text" className="form-control" 
              placeholder="Target (e.g. 5kg)"
              onChange={(e) => setNewGoal({...newGoal, target: e.target.value})}
            />
          </div>
          <div className="col-md-2">
            <button className="btn btn-accent w-100" style={{backgroundColor: 'var(--accent)', color: 'white'}}>
              Add Goal
            </button>
          </div>
        </div>
      </div>

      {/* Dynamic Display Rendering */}
      {displayMode === 'grid' ? (
        <div className="row g-3">
          {goals.map(goal => (
            <div key={goal.id} className="col-md-4">
              <div className="card h-100 border-0 shadow-sm p-3">
                <span className="badge mb-2 align-self-start" style={{backgroundColor: 'var(--accent-bg)', color: 'var(--accent)'}}>
                  {goal.category}
                </span>
                <h5>{goal.title}</h5>
                <p className="small text-muted mb-2">Target: {goal.target}</p>
                <div className="progress" style={{height: '8px'}}>
                  <div className="progress-bar" style={{width: `${goal.progress}%`, backgroundColor: 'var(--accent)'}}></div>
                </div>
                <div className="text-end mt-1 small">{goal.progress}%</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card border-0 shadow-sm overflow-hidden">
          <table className="table mb-0 align-middle">
            <thead className="table-light">
              <tr>
                <th>Goal</th>
                <th>Category</th>
                <th>Target</th>
                <th>Progress</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {goals.map(goal => (
                <tr key={goal.id}>
                  <td><strong>{goal.title}</strong></td>
                  <td>{goal.category}</td>
                  <td>{goal.target}</td>
                  <td style={{width: '200px'}}>
                    <div className="progress" style={{height: '6px'}}>
                      <div className="progress-bar" style={{width: `${goal.progress}%`, backgroundColor: 'var(--accent)'}}></div>
                    </div>
                  </td>
                  <td className="text-end">
                    <button className="btn btn-sm btn-link text-danger">Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
