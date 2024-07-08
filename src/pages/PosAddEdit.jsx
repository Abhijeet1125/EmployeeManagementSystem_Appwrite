import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { LoginWarning , LoadingComponent } from '../components';
import PositionService from '../appwrite/positionCollection'
import PillButton from '../components/PillButton';
import dataLoader from '../store/dataLoader';

const PosAddEdit = () => {
    const { id } = useParams()
    const loggedIn = useSelector(state => state.auth.loggedIn)
    const departments = useSelector(state => state.dept.departmentsList)
    const poslist = useSelector((state) => state.position.PositionList);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [positionName, setPositionName] = useState('');
    const [selectedDepartments, setSelectedDepartments] = useState([]);
    const [department, setDepartment] = useState("");
    const [positionDescription, setPositionDescription] = useState('');
    const [no, setNO] = useState(null)
    const [loading , setLoading ] = useState ( false );

    useEffect(() => {
        if (id != 'new' && poslist.length > 0) {
            const posi = poslist.find(pos => pos['id'] === id)
            if (posi) {
                const departmentIds = posi.department.map(dept => dept['$id']);
                setSelectedDepartments(departmentIds);
                setPositionName(posi.PositionName)
                setPositionDescription(posi.PositionDescription)
            }
        }
    }, []);


    const validate = ()=>{
        setPositionName ( e => e.trim());
        setNO(null)
        if ( positionName.trim().length == 0 ){
            setNO (e => "Position Name is required");
            return false
        }
        return true ; 
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const valida = validate ( );
        if ( valida){
            setLoading ( true );
        try {
            if (id === 'new') {
                await PositionService.createPosition({
                    PositionName: positionName,
                    department: selectedDepartments,
                    PositionDescription: positionDescription,
                })
            }
            else {
                await PositionService.updatePosition({
                    id,
                    PositionName: positionName,
                    department: selectedDepartments,
                    PositionDescription: positionDescription,
                })
            }
            await dataLoader ( dispatch )
            setLoading (false);
            navigate('/Position')
        } catch (error) {
            console.log(error)
            setLoading ( false);
            setNO("Sorry,Please try again")
        }
    }
    };

    const handleDepartmentChange = (e) => {
        setSelectedDepartments(prev => [...prev, e]);
        setDepartment("");
    };

    const handleDelete = (departmentid ) => {
        
        setSelectedDepartments(selectedDepartments.filter(id => id !== departmentid));
        
    };

    return (
        <>
            {!loggedIn && <LoginWarning />}
            { loading && <LoadingComponent/> }
            {loggedIn && loading == false && (
                <div className= "bg-gray-900 text-black min-h-screen pt-8">
                    {no && <p className="text-red-500 mt-4">{no}</p>}
                    <div className="max-w-lg mx-auto p-6 bg-gray-100 rounded-lg shadow-md mt-10">
                        <h2 className="text-2xl font-bold mb-6 text-center text-black ">Position Form</h2>
                        <button onClick={ ()=> navigate('/Position')} className="bg-blue-500  mb-4 text-white px-4 py-2 rounded-md hover:bg-blue-600"> Back </button>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="positionName" className="block text-sm font-medium text-gray-700">Position Name:</label>
                                <input
                                    type="text"
                                    id="positionName"
                                    name="positionName"
                                    value={positionName}
                                    onChange={(e) => setPositionName(e.target.value)}                                
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department:</label>
                                <select
                                    id="department"
                                    name="department"
                                    value={department}
                                    onChange={(e) => handleDepartmentChange(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                    <option value={""}>
                                        {"select department"}
                                    </option>
                                    {departments.map((dept) => (
                                        <option key={dept.id} value={dept.id}>
                                            {dept.DepartmentName}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="bg-gray-100 flex flex-col items-center justify-center ">
                                <div id="pill-container" className="flex flex-wrap space-x-2">
                                    {departments
                                        .filter(department => selectedDepartments.includes(department.id))
                                        .map((department) => (
                                            <div key={department.id} className="mb-4" onClick={()=>handleDelete(department.id)}>
                                                <PillButton value={department.DepartmentName} />
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>


                            <div className="mb-4">
                                <label htmlFor="positionDescription" className="block text-sm font-medium text-gray-700">Position Description:</label>
                                <textarea
                                    id="positionDescription"
                                    name="positionDescription"
                                    value={positionDescription}
                                    onChange={(e) => setPositionDescription(e.target.value)}
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
                </div>
            )}
        </>
    );
};

export default PosAddEdit;
