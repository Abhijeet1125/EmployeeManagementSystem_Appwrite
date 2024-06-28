import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { LoginWarning } from '../components';
import departmentService from '../appwrite/departmentCollection'

const DeptAddEdit = () => {
    const { id } = useParams()
    const loggedIn = useSelector(state => state.auth.loggedIn)
    const departments = useSelector(state => state.dept.departmentsList)
    const navigate = useNavigate()

    const [DepartmentName, setDepartmentName] = useState('')
    const [Location, setLocation] = useState('')
    const [DepartmentDescription, setDepartmentDescription] = useState('')
    const [no , setNO] = useState (null)

    useEffect(() => {
        if (id != 'new' && departments.length > 0) {
            const department = departments.find(dept => dept['id'] === id)
            if (department) {
                setDepartmentName(department.DepartmentName);
                setLocation(department.Location);
                setDepartmentDescription(department.DepartmentDescription)
            }
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (id === 'new') {
                await departmentService.createDepartment({ DepartmentName, Location, DepartmentDescription })
            }
            else {
                await departmentService.updateDepartment({ id, DepartmentName, Location, DepartmentDescription })
            }
            navigate('/Department')
        } catch (error) {
            console.log ( error )
            setNO("Sorry,Please try again")
        }
    };

    return (
        <>
            {!loggedIn && <LoginWarning />}
            {loggedIn && (
                <>
                    {no && <p className="text-red-500 mt-4">{no}</p>}
                    <div className='bg-gray-900 min-h-screen pt-8'>
                    <div className="max-w-2xl mx-auto p-6 bg-gray-100 text-brown-900 shadow-md rounded-lg">
                        <h2 className="text-2xl font-bold mb-6 mt-6 text-brown-900"> {(id === 'new') ? ("Add") : ("Edit")} {"Department"}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="departmentName" className="block text-gray-700">Department Name:</label>
                                <input
                                    type="text"
                                    id="departmentName"
                                    value={DepartmentName}
                                    onChange={(e) => setDepartmentName(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="location" className="block text-gray-700">Location:</label>
                                <input
                                    type="text"
                                    id="location"
                                    value={Location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="departmentDescription" className="block text-gray-700">Department Description:</label>
                                <textarea
                                    id="departmentDescription"
                                    value={DepartmentDescription}
                                    onChange={(e) => setDepartmentDescription(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                />
                            </div>
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Save</button>
                        </form>
                    </div>
                    </div>
                </>
            )}
        </>
    );
};

export default DeptAddEdit;
