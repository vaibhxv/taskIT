// src/components/SearchTask.js
import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Combobox, Transition } from '@headlessui/react';
//import { SearchIcon } from '@heroicons/react/solid';


const SearchProject = ({ tasks, onSelectTask }) => {
  const [query, setQuery] = useState('');


  const filteredTasks =
    query === ''
      ? []
      : tasks.filter((task) =>
          task.title.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, ''))
        );

        return (
          <div className="w-64 md:w-80">
            <Combobox onChange={onSelectTask}>
              <div className="relative mt-1">
                <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 sm:text-sm">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-[#545454]">
                    
                    <span className="sr-only">Search for a Task</span>
                  </div>
                  <Combobox.Input
                    className="block w-full p-2 pl-10 text-sm text-[#545454] border border-gray-400 rounded-lg bg-gray-50 outline-none focus:border-[#B0A6EB]"
                    placeholder='Search'
                    onChange={(event) => setQuery(event.target.value)}
                  />
                </div>
                <Transition
                  as={React.Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                  afterLeave={() => setQuery('')}
                >
                  <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                    {filteredTasks.length === 0 && query !== '' ? (
                      <div className="relative cursor-default select-none px-4 py-2 text-[#545454]">
                        No available tasks.
                      </div>
                    ) : (
                      filteredTasks.map((task) => (
                        <Combobox.Option
                          key={task._id}
                          className={({ active }) =>
                            `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? 'bg-stone-700 text-white' : 'text-gray-900'}`
                          }
                          value={task}
                        >
                          {task.title}
                        </Combobox.Option>
                      ))
                    )}
                  </Combobox.Options>
                </Transition>
              </div>
            </Combobox>
          </div>
        );
      };

export default SearchProject;















