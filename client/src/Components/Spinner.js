import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Spinner = () => {
    const location = useLocation()
    const [count, setCount] = useState(5);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((preValue)=>--preValue)
        }, 1000)
        count === 0 && navigate('/login', {
            state: location.pathname
        })
        return ()=>clearInterval(interval)
    },[count, navigate, location])
  return (
    <div>
      <div className="hero min-h-screen">
        <h1 className="text-3xl">redirecting to you in {count} second </h1>
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-red-400"></div>
      </div>
    </div>
  );
};

export default Spinner;
