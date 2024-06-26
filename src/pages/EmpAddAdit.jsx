import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { LoginWarning, PillButton } from '../components';
import EmployeeService from '../appwrite/EmployeeCollection';

const EmpAddEdit = () => {
    const { id } = useParams()
    const loggedIn = useSelector(state => state.auth.loggedIn)
    const departments = useSelector(state => state.dept.departmentsList)
    const prolist = useSelector((state) => state.project.projectList)
    const poslist = useSelector((state) => state.position.PositionList)
    const emplist = useSelector((state) => state.employee.EmployeeList)
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        FirstName: '',
        LastName: '',
        department: '',
        Gender: '',
        position: '',
        project: '',
        Email: '',
        Phone: '',
        Address: '',
    });
    const [no, setNO] = useState(null)


    useEffect(() => { console.log(formData) }, [formData])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (id === 'new') {
                await EmployeeService.createEmployee({
                    FirstName: formData.FirstName,
                    LastName: formData.LastName,
                    department: formData.department,
                    Gender: formData.Gender,
                    position: formData.position,
                    project: selectedpro,
                    Email: formData.Email,
                    Phone: formData.Phone,
                    Address: formData.Address,
                })
            }
            else {
                await EmployeeService.updateEmployee({
                    id,
                    FirstName: formData.FirstName,
                    LastName: formData.LastName,
                    department: formData.department,
                    Gender: formData.Gender,
                    position: formData.position,
                    project: selectedpro,
                    Email: formData.Email,
                    Phone: formData.Phone,
                    Address: formData.Address,
                })
            }
            navigate('/Employee')
        } catch (error) {
            console.log(error)
            setNO("Sorry,Please try again")
        }
    };

    const [positions, setPositions] = useState([]);
    const [projects, setProjects] = useState([]);
    const [selectedpro, setSelectedpro] = useState([]);

    useEffect(() => {
        if (formData.department) {
            setPositions(poslist.filter(pos => pos.department && pos.department.some(dept => dept['$id'] === formData.department)));
            setProjects(prolist.filter(pro => ((pro.department) && pro.department['$id'] == formData.department)));
        } else {
            setPositions([]);
            setProjects([]);
        }
        setSelectedpro([]);
    }, [formData.department]);

    useEffect(() => {
        if (formData.project !== '' && !selectedpro.includes(formData.project)) {
            setSelectedpro([...selectedpro, formData.project]);
        }
        setFormData({ ...formData, project: '' });
    }, [formData.project]);


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleDeletePill = (id) => {
        if (id) {
            setSelectedpro(selectedpro.filter(e => e !== id));
        }
    };


    useEffect(() => {
        if (id !== 'new' && emplist.length > 0) {
            const employee = emplist.find(emp => emp.id === id);
            if (employee) {
                const list = employee.project.map(project => project['$id'])
                setFormData({
                    FirstName: employee.FirstName,
                    LastName: employee.LastName,
                    Address: employee.Address,
                    Gender: employee.Gender,
                    Email: employee.Email,
                    Phone: employee.Phone,
                    department: (employee.department) ? employee.department['$id'] : null,
                    position: (employee.position) ? employee.position['$id'] : null,
                })
                setSelectedpro([...list])
                console.log(selectedpro, " selected pro h bro ")
            }
        }
    }, []);

    return (
        <>
            {!loggedIn && <LoginWarning />}
            {loggedIn && (
                <>
                    {no && <p className="text-red-500 mt-4">{no}</p>}
                    <form className="space-y-4">
                        <div className="flex space-x-4">
                            <div className="w-1/2">
                                <label className="block text-gray-700">First Name</label>
                                <input
                                    type="text"
                                    name="FirstName"
                                    value={formData.FirstName}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                />
                            </div>
                            <div className="w-1/2">
                                <label className="block text-gray-700">Last Name</label>
                                <input
                                    type="text"
                                    name="LastName"
                                    value={formData.LastName}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-700">Department</label>
                            <select
                                name="department"
                                value={formData.department}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                            >
                                <option value="">Select Department</option>
                                {departments.map(dept => (
                                    <option key={dept.id} value={dept.id}>{dept.DepartmentName}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-gray-700">Gender</label>
                            <select
                                name="Gender"
                                value={formData.Gender}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-gray-700">Position</label>
                            <select
                                name="position"
                                value={formData.position}
                                onChange={handleChange}
                                disabled={!formData.department}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                            >
                                <option value="">Select Position</option>
                                {positions.map(pos => (
                                    <option key={pos.id} value={pos.id}>{pos.PositionName}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-gray-700">Project</label>
                            <select
                                name="project"
                                value={formData.project}
                                onChange={handleChange}
                                disabled={!formData.department}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                            >
                                <option value="">Select Project</option>
                                {projects.map(pro => (
                                    <option key={pro.id} value={pro.id}>{pro.ProjectName}</option>
                                ))}
                            </select>
                        </div>

                        <div className="bg-gray-100 flex flex-col items-center justify-center p-4 rounded-md">
                            <div id="pill-container" className="flex flex-wrap space-x-2">
                                {prolist
                                    .filter(proj => selectedpro.includes(proj.id))
                                    .map(sepro => (
                                        <div key={sepro.id} className="mb-2">
                                            <button
                                                type="button"
                                                onClick={() => handleDeletePill(sepro.id)}
                                                className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm rounded-full bg-white text-sm leading-4 font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                                            >
                                                {sepro.ProjectName}
                                            </button>
                                        </div>
                                    ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-700">Email</label>
                            <input
                                type="email"
                                name="Email"
                                value={formData.Email}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700">Phone</label>
                            <input
                                type="tel"
                                name="Phone"
                                value={formData.Phone}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700">Address</label>
                            <textarea
                                name="Address"
                                value={formData.Address}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                rows="4"
                            />
                        </div>

                        <button
                            type="submit"
                            className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        >
                            Submit
                        </button>
                    </form>

                </>
            )}
        </>
    );
};

export default EmpAddEdit;
