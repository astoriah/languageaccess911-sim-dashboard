/**
 * Reset Module
 * 
 * Handles simulation reset functionality:
 * - Clears all form inputs
 * - Resets application state
 * - Removes active button states
 * - Resets map to default view
 * - Clears dispatch button visual feedback
 */

import { state, clickedDispatchButtons } from './state.js';

export function resetSimulation() {
  // Reset state
  state.callerInfo = {
    callerName: "",
    callerNumber: "",
    type: "",
    idcCode: "",
  };
  state.locationData = {
    streetAddress: "",
    aptSuite: "",
    comments: "",
  };
  state.priority = 0;
  state.navigation = {
    activeNav: null,
    activeSubNav: null,
  };

  // Reset form inputs
  document.getElementById("caller-name").value = "";
  document.getElementById("caller-number").value = "";
  document.getElementById("type").value = "";
  document.getElementById("idc-code").value = "";
  document.getElementById("street-address").value = "";
  document.getElementById("apt-suite").value = "";
  document.getElementById("comments").value = "";

  // Reset address results to placeholder
  const addressResults = document.getElementById("addressResults");
  const addressList = document.getElementById("addressList");
  if (addressList) {
    addressList.innerHTML = '<li class="placeholder-text">Enter a search to see results</li>';
  }

  // Reset priority buttons
  const priorityButtons = document.querySelectorAll(".priority-btn");
  priorityButtons.forEach(function (btn) {
    btn.classList.remove("active");
    btn.setAttribute("aria-pressed", "false");
  });
  document.querySelector('.priority-btn[data-priority="0"]').classList.add("active");
  document.querySelector('.priority-btn[data-priority="0"]').setAttribute("aria-pressed", "true");

  // Reset map iframe
  const mapIframe = document.getElementById("mapIframe");
  if (mapIframe) {
    mapIframe.src = "https://www.google.com/maps/d/u/0/embed?mid=1pwDgEjVgBxybEP34OjHv9x0VRGefprE&ehbc=2E312F";
  }

  // Reset navigation
  const navButtons = document.querySelectorAll(".code-btn");
  navButtons.forEach(function (btn) {
    btn.classList.remove("active");
  });

  const subNavItems = document.querySelectorAll(".sub-nav-item");
  subNavItems.forEach(function (item) {
    item.classList.remove("active");
  });

  // Clear sub-nav content and content area
  document.getElementById("subNavList").innerHTML = "";
  document.getElementById("contentArea").innerHTML = "";
  
  // Reset dispatch button colors
  clickedDispatchButtons.clear();
  const dispatchButtons = document.querySelectorAll(".dispatch-btn");
  dispatchButtons.forEach(function (btn) {
    btn.style.backgroundColor = "";
  });

  console.log("Simulation reset complete");
}
