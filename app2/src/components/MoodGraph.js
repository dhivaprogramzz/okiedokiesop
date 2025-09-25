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
import "./Mood.css";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function MoodGraph() {
  const [history, setHistory] = useState([]);
  const username = localStorage.getItem("username");

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/mood_history/${username}`)
      .then(res => res.json())
      .then(data => setHistory(data.history));
  }, [username]);

  const moodMapping = { 
    "happy": 5, "excited": 4, "neutral": 3, 
    "sad": 2, "angry": 1, "stressed": 1, "heavy-hearted": 0 
  };

  const today = new Date();
  const lastMonth = new Date();
  lastMonth.setDate(today.getDate() - 30);

  const filteredHistory = history.filter(h => {
    const d = new Date(h.datetime.split(" ")[0]);
    return d >= lastMonth && d <= today;
  });

  const data = {
    labels: filteredHistory.map(h => h.datetime.split(" ")[0]),
    datasets: [
      {
        label: "Mood Tracker",
        data: filteredHistory.map(h => moodMapping[h.mood?.toLowerCase().trim()] ?? 3),
        fill: false,
        borderColor: "#9575cd",
        backgroundColor: "#d1c4e9",
        tension: 0.4,
        pointRadius: 6,
        pointBackgroundColor: "#7e57c2",
      }
    ]
  };

  const options = {
    scales: {
      x: {
        ticks: { color: "#fff", font: { weight: "500" } }
      },
      y: {
        min: 0,
        max: 5,
        ticks: { stepSize: 1, color: "#fff", font: { weight: "600" } }
      }
    },
    plugins: {
      legend: { labels: { color: "white", font: { weight: "600" } } },
      tooltip: { bodyColor: "#333", backgroundColor: "#fff" }
    }
  };

  return (
    <div className="mood-container">
      <h3 className="mood-title">📈 Your Mood (Last 30 Days)</h3>
      {filteredHistory.length === 0 
        ? <p style={{ textAlign: "center", color: "#fff" }}>No moods yet.</p> 
        : <Line data={data} options={options} />}
    </div>
  );
}

export default MoodGraph;

/*import React, { useEffect, useState } from "react";
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
*/
/*import React, { useEffect, useState } from "react";
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
import "./Mood.css";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function MoodGraph() {
  const [history, setHistory] = useState([]);
  const username = localStorage.getItem("username");

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/mood_history/${username}`)
      .then(res => res.json())
      .then(data => setHistory(data.history));
  }, [username]);

  const moodMapping = { "happy": 5, "neutral": 3, "sad": 2, "stressed": 1, "heavy-hearted": 0, "excited": 4, "angry": 1 };

  const today = new Date();
  const lastMonth = new Date();
  lastMonth.setDate(today.getDate() - 30);

  const filteredHistory = history.filter(h => {
    const d = new Date(h.datetime.split(" ")[0]);
    return d >= lastMonth && d <= today;
  });

  const data = {
    labels: filteredHistory.map(h => h.datetime.split(" ")[0]),
    datasets: [
      {
        label: "Mood Tracker",
        data: filteredHistory.map(h => moodMapping[h.mood?.toLowerCase().trim()] ?? 3),
        fill: false,
        borderColor: "#7e57c2",
        backgroundColor: "#d1c4e9",
        tension: 0.4,
        pointRadius: 5,
        pointBackgroundColor: "#9575cd",
      }
    ]
  };

  const options = {
    scales: {
      y: { min: 0, max: 5, ticks: { stepSize: 1 } }
    },
    plugins: {
      legend: { labels: { color: "white" } }
    }
  };

  return (
    <div className="mood-container">
      <h3 className="mood-title">📈 Your Mood (Last 30 Days)</h3>
      {filteredHistory.length === 0 
        ? <p style={{ textAlign: "center", color: "#fff" }}>No moods yet.</p> 
        : <Line data={data} options={options} />}
    </div>
  );
}

export default MoodGraph;
*/