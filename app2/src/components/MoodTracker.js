
import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import "./Mood.css";

const moodMap = { "happy": 5, "excited": 4, "neutral": 3, "sad": 2, "angry": 1 };

const monthNames = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

function MoodTracker({ username }) {
  const [data, setData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  useEffect(() => {
    async function fetchMoodHistory() {
      try {
        const res = await fetch(`http://127.0.0.1:5000/mood_history/${username}`);
        const json = await res.json();

        const chartData = json.history
          .filter(item => {
            const moodDate = new Date(item.datetime);
            return moodDate.getMonth() === selectedMonth;
          })
          .map(item => {
            const mood = item.mood?.toLowerCase().trim();
            return {
              date: item.datetime.split(" ")[0],
              mood: moodMap[mood] ?? 3,
            };
          });

        setData(chartData);
      } catch (err) {
        console.error(err);
      }
    }
    fetchMoodHistory();
  }, [username, selectedMonth]);

  return (
    <div className="mood-container">
      <h3 className="mood-title">📊 Mood Tracker</h3>

      <div className="mood-dropdown">
        <label>Select Month:</label>
        <select 
          value={selectedMonth} 
          onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
        >
          {monthNames.map((name, idx) => (
            <option key={idx} value={idx}>{name}</option>
          ))}
        </select>
      </div>

      <div className="mood-chart">
        <LineChart width={500} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" stroke="#fff" />
          <YAxis domain={[1, 5]} ticks={[1,2,3,4,5]} stroke="#fff" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="mood" stroke="#9575cd" strokeWidth={3} dot={{ r: 6 }} />
        </LineChart>
      </div>

      {data.length === 0 && <p style={{ textAlign: "center", color: "#fff" }}>No moods recorded for this month.</p>}
    </div>
  );
}

export default MoodTracker;

/*
import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import "./Mood.css";

const moodMap = { "happy": 5, "excited": 4, "neutral": 3, "sad": 2, "angry": 1 };

const monthNames = ["January","February","March","April","May","June",
                    "July","August","September","October","November","December"];

function MoodTracker({ username }) {
  const [data, setData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  useEffect(() => {
    async function fetchMoodHistory() {
      try {
        const res = await fetch(`http://127.0.0.1:5000/mood_history/${username}`);
        const json = await res.json();

        const chartData = json.history
          .filter(item => {
            const moodDate = new Date(item.datetime);
            return moodDate.getMonth() === selectedMonth;
          })
          .map(item => {
            const mood = item.mood?.toLowerCase().trim();
            return {
              date: item.datetime.split(" ")[0],
              mood: moodMap[mood] ?? 3,
            };
          });

        setData(chartData);
      } catch (err) {
        console.error(err);
      }
    }
    fetchMoodHistory();
  }, [username, selectedMonth]);

  return (
    <div className="mood-container">
      <h3 className="mood-title">📊 Mood Tracker</h3>

      <div className="mood-dropdown">
        <label>Select Month:</label>
        <select 
          value={selectedMonth} 
          onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
        >
          {monthNames.map((name, idx) => (
            <option key={idx} value={idx}>{name}</option>
          ))}
        </select>
      </div>

      <div className="mood-chart">
        <LineChart width={500} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={[1, 5]} ticks={[1,2,3,4,5]} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="mood" stroke="#9575cd" strokeWidth={3} dot={{ r: 5 }} />
        </LineChart>
      </div>

      {data.length === 0 && <p style={{ textAlign: "center", color: "#fff" }}>No moods recorded for this month.</p>}
    </div>
  );
}

export default MoodTracker;
*/