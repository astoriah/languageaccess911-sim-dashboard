// State management
const state = {
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
  priority: 1,
  navigation: {
    activeNav: null,
    activeSubNav: null,
  },
};

// Initialize app
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM loaded, initializing app...");
  initCallerInfoForm();
  initNavigation();
  initLocationForm();
  initPriorityButtons();
  initDispatchButtons();
  console.log("App initialized successfully");
});

// Caller Info Form
function initCallerInfoForm() {
  const callerNameInput = document.getElementById("caller-name");
  const callerNumberInput = document.getElementById("caller-number");
  const typeSelect = document.getElementById("type");
  const idcCodeInput = document.getElementById("idc-code");

  callerNameInput.addEventListener("input", function (e) {
    state.callerInfo.callerName = e.target.value;
  });

  callerNumberInput.addEventListener("input", function (e) {
    state.callerInfo.callerNumber = e.target.value;
  });

  typeSelect.addEventListener("change", function (e) {
    state.callerInfo.type = e.target.value;
  });

  idcCodeInput.addEventListener("input", function (e) {
    state.callerInfo.idcCode = e.target.value;
  });
}

// Navigation System
function initNavigation() {
  const navButtons = document.querySelectorAll(".code-btn");
  const subNavContainer = document.getElementById("subNavContainer");
  const subNavItems = document.querySelectorAll(".sub-nav-item");
  const idcCodeInput = document.getElementById("idc-code");

  console.log("Initializing navigation...");
  console.log("Found nav buttons:", navButtons.length);
  console.log("Found sub-nav items:", subNavItems.length);

  if (!navButtons.length) {
    console.error("No navigation buttons found!");
    return;
  }

  if (!subNavContainer) {
    console.error("Sub-nav container not found!");
    return;
  }

  // Handle main navigation buttons
  navButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const codeId = this.getAttribute("data-code");
      const type = this.getAttribute("data-type");

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
        // Green button - show sub-nav
        console.log("Showing sub-nav for:", codeId);
        subNavContainer.style.display = "block";

        // Remove active from sub-nav items
        subNavItems.forEach(function (item) {
          item.classList.remove("active");
        });
      } else if (type === "direct") {
        // Red button - hide sub-nav and populate IDC directly
        console.log("Direct button clicked:", codeId);
        subNavContainer.style.display = "none";

        // Populate IDC code for CPR buttons
        const idcMap = {
          "cpr-adult": "CPR-A",
          "cpr-child": "CPR-C",
          "cpr-infant": "CPR-I",
        };

        if (idcCodeInput && idcMap[codeId]) {
          idcCodeInput.value = idcMap[codeId];
          state.callerInfo.idcCode = idcMap[codeId];
        }
      }
    });
  });

  // Handle sub-navigation items - populate IDC code
  subNavItems.forEach(function (item) {
    item.addEventListener("click", function () {
      const subNavId = this.getAttribute("data-subnav");
      const idcCode = this.getAttribute("data-idc");

      console.log("Sub-nav item clicked:", subNavId, "IDC:", idcCode);

      // Remove active from all sub-nav items
      subNavItems.forEach(function (subItem) {
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
  });

  console.log("Navigation initialized successfully");
}

// Location Form
function initLocationForm() {
  const streetAddressInput = document.getElementById("street-address");
  const aptSuiteInput = document.getElementById("apt-suite");
  const commentsTextarea = document.getElementById("comments");
  const searchBtn = document.getElementById("searchBtn");
  const addressResults = document.getElementById("addressResults");
  const addressList = document.getElementById("addressList");

  // Mock address database - replace with your actual addresses
  const mockAddresses = [
    "630 W BROADWAY, GLN",
    "630 E BROADWAY, GLN",
    "630 W BROADWAY, GLN (ROYAL PALMS CONV)",
    "630 N BROADWAY, GLN, LFD",
    "630 S BROADWAY, GLN, LFD",
    "1234 MAIN STREET, GLN",
    "5678 OAK AVENUE, GLN",
    "910 PINE ROAD, GLN",
    "1122 ELM STREET, GLN",
    "3344 MAPLE DRIVE, GLN",
  ];

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

    // Filter addresses based on search query
    const filteredAddresses = mockAddresses.filter(function (address) {
      return address.toLowerCase().includes(searchQuery);
    });

    // Display results
    if (filteredAddresses.length > 0) {
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

// Priority Buttons
function initPriorityButtons() {
  const priorityButtons = document.querySelectorAll(".priority-btn");
  const mapIframe = document.getElementById("mapIframe");

  // Map URLs for different priority levels
  const mapUrls = {
    default: "https://www.google.com/maps/d/u/0/embed?mid=1pwDgEjVgBxybEP34OjHv9x0VRGefprE&ehbc=2E312F",
    priority1: "https://www.google.com/maps/d/u/0/embed?mid=1kZ6pyuGSbwXmO7p1yduXuveGFRfd0as&ehbc=2E312F",
    priority2: "https://www.google.com/maps/d/u/0/embed?mid=1kZ6pyuGSbwXmO7p1yduXuveGFRfd0as&ehbc=2E312F",
    priority3: "https://www.google.com/maps/d/u/0/embed?mid=1pwDgEjVgBxybEP34OjHv9x0VRGefprE&ehbc=2E312F",
  };

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

// Dispatch Buttons
function initDispatchButtons() {
  const dispatchButtons = document.querySelectorAll(".dispatch-btn");

  dispatchButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const buttonId = this.getAttribute("data-dispatch");
      console.log("Dispatch button clicked:", buttonId);

      if (buttonId === "reset-simulation") {
        const confirmed = confirm("Are you sure you want to reset the simulation?");
        if (confirmed) {
          console.log("Simulation reset confirmed");
          resetSimulation();
        }
      }
    });
  });
}

// Reset simulation
function resetSimulation() {
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
  state.priority = 1;
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
  document.querySelector('.priority-btn[data-priority="1"]').classList.add("active");
  document.querySelector('.priority-btn[data-priority="1"]').setAttribute("aria-pressed", "true");

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

  // Hide sub-nav and reset content
  document.getElementById("subNavContainer").style.display = "none";
  document.getElementById("contentArea").innerHTML = `
    <article class="protocol-article">
      <h4 class="protocol-title">Select a protocol to view content</h4>
      <div class="protocol-content">
        Click a green button to see sub-navigation options, or click a red CPR button to view content directly.
      </div>
    </article>
  `;

  console.log("Simulation reset complete");
}
