const LoginWarning = () => {
    return (
        <>
            <div role="alert" className="rounded border-s-4 border-red-500 bg-red-50 p-4">
                <strong className="block font-medium text-red-800"> Please Login first </strong>
                <p className="mt-2 text-sm text-red-700">
                    We need to authenticate before showing the employee details.
                </p>
            </div>
        </>
    )
}
export default LoginWarning