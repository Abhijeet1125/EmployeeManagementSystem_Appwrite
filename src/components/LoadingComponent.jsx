const LoadingComponent = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <p className="text-xl font-semibold text-gray-700 mb-4"> Please wait...</p>
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default LoadingComponent;
