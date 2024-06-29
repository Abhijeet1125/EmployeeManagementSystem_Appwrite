import { useEffect, useState } from "react";
import authService from "../appwrite/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateAuthSlice } from "../store/authSlice";


const Login = () => { 
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [error, setError] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async ( ) => { 
        try {
            await authService.login({email , password}) 
            dispatch(updateAuthSlice(true));
            navigate('/Dashboard')
            
        } catch (err) {
            setError (  "wrong credentials")  
            dispatch ( updateAuthSlice(false))
        }
    }

    useEffect ( ()=>{
        const lo = async () => { await authService.logout();}
        lo ()
    } , [])

    return (
        <>
            <div className="min-h-screen bg-gray-900 py-6 flex flex-col justify-center sm:py-12">
                <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                    <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                        <form className="space-y-8">
                            <div className="text-center font-bold md:text-right">
                                Admin Login Form
                            </div>
                            <div>
                                {
                                    (error !=null ) && (
                                        <h2 className="text-red-500 font-medium">{error}</h2>                                    
                                )}
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                                <input type="email" 
                                    id="email"
                                    placeholder="Email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                <input type="password"
                                    id="password"
                                    placeholder="Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <button 
                                    onClick={ (event) => { event.preventDefault() 
                                         handleSubmit()}}
                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login