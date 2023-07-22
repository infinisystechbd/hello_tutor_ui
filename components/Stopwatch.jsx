import React, { useEffect, useState } from 'react';

const Stopwatch = () => {
  const [timeRemaining, setTimeRemaining] = useState(180); // Initial time in seconds (2 minutes)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  return (
    <div>
      {formatTime(timeRemaining)}
    </div>
  );
};

export default Stopwatch;
