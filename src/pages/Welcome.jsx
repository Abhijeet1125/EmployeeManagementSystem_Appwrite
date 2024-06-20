import { Outlet, useNavigate } from 'react-router-dom';
import  authService  from '../appwrite/auth';
import { useEffect } from 'react';


const Welcome = () => {

    const navigate = useNavigate()

    const navToLogin = async ()=>{       
        navigate('/Login')
    }

    useEffect(() => {
        const logout = async () => {
            await authService.logout();
        };

        logout();
    }, []);

    return (
        <>      
            <section className="bg-gray-200">
                <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
                    <div className="mx-auto max-w-xl text-center">
                        <h1 className="text-3xl font-extrabold sm:text-5xl">
                            Welcome to ...
                            <strong className="font-extrabold text-red-700 sm:block"> Empoloyee Management Portal </strong>
                        </h1>

                        <p className="mt-4 sm:text-xl/relaxed">
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