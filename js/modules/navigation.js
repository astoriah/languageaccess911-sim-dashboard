/**
 * Navigation Module
 * 
 * Handles the main navigation system:
 * - Emergency type buttons (cardiac, choking, etc.)
 * - Sub-navigation for IDC codes
 * - Content display area updates
 * - Form field auto-population
 */

import { state } from './state.js';
import { subNavData } from '../idc-codes/navigation-data.js';
import { contentData } from '../idc-codes/content-data.js';

export function initNavigation() {
  const navButtons = document.querySelectorAll(".code-btn");
  const subNavContainer = document.getElementById("subNavContainer");
  const subNavList = document.getElementById("subNavList");
  const contentArea = document.getElementById("contentArea");
  const idcCodeInput = document.getElementById("idc-code");
  const typeSelect = document.getElementById("type");

  console.log("Initializing navigation...");
  console.log("Found nav buttons:", navButtons.length);

  if (!navButtons.length) {
    console.error("No navigation buttons found!");
    return;
  }

  if (!subNavContainer || !subNavList) {
    console.error("Sub-nav container not found!");
    return;
  }

  // Handle main navigation buttons
  navButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const codeId = this.getAttribute("data-code");
      const type = this.getAttribute("data-type");
      const buttonText = this.textContent.trim();

      console.log("Button clicked:", codeId, type);

      // Remove active from all nav buttons
      navButtons.forEach(function (btn) {
        btn.classList.remove("active");
      });

      // Add active to clicked button
      this.classList.add("active");

      // Update state
      state.navigation.activeNav = codeId;
      state.navigation.activeSubNav = null;

      if (type === "nav") {
        // Green button - populate sub-nav with specific items
        console.log("Showing sub-nav for:", codeId);
        
        // Populate TYPE field with button text
        if (typeSelect) {
          typeSelect.value = buttonText;
          state.callerInfo.type = buttonText;
        }
        
        // Generate sub-nav items for this button
        const subNavItems = subNavData[codeId] || [];
        populateSubNav(subNavItems);
        
        // Show content for this button
        if (contentData[codeId]) {
          contentArea.innerHTML = contentData[codeId];
        }
      } else if (type === "direct") {
        // CPR button - only show content, do NOT change Type or IDC Code fields
        console.log("CPR button clicked:", codeId);
        subNavList.innerHTML = "";
        
        // Do NOT modify Type or IDC Code fields - keep existing values
        // Only show content for this button
        if (contentData[codeId]) {
          contentArea.innerHTML = contentData[codeId];
        }
      }
    });
  });

  // Function to populate sub-navigation dynamically
  function populateSubNav(items) {
    // Clear existing items
    subNavList.innerHTML = "";

    // Create new items
    items.forEach(function (item) {
      const li = document.createElement("li");
      li.className = "sub-nav-item";
      li.setAttribute("data-subnav", item.id);
      li.setAttribute("data-idc", item.id);
      li.textContent = item.label;

      // Add click handler
      li.addEventListener("click", function () {
        const subNavId = this.getAttribute("data-subnav");
        const idcCode = this.getAttribute("data-idc");

        console.log("Sub-nav item clicked:", subNavId, "IDC:", idcCode);

        // Remove active from all sub-nav items
        const allSubNavItems = subNavList.querySelectorAll(".sub-nav-item");
        allSubNavItems.forEach(function (subItem) {
          subItem.classList.remove("active");
        });

        // Add active to clicked item
        this.classList.add("active");

        // Update state
        state.navigation.activeSubNav = subNavId;

        // Populate IDC code field
        if (idcCodeInput && idcCode) {
          idcCodeInput.value = idcCode;
          state.callerInfo.idcCode = idcCode;
          console.log("IDC code populated:", idcCode);
        }
      });

      subNavList.appendChild(li);
    });
  }

  console.log("Navigation initialized successfully");
}
