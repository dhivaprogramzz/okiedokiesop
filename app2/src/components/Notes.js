import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Notes.css"; // external CSS

function Notes() {
  const location = useLocation();
  const username = location.state?.username || localStorage.getItem("username");

  const [notes, setNotes] = useState([]);
  const [newFilename, setNewFilename] = useState("");
  const [newContent, setNewContent] = useState("");
  const [showNewNote, setShowNewNote] = useState(false);
  const [expandedNote, setExpandedNote] = useState(null);
  const [editMode, setEditMode] = useState(null);
  const [editContent, setEditContent] = useState("");

  // Load notes
  useEffect(() => {
    if (!username) return;
    fetchNotes();
  }, [username]);

  const fetchNotes = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:5000/get_notes/${username}`);
      const data = await res.json();
      if (data.success) setNotes(data.notes);
    } catch (err) {
      console.error("Error fetching notes:", err);
    }
  };

  // Save note
  const saveNote = async () => {
    if (!newFilename.trim() || !newContent.trim())
      return alert("Please enter filename and content!");

    try {
      const res = await fetch("http://127.0.0.1:5000/save_note", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, filename: newFilename, content: newContent }),
      });

      const data = await res.json();
      if (data.success) {
        setNewFilename("");
        setNewContent("");
        setShowNewNote(false);
        fetchNotes();
      } else {
        alert("Error saving note: " + data.message);
      }
    } catch (err) {
      console.error("Error saving note:", err);
    }
  };

  // Delete note
  const deleteNote = async (filename) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      const res = await fetch("http://127.0.0.1:5000/delete_note", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, filename }),
      });

      const data = await res.json();
      if (data.success) {
        setNotes((prev) => prev.filter((n) => n.filename !== filename));
      } else {
        alert("Error deleting note: " + data.message);
      }
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  };

  // Update note
  const updateNote = async (filename) => {
    if (!editContent.trim()) return alert("Content cannot be empty!");
    try {
      const res = await fetch("http://127.0.0.1:5000/update_note", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, filename, content: editContent }),
      });
      const data = await res.json();
      if (data.success) {
        setEditMode(null);
        fetchNotes();
      } else {
        alert("Error updating note: " + data.message);
      }
    } catch (err) {
      console.error("Error updating note:", err);
    }
  };

  if (!username) return <p className="center-text">Please login first.</p>;

  return (
    <div className="notes-container">
      <h2 className="notes-title">🗂️ Notes Folder</h2>

      {/* Create new file button */}
      <button
        className={`btn create-btn ${showNewNote ? "active" : ""}`}
        onClick={() => setShowNewNote(!showNewNote)}
      >
        + Create New File
      </button>

      {/* New note form */}
      {showNewNote && (
        <div className="new-note-container">
          <input
            type="text"
            value={newFilename}
            onChange={(e) => setNewFilename(e.target.value)}
            placeholder="Enter filename"
            className="note-input"
          />
          <textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            placeholder="Write your note..."
            className="note-textarea"
          />
          <button className="btn save-btn" onClick={saveNote}>
            Save File
          </button>
        </div>
      )}

      <h3 className="notes-subtitle">📂 Existing Files</h3>
      {notes.length === 0 && <p className="center-text">No files found.</p>}

      <div className="notes-list">
        {notes.map((note, idx) => (
          <div key={idx} className="note-card">
            <strong
              className="note-filename clickable"
              onClick={() =>
                setExpandedNote(expandedNote === note.filename ? null : note.filename)
              }
            >
              {note.filename}
            </strong>

            {/* Show editable content if in edit mode */}
            {editMode === note.filename ? (
              <div className="edit-note-container">
                <textarea
                  className="note-textarea"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                />
                <button className="btn save-btn" onClick={() => updateNote(note.filename)}>
                  Update
                </button>
                <button className="btn delete-btn" onClick={() => setEditMode(null)}>
                  Cancel
                </button>
              </div>
            ) : (
              // Show content only if expanded
              expandedNote === note.filename && <p className="note-content">{note.content}</p>
            )}

            <div style={{ marginTop: "5px" }}>
              <button
                className="btn edit-btn"
                onClick={() => {
                  setEditMode(note.filename);
                  setEditContent(note.content);
                }}
              >
                Edit
              </button>
              <button
                className="btn delete-btn"
                onClick={() => deleteNote(note.filename)}
                style={{ marginLeft: "10px" }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notes;

/*import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Notes.css"; // external CSS

function Notes() {
  const location = useLocation();
  const username = location.state?.username || localStorage.getItem("username");

  const [notes, setNotes] = useState([]);
  const [newFilename, setNewFilename] = useState("");
  const [newContent, setNewContent] = useState("");
  const [showNewNote, setShowNewNote] = useState(false);
  const [expandedNote, setExpandedNote] = useState(null);

  // Load notes
  useEffect(() => {
    if (!username) return;
    fetchNotes();
  }, [username]);

  const fetchNotes = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:5000/get_notes/${username}`);
      const data = await res.json();
      if (data.success) setNotes(data.notes);
    } catch (err) {
      console.error("Error fetching notes:", err);
    }
  };

  // Save note
  const saveNote = async () => {
    if (!newFilename.trim() || !newContent.trim())
      return alert("Please enter filename and content!");

    try {
      const res = await fetch("http://127.0.0.1:5000/save_note", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, filename: newFilename, content: newContent }),
      });

      const data = await res.json();
      if (data.success) {
        setNewFilename("");
        setNewContent("");
        setShowNewNote(false);
        fetchNotes();
      } else {
        alert("Error saving note: " + data.message);
      }
    } catch (err) {
      console.error("Error saving note:", err);
    }
  };

  // Delete note
  const deleteNote = async (filename) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      const res = await fetch("http://127.0.0.1:5000/delete_note", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, filename }),
      });

      const data = await res.json();
      if (data.success) {
        setNotes((prev) => prev.filter((n) => n.filename !== filename));
      } else {
        alert("Error deleting note: " + data.message);
      }
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  };

  if (!username) return <p className="center-text">Please login first.</p>;

  return (
    <div className="notes-container">
      <h2 className="notes-title">🗂️ Notes Folder</h2>

      {/* Create new file button }
      <button
        className={`btn create-btn ${showNewNote ? "active" : ""}`}
        onClick={() => setShowNewNote(!showNewNote)}
      >
        + Create New File
      </button>

      {/* New note form }
      {showNewNote && (
        <div className="new-note-container">
          <input
            type="text"
            value={newFilename}
            onChange={(e) => setNewFilename(e.target.value)}
            placeholder="Enter filename"
            className="note-input"
          />
          <textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            placeholder="Write your note..."
            className="note-textarea"
          />
          <button className="btn save-btn" onClick={saveNote}>
            Save File
          </button>
        </div>
      )}

      <h3 className="notes-subtitle">📂 Existing Files</h3>
      {notes.length === 0 && <p className="center-text">No files found.</p>}

      <div className="notes-list">
        {notes.map((note, idx) => (
          <div key={idx} className="note-card">
            <strong
              className="note-filename clickable"
              onClick={() =>
                setExpandedNote(expandedNote === note.filename ? null : note.filename)
              }
            >
              {note.filename}
            </strong>

            {/* Show content only if expanded }
            {expandedNote === note.filename && (
              <p className="note-content">{note.content}</p>
            )}

            <button
              className="btn delete-btn"
              onClick={() => deleteNote(note.filename)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notes;

*/