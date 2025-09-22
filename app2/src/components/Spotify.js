import React, { useEffect, useState } from "react";

function Spotify({ type }) {
  const [link, setLink] = useState("");

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/spotify/${type}`)
      .then(res => res.json())
      .then(data => setLink(data.link));
  }, [type]);

  if (!link) return null;

  return (
    <div style={{ margin: "20px 0" }}>
      <h3>Spotify Playlist</h3>
      <iframe src={link} width="100%" height="80" frameBorder="0" allow="encrypted-media"></iframe>
    </div>
  );
}

export default Spotify;
