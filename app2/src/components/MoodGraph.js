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
      .then(data => setHistory(data.history));
  }, [username]);

  const moodMapping = { "happy": 5, "neutral": 3, "sad": 2, "stressed": 1, "heavy-hearted": 0 };

  const data = {
    labels: history.map(h => h.date),
    datasets: [
      {
        label: "Mood Tracker",
        data: history.map(h => moodMapping[h.mood]),
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
