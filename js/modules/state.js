/**
 * State Management Module
 * 
 * Centralized application state for tracking:
 * - Caller information (name, number, type, IDC code)
 * - Location data (address, apt/suite, comments)
 * - Priority level for emergency response
 * - Navigation state (active buttons/items)
 */

export const state = {
  callerInfo: {
    callerName: "",
    callerNumber: "",
    type: "",
    idcCode: "",
  },
  locationData: {
    streetAddress: "",
    aptSuite: "",
    comments: "",
  },
  priority: 0,
  navigation: {
    activeNav: null,
    activeSubNav: null,
  },
};

// Track clicked dispatch buttons for visual feedback
export const clickedDispatchButtons = new Set();
