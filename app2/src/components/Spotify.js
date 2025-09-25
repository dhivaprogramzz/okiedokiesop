import React, { useState } from "react";

// Import local images
import relaxImg from "../assets/images/relax.jpeg";
import happyImg from "../assets/images/happy.jpeg";
import sadImg from "../assets/images/sad.jpeg";
import focusImg from "../assets/images/focus.jpg";
import workoutImg from "../assets/images/workout.jpg";
import sleepImg from "../assets/images/sleep.jpeg";
import stressImg from "../assets/images/stress.jpeg";
import energyImg from "../assets/images/energy.jpg";
import romanticImg from "../assets/images/romantic.jpg";
import musicImg from "../assets/images/music.jpg";

const moods = [
  { name: "Relax", type: "relax", img: relaxImg, link: "https://open.spotify.com/playlist/37i9dQZF1DXdPec7aLTmlC" },
  { name: "Happy", type: "happy", img: happyImg, link: "https://open.spotify.com/playlist/37i9dQZF1DX7qK8ma5wgG1" },
  { name: "Sad", type: "sad", img: sadImg, link: "https://open.spotify.com/playlist/37i9dQZF1DX0BcQWzuB7ZO" },
  { name: "Focus", type: "focus", img: focusImg, link: "https://open.spotify.com/playlist/37i9dQZF1DX4sWSpwq3LiO" },
  { name: "Workout", type: "workout", img: workoutImg, link: "https://open.spotify.com/playlist/37i9dQZF1DX70RN3TfWWJh" },
  { name: "Sleep", type: "sleep", img: sleepImg, link: "https://open.spotify.com/playlist/37i9dQZF1DX3Ogo9pFvBkY" },
  { name: "Stress", type: "stress", img: stressImg, link: "https://open.spotify.com/playlist/37i9dQZF1DX3PIPIT6lEg5" },
  { name: "Energy", type: "energy", img: energyImg, link: "https://open.spotify.com/playlist/37i9dQZF1DX8FwnYE6PRvL" },
  { name: "Romantic", type: "romantic", img: romanticImg, link: "https://open.spotify.com/playlist/37i9dQZF1DX50QitC6Oqtn" },
  { name: "General", type: "general", img: musicImg, link: "https://open.spotify.com" } 
];

function Spotify() {
  const [selectedLink, setSelectedLink] = useState("");

  const handleClick = (link) => {
    setSelectedLink(link);
    window.open(link, "_blank"); // open playlist in new tab
  };

  return (
    <div style={{ margin: "20px 0" }}>
      <h3>Spotify Playlists by Mood</h3>
      <div style={{ display: "flex", overflowX: "auto", padding: "10px 0" }}>
        {moods.map((mood) => (
          <div
            key={mood.type}
            style={{ marginRight: "15px", textAlign: "center", cursor: "pointer" }}
            onClick={() => handleClick(mood.link)}
          >
            <img
              src={mood.img}
              alt={mood.name}
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "10px",
                objectFit: "cover",
                border: "2px solid #8884d8"
              }}
            />
            <div style={{ marginTop: "5px" }}>{mood.name}</div>
          </div>
        ))}
      </div>

      {/* Optional: display selected playlist below */}
      {selectedLink && (
        <p style={{ marginTop: "10px", fontStyle: "italic" }}>
          Opening playlist: {selectedLink}
        </p>
      )}
    </div>
  );
}

export default Spotify;


/*import React, { useState } from "react";

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
*/