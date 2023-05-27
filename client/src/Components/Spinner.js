import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Spinner = () => {
    const [count, setCount] = useState(5);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((preValue)=>--preValue)
        }, 1000)
        count === 0 && navigate('/login')
        return ()=>clearInterval(interval)
    },[count, navigate])
  return (
    <div className="hero min-h-screen">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-red-400"></div>
    </div>
  );
};

export default Spinner;
