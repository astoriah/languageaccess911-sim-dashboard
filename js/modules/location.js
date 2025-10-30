/**
 * Location Module
 * 
 * Handles location search and address selection:
 * - Street address input
 * - Apartment/suite input
 * - Comments textarea
 * - Address search based on priority level
 * - Address result display and selection
 */

import { state } from './state.js';
import { addressDatabases } from '../idc-codes/address-databases.js';

export function initLocationForm() {
  const streetAddressInput = document.getElementById("street-address");
  const aptSuiteInput = document.getElementById("apt-suite");
  const commentsTextarea = document.getElementById("comments");
  const searchBtn = document.getElementById("searchBtn");
  const addressResults = document.getElementById("addressResults");
  const addressList = document.getElementById("addressList");

  streetAddressInput.addEventListener("input", function (e) {
    state.locationData.streetAddress = e.target.value;
  });

  aptSuiteInput.addEventListener("input", function (e) {
    state.locationData.aptSuite = e.target.value;
  });

  commentsTextarea.addEventListener("input", function (e) {
    state.locationData.comments = e.target.value;
  });

  searchBtn.addEventListener("click", function () {
    const searchQuery = state.locationData.streetAddress.trim().toLowerCase();

    console.log("Searching for location:", searchQuery);

    if (!searchQuery) {
      addressList.innerHTML = '<li class="placeholder-text">Enter a search to see results</li>';
      return;
    }

    // Determine which address database to use based on current priority
    let currentDatabase;
    switch (state.priority) {
      case 1:
        currentDatabase = addressDatabases[1];
        break;
      case 2:
        currentDatabase = addressDatabases[1]; // Same as 1
        break;
      case 3:
        currentDatabase = addressDatabases[2]; // Previous 2
        break;
      case 4:
        currentDatabase = addressDatabases[2]; // Previous 2
        break;
      case 5:
        currentDatabase = addressDatabases[3]; // Previous 3
        break;
      case 6:
        currentDatabase = addressDatabases[4]; // Previous 4
        break;
      default:
        currentDatabase = addressDatabases.P;
    }

    console.log(
      "Using scenario:",
      state.priority === 1 ? "1" : state.priority === 2 ? "2" : state.priority === 3 ? "3" : state.priority === 4 ? "4" : state.priority === 5 ? "5" : state.priority === 6 ? "6" : "P",
    );

    // Filter addresses based on search query
    const filteredAddresses = currentDatabase.filter(function (address) {
      return address.toLowerCase().includes(searchQuery);
    });

    // Display results
    if (filteredAddresses.length >= 1) {
      displayAddressResults(filteredAddresses);
    } else {
      // Show "no results" message
      addressList.innerHTML = '<li class="placeholder-text">No addresses found. Try a different search.</li>';
    }
  });

  function displayAddressResults(addresses) {
    // Clear previous results
    addressList.innerHTML = "";

    // Create list items for each address
    addresses.forEach(function (address) {
      const li = document.createElement("li");
      li.textContent = address;
      li.addEventListener("click", function () {
        // Populate the street address field with selected address
        streetAddressInput.value = address;
        state.locationData.streetAddress = address;

        // Show placeholder text again
        addressList.innerHTML = '<li class="placeholder-text">Enter a search to see results</li>';

        console.log("Selected address:", address);
      });
      addressList.appendChild(li);
    });
  }
}
