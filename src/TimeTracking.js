import React, { useState } from "react";

export default function TimeTracking() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  const handleAddProject = (newProject) => {
    setProjects([...projects, newProject]);
  };

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleTrackTime = (taskId, timeSpent) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          timeSpent: task.timeSpent + timeSpent
        };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const renderProjects = () => {
    return projects.map((project) => (
      <div key={project.id}>
        <h2>{project.name}</h2>
        <p>{project.details}</p>
      </div>
    ));
  };

  const renderTasks = () => {
    return tasks.map((task) => (
      <div key={task.id}>
        <h3>{task.name}</h3>
        <p>Project: {task.project}</p>
        <p>Time spent: {task.timeSpent} minutes</p>
        <button onClick={() => handleTrackTime(task.id, 15)}>
          Track 15 minutes
        </button>
      </div>
    ));
  };

  return (
    <div>
      <h1>Time Tracking App</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const newProject = {
            id: Date.now(),
            name: event.target.projectName.value,
            details: event.target.projectDetails.value
          };
          handleAddProject(newProject);
        }}
      >
        <label htmlFor="projectName">Project Name:</label>
        <input type="text" id="projectName" name="projectName" required />
        <label htmlFor="projectDetails">Details:</label>
        <input type="text" id="projectDetails" name="projectDetails" required />
        <button type="submit">Add Project</button>
      </form>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const newTask = {
            id: Date.now(),
            name: event.target.taskName.value,
            project: event.target.projectName.value,
            timeSpent: 0
          };
          handleAddTask(newTask);
        }}
      >
        <label htmlFor="taskName">Task Name:</label>
        <input type="text" id="taskName" name="taskName" required />
        <label htmlFor="projectName">Project:</label>
        <select id="projectName" name="projectName" required>
          {projects.map((project) => (
            <option key={project.id} value={project.name}>
              {project.name}
            </option>
          ))}
        </select>
        <button type="submit">Add Task</button>
      </form>
      <div>
        <h2>Projects</h2>
        {renderProjects()}
      </div>
      <div>
        <h2>Tasks</h2>
        {renderTasks()}
      </div>
    </div>
  );
}
