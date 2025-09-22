import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const moodMap = { Happy: 5, Excited: 4, Neutral: 3, Sad: 2, Angry: 1 };

function MoodTracker({ username }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchMoodHistory() {
      try {
        const res = await fetch(`http://127.0.0.1:5000/mood_history/${username}`);
        const json = await res.json();
        const chartData = json.history.map(item => ({
          date: item.datetime.split(" ")[0],
          mood: moodMap[item.mood] || 3,
        }));
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


/*import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

function MoodTracker({ username }) {
  const [mood, setMood] = useState("");
  const [history, setHistory] = useState([]);

  // Submit mood
  const submitMood = async () => {
    if (!mood) return alert("Please select a mood!");

    await fetch("http://127.0.0.1:5000/submit_mood", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, mood }),
    });
    setMood("");
    fetchHistory(); // refresh history
  };

  // Fetch mood history
  const fetchHistory = async () => {
    const res = await fetch(`http://127.0.0.1:5000/mood_history/${username}`);
    const data = await res.json();
    setHistory(data.history);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  // Prepare data for chart
  const chartData = {
    labels: history.map(h => h.datetime),
    datasets: [
      {
        label: "Mood over time",
        data: history.map(h => {
          // Convert moods to numeric values for chart
          switch (h.mood.toLowerCase()) {
            case "happy": return 5;
            case "excited": return 4;
            case "neutral": return 3;
            case "sad": return 2;
            case "angry": return 1;
            default: return 3;
          }
        }),
        fill: false,
        borderColor: "blue",
        tension: 0.1
      }
    ]
  };

  return (
    <div style={{ margin: "20px" }}>
      <h3>How are you feeling today?</h3>
      <select value={mood} onChange={e => setMood(e.target.value)}>
        <option value="">Select mood</option>
        <option value="Happy">Happy</option>
        <option value="Excited">Excited</option>
        <option value="Neutral">Neutral</option>
        <option value="Sad">Sad</option>
        <option value="Angry">Angry</option>
      </select>
      <button onClick={submitMood} style={{ marginLeft: "10px" }}>Submit</button>

      {history.length > 0 && (
        <div style={{ marginTop: "30px" }}>
          <h3>Your Mood Tracker</h3>
          <Line data={chartData} />
        </div>
      )}
    </div>
  );
}

export default MoodTracker;
*/