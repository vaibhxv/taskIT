import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { TaskUnityContext } from './TaskUnityContext';


let socket;

export const TaskUnityProvider = ({ children }) => {



  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState({});

  
  const [alert, setAlert] = useState({});
  

  useEffect(() => {
    if(project?._id) {
      socket = io(import.meta.env.VITE_BACKEND_URL);
    }
  }, [project])

  const showAlert = (alert) => {
    setAlert(alert);
  }


  const logoutTaskUnity = () => {
    setProjects([]);
    setProject({});
    setAlert({});
  }

  return (
    <TaskUnityContext.Provider
      value={{
        
        logoutTaskUnity,
      }}
    >
      {children}
    </TaskUnityContext.Provider>
  )
}