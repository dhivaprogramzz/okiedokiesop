import React, { useState } from "react";

const moods = [
  { name: "Relax", type: "relax", img: "https://i.ibb.co/your-uploaded-image.png" },
  { name: "Happy", type: "happy", img: "https://i.ibb.co/7yqkM8R/happy.png" },
  { name: "Sad", type: "sad", img: "https://i.ibb.co/jLtkXWZ/sad.png" },
  { name: "Focus", type: "focus", img: "https://i.ibb.co/6WZP7PZ/focus.png" },
  { name: "Workout", type: "workout", img: "https://i.ibb.co/92rS3yz/workout.png" },
  { name: "Sleep", type: "sleep", img: "https://i.ibb.co/8NqfHJc/sleep.png" },
  { name: "Stress", type: "stress", img: "https://i.ibb.co/QXxRx3C/stress.png" },
  { name: "Energy", type: "energy", img: "https://i.ibb.co/VjWNv6S/energy.png" },
  { name: "Romantic", type: "romantic", img: "https://i.ibb.co/7tL5k1B/romantic.png" },
  { name: "General", type: "general", img: "https://i.ibb.co/7g9Zt0q/general.png" } // general option
];

function Spotify() {
  const [link, setLink] = useState("");

  const handleClick = async (type) => {
    if (type === "general") {
      window.open("https://open.spotify.com", "_blank");
      return;
    }

    try {
      const res = await fetch(`http://127.0.0.1:5000/spotify/${type}`);
      const data = await res.json();
      setLink(data.link);
    } catch (err) {
      console.error("Failed to fetch Spotify playlist:", err);
      alert("Failed to load playlist");
    }
  };

  return (
    <div style={{ margin: "20px 0" }}>
      <h3>Spotify Playlists by Mood</h3>
      <div style={{ display: "flex", overflowX: "auto", padding: "10px 0" }}>
        {moods.map((mood) => (
          <div 
            key={mood.type} 
            style={{ marginRight: "15px", textAlign: "center", cursor: "pointer" }}
            onClick={() => handleClick(mood.type)}
          >
            <img 
              src={mood.img} 
              alt={mood.name} 
              style={{ width: "80px", height: "80px", borderRadius: "10px", objectFit: "cover", border: "2px solid #8884d8" }}
            />
            <div style={{ marginTop: "5px" }}>{mood.name}</div>
          </div>
        ))}
      </div>

      {link && (
        <iframe 
          src={link} 
          width="100%" 
          height="80" 
          frameBorder="0" 
          allow="encrypted-media"
          style={{ marginTop: "20px" }}
        ></iframe>
      )}
    </div>
  );
}

export default Spotify;
