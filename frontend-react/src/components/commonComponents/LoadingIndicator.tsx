import "../../App.css";

const LoadingIndicator = () => {
  return (
    <div className="flex flex-row gap-2 justify-center items-center relative">
      <div className="loading-indicator animate-spin delay-2000"></div>
      <h1 className="tracking-[10px] font-bold text-xl text-amber-500">Loading</h1>
      <div className="loading-indicator animate-spin delay-2000"></div>
    </div>
  );
};

export default LoadingIndicator;
