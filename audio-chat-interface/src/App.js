import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

import Audiocomp from './component/audiocomp';
import Exit from './component/exit';
import MessageBox from './component/messagebox';

function App() {
  const [messages, setMessages] = useState([]);

  // Function to handle submitting audio and messages
  const handleAudioSubmit = async (audioData) => {
    // Check if there is audio data to submit
    if (!audioData) {
      return;
    }

    try {
      // Create a FormData object to send the audio file
      const formData = new FormData();
      formData.append('audio', audioData.blob);

      // Make a POST request to your Flask backend to process audio
      const audioResponse = await axios.post('http://127.0.0.1:5000/process_audio', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Extract the AI response from the server's audio response
      const aiResponseText = audioResponse.data.aiResponse; // Replace with the actual response field

      // Create a new message object for the AI response
      const newMessage = {
        text: aiResponseText,
        isUser: true, // Set to the received value (either true or false)
      };

      // Update the messages state with the new AI response message
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      console.log(aiResponseText);
      // Handle the AI response text
      handleAIResponse(aiResponseText);
    } catch (error) {
      // Handle errors
      console.error('Error submitting audio:', error);
    }
  };

  // Function to handle AI response text and update messages
  const handleAIResponse = async (aiResponseText) => {
    try {
      // Make a POST request to the Flask backend to process the AI response text
      const textrep = await axios.post('http://127.0.0.1:5000/process_answer', {
        aiResponse: aiResponseText,
      });

      // Extract the AI's audio and text response from the server's response
      const { text, isUser } = textrep.data; // Replace with actual field names

      // Create a new message object for the AI response
      const newMessage = {
        text: text,
        isUser: isUser, // Set to the received value (either true or false)
        audioUrl: "http://localhost:5000/get_audio", // Store the audio data if available
      };

      // Update the messages state with the new AI response message
      setMessages((prevMessages) => [...prevMessages, newMessage]);
     
      console.log('AI response processed successfully.');
    } catch (error) {
      // Handle errors
      console.error('Error processing AI response:', error);
    }

  };

  // Function to handle the exit button click and redirect to the specified URL
  const onExitClik = () => {
    window.location.href = 'http://127.0.0.1:5000';
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Audio Chat App</h1>
      </header>
      <div className="main-container">
        <Audiocomp onAudioSubmit={handleAudioSubmit} />
        <MessageBox messages={messages} />
        <Exit onExitClick={onExitClik}/>
      </div>
    </div>
  );
}

export default App;
