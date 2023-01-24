import React, { useState } from 'react';

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [reminder, setReminder] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setTasks([...tasks, { task: newTask, completed: false, reminder:reminder }]);
    setNewTask('');
    setReminder('');
  }

  const handleDelete = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  }

  const handleEdit = (index) => {
    setNewTask(tasks[index].task);
    setReminder(tasks[index].reminder);
    handleDelete(index);
  }

  const handleComplete = (index) => {
    let updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  }

  const handleSearch = (e) => {
    let searchValue = e.target.value;
    let filteredTasks = tasks.filter(task => task.task.includes(searchValue));
    setTasks(filteredTasks);
  }

  return (
    <div>
      <h1>To-Do List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter new task"
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
        />
        <input
          type="datetime-local"
          placeholder="Enter reminder"
          value={reminder}
          onChange={e => setReminder(e.target.value)}
        />
        <button type="submit">Add Task</button>
        <input type="text" placeholder="Search Tasks" onChange={handleSearch} />
      </form>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleComplete(index)}
            />
            {task.task} {task.reminder}
            <button onClick={() => handleDelete(index)}>Delete</button>
            <button onClick={() => handleEdit(index)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
