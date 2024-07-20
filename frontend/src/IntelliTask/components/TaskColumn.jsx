// src/components/TaskColumn.js

import React from 'react';
import { useDrop } from 'react-dnd';
import TaskCard from './TaskCard';

const TaskColumn = ({ title, tasks, onDropTask, onDelete, onEdit, onViewDetails }) => {
  const [{ isOver }, drop] = useDrop({
    accept: 'task',
    drop: (item) => onDropTask(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div ref={drop} className="rounded p-4 shadow-md bg-column">
      <h2 className="text-lg font-bold mb-4">{title}</h2>
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} onDelete={onDelete} onEdit={onEdit} onViewDetails={onViewDetails} />
      ))}
    </div>
  );
};

export default TaskColumn;
