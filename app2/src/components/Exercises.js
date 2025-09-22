import React from "react";

const exercises = [
  "Take 5 deep breaths",
  "Stretch for 2 minutes",
  "Write down 1 thing you're grateful for",
  "Listen to calming music"
];

function Exercises() {
  return (
    <div style={{ margin: "20px 0" }}>
      <h3>Quick Exercises</h3>
      <ul>
        {exercises.map((ex,i) => <li key={i}>{ex}</li>)}
      </ul>
    </div>
  );
}

export default Exercises;
