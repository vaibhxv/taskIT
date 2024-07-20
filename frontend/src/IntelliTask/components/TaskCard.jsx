import { useDrag } from "react-dnd";
const TaskCard = ({ task, onDelete, onEdit, onViewDetails }) => {
    const [{ isDragging }, drag] = useDrag({
      type: 'task',
      item: task,
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    });
  
    return (
      <div ref={drag} className={`p-4 mb-4 bg-card rounded shadow ${isDragging ? 'opacity-50' : 'opacity-100'}`}>
        <h3 className="font-semibold">{task.title}</h3>
        <p>{task.description}</p>
        <p className="text-sm text-yellow-950">Created at: {new Date(task.createdAt).toLocaleString()}</p>
        <div className="flex justify-end mt-2">
          <button onClick={() => onDelete(task._id)} className="bg-rose-700 text-white px-2 py-1 rounded mr-2">Delete</button>
          <button onClick={() => onEdit(task)} className="bg-amber-700 text-white px-2 py-1 rounded mr-2">Edit</button>
          <button onClick={()=>onViewDetails(task)} className="bg-lime-800 text-white px-2 py-1 rounded">View Details</button>
        </div>
      </div>
    );
  };
  
  export default TaskCard;
  