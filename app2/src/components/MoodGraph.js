import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function MoodGraph() {
  const [history, setHistory] = useState([]);
  const username = localStorage.getItem("username");

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/mood_history/${username}`)
      .then(res => res.json())
      .then(data => 
        {
          console.log("Backend mood history:", data.history);  // 👀 check this
          setHistory(data.history)
  });
  }, [username]);

  /*const moodMapping = { "happy": 5, "neutral": 3, "sad": 2, "stressed": 1, "heavy-hearted": 0 };

  const data = {
  labels: history.map(h => h.datetime),
  datasets: [
    {
      label: "Mood Tracker",
      data: history.map(h => {
        const mood = h.mood?.toLowerCase().trim(); 
        return moodMapping[mood] ;             
      }),
      fill: false,
      borderColor: "blue",
      tension: 0.3
    }
  ]
};
*/
// Mapping moods to numbers (all lowercase)
const moodMapping = { "happy": 5, "neutral": 3, "sad": 2, "stressed": 1, "heavy-hearted": 0, "excited": 4, "angry": 1 };

const today = new Date();
const lastMonth = new Date();
lastMonth.setDate(today.getDate() - 30);

const data = {
  labels: history
    .filter(h => {
      const d = new Date(h.datetime.split(" ")[0]);
      return d >= lastMonth && d <= today;  // only last 30 days
    })
    .map(h => h.datetime.split(" ")[0]),

  datasets: [
    {
      label: "Mood Tracker",
      data: history
        .filter(h => {
          const d = new Date(h.datetime.split(" ")[0]);
          return d >= lastMonth && d <= today;
        })
        .map(h => {
          const mood = h.mood?.toLowerCase().trim();
          return moodMapping[mood] ?? 3;  // default to 3 if not found
        }),
      fill: false,
      borderColor: "blue",
      tension: 0.3
    }
  ]
};


  const options = {
    scales: {
      y: {
        min: 0,
        max: 5,
        ticks: { stepSize: 1 }
      }
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Your Mood Tracker</h3>
      {history.length === 0 ? <p>No moods yet.</p> : <Line data={data} options={options} />}
    </div>
  );
}

export default MoodGraph;
