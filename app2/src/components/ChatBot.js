import React, { useState } from "react";

function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input) return;
    const username = localStorage.getItem("username");
    setMessages([...messages, { sender: "user", text: input }]);

    const res = await fetch("http://127.0.0.1:5000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input, username })
    });
    const data = await res.json();
    setMessages(prev => [...prev, { sender: "bot", text: data.reply }]);
    setInput("");
  };

  return (
    <div style={{ marginTop: "20px", border: "1px solid #ccc", padding: "10px", borderRadius: "10px" }}>
      <h3>AI Chat Support</h3>
      <div style={{ height: "150px", overflowY: "scroll", border: "1px solid #ddd", padding: "5px" }}>
        {messages.map((m,i) => <div key={i}><b>{m.sender}:</b> {m.text}</div>)}
      </div>
      <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Type here..." />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default ChatBot;
