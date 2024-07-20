import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TaskColumn from '../components/TaskColumn';
import SearchProject from '../components/SearchProject';
import { useTaskUnityContext, useAuth } from '../../hooks/';
import TaskDetailsModal from '../components/TaskDetailsModal';


const DashboardPage = () => {
  const { logoutTaskUnity } = useTaskUnityContext();
  const { logoutAuth } = useAuth();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [todoTasks, setTodoTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '', status: 'TODO' });
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    // Fetch tasks from the backend
    const token = localStorage.getItem('token');
      if (!token) return;
      const options = {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      } 
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/tasks`, options)
      .then(response => {
        const tasks = response.data;
        setTasks(tasks);
        setTodoTasks(tasks.filter(task => task.status === 'TODO'));
        setInProgressTasks(tasks.filter(task => task.status === 'IN_PROGRESS'));
        setDoneTasks(tasks.filter(task => task.status === 'DONE'));
      })
      .catch(error => console.error('Error fetching tasks:', error));
  },[]);

  useEffect(() => {
    // Fetch tasks from the backend
    const token = localStorage.getItem('token');
      if (!token) return;
      const options = {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      } 
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/tasks`, options)
      .then(response => {
        const tasks = response.data;
        setTasks(tasks);
      })
      .catch(error => console.error('Error fetching tasks:', error));
  },[showForm]);
 


  const handleDrop = (task, newStatus) => {
    const updatedTask = { ...task, status: newStatus };
    axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/tasks/${task.id}`, updatedTask)
      .then(response => {
        const updatedTask = response.data;
        setTodoTasks(tasks => tasks.filter(t => t._id !== updatedTask._id));
        setInProgressTasks(tasks => tasks.filter(t => t._id !== updatedTask._id));
        setDoneTasks(tasks => tasks.filter(t => t._id !== updatedTask._id));
        if (newStatus === 'TODO') setTodoTasks(tasks => [...tasks, updatedTask]);
        if (newStatus === 'IN_PROGRESS') setInProgressTasks(tasks => [...tasks, updatedTask]);
        if (newStatus === 'DONE') setDoneTasks(tasks => [...tasks, updatedTask]);
      })
      .catch(error => console.error('Error updating task:', error));
  };
  const handleAddTask = () => {
    if (isEditing) {
      axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/tasks/${newTask._id}`, newTask)
        .then(response => {
          const updatedTask = response.data;
          setTodoTasks(tasks => tasks.map(t => (t._id === updatedTask._id ? updatedTask : t)));
          setInProgressTasks(tasks => tasks.map(t => (t._id === updatedTask._id ? updatedTask : t)));
          setDoneTasks(tasks => tasks.map(t => (t._id === updatedTask._id ? updatedTask : t)));
          setShowForm(false);
          setIsEditing(false);
          setNewTask({ title: '', description: '', status: 'TODO' });
        })
        .catch(error => console.error('Error updating task:', error));
    } else {
      const token = localStorage.getItem('token');
      if (!token) return;
      const options = {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      } 
      axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/tasks/`, newTask, options)
        .then(response => {
          const createdTask = response.data;
          setTodoTasks(tasks => [...tasks, createdTask]);
          setShowForm(false);
          setNewTask({ title: '', description: '', status: 'TODO' });
        })
        .catch(error => console.error('Error adding task:', error));
    }
  };
  const handleDelete = (id) => {
    console.log(id);
    axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/tasks/${id}`)
      .then(() => {
        setTodoTasks(tasks => tasks.filter(task => task._id !== id));
        setInProgressTasks(tasks => tasks.filter(task => task._id !== id));
        setDoneTasks(tasks => tasks.filter(task => task._id !== id));
      })
      .catch(error => console.error('Error deleting task:', error));
  };

  const handleEdit = (task) => {
    setNewTask(task);
    setIsEditing(true);
    setShowForm(true);
  };

  const onLogout = () => {
    logoutTaskUnity();
    logoutAuth();
    navigate('/');
    
  }

  const handleViewDetails = (task) => {
    setSelectedTask(task);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen p-6 bg-gradient-to-b from-background to-gradient">
      <div className="flex justify-between items-center mb-4">
  <h1 className="text-2xl font-bold">Task Manager</h1>
  <SearchProject tasks={tasks} onSelectTask={handleViewDetails} /> {/* Include the SearchProject component */}
  <div className="flex gap-2">
  <button onClick={() => setShowForm(true)} className="bg-stone-700 text-white px-4 py-2 rounded">
      Add Task
    </button>
    <button
      type="button"
      className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-800 text-[#545454] hover:text-white transition-colors"
      onClick={onLogout}
    >
      
      Log Out
    </button>
    
  </div>
</div>

        {showForm && (
          <div className="mb-4">
            <input
              type="text"
              placeholder="Title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              className="border p-2 mr-2"
            />
            <input
              type="text"
              placeholder="Description"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              className="border p-2 mr-2"
            />
            <button onClick={handleAddTask} className="bg-emerald-600 text-white px-4 py-2 rounded">Save Task</button>
          </div>
        )}
         <div className="grid grid-cols-3 gap-4">
          <TaskColumn title="TODO" tasks={todoTasks} onDropTask={task => handleDrop(task, 'TODO')} onDelete={handleDelete} onEdit={handleEdit} onViewDetails={handleViewDetails} />
          <TaskColumn title="IN PROGRESS" tasks={inProgressTasks} onDropTask={task => handleDrop(task, 'IN_PROGRESS')} onDelete={handleDelete} onEdit={handleEdit} onViewDetails={handleViewDetails} />
          <TaskColumn title="DONE" tasks={doneTasks} onDropTask={task => handleDrop(task, 'DONE')} onDelete={handleDelete} onEdit={handleEdit} onViewDetails={handleViewDetails} />
        </div>
        {selectedTask && <TaskDetailsModal task={selectedTask} onClose={() => setSelectedTask(null)} />}
      
      </div>
    </DndProvider>
  );
};



export default DashboardPage;
