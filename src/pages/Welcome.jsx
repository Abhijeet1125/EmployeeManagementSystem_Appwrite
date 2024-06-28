import { Outlet, useNavigate } from 'react-router-dom';
import  authService  from '../appwrite/auth';
import { useEffect } from 'react';
import { useSelector ,  useDispatch } from 'react-redux';
import { updateAuthSlice } from "../store/authSlice";



const Welcome = () => {

    const navigate = useNavigate()
    const loggedIn = useSelector((state) => state.auth.loggedIn);
    const dispatch = useDispatch()

    const navToLogin =()=>{  
        if ( loggedIn ){
            navigate ("/Dashboard")
        }         
        else { navigate('/Login')}
    }

    useEffect(() => {
        const checker = async () => {
            const user = await authService.getCurrentUser();
            if ( user ){dispatch(updateAuthSlice(true));}
        };

        checker ();
    }, []);

    return (
        <>      
            <section className="bg-gray-900">
                <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
                    <div className="mx-auto max-w-xl text-center">
                        <h1 className="text-3xl font-extrabold sm:text-5xl text-white">
                            Welcome to ...
                            <strong className="font-extrabold text-yellow-300 sm:block"> Empoloyee Management Portal </strong>
                        </h1>

                        <p className="mt-4 sm:text-xl/relaxed text-white">
                            your comprehensive solution for seamless employee management
                        </p>

                        <div className="mt-8 flex flex-wrap justify-center gap-4">
                            <button
                                className="block w-full rounded bg-red-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
                                onClick={navToLogin}
                            >
                                Get Started
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default Welcome 