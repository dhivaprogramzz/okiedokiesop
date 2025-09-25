/*import React, { useState, useEffect, useRef } from "react";

function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input) return;

    const username = localStorage.getItem("username");
    if (!username) {
      alert("Please login first!");
      return;
    }

    // Add user message
    setMessages(prev => [...prev, { sender: "You", text: input }]);

    try {
      const res = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, username })
      });

      if (!res.ok) throw new Error("Server error");

      const data = await res.json();
      setMessages(prev => [...prev, { sender: "Bot", text: data.reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { sender: "Bot", text: "Sorry, something went wrong." }]);
      console.error(err);
    }

    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div style={{ marginTop: "20px", border: "1px solid #ccc", padding: "10px", borderRadius: "10px" }}>
      <h3>AI Chat Support</h3>
      <div style={{ height: "200px", overflowY: "scroll", border: "1px solid #ddd", padding: "5px", marginBottom: "10px" }}>
        {messages.map((m, i) => (
          <div key={i}><b>{m.sender}:</b> {m.text}</div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <input 
        type="text" 
        value={input} 
        onChange={e => setInput(e.target.value)} 
        onKeyPress={handleKeyPress}
        placeholder="Type here..." 
        style={{ width: "80%", marginRight: "5px" }}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default ChatBot;
*/
import React, { useState, useEffect, useRef } from "react";
import "./ChatBot.css";

function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input) return;
    const username = localStorage.getItem("username");
    if (!username) {
      alert("Please login first!");
      return;
    }

    setMessages(prev => [...prev, { sender: "You", text: input }]);

    try {
      const res = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, username })
      });

      if (!res.ok) throw new Error("Server error");

      const data = await res.json();
      setMessages(prev => [...prev, { sender: "Bot", text: data.reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { sender: "Bot", text: "Sorry, something went wrong." }]);
      console.error(err);
    }

    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-title">🤖 AI Chat Support</div>
      <div className="chat-window">
        {messages.map((m, i) => (
          <div key={i} className={`message ${m.sender === "You" ? "user" : "bot"}`}>
            <b>{m.sender}:</b> {m.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-input-container">
        <input 
          type="text"
          className="chat-input"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
        />
        <button className="send-button" onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default ChatBot;

