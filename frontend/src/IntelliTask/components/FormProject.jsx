import { Dialog } from '@headlessui/react';
import { useForm, useTaskUnityContext } from '../../hooks';
import { Alert } from '../../components';
import { getCurrentDate } from '../helpers';
import { useEffect } from 'react';

const initialForm = {
  name: '',
  description: '',
  deadline: '',
  client: '',
}
export const FormProject = () => {

  const {
    id,
    name,
    description,
    deadline,
    client,
    onInputChange,
    formState,
    onResetForm,
    updateDataForm,
  } = useForm(initialForm);

  const { showAlert, alert, projectToEdit, startSaveProject } = useTaskUnityContext();

  useEffect(() => {
    if (projectToEdit?._id) {
      updateDataForm({
        id: projectToEdit._id,
        name: projectToEdit.name,
        description: projectToEdit.description,
        deadline: projectToEdit.deadline?.split('T')[0],
        client: projectToEdit.client
      });
    }
  }, [])

  const onSubmitForm = async (e) => {
    e.preventDefault();

    if ([name, description, deadline, client].includes('')) {
      return showAlert({
        message: 'Todos los campos son obligatorios.',
        error: true
      });
    }
    showAlert({});

    const response = await startSaveProject(formState);

    if (response?.error) {
      return showAlert(response);
    }
    onResetForm();
  }
  return (
    <>
      <Dialog.Title as="h3" className="text-lg leading-6 font-bold text-gray-900">
        {id ? `Edit: ${name}` : 'New project'}
      </Dialog.Title>

      {alert?.message && <Alert alert={alert} />}

      <form
        className='py-10'
        onSubmit={onSubmitForm}
      >
        <div className="mb-5">
          <label
            htmlFor="name"
            className="font-bold"
          >Name of the Project</label>
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
            htmlFor="deadline"
            className="font-bold"
          >What's the deadline?</label>
          <input
            required
            id="deadline"
            type="date"
            name='deadline'
            min={getCurrentDate()}
            value={deadline}
            onChange={onInputChange}
            className="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] outline-none focus:border-taskunity-400 focus-visible:shadow-none py-3 px-5"
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="client"
            className="font-bold"
          >Name of the Client</label>
          <input
            required
            id="client"
            type="text"
            name='client'
            value={client}
            onChange={onInputChange}
            className="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] outline-none focus:border-taskunity-400 focus-visible:shadow-none py-3 px-5"
          />
        </div>

        <div>
          <button
            className="w-full cursor-pointer rounded-md border bg-taskunity-800 py-3 px-5 text-base text-white font-bold transition-colors hover:bg-opacity-90"
            type="submit"
          >
            {id ? 'Login' : 'Create Project'}
          </button>
        </div>
      </form>
    </>
  )
}