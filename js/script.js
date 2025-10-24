/**
 * Emergency Dispatch Simulation - Main Entry Point
 * 
 * This application simulates an emergency dispatch system with:
 * - Caller information capture
 * - Emergency type classification with IDC codes
 * - Location search and mapping
 * - Priority-based scenarios
 * - Pre-arrival instruction display
 * - Audio playback for hotlines
 * 
 * Architecture:
 * - /js/modules/ - Functional modules (state, forms, navigation, etc.)
 * - /js/config/ - Static configuration data (addresses, content, URLs)
 * - /css/ - Styling
 * - /public/ - Static assets (audio files)
 * 
 * Module Structure:
 * - state.js: Centralized application state management
 * - caller-info.js: Caller information form handlers
 * - idc-toggle.js: IDC code visibility toggle
 * - navigation.js: Emergency type navigation and content display
 * - location.js: Address search and selection
 * - priority.js: Priority level buttons and map switching
 * - dispatch.js: Dispatch action buttons and audio playback
 * - reset.js: Simulation reset functionality
 * 
 * Configuration Files:
 * - navigation-data.js: Sub-navigation structure for each emergency type
 * - content-data.js: HTML content for vital points and instructions
 * - address-databases.js: Location-specific address lists
 * - map-urls.js: Google Maps embed URLs for each priority
 */

// Import initialization functions from modules
import { initCallerInfoForm } from './modules/caller-info.js';
import { initIDCToggle } from './modules/idc-toggle.js';
import { initNavigation } from './modules/navigation.js';
import { initLocationForm } from './modules/location.js';
import { initPriorityButtons } from './modules/priority.js';
import { initDispatchButtons } from './modules/dispatch.js';

// Initialize app when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM loaded, initializing app...");
  
  // Initialize all modules in sequence
  initCallerInfoForm();
  initIDCToggle();
  initNavigation();
  initLocationForm();
  initPriorityButtons();
  initDispatchButtons();
  
  console.log("App initialized successfully");
});
