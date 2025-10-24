/**
 * Dispatch Module
 * 
 * Handles dispatch action buttons:
 * - 988 hotline (plays audio)
 * - Language access line (plays audio)
 * - Reset simulation
 * - Visual feedback for clicked buttons
 */

import { clickedDispatchButtons } from './state.js';
import { resetSimulation } from './reset.js';

export function initDispatchButtons() {
  const dispatchButtons = document.querySelectorAll(".dispatch-btn");
  
  const audio988 = document.getElementById("audio988");
  const audioLangLine = document.getElementById("audioLangLine");
  
  // Add error handling for audio files
  audio988.addEventListener("error", function(e) {
    console.error("Error loading 988 audio file:", e);
    alert("Error loading 988 audio file. Please check the file path.");
  });
  
  audioLangLine.addEventListener("error", function(e) {
    console.error("Error loading Language Line audio file:", e);
    alert("Error loading Language Line audio file. Please check the file path.");
  });
  
  // Add loaded event to confirm audio is ready
  audio988.addEventListener("loadeddata", function() {
    console.log("988 audio loaded successfully");
  });
  
  audioLangLine.addEventListener("loadeddata", function() {
    console.log("Language Line audio loaded successfully");
  });
  
  let currentAudio = null;

  dispatchButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const buttonId = this.getAttribute("data-dispatch");
      console.log("Dispatch button clicked:", buttonId);

      if (buttonId === "988") {
        // Play 988 audio
        playAudio(audio988);
      } else if (buttonId === "lang-access") {
        // Play Language Line audio
        playAudio(audioLangLine);
      } else if (buttonId === "reset-simulation") {
        const confirmed = confirm("Are you sure you want to reset the simulation?");
        if (confirmed) {
          console.log("Simulation reset confirmed");
          resetSimulation();
        }
      }
      
      // Change background color to warning-btn color if not already clicked
      if (buttonId !== "reset-simulation" && !clickedDispatchButtons.has(buttonId)) {
        clickedDispatchButtons.add(buttonId);
        this.style.backgroundColor = "rgba(238, 175, 57, 1)";
      }
    });
  });

  // Audio playback function (no modal)
  function playAudio(audioElement) {
    // Stop any currently playing audio
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    // Set the current audio
    currentAudio = audioElement;

    // Play audio with error handling
    audioElement.currentTime = 0;
    const playPromise = audioElement.play();
    
    if (playPromise !== undefined) {
      playPromise
        .then(function() {
          console.log("Audio playback started successfully");
        })
        .catch(function(error) {
          console.error("Error playing audio:", error);
          alert("Error playing audio. Please check browser console.");
        });
    }

    // Reset current audio when ended
    audioElement.addEventListener("ended", function () {
      currentAudio = null;
    });
  }
}
