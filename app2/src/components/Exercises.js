import React, { useState, useEffect } from "react";

const exercises = [
  "Stretch for 2 minutes",
  "Write down 1 thing you're grateful for",
  "Listen to calming music"
];

function Exercises() {
  const [phase, setPhase] = useState("Inhale"); // Inhale → Hold → Exhale
  const [count, setCount] = useState(4); // seconds
  const [timerActive, setTimerActive] = useState(false);

  const phases = [
    { name: "Inhale", duration: 5 },
    { name: "Hold", duration: 3 },
    { name: "Exhale", duration: 5 },
  ];

  const [phaseIndex, setPhaseIndex] = useState(0);

  useEffect(() => {
    let interval;
    if (timerActive) {
      interval = setInterval(() => {
        setCount(prev => {
          if (prev === 1) {
            // move to next phase
            const nextIndex = (phaseIndex + 1) % phases.length;
            setPhase(phases[nextIndex].name);
            setPhaseIndex(nextIndex);
            return phases[nextIndex].duration;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timerActive, phaseIndex]);

  const toggleBreathing = () => setTimerActive(prev => !prev);

  // Smooth circle scaling for inhale/exhale/hold
  const scale = phase === "Inhale" ? 1.2 : phase === "Exhale" ? 0.8 : 1;

  return (
    <div style={{ margin: "20px", textAlign: "center" }}>
      <h3>Quick Exercises</h3>
      <ul style={{ textAlign: "left", maxWidth: "400px", margin: "0 auto 30px auto" }}>
        {exercises.map((ex, i) => <li key={i}>{ex}</li>)}
      </ul>

      <div style={{ marginTop: "20px" }}>
        <h4>Guided Breathing Exercise</h4>
        <div style={{ fontSize: "2rem", margin: "20px 0" }}>
          {phase}: {count}s
        </div>

        <button 
          onClick={toggleBreathing} 
          style={{
            padding: "10px 20px",
            fontSize: "1rem",
            backgroundColor: timerActive ? "#f44336" : "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          {timerActive ? "Stop" : "Start"}
        </button>

        <div style={{ 
          marginTop: "30px", 
          height: "150px", 
          width: "150px", 
          borderRadius: "50%", 
          border: "4px solid #8884d8", 
          marginLeft: "auto", 
          marginRight: "auto", 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center",
          fontSize: "1.5rem",
          color: "#8884d8",
          transform: `scale(${scale})`,
          transition: "transform 1s ease-in-out"
        }}>
          {phase}
        </div>
      </div>
    </div>
  );
}

export default Exercises;
