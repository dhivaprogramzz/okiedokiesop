import React, { useEffect, useState } from "react";

function Quote() {
  const [quote, setQuote] = useState("Loading...");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    async function fetchQuote() {
      try {
        const response = await fetch("http://127.0.0.1:5000/daily_quote"); // call Flask, not external API
        const data = await response.json();
        setQuote(data.content);
        setAuthor(data.author);
      } catch (error) {
        console.error("Error fetching quote:", error);
        setQuote("Could not load quote.");
      }
    }

    fetchQuote();
  }, []);

  return (
    <div style={{ margin: "20px 0", padding: "10px", border: "1px solid #ccc", borderRadius: "10px" }}>
      <h3>Quote of the Day</h3>
      <p>"{quote}"</p>
      {author && <p style={{ fontStyle: "italic", textAlign: "right" }}>— {author}</p>}
    </div>
  );
}

export default Quote;
