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
  priority: 0,
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
  const subNavList = document.getElementById("subNavList");
  const contentArea = document.getElementById("contentArea");
  const idcCodeInput = document.getElementById("idc-code");

  // Define sub-navigation items for each main button
  const subNavData = {
    cardiac: [
      { id: "6M1", label: "6M1 Unconscious or not breathing" },
      { id: "6M2", label: "6M2 Obvious DOA, Child" },
      { id: "6R1", label: "6R1 Obvious DOA, cold and stiff, no CPR in progress" },
      { id: "6R2", label: "6R2 Adult patient with DNR, caller refusing to do CPR" },
    ],
    choking: [
      { id: "8M1", label: "8M1 Unconscious or not breathing" },
      { id: "8M2", label: "8M2 Unable to talk or cry" },
      { id: "8M3", label: "8M3 Turning blue" },
    ],
    "head-neck": [
      { id: "12M1", label: "12M1 Unconscious or not breathing" },
      { id: "12M2", label: "12M2 Decreased LOC, non-responsive to verbal or touch" },
      { id: "12M3", label: "12M3" },
      { id: "12M4", label: "12M4" },
      { id: "12M5", label: "12M5" },
    ],
    mental: [
      { id: "25M1", label: "25M1 Not alert" },
      { id: "25M2", label: "25M2 Suicidal" },
      { id: "25M3", label: "25M3 Threatening suicide" },
    ],
    poisoning: [
      { id: "23M1", label: "23M1 Unconscious" },
      { id: "23M2", label: "23M2 Not alert" },
      { id: "23M3", label: "23M3 Overdose" },
    ],
    pregnancy: [
      { id: "24M1", label: "24M1 Breech or cord" },
      { id: "24M2", label: "24M2 Head visible/out" },
      { id: "24M3", label: "24M3 Imminent delivery" },
    ],
    stroke: [
      { id: "28M1", label: "28M1 Not alert" },
      { id: "28M2", label: "28M2 Difficulty speaking" },
      { id: "28M3", label: "28M3 Sudden numbness" },
    ],
    seizures: [
      { id: "12M1", label: "12M1 Not breathing" },
      { id: "12M2", label: "12M2 Continuous seizures" },
      { id: "12M3", label: "12M3 Agonal breathing" },
    ],
    pediatrics: [
      { id: "P1", label: "P1 Infant not breathing" },
      { id: "P2", label: "P2 Child not alert" },
      { id: "P3", label: "P3 Difficulty breathing" },
    ],
  };

  // Define content for each main button
  const contentData = {
    cardiac: `
      <h3>Cardiac</h3>
      <h4>Medic:</h4>
      <p>If unsure about consciousness, use questions below to probe further:</p>
      <ul>
        <li>Does the patient respond to you?</li>
        <li>Respond to your voice (can they answer your questions?)</li>
        <li>Respond when you try to wake them.</li>
      </ul>
      <p>If unsure about breathing normally, inquire further:</p>
      <ul>
        <li>Does the patient's chest rise and fall?</li>
        <li>Describe the patient's breathing. Listen for sounds and frequency of breaths</li>
      </ul>
      <p>(agonal respirations described as):</p>
      <ul>
        <li>gasping</li>
        <li>snoring</li>
        <li>snorting</li>
        <li>gurgling</li>
        <li>moaning</li>
        <li>barely breathing</li>
        <li>breathing every once in awhile</li>
        <li>takes breath now and then</li>
        <li>occasional breathing</li>
      </ul>
      <p><strong>** If RP cannot tell if the patient is breathing normally, assume the patient is not breathing normally, go directly to age-appropriate CPR PA</strong></p>
    `,
    "cpr-adult": `
      <h3>CPR ADULT</h3>
      <p>Does the RP or anyone there know CPR? (Trained bystanders may still need instructions. Ask!)</p>
      <p>Get the phone <strong>NEXT</strong> to the person.</p>
      <p>Listen carefully. I'll tell you what to do.</p>
      <ul>
        <li>Get them <strong>FLAT</strong> on their back on the floor.</li>
        <li><strong>KNEEL</strong> by their side.</li>
        <li>Place one <strong>HAND</strong> on top of the other in the <strong>CENTER</strong> of their <strong>CHEST</strong>, right <strong>BETWEEN</strong> the <strong>NIPPLES</strong>.</li>
        <li><strong>PUSH DOWN FIRMLY</strong> ON THEIR CHEST</li>
        <li>Count <strong>OUT LOUD</strong>. 1-2-3-4 (correct rate if needed)</li>
        <li><strong>KEEP PUMPING</strong> the <strong>CHEST UNTIL SOMEONE TAKES OVER</strong>.</li>
      </ul>
    `,
    "cpr-child": `
      <h3>CPR CHILD</h3>
      <p>Does the RP or anyone there know CPR? (Trained bystanders may still need instructions. Ask!)</p>
      <p>Get the phone <strong>NEXT</strong> to the child.</p>
      <p>Listen carefully. I'll tell you what to do.</p>
      <ul>
        <li>Get them <strong>FLAT</strong> on their back on the floor.</li>
        <li><strong>KNEEL</strong> by their side.</li>
        <li>Place one <strong>HAND</strong> in the <strong>CENTER</strong> of their <strong>CHEST</strong>.</li>
        <li><strong>PUSH DOWN FIRMLY</strong> ON THEIR CHEST</li>
        <li>Count <strong>OUT LOUD</strong>. 1-2-3-4 (correct rate if needed)</li>
        <li><strong>KEEP PUMPING</strong> the <strong>CHEST UNTIL SOMEONE TAKES OVER</strong>.</li>
      </ul>
    `,
    "cpr-infant": `
      <h3>CPR INFANT</h3>
      <p>Does the RP or anyone there know CPR? (Trained bystanders may still need instructions. Ask!)</p>
      <p>Get the phone <strong>NEXT</strong> to the infant.</p>
      <p>Listen carefully. I'll tell you what to do.</p>
      <ul>
        <li>Get them <strong>FLAT</strong> on their back on a firm surface.</li>
        <li>Place <strong>TWO FINGERS</strong> in the <strong>CENTER</strong> of the <strong>CHEST</strong>, just below the nipple line.</li>
        <li><strong>PUSH DOWN FIRMLY</strong> ON THEIR CHEST</li>
        <li>Count <strong>OUT LOUD</strong>. 1-2-3-4 (correct rate if needed)</li>
        <li><strong>KEEP PUMPING</strong> the <strong>CHEST UNTIL SOMEONE TAKES OVER</strong>.</li>
      </ul>
    `,
    choking: `<h3>Choking</h3><p>Content for choking protocol...</p>`,
    "head-neck": `<h3>Head/Neck</h3><p>Content for head/neck protocol...</p>`,
    mental: `<h3>Mental</h3><p>Content for mental health protocol...</p>`,
    poisoning: `<h3>Poisoning</h3><p>Content for poisoning protocol...</p>`,
    pregnancy: `<h3>Pregnancy</h3><p>Content for pregnancy protocol...</p>`,
    stroke: `<h3>Stroke</h3><p>Content for stroke protocol...</p>`,
    seizures: `<h3>Seizures</h3><p>Content for seizures protocol...</p>`,
    pediatrics: `<h3>Pediatrics</h3><p>Content for pediatrics protocol...</p>`,
  };

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
        
        // Generate sub-nav items for this button
        const subNavItems = subNavData[codeId] || [];
        populateSubNav(subNavItems);
        
        // Show content for this button
        if (contentData[codeId]) {
          contentArea.innerHTML = contentData[codeId];
        }
      } else if (type === "direct") {
        // Red button - clear sub-nav and populate IDC directly
        console.log("Direct button clicked:", codeId);
        subNavList.innerHTML = "";
        
        // Show content for this button
        if (contentData[codeId]) {
          contentArea.innerHTML = contentData[codeId];
        }

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

// Location Form
function initLocationForm() {
  const streetAddressInput = document.getElementById("street-address");
  const aptSuiteInput = document.getElementById("apt-suite");
  const commentsTextarea = document.getElementById("comments");
  const searchBtn = document.getElementById("searchBtn");
  const addressResults = document.getElementById("addressResults");
  const addressList = document.getElementById("addressList");

  // Address databases for different scenarios
  const addressDatabases = {
    P: [
      "630 W BROADWAY, GLN",
      "630 E BROADWAY, GLN",
      "630 W BROADWAY, GLN (ROYAL PALMS CONV)",
      "630 N BROADWAY, GLN, LFD",
      "910 PINE ROAD, GLN",
      "1122 ELM STREET, GLN",
      "3344 MAPLE DRIVE, GLN",
    ],
    1: [
      "5013 Belmont Avenue",
      "1513 Belmont Avenue",
      "1530 Bellevue Avenue",
      "1530 Belmont Avenue",
      "1530 Belmont Place",
    ],
    2: [
      "742 Evergreen Terrace",
      "744 Evergreen Terrace",
      "742 Evergreen Avenue",
      "742 Evergreen Drive",
      "724 Evergreen Terrace",
    ],
    3: ["221B Baker Street", "221A Baker Street", "221 Baker Street", "212 Baker Street", "221B Baker Avenue"],
  };

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
        currentDatabase = addressDatabases[2];
        break;
      case 3:
        currentDatabase = addressDatabases[3];
        break;
      default:
        currentDatabase = addressDatabases.P;
    }

    console.log(
      "Using scenario:",
      state.priority === 1 ? "1" : state.priority === 2 ? "2" : state.priority === 3 ? "3" : "P",
    );

    // Filter addresses based on search query
    const filteredAddresses = currentDatabase.filter(function (address) {
      return address.toLowerCase().includes(searchQuery);
    });

    // Display results
    if (filteredAddresses.length > 1) {
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

  console.log("Simulation reset complete");
}
