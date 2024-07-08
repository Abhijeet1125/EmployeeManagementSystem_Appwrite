import { useDispatch, useSelector } from 'react-redux';
import { LoginWarning , LoadingComponent } from '../components';
import { useEffect, useState } from 'react';
import departmentService from '../appwrite/departmentCollection';
import { useNavigate } from 'react-router-dom';
import dataLoader from '../store/dataLoader'

const Departments = () => {
    const loggedIn = useSelector((state) => state.auth.loggedIn);
    const dispatch = useDispatch();
    const headers = ['DepartmentName', 'Location', 'DepartmentDescription'];
    const ToDisplay = useSelector((state) => state.dept.departmentsList);
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    


    const [fi , setFi] = useState(false )
    useEffect(() => {
        if (loggedIn) {
            const interval = setInterval(() => {
                dataLoader(dispatch);
                setFi(true)
                if (fi == true) {
                    clearInterval(interval);
                }
            }, 1000);
    
            return () => clearInterval(interval);
        }
    }, [loggedIn, fi ]);
    

    const handleDelete = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this item?");
        if ( confirmed){
            try {
                await departmentService.deleteDepartment({ id });
                setLoader(true);
                await dataLoader(dispatch);
                setLoader ( false)                
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
            { loader && <LoadingComponent/>}
            {loggedIn && loader == false && (
                <div className= "bg-gray-900 text-white">
                    <div className="container mx-auto p-6">
                        <h1 className="text-3xl font-bold mb-6">Departments</h1>
                        <button
                            onClick={() => navAddEdit(null)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                            Add Department
                        </button>
                    </div>
                    <div className="overflow-x-auto shadow-md rounded-lg mx-auto w-full lg:w-4/5">
                        <table className="min-w-full divide-y divide-gray-200 bg-yellow-50 text-brown-900 text-sm">
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
                            <tbody className="divide-y divide-gray-200  bg-yellow-50 ">
                                {ToDisplay &&
                                    ToDisplay.map((e) => (
                                        <tr key={e.id} className="hover:bg-gray-50">
                                            {headers.map((hea, index) => (
                                                <td
                                                    key={index}
                                                    className={`px-6 py-4 text-gray-900 ${
                                                        hea === 'DepartmentDescription'
                                                            ? 'w-1/3 break-words'
                                                            : 'whitespace-nowrap'
                                                    }`}
                                                >
                                                    {e[hea]}
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
export default Departments;
