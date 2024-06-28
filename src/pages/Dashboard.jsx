import { useDispatch, useSelector } from 'react-redux'
import { LoginWarning } from '../components'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ColorButton } from './../components'
import dataLoader from '../store/dataLoader'

const Dashboard = () => {

    const loggedIn = useSelector((state) => state.auth.loggedIn);
    const loadedOnce  = useSelector((state) => state.auth.dataLoaded);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const departmentsCount = useSelector((state) => (state.dept.departmentsList ? state.dept.departmentsList.length : 0));
    const employeeCount = useSelector((state) => (state.employee.EmployeeList ? state.employee.EmployeeList.length : 0));
    const positionCount = useSelector((state) => (state.position.PositionList ? state.position.PositionList.length : 0));
    const completedProjects = useSelector(((state) => state.project.completed))
    const progressProjects = useSelector(((state) => state.project.inprogress))
    

    const [fi , setFi] = useState(false )
    useEffect(() => {
        if (loggedIn) {
            const interval = setInterval(() => {
                dataLoader(dispatch);
                setFi(true)
                if (fi == true ) {
                    clearInterval(interval);
                }                
            }, 1200);
            return () => clearInterval(interval);
        }
    }, [loggedIn , fi  ]);

    return (
        <>
            {(loggedIn==false)&& (<LoginWarning/>)}
            {(loggedIn ) && (
            <section className="bg-gray-900 text-white">
                <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
                    <div className="mx-auto max-w-lg text-center">
                        <h2 className="text-3xl font-bold sm:text-4xl">Manage Smarter, Not Harder</h2>

                        <p className="mt-4 text-gray-300">
                            Efficient solutions for effective employee management.
                        </p>
                    </div>

                    <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 ">


                        <div className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10">
                            <div className="flex justify-center items-center flex-col h-full">
                                <dd className="text-4xl font-extrabold text-white md:text-5xl">{employeeCount}</dd>
                                <h2 className="mt-4 text-xl font-bold text-white">Employees</h2>
                                <div className="mt-4 flex flex-col items-center space-y-4">
                                    <ColorButton value={"Get Complete List"} navi={"/Employee"} />
                                    <ColorButton value={"Add new Employee"} navi={"/Employee/AddEdit/new"} />
                                </div>
                            </div>
                        </div>


                        <div className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10">
                            <div className="flex justify-center items-center flex-col h-full">
                                <dd className="text-4xl font-extrabold text-white md:text-5xl">{departmentsCount}</dd>
                                <h2 className="mt-4 text-xl font-bold text-white">Departments</h2>
                                <div className="mt-4 flex flex-col items-center space-y-4" >
                                    <ColorButton value={"Get Complete List"} navi={"/Department"} />
                                    <ColorButton value={"Add new Department"} navi={"/Department/AddEdit/new"} />
                                </div>
                            </div>
                        </div>


                        <div className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10">
                            <div className="flex justify-center items-center flex-col h-full">
                                <dd className="text-4xl font-extrabold text-white md:text-5xl">{positionCount}</dd>
                                <h2 className="mt-4 text-xl font-bold text-white">Positions</h2>
                                <div className="mt-4 flex flex-col items-center space-y-4" >
                                    <ColorButton value={"Get Complete List"} navi={"/Position"} />
                                    <ColorButton value={"Add new Position"} navi={"/Position/AddEdit/new"} />
                                </div>
                            </div>
                        </div>



                        <div className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10">
                            <div className="flex flex-col items-center h-full">
                                <div className="flex justify-between items-center w-full mb-4">
                                    <div className="text-center">
                                        <dd className="text-4xl font-extrabold text-white md:text-5xl">{completedProjects}</dd>
                                        <p className="text-white">Completed</p>
                                    </div>
                                    <div className="text-center">
                                        <dd className="text-4xl font-extrabold text-white md:text-5xl">{progressProjects}</dd>
                                        <p className="text-white">In Progress</p>
                                    </div>
                                </div>
                                <h2 className="mt-4 text-xl font-bold text-white">Projects</h2>
                                <div className="mt-4 flex flex-col items-center space-y-4">
                                    <ColorButton value={"Get Complete List"} navi={"/Project"} />
                                    <ColorButton value={"Add new Project"} navi={"/Project/AddEdit/new"} />
                                </div>
                            </div>
                        </div>

                        <div className='col-span-1 md:col-span-2 lg:col-span-2 block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10'>

                            <h1>Quick Links</h1>

                            <p>TO DO</p>

                        </div>

                    </div>

                </div>
            </section>
            )}
        </>
    )
}
export default Dashboard