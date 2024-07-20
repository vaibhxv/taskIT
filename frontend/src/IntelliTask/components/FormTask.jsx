import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Dialog } from '@headlessui/react';
import { useForm, useTaskUnityContext } from '../../hooks';
import { Alert } from '../../components';


const initialForm = {
  name: '',
  description: '',
  dueDate: '',
  priority: '',
}

export const FormTask = () => {
  const {
    id,
    name,
    description,
    dueDate,
    priority,
    onInputChange, formState, onResetForm, updateDataForm } = useForm(initialForm);
  const { startSaveTask, showAlert, alert, project, task } = useTaskUnityContext();

  const { id: projectId } = useParams();

  const deadlineProject = project?.deadline?.split('T')[0];

  useEffect(() => {
    if (task?._id) {
      updateDataForm({
        id: task._id,
        name: task.name,
        description: task.description,
        dueDate: task.dueDate?.split('T')[0],
        priority: task.priority
      });
    }
  }, [])

  const onSubmitForm = async (e) => {
    e.preventDefault();

    if ([name, description, dueDate, priority].includes('')) {
      return showAlert({
        message: 'Invalid charecter.',
        error: true
      });
    }
    if (dueDate <= getCurrentDate()) {
      return showAlert({
        message: `Date cannot be set before ${getCurrentDate()}.`,
        error: true
      });
    }
    showAlert({});
    await startSaveTask({ ...formState, project: projectId });
    onResetForm();
  }

  return (
    <>
      <Dialog.Title as="h3" className="text-lg leading-6 font-bold text-gray-900">
        {id ? `Name: ${name}` : 'New Task'}
      </Dialog.Title>

      {alert?.message && <Alert alert={alert} />}

      <form
        className="py-10"
        onSubmit={onSubmitForm}
      >
        <div className="mb-5">
          <label
            htmlFor="name"
            className="font-bold"
          >Name of Task</label>
          <input
            required
            id="name"
            type="text"
            name='name'
            value={name}
            onChange={onInputChange}
            className="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] outline-none focus:border-taskunity-400 focus-visible:shadow-none py-3 px-5"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="description"
            className="font-bold"
          >Description</label>
          <textarea
            required
            id="description"
            name='description'
            value={description}
            onChange={onInputChange}
            className="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] outline-none focus:border-taskunity-400 focus-visible:shadow-none py-3 px-5"
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="dueDate"
            className="font-bold"
          >Deadline</label>
          <input
            required
            id="dueDate"
            type="date"
            name='dueDate'
            min={getCurrentDate()}
            max={deadlineProject}
            value={dueDate}
            onChange={onInputChange}
            className="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] outline-none focus:border-taskunity-400 focus-visible:shadow-none py-3 px-5"
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="priority"
            className="font-bold"
          >Priority</label>
          <select
            required
            id="priority"
            name='priority'
            value={priority}
            onChange={onInputChange}
            className="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] outline-none focus:border-taskunity-400 focus-visible:shadow-none py-3 px-5"
          >
            <option value="" disabled>-- Select --</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <button
            className="w-full cursor-pointer rounded-md border bg-taskunity-800 py-3 px-5 text-base text-white font-bold transition-colors hover:bg-opacity-90"
            type="submit"
          >
            {id ? 'Login' : 'Create Task'}
          </button>
        </div>
      </form>
    </>
  )
}