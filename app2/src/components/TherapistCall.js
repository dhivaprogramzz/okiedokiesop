import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000"); // Flask backend

function TherapistCall({ username = "User", room = "therapy-room" }) {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnection = useRef(null);
  const [inCall, setInCall] = useState(false);

  useEffect(() => {
    socket.on("signal", async (data) => {
      if (!peerConnection.current) return;

      if (data.type === "offer") {
        await peerConnection.current.setRemoteDescription(
          new RTCSessionDescription(data.offer)
        );
        const answer = await peerConnection.current.createAnswer();
        await peerConnection.current.setLocalDescription(answer);
        socket.emit("signal", { room, type: "answer", answer });
      } else if (data.type === "answer") {
        await peerConnection.current.setRemoteDescription(
          new RTCSessionDescription(data.answer)
        );
      } else if (data.type === "ice-candidate") {
        try {
          await peerConnection.current.addIceCandidate(data.candidate);
        } catch (err) {
          console.error("Error adding ICE candidate", err);
        }
      }
    });

    socket.on("message", (msg) => {
      console.log("Server:", msg);
    });

    return () => {
      socket.off("signal");
      socket.off("message");
    };
  }, []);

  const startCall = async () => {
    peerConnection.current = new RTCPeerConnection();

    // Setup ICE
    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("signal", {
          room,
          type: "ice-candidate",
          candidate: event.candidate,
        });
      }
    };

    // Setup remote stream
    peerConnection.current.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    // Get local media
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    localVideoRef.current.srcObject = stream;
    stream.getTracks().forEach((track) =>
      peerConnection.current.addTrack(track, stream)
    );

    // Create offer
    const offer = await peerConnection.current.createOffer();
    await peerConnection.current.setLocalDescription(offer);
    socket.emit("signal", { room, type: "offer", offer, username });

    socket.emit("join", { room, username });
    setInCall(true);
  };

  const endCall = () => {
    if (peerConnection.current) {
      peerConnection.current.close();
      peerConnection.current = null;
    }
    socket.emit("leave", { room, username });
    setInCall(false);
  };

  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <h3 style={{ color: "white" }}>🎥 Talk to a Therapist</h3>

      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        <video
          ref={localVideoRef}
          autoPlay
          playsInline
          muted
          style={{
            width: "300px",
            borderRadius: "10px",
            border: "2px solid #ccc",
          }}
        />
        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          style={{
            width: "300px",
            borderRadius: "10px",
            border: "2px solid #ccc",
          }}
        />
      </div>

      {!inCall ? (
        <button
          onClick={startCall}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            fontSize: "1rem",
            background: "linear-gradient(135deg, #8e44ad, #3498db)",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Start Call
        </button>
      ) : (
        <button
          onClick={endCall}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            fontSize: "1rem",
            backgroundColor: "#e74c3c",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          End Call
        </button>
      )}
    </div>
  );
}

export default TherapistCall;
