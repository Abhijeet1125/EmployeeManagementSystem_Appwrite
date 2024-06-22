import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { LoginWarning } from '../components';
import projectService from '../appwrite/projectCollection'

const ProAddEdit = () => {
    const { id } = useParams()
    const loggedIn = useSelector(state => state.auth.loggedIn)
    const departments = useSelector(state => state.dept.departmentsList)
    const prolist = useSelector((state) => state.project.projectList);
    const navigate = useNavigate()

    const [projectName, setProjectName] = useState('');
    const [completed, setCompleted] = useState(false);
    const [department, setDepartment] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [no, setNO] = useState(null)

    useEffect(() => {
        if (id != 'new' && prolist.length > 0) {
            const project = prolist.find(pro => pro['id'] === id)
            if (project) {
                setProjectName (project.ProjectName)
                setCompleted ( project.Completed)
                setDepartment ( (project.department != null)?  project.department['$id'] : (""))
                setProjectDescription ( project.ProjectDescription)
            }
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (id === 'new') {
                await projectService.createProject({ 
                    ProjectName : projectName ,
                    Completed : completed ,
                    department : department,
                    ProjectDescription : projectDescription,
                })
            }
            else {
                await projectService.updateProject({ 
                    id, 
                    ProjectName : projectName ,
                    Completed : completed ,
                    department : department,
                    ProjectDescription : projectDescription,
                })
            }
            navigate('/Project')
        } catch (error) {
            console.log(error)
            setNO("Sorry,Please try again")
        }
    };

    return (
        <>
            {!loggedIn && <LoginWarning />}
            {loggedIn && (
                <>
                    {no && <p className="text-red-500 mt-4">{no}</p>}
                    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
                        <h2 className="text-2xl font-bold mb-6 text-center">Project Form</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="projectName" className="block text-sm font-medium text-gray-700">Project Name:</label>
                                <input
                                    type="text"
                                    id="projectName"
                                    name="projectName"
                                    value={projectName}
                                    onChange={(e) => setProjectName(e.target.value)}
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="completed" className="block text-sm font-medium text-gray-700">Completed:</label>
                                <input
                                    type="checkbox"
                                    id="completed"
                                    name="completed"
                                    checked={completed}
                                    onChange={(e) => setCompleted(e.target.checked)}
                                    className="mt-1 block"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department:</label>
                                <select
                                    id="department"
                                    name="department"
                                    value={department}
                                    onChange={(e) => setDepartment(e.target.value)}
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                   <option  value={""}>
                                            {"select department"}
                                    </option>
                                    {departments.map((dept) => (
                                        <option key={dept.id} value={dept.id}>
                                            {dept.DepartmentName}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="projectDescription" className="block text-sm font-medium text-gray-700">Project Description:</label>
                                <textarea
                                    id="projectDescription"
                                    name="projectDescription"
                                    value={projectDescription}
                                    onChange={(e) => setProjectDescription(e.target.value)}
                                    rows="4"
                                    required
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                ></textarea>
                            </div>

                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </>
            )}
        </>
    );
};

export default ProAddEdit;
