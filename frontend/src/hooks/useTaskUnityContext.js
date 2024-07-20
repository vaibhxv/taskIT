import { useContext } from 'react';
import { TaskUnityContext } from '../IntelliTask/context';

export const useTaskUnityContext = () => {
  return useContext(TaskUnityContext);
}