import { Link } from "react-router-dom";
import { Button } from "./";

const PNF404 = () => {
  return (
    <div className="flex flex-col gap-10 justify-center items-center w-screen h-screen bg-slate-900">
      <p className="flex gap-10 items-center relative font-bold text-red-500 text-3xl font-[mono] animate-pulse">
        <div className="h-3 w-3 bg-red-900 rounded-full animate-bounce delay-5000"></div>
        <div className="h-3 w-3 bg-red-900 rounded-full animate-bounce delay-3000"></div>
        <div className="h-3 w-3 bg-red-900 rounded-full animate-bounce delay-1000"></div>
        404 - Page Not Found
        <div className="h-3 w-3 bg-red-900 rounded-full animate-bounce delay-1000"></div>
        <div className="h-3 w-3 bg-red-900 rounded-full animate-bounce delay-3000"></div>
        <div className="h-3 w-3 bg-red-900 rounded-full animate-bounce delay-5000"></div>
      </p>
      <Link to={"/"}>
        <Button type="button" label="Home" variant="secondary" />
      </Link>
    </div>
  );
};

export default PNF404;
