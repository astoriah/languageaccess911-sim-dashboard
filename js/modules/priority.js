/**
 * Priority Module
 * 
 * Manages priority level selection buttons (P, 1-6):
 * - Updates application state
 * - Changes map iframe display
 * - Affects address database selection
 */

import { state } from './state.js';
import { mapUrls } from '../config/map-urls.js';

export function initPriorityButtons() {
  const priorityButtons = document.querySelectorAll(".priority-btn");
  const mapIframe = document.getElementById("mapIframe");

  console.log("Initializing priority buttons...");

  priorityButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const priorityLevel = parseInt(this.getAttribute("data-priority"));
      const mapType = this.getAttribute("data-map");

      console.log("Priority button clicked:", priorityLevel, mapType);

      // Update state
      state.priority = priorityLevel;

      // Update UI
      priorityButtons.forEach(function (btn) {
        btn.classList.remove("active");
        btn.setAttribute("aria-pressed", "false");
      });

      this.classList.add("active");
      this.setAttribute("aria-pressed", "true");

      // Update map iframe
      if (mapIframe && mapUrls[mapType]) {
        mapIframe.src = mapUrls[mapType];
        console.log("Map updated to:", mapType);
      }
    });
  });

  console.log("Priority buttons initialized");
}
