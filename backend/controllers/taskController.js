
import Task from '../models/Task.js';



export const findalltasks = async(req,res) => {
  try{
    const tasks = await Task.find({
      '$or': [
        { 'creator': { $in: req.user } },
      ]
    }).populate();
    
    res.json(tasks);

  } catch(error) {
    const { message } = new Error('Error');
    return res.status(500).json({ message });
  }
}

export const postnewtask = async(req,res) => {
  const { title, description, status } = req.body;
  const newTask = new Task({ title, description, status });
  newTask.creator= req.user._id;
  
  try{
  await newTask.save();
  res.json(newTask);
  } catch(error) {
    const { message } = new Error('Error');
    return res.status(500).json({ message });
  }
}

export const updateTasks = async(req,res) => {
  try{
  const { _id } = req.body;
  const { title, description, status } = req.body;
  const updatedTask = await Task.findByIdAndUpdate(_id, { title, description, status }, { new: true });
  res.json(updatedTask);
  } catch(error) {
    const { message } = new Error('Error');
    return res.status(500).json({ message });
  }
}

export const deleteTasks = async(req,res) => {
  try{
  const id = req.params.id;
  
  await Task.findByIdAndDelete(id);
  res.json({ message: 'Task deleted' });
  } catch(error) {
    const { message } = new Error('Error');
    return res.status(500).json({ message });
  }
}