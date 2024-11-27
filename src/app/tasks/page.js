'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Tasks() {

    const [tasks, setTasks] = useState([]);
    const [editTask, setEditTask] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [newTask, setNewTask] = useState({ name: '', description: '' });
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);


    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = () => {
        axios
            .get('http://127.0.0.1:8000/api/task-list/')
            .then((response) => {
                setTasks(response?.data?.task_list);
            })
            .catch((error) => {
                console.error('Error fetching tasks:', error);
            });
    };

    const handleEditClick = (task) => {
        setEditTask(task);
        setIsModalOpen(true);
    };

    const handleAddTask = () => {
        axios
            .post('http://127.0.0.1:8000/api/task-create/', newTask)
            .then(() => {
                fetchTasks(); // Refresh the task list
                setIsAddModalOpen(false); // Close the modal
                setNewTask({ name: '', description: '' }); // Reset the form
            })
            .catch((error) => {
                console.error('Error creating task:', error);
            });
    };


    const handleSave = () => {
        if (!editTask?.id) return;

        axios
            .put(`http://127.0.0.1:8000/api/task-edit/${editTask.id}/`, editTask)
            .then(() => {
                fetchTasks(); // Refresh the task list
                setIsModalOpen(false);
            })
            .catch((error) => {
                console.error('Error updating task:', error);
            });
    };




    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navbar */}
            <nav className="bg-white shadow dark:bg-gray-900 fixed w-full z-20 top-0 border-b border-gray-200 dark:border-gray-600">
                <div className="max-w-screen-xl flex items-center justify-between mx-auto px-4 py-2">
                    <Link href="/" className="text-2xl font-semibold text-gray-800 dark:text-white">
                        Task Manager
                    </Link>
                    <ul className="flex items-center space-x-6">
                        <li>
                            <Link href="/" className="text-gray-800 dark:text-white hover:text-blue-600">
                                Home
                            </Link>
                        </li>
                        <li>
                            <a href="#" className="text-gray-800 dark:text-white hover:text-blue-600">
                                About
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-gray-800 dark:text-white hover:text-blue-600">
                                Services
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-gray-800 dark:text-white hover:text-blue-600">
                                Contact
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* Main Content */}
            <main className="mt-20 p-4">
                <div className="container mx-auto">

                    <button
                        className="px-4 py-2 bg-green-600 text-white rounded"
                        onClick={() => setIsAddModalOpen(true)}
                    >
                        Add Task
                    </button>
                    <h1 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6 text-center">Task List</h1>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Task Name</th>
                                    <th scope="col" className="px-6 py-3">Task Description</th>
                                    <th scope="col" className="px-6 py-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tasks?.length ? (
                                    tasks.map((task) => (
                                        <tr
                                            key={task.id}
                                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                        >
                                            <th
                                                scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                            >
                                                {task?.name}
                                            </th>
                                            <td className="px-6 py-4">{task?.description}</td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={() => handleEditClick(task)}
                                                    className="text-blue-600 dark:text-blue-500 hover:underline"
                                                >
                                                    Edit
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="3"
                                            className="px-6 py-4 text-center text-gray-700 dark:text-gray-300"
                                        >
                                            No tasks found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            {/* Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-md p-6 w-1/3">
                        <h2 className="text-xl font-semibold mb-4">Edit Task</h2>
                        <div className="mb-4">
                            <label className="block text-gray-700">Task Name</label>
                            <input
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded"
                                value={editTask?.name || ''}
                                onChange={(e) =>
                                    setEditTask({ ...editTask, name: e.target.value })
                                }
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Task Description</label>
                            <textarea
                                className="w-full p-2 border border-gray-300 rounded"
                                value={editTask?.description || ''}
                                onChange={(e) =>
                                    setEditTask({ ...editTask, description: e.target.value })
                                }
                            />
                        </div>
                        <div className="flex justify-end space-x-3">
                            <button
                                className="px-4 py-2 bg-gray-300 rounded"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-blue-600 text-white rounded"
                                onClick={handleSave}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}


            {/* Add Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-md p-6 w-1/3">
                        <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
                        <div className="mb-4">
                            <label className="block text-gray-700">Task Name</label>
                            <input
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded"
                                value={newTask.name}
                                onChange={(e) =>
                                    setNewTask({ ...newTask, name: e.target.value })
                                }
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Task Description</label>
                            <textarea
                                className="w-full p-2 border border-gray-300 rounded"
                                value={newTask.description}
                                onChange={(e) =>
                                    setNewTask({ ...newTask, description: e.target.value })
                                }
                            />
                        </div>
                        <div className="flex justify-end space-x-3">
                            <button
                                className="px-4 py-2 bg-gray-300 rounded"
                                onClick={() => setIsAddModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-green-600 text-white rounded"
                                onClick={handleAddTask}
                            >
                                Add Task
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
