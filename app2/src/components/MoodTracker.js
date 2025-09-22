/*import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const moodMap = { Happy: 5, Excited: 4, Neutral: 3, Sad: 2, Angry: 1 };

function MoodTracker({ username }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchMoodHistory() {
      try {
        const res = await fetch(`http://127.0.0.1:5000/mood_history/${username}`);
        const json = await res.json();
        const today = new Date();
        const lastMonth = new Date();
        lastMonth.setDate(today.getDate() - 30); // last 30 days

      const moodMap = { "happy": 5, "excited": 4, "neutral": 3, "sad": 2, "angry": 1 }; // lowercase keys

      const chartData = json.history
      .filter(item => {
      const moodDate = new Date(item.datetime.split(" ")[0]);
      return moodDate >= lastMonth && moodDate <= today; // only last 30 days
    })
  .map(item => {
    const mood = item.mood?.toLowerCase().trim(); // normalize
    return {
      date: item.datetime.split(" ")[0],
      mood: moodMap[mood] || 3, // use mapped value
    };
  });

console.log("Chart Data (last month):", chartData); // optional debug

        setData(chartData);
      } catch (err) {
        console.error(err);
      }
    }

    fetchMoodHistory();
  }, [username]);

  return (
    <div>
      <h3>Mood Tracker (Last Month)</h3>
      <LineChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis domain={[1, 5]} ticks={[1,2,3,4,5]} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="mood" stroke="#8884d8" />
      </LineChart>
    </div>
  );
}

export default MoodTracker;
*/

import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

// Map moods to numbers
const moodMap = { "happy": 5, "excited": 4, "neutral": 3, "sad": 2, "angry": 1 };

// Month names
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
    <div>
      <h3>Mood Tracker</h3>

      {/* Month selector */}
      <div style={{ marginBottom: "20px" }}>
        <label>Select Month: </label>
        <select 
          value={selectedMonth} 
          onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
        >
          {monthNames.map((name, idx) => (
            <option key={idx} value={idx}>{name}</option>
          ))}
        </select>
      </div>

      <LineChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis domain={[1, 5]} ticks={[1,2,3,4,5]} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="mood" stroke="#8884d8" />
      </LineChart>

      {data.length === 0 && <p>No moods recorded for this month.</p>}
    </div>
  );
}

export default MoodTracker;
