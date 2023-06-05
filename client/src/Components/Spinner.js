import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Spinner = ({path="login"}) => {
  const location = useLocation();
    const [count, setCount] = useState(3);
  const navigate = useNavigate();
  

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((preValue)=>--preValue)
        }, 1000)
        count === 0 && navigate(`/${path}`, {
            state: location.pathname
        })
        return ()=>clearInterval(interval)
    },[count, navigate, location, path ])
  return (
    <div>
      {/* <h1 className="text-3xl hero">redirecting to you in {count} second </h1> */}
      <div className="hero min-h-screen">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-red-400"></div>
      </div>
    </div>
  );
};

export default Spinner;
