import React, { useEffect, useState } from "react";
import "./Quotes.css";

function Quote() {
  const [quote, setQuote] = useState("Loading...");
  const [author, setAuthor] = useState("");

  const fetchQuote = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:5000/daily_quote?ts=" + new Date().getTime()
      );
      const data = await response.json();
      setQuote(data.quote);
      setAuthor(data.author);
    } catch (error) {
      console.error("Error fetching quote:", error);
      setQuote("Could not load quote.");
      setAuthor("");
    }
  };

  useEffect(() => {
    fetchQuote(); // fetch on mount
  }, []);

  return (
    <div className="quote-container">
      <h3 className="quote-title">✨ Quote of the Day ✨</h3>
      <p className="quote-text">“{quote}”</p>
      {author && <p className="quote-author">— {author}</p>}
      <button onClick={fetchQuote} className="quote-button">
        New Quote 🔄
      </button>
    </div>
  );
}

export default Quote;


/*import React, { useEffect, useState } from "react";
import "./Quotes.css";

function Quote() {
  const [quote, setQuote] = useState("Loading...");
  const [author, setAuthor] = useState("");

  const fetchQuote = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:5000/daily_quote?ts=" + new Date().getTime()
      );
      const data = await response.json();
      setQuote(data.quote);
      setAuthor(data.author);
    } catch (error) {
      console.error("Error fetching quote:", error);
      setQuote("Could not load quote.");
      setAuthor("");
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="quote-card">
      <h3 className="quote-title">✨ Quote of the Day ✨</h3>
      <p className="quote-text">“{quote}”</p>
      {author && <p className="quote-author">— {author}</p>}
      <button className="quote-btn" onClick={fetchQuote}>
        🔄 Get New Quote
      </button>
    </div>
  );
}

export default Quote;

*/