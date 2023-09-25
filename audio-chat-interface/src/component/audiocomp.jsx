import React, { useState, useRef } from 'react';
import './audiocompp.css';

const Audiocomp = ({ onAudioSubmit }) => {
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const audioRecorder = useRef(null);

  const startRecording = () => {
    if (!recording) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((audioStream) => {
          audioRecorder.current = new MediaRecorder(audioStream);
          const chunks = [];

          audioRecorder.current.ondataavailable = (event) => {
            if (event.data.size > 0) {
              chunks.push(event.data);
            }
          };

          audioRecorder.current.onstop = () => {
            const audioBlob = new Blob(chunks, { type: 'audio/mpeg' });
            setAudioBlob(audioBlob);
            setRecording(false);
          };

          audioRecorder.current.start();
          setRecording(true);
        })
        .catch((error) => {
          console.error('Error accessing audio:', error);
        });
    } else {
      stopRecording();
    }
  };

  const stopRecording = () => {
    if (audioRecorder.current && audioRecorder.current.state === 'recording') {
      audioRecorder.current.stop();
    }
  };

  const submitAudio = () => {
    if (audioBlob) {
      // Call the onAudioSubmit prop with the audioBlob
      onAudioSubmit(audioBlob);
      setAudioBlob(null); // Clear the audioBlob after submission
    }
  };

  return (
    <div className="audiocomp-container">
      <button
        className={`record-button ${recording ? 'recording' : ''}`}
        onClick={startRecording}
      >
        {recording ? 'Stop Recording' : 'Start Recording'}
      </button>
      {audioBlob && (
        <div>
          <p className="status-message">Recording Saved</p>
          <audio className="audio-player" controls src={URL.createObjectURL(audioBlob)}></audio>
          <button className="audio-submit-button" onClick={submitAudio}>
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default Audiocomp;
