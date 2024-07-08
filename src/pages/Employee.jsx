import { useDispatch, useSelector } from 'react-redux';
import { LoginWarning , BlueButton } from '../components';
import { useEffect, useState } from 'react';
import  EmployeeService from '../appwrite/EmployeeCollection';
import { useNavigate } from 'react-router-dom';
import dataLoader from '../store/dataLoader'




const Employee = () => {
    const loggedIn = useSelector((state) => state.auth.loggedIn);
    const dispatch = useDispatch();
    const headers = ["FirstName" ,  "LastName","department" ,"Gender", "position"  ,"project" ,"Email" ,"Phone"  ]; //  
    const ToDisplay = useSelector((state) => state.employee.EmployeeList);
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);


    const [fi , setFi ] = useState ( false )
    useEffect(() => {
        if (loggedIn) {            
            const interval = setInterval(() => {
                dataLoader(dispatch)
                setFi (true)
                if ( fi == true ) {
                    clearInterval(interval);
                }
            }, 1200);
    
            return () => clearInterval(interval);
        }
    }, [loggedIn, loader, fi ]);




    const handleDelete = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this item?");
        if ( confirmed){
        try {
            await EmployeeService.deleteEmployee({ id });
            setLoader((e) => !e)
        } catch (error) {
            console.log(error);
        }
        }
    };

    const navAddEdit = (id) => {
        if (id == null) {
            navigate('AddEdit/new');
        } else {
            navigate(`AddEdit/${id}`);
        }
    };

    return (

        <>
            {!loggedIn && <LoginWarning />}
            {loggedIn && (
                <div className='bg-gray-900 text-white ' >
                    <div className="container mx-auto pt-6">
                        <h1 className="text-3xl font-bold mb-6">Employees</h1>
                        <button
                            onClick={() => navAddEdit(null)}
                            className="bg-blue-500 text-white px-4 py-2 m-6 rounded-md hover:bg-blue-600"
                        >
                            Add Employee 
                        </button>
                    </div>
                    <div className="overflow-x-auto shadow-md rounded-lg mx-auto w-full ">
                        <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
                            <thead className="bg-gray-50">
                                <tr>
                                    {headers.map((e, index) => (
                                        <th
                                            key={index}
                                            className="whitespace-nowrap px-6 py-3 text-left text-xs font-medium text-gray-500  tracking-wider"
                                        >
                                            {e}
                                        </th>
                                    ))}
                                    <th className="whitespace-nowrap px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Edit/Delete
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-yellow-50 divide-y divide-gray-200">
                                {ToDisplay &&
                                    ToDisplay.map((e) => (
                                        <tr key={e.id} className="hover:bg-gray-50">
                                            {headers.map((hea, index) => (
                                                <td
                                                    key={index}
                                                    className={'px-6 py-4 text-gray-900 w-1/3 break-words'}
                                                >
                                                {
                                                    (hea=="department")? ((e.department)?( e.department.DepartmentName ) : ("Department Deleted")) : (
                                                        (hea=="position")? ((e.position)?( e.position.PositionName ) : ("Position Deleted")) :(
                                                            (hea=="project")? ((e.project)?( (e.project).map(pro => pro.ProjectName) ) : ("Position Deleted")) :( e[`${hea}`] )
                                                        )
                                                    )
                                                }
                                                </td>
                                            ))}
                                            <td className="whitespace-nowrap px-6 py-4 text-gray-900">
                                                <div className="flex space-x-2">
                                                    <button
                                                        className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                                                        onClick={() => navAddEdit(e.id)}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="inline-block rounded bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-700"
                                                        onClick={() => handleDelete(e.id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </>
    );
};
export default Employee;

