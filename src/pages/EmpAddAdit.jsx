import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { LoadingComponent, LoginWarning, PillButton } from '../components';
import EmployeeService from '../appwrite/EmployeeCollection';
import dataLoader from './../store/dataLoader';


const EmpAddEdit = () => {
    const { id } = useParams()
    const loggedIn = useSelector(state => state.auth.loggedIn)
    const departments = useSelector(state => state.dept.departmentsList)
    const prolist = useSelector((state) => state.project.projectList)
    const poslist = useSelector((state) => state.position.PositionList)
    const emplist = useSelector((state) => state.employee.EmployeeList)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [loading , setLoading] = useState ( false);

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

    const validate  = ( ) => { 
        setNO ( null );
        if ( formData.FirstName.trim().length == 0 ){
            setNO ( "First name required");
            return false ; 
        }
        if ( formData.Email.trim().length == 0 ){
            setNO ( "Email required ");
            return false ; 
        }
        if ( formData.Gender .trim().length == 0 ){
            setNO ( "gender required");
            return false 
        }
        if ( formData.Phone.trim().length == 0 ){
            setNO ( "Phone no required ");
            return false ; 
        }
        if ( formData.Address .trim().length == 0 ){
            setNO ( "Address required");
            return false 
        }
        if ( formData.department .trim().length == 0 ){
            setNO ( "department required");
            return false 
        }
        if ( formData.Phone .trim().length != 10 ){
            setNO ( "Enter 10 digit number");
            return false 
        }
        
        return true ; 
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const valid = validate ();
        if ( valid ){
            setLoading ( true);
        const filteredList = selectedpro.filter(item => item !== undefined);
        try {
            if (id === 'new') {
                await EmployeeService.createEmployee({
                    FirstName: formData.FirstName,
                    LastName: formData.LastName,
                    department: formData.department,
                    Gender: formData.Gender,
                    position: formData.position,
                    project: filteredList,
                    Email: formData.Email,
                    Phone: formData.Phone,
                    Address: formData.Address,
                })
            }
            else {
                await EmployeeService.updateEmployee({
                    id: id,
                    FirstName: formData.FirstName,
                    LastName: formData.LastName,
                    department: formData.department,
                    Gender: formData.Gender,
                    position: formData.position,
                    project: filteredList,
                    Email: formData.Email,
                    Phone: formData.Phone,
                    Address: formData.Address,
                })
            }
            await dataLoader ( dispatch)
            setLoading ( false)
            navigate('/Employee')
        } catch (error) {
            console.log(error)
            setLoading ( false)
            setNO("Sorry,Please try again")
        }
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
            }
        }
    }, []);

    return (
        <>
            {!loggedIn && <LoginWarning />}
            { loading && <LoadingComponent/>}
            {loggedIn && loading  == false &&  (
                <>
                    
                    <div className="bg-gray-900  p-6 min-h-screen flex items-center justify-center">
                        <div className="w-full max-w-2xl bg-gray-100 rounded-lg p-3">
                        {no && <p className="text-red-500 mt-4">{no}</p>}
                            <h2 className='text-amber-700 font-bold p-6 '>Employee Form</h2>
                            <button onClick={ ()=> navigate('/Employee')} className="bg-blue-500  mb-4 text-white px-4 py-2 rounded-md hover:bg-blue-600"> Back </button>
                            <form className="space-y-4" onSubmit={handleSubmit}>
                                <div className="flex space-x-4">
                                    <div className="w-1/2">
                                        <label className="block text-gray-700">First Name</label>
                                        <input
                                            type="text"
                                            name="FirstName"
                                            value={formData.FirstName}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                        />
                                    </div>
                                    <div className="w-1/2">
                                        <label className="block text-gray-700">Last Name</label>
                                        <input
                                            type="text"
                                            name="LastName"
                                            value={formData.LastName}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-gray-700">Department</label>
                                    <select
                                        name="department"
                                        value={formData.department}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
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
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
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
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
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
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    >
                                        <option value="">Select Project</option>
                                        {projects.map(pro => (
                                            <option key={pro.id} value={pro.id}>{pro.ProjectName}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="bg-gray-100 flex flex-col items-center justify-center ">
                                    <div id="pill-container" className="flex flex-wrap space-x-2">
                                        {prolist
                                            .filter(proj => selectedpro.includes(proj.id))
                                            .map((sepro) => (
                                                <div key={sepro.id} className="mb-4" onClick={() => (handleDeletePill(sepro.id))} >
                                                    <PillButton value={sepro.ProjectName} />
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>


                                <div>
                                    <label className="block text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        name="Email"
                                        value={formData.Email}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700">Phone</label>
                                    <input
                                        type="tel"
                                        name="Phone"
                                        value={formData.Phone}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700">Address</label>
                                    <textarea
                                        name="Address"
                                        value={formData.Address}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                        rows="4"
                                    />
                                </div>

                                <button
                                    onClick={handleSubmit}
                                    className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default EmpAddEdit;