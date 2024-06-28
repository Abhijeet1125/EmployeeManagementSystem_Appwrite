import { useNavigate } from 'react-router-dom';

const ColorButton = ({value , navi }) => {
    const navigate = useNavigate();
    return (
        <>
            <button
                className="group inline-block rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75"  
                onClick={()=> (navigate(`${navi}`))}
            >
                <span
                    className="block rounded-full bg-gray-900 px-8 py-3 text-sm text-white font-medium group-hover:bg-transparent"
                >
                    {value}
                </span>
            </button >
        </>
    )
}
export default ColorButton