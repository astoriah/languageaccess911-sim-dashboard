// State management
const state = {
  callerInfo: {
    callerName: '',
    callerNumber: '',
    type: '',
    idcCode: ''
  },
  locationData: {
    streetAddress: '',
    aptSuite: '',
    comments: ''
  },
  priority: 1,
  navigation: {
    activeNav: null,
    activeSubNav: null
  }
};

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing app...');
  initCallerInfoForm();
  initNavigation();
  initLocationForm();
  initPriorityButtons();
  initDispatchButtons();
  console.log('App initialized successfully');
});

// Caller Info Form
function initCallerInfoForm() {
  const callerNameInput = document.getElementById('caller-name');
  const callerNumberInput = document.getElementById('caller-number');
  const typeSelect = document.getElementById('type');
  const idcCodeInput = document.getElementById('idc-code');

  callerNameInput.addEventListener('input', function(e) {
    state.callerInfo.callerName = e.target.value;
  });

  callerNumberInput.addEventListener('input', function(e) {
    state.callerInfo.callerNumber = e.target.value;
  });

  typeSelect.addEventListener('change', function(e) {
    state.callerInfo.type = e.target.value;
  });

  idcCodeInput.addEventListener('input', function(e) {
    state.callerInfo.idcCode = e.target.value;
  });
}

// Navigation System
function initNavigation() {
  const navButtons = document.querySelectorAll('.code-btn');
  const subNavContainer = document.getElementById('subNavContainer');
  const subNavItems = document.querySelectorAll('.sub-nav-item');
  const contentArea = document.getElementById('contentArea');

  console.log('Initializing navigation...');
  console.log('Found nav buttons:', navButtons.length);
  console.log('Found sub-nav items:', subNavItems.length);
  console.log('Sub-nav container:', subNavContainer);
  console.log('Content area:', contentArea);

  if (!navButtons.length) {
    console.error('No navigation buttons found!');
    return;
  }

  if (!subNavContainer) {
    console.error('Sub-nav container not found!');
    return;
  }

  if (!contentArea) {
    console.error('Content area not found!');
    return;
  }

  // Handle main navigation buttons
  navButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      const codeId = this.getAttribute('data-code');
      const type = this.getAttribute('data-type');
      
      console.log('Button clicked:', codeId, type);
      
      // Remove active from all nav buttons
      navButtons.forEach(function(btn) {
        btn.classList.remove('active');
      });
      
      // Add active to clicked button
      this.classList.add('active');
      
      // Update state
      state.navigation.activeNav = codeId;
      state.navigation.activeSubNav = null;
      
      if (type === 'nav') {
        // Green button - show sub-nav
        console.log('Showing sub-nav for:', codeId);
        subNavContainer.style.display = 'block';
        
        // Remove active from sub-nav items
        subNavItems.forEach(function(item) {
          item.classList.remove('active');
        });
        
        // Show default content
        showDefaultContent(codeId);
      } else if (type === 'direct') {
        // Red button - hide sub-nav and show content directly
        console.log('Showing direct content for:', codeId);
        subNavContainer.style.display = 'none';
        showDirectContent(codeId);
      }
    });
  });

  // Handle sub-navigation items
  subNavItems.forEach(function(item) {
    item.addEventListener('click', function() {
      const subNavId = this.getAttribute('data-subnav');
      
      console.log('Sub-nav item clicked:', subNavId);
      
      // Remove active from all sub-nav items
      subNavItems.forEach(function(subItem) {
        subItem.classList.remove('active');
      });
      
      // Add active to clicked item
      this.classList.add('active');
      
      // Update state
      state.navigation.activeSubNav = subNavId;
      
      // Show content for this sub-nav
      showSubNavContent(state.navigation.activeNav, subNavId);
    });
  });

  console.log('Navigation initialized successfully');
}

// Show default content when a green button is clicked
function showDefaultContent(navId) {
  const contentArea = document.getElementById('contentArea');
  
  const contentMap = {
    'cardiac': {
      title: 'Cardiac Emergency Protocol',
      content: `<strong>Assessment:</strong><br />
        • Check for responsiveness and breathing<br />
        • Look for signs of cardiac distress<br />
        • Assess chest pain, shortness of breath<br />
        <br />
        <strong>Actions:</strong><br />
        • Call for ALS backup immediately<br />
        • Begin cardiac monitoring<br />
        • Prepare for possible cardiac arrest`
    },
    'choking': {
      title: 'Choking Protocol',
      content: `<strong>Assessment:</strong><br />
        • Determine if airway is completely blocked<br />
        • Check if patient can speak or cough<br />
        <br />
        <strong>Actions:</strong><br />
        • If complete obstruction: Heimlich maneuver<br />
        • If partial obstruction: encourage coughing<br />
        • Prepare for advanced airway management`
    },
    'head-neck': {
      title: 'Head/Neck Injury Protocol',
      content: `<strong>Assessment:</strong><br />
        • Check level of consciousness<br />
        • Assess for neck pain or deformity<br />
        • Look for signs of head trauma<br />
        <br />
        <strong>Actions:</strong><br />
        • Maintain c-spine stabilization<br />
        • Monitor for changes in mental status<br />
        • Prepare for spinal immobilization`
    },
    'mental': {
      title: 'Mental/Emotional Crisis Protocol',
      content: `<strong>Assessment:</strong><br />
        • Assess patient's mental state<br />
        • Check for danger to self or others<br />
        • Determine if psychiatric evaluation needed<br />
        <br />
        <strong>Actions:</strong><br />
        • Ensure scene safety<br />
        • Use calm, reassuring communication<br />
        • Consider law enforcement assistance if needed`
    },
    'poisoning': {
      title: 'Overdose/Poisoning Protocol',
      content: `<strong>Assessment:</strong><br />
        • Identify substance if possible<br />
        • Check vital signs and consciousness<br />
        • Look for signs of toxicity<br />
        <br />
        <strong>Actions:</strong><br />
        • Contact poison control center<br />
        • Prepare for antidote administration<br />
        • Monitor airway and breathing closely`
    },
    'pregnancy': {
      title: 'Pregnancy/Childbirth Protocol',
      content: `<strong>Assessment:</strong><br />
        • Determine stage of labor<br />
        • Check for complications<br />
        • Assess if delivery is imminent<br />
        <br />
        <strong>Actions:</strong><br />
        • Prepare for delivery if needed<br />
        • Monitor mother and baby<br />
        • Have neonatal resuscitation equipment ready`
    },
    'stroke': {
      title: 'Stroke Protocol',
      content: `<strong>Assessment:</strong><br />
        • Use FAST assessment (Face, Arms, Speech, Time)<br />
        • Document time of symptom onset<br />
        • Check blood glucose<br />
        <br />
        <strong>Actions:</strong><br />
        • Rapid transport to stroke center<br />
        • Keep patient NPO<br />
        • Monitor vital signs closely`
    },
    'seizures': {
      title: 'Seizure Protocol',
      content: `<strong>Assessment:</strong><br />
        • Note type and duration of seizure<br />
        • Check for injuries from seizure<br />
        • Assess post-ictal state<br />
        <br />
        <strong>Actions:</strong><br />
        • Protect from injury during seizure<br />
        • Maintain airway after seizure<br />
        • Consider causes (hypoglycemia, etc.)`
    },
    'pediatrics': {
      title: 'Pediatric Emergency Protocol',
      content: `<strong>Assessment:</strong><br />
        • Use age-appropriate assessment tools<br />
        • Check vital signs for pediatric norms<br />
        • Assess level of distress<br />
        <br />
        <strong>Actions:</strong><br />
        • Use pediatric equipment sizing<br />
        • Keep caregiver with child when possible<br />
        • Adjust medication dosing for weight`
    }
  };
  
  const content = contentMap[navId] || {
    title: 'Protocol Content',
    content: 'Select a sub-navigation item to view specific instructions.'
  };
  
  contentArea.innerHTML = `
    <article class="protocol-article">
      <h4 class="protocol-title">${content.title}</h4>
      <div class="protocol-content">
        ${content.content}
      </div>
    </article>
  `;
  
  contentArea.scrollTop = 0;
}

// Show content for direct access (red buttons)
function showDirectContent(navId) {
  const contentArea = document.getElementById('contentArea');
  
  const contentMap = {
    'cpr-adult': {
      title: 'CPR Adult/AED Protocol',
      content: `<strong>CPR for Adults (Age 8+):</strong><br />
        <br />
        <strong>1. Check responsiveness</strong><br />
        • Tap shoulders and shout "Are you OK?"<br />
        • If no response, call 911 immediately<br />
        <br />
        <strong>2. Check breathing</strong><br />
        • Look for chest rise<br />
        • Listen for breath sounds<br />
        • If not breathing normally, begin CPR<br />
        <br />
        <strong>3. Hand position</strong><br />
        • Place heel of one hand in center of chest<br />
        • Place other hand on top<br />
        • Interlock fingers<br />
        <br />
        <strong>4. Compressions</strong><br />
        • Push hard and fast<br />
        • At least 2 inches deep<br />
        • 100-120 compressions per minute<br />
        • 30 compressions, then 2 breaths<br />
        <br />
        <strong>5. AED Instructions</strong><br />
        • Turn on AED<br />
        • Follow voice prompts<br />
        • Do not touch patient during shock<br />
        • Resume CPR immediately after shock`
    },
    'cpr-child': {
      title: 'CPR Child (1-8 years) Protocol',
      content: `<strong>CPR for Children (Age 1-8):</strong><br />
        <br />
        <strong>1. Check responsiveness</strong><br />
        • Tap shoulders gently<br />
        • Call for help<br />
        <br />
        <strong>2. Check breathing</strong><br />
        • Look, listen, feel for breathing<br />
        • If not breathing, begin CPR<br />
        <br />
        <strong>3. Hand position</strong><br />
        • Use one or two hands<br />
        • Center of chest, between nipples<br />
        <br />
        <strong>4. Compressions</strong><br />
        • About 2 inches deep (1/3 chest depth)<br />
        • 100-120 compressions per minute<br />
        • 30 compressions, then 2 breaths<br />
        <br />
        <strong>5. Breaths</strong><br />
        • Tilt head back slightly<br />
        • Give 2 gentle breaths<br />
        • Watch for chest rise`
    },
    'cpr-infant': {
      title: 'CPR Infant/Newborn Protocol',
      content: `<strong>CPR for Infants (Under 1 year):</strong><br />
        <br />
        <strong>1. Check responsiveness</strong><br />
        • Tap foot gently<br />
        • Call for help immediately<br />
        <br />
        <strong>2. Check breathing</strong><br />
        • Look for chest movement<br />
        • Listen for breath sounds<br />
        <br />
        <strong>3. Hand position</strong><br />
        • Use two fingers only<br />
        • Just below nipple line<br />
        <br />
        <strong>4. Compressions</strong><br />
        • About 1.5 inches deep (1/3 chest depth)<br />
        • 100-120 compressions per minute<br />
        • 30 compressions, then 2 breaths<br />
        <br />
        <strong>5. Breaths</strong><br />
        • Cover infant's mouth and nose<br />
        • Give 2 small puffs of air<br />
        • Watch for chest rise<br />
        <br />
        <strong>Special Considerations:</strong><br />
        • Be gentle but effective<br />
        • Continue until help arrives<br />
        • Do not stop unless infant responds`
    }
  };
  
  const content = contentMap[navId] || {
    title: 'CPR Protocol',
    content: 'CPR instructions will be displayed here.'
  };
  
  contentArea.innerHTML = `
    <article class="protocol-article">
      <h4 class="protocol-title">${content.title}</h4>
      <div class="protocol-content">
        ${content.content}
      </div>
    </article>
  `;
  
  contentArea.scrollTop = 0;
}

// Show content for sub-navigation selection
function showSubNavContent(navId, subNavId) {
  const contentArea = document.getElementById('contentArea');
  
  // Content varies based on both main nav and sub-nav
  const title = getSubNavTitle(navId, subNavId);
  const content = getSubNavContentDetails(navId, subNavId);
  
  contentArea.innerHTML = `
    <article class="protocol-article">
      <h4 class="protocol-title">${title}</h4>
      <div class="protocol-content">
        ${content}
      </div>
    </article>
  `;
  
  contentArea.scrollTop = 0;
}

function getSubNavTitle(navId, subNavId) {
  const navTitles = {
    'cardiac': 'Cardiac',
    'choking': 'Choking',
    'head-neck': 'Head/Neck',
    'mental': 'Mental',
    'poisoning': 'Poisoning',
    'pregnancy': 'Pregnancy',
    'stroke': 'Stroke',
    'seizures': 'Seizures',
    'pediatrics': 'Pediatrics'
  };
  
  const subNavTitles = {
    'medic-response': 'Medic Response',
    'bls-red': 'BLS Red Response',
    'bls-yellow': 'BLS Yellow Response',
    'vital-points': 'Vital Points',
    'pre-arrival': 'Pre-arrival Instructions'
  };
  
  return `${navTitles[navId]} - ${subNavTitles[subNavId]}`;
}

function getSubNavContentDetails(navId, subNavId) {
  // This would contain detailed content for each combination
  // For brevity, showing a few examples
  
  if (subNavId === 'medic-response') {
    return `<strong>Medic Response Protocol:</strong><br />
      • ALS unit should be dispatched<br />
      • Estimated response time: 8-12 minutes<br />
      • Prepare patient information for transfer<br />
      • Clear access route for medics`;
  } else if (subNavId === 'bls-red') {
    return `<strong>BLS Red Response (Code 3):</strong><br />
      • Emergency lights and sirens authorized<br />
      • Life-threatening emergency response<br />
      • All units proceed with caution<br />
      • Priority traffic clearance`;
  } else if (subNavId === 'bls-yellow') {
    return `<strong>BLS Yellow Response (Code 2):</strong><br />
      • Urgent but not immediately life-threatening<br />
      • Expedited response without sirens<br />
      • Standard traffic rules apply<br />
      • Monitor for status changes`;
  } else if (subNavId === 'vital-points') {
    return `<strong>Vital Points to Monitor:</strong><br />
      • Patient level of consciousness<br />
      • Respiratory rate and quality<br />
      • Pulse rate and strength<br />
      • Skin color and temperature<br />
      • Blood pressure if equipment available<br />
      • Any changes in patient condition`;
  } else if (subNavId === 'pre-arrival') {
    return `<strong>Pre-arrival Instructions:</strong><br />
      <br />
      <strong>Stay on the line with caller:</strong><br />
      • Keep patient comfortable<br />
      • Do not give anything by mouth<br />
      • Monitor breathing and consciousness<br />
      • Have someone meet responders outside<br />
      • Clear path to patient<br />
      • Secure any pets<br />
      • Gather patient medications<br />
      <br />
      <strong>Report immediately if:</strong><br />
      • Patient stops breathing<br />
      • Patient becomes unconscious<br />
      • Condition worsens`;
  }
  
  return 'Detailed instructions for this protocol section.';
}

// Location Form
function initLocationForm() {
  const streetAddressInput = document.getElementById('street-address');
  const aptSuiteInput = document.getElementById('apt-suite');
  const commentsTextarea = document.getElementById('comments');
  const searchBtn = document.getElementById('searchBtn');
  const addressResults = document.getElementById('addressResults');
  const addressList = document.getElementById('addressList');

  // Mock address database - replace with your actual addresses
  const mockAddresses = [
    '630 W BROADWAY, GLN',
    '630 E BROADWAY, GLN',
    '630 W BROADWAY, GLN (ROYAL PALMS CONV)',
    '630 N BROADWAY, GLN, LFD',
    '630 S BROADWAY, GLN, LFD',
    '1234 MAIN STREET, GLN',
    '5678 OAK AVENUE, GLN',
    '910 PINE ROAD, GLN',
    '1122 ELM STREET, GLN',
    '3344 MAPLE DRIVE, GLN'
  ];

  streetAddressInput.addEventListener('input', function(e) {
    state.locationData.streetAddress = e.target.value;
  });

  aptSuiteInput.addEventListener('input', function(e) {
    state.locationData.aptSuite = e.target.value;
  });

  commentsTextarea.addEventListener('input', function(e) {
    state.locationData.comments = e.target.value;
  });

  searchBtn.addEventListener('click', function() {
    const searchQuery = state.locationData.streetAddress.trim().toLowerCase();
    
    console.log('Searching for location:', searchQuery);
    
    if (!searchQuery) {
      alert('Please enter an address to search');
      return;
    }

    // Filter addresses based on search query
    const filteredAddresses = mockAddresses.filter(function(address) {
      return address.toLowerCase().includes(searchQuery);
    });

    // Display results
    if (filteredAddresses.length > 0) {
      displayAddressResults(filteredAddresses);
    } else {
      // Show "no results" message
      addressList.innerHTML = '<li style="padding: 20px; text-align: center; color: #666;">No addresses found. Try a different search.</li>';
      addressResults.style.display = 'block';
    }
  });

  function displayAddressResults(addresses) {
    // Clear previous results
    addressList.innerHTML = '';
    
    // Create list items for each address
    addresses.forEach(function(address) {
      const li = document.createElement('li');
      li.textContent = address;
      li.addEventListener('click', function() {
        // Populate the street address field with selected address
        streetAddressInput.value = address;
        state.locationData.streetAddress = address;
        
        // Hide the results box
        addressResults.style.display = 'none';
        
        console.log('Selected address:', address);
      });
      addressList.appendChild(li);
    });
    
    // Show the results box
    addressResults.style.display = 'block';
  }

  // Hide results when clicking outside
  document.addEventListener('click', function(e) {
    if (!addressResults.contains(e.target) && 
        e.target !== searchBtn && 
        e.target !== streetAddressInput) {
      addressResults.style.display = 'none';
    }
  });
}

// Priority Buttons
function initPriorityButtons() {
  const priorityButtons = document.querySelectorAll('.priority-btn');
  const mapIframe = document.getElementById('mapIframe');

  // Map URLs for different priority levels
  const mapUrls = {
    'default': 'https://www.google.com/maps/d/u/0/embed?mid=1pwDgEjVgBxybEP34OjHv9x0VRGefprE&ehbc=2E312F',
    'priority1': 'https://www.google.com/maps/d/u/0/embed?mid=1pwDgEjVgBxybEP34OjHv9x0VRGefprE&ehbc=2E312F',
    'priority2': 'https://www.google.com/maps/d/u/0/embed?mid=1pwDgEjVgBxybEP34OjHv9x0VRGefprE&ehbc=2E312F',
    'priority3': 'https://www.google.com/maps/d/u/0/embed?mid=1pwDgEjVgBxybEP34OjHv9x0VRGefprE&ehbc=2E312F'
  };

  console.log('Initializing priority buttons...');

  priorityButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      const priorityLevel = parseInt(this.getAttribute('data-priority'));
      const mapType = this.getAttribute('data-map');
      
      console.log('Priority button clicked:', priorityLevel, mapType);
      
      // Update state
      state.priority = priorityLevel;
      
      // Update UI
      priorityButtons.forEach(function(btn) {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      });
      
      this.classList.add('active');
      this.setAttribute('aria-pressed', 'true');
      
      // Update map iframe
      if (mapIframe && mapUrls[mapType]) {
        mapIframe.src = mapUrls[mapType];
        console.log('Map updated to:', mapType);
      }
    });
  });

  console.log('Priority buttons initialized');
}

// Dispatch Buttons
function initDispatchButtons() {
  const dispatchButtons = document.querySelectorAll('.dispatch-btn');

  dispatchButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      const buttonId = this.getAttribute('data-dispatch');
      console.log('Dispatch button clicked:', buttonId);
      
      if (buttonId === 'reset-simulation') {
        const confirmed = confirm('Are you sure you want to reset the simulation?');
        if (confirmed) {
          console.log('Simulation reset confirmed');
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
    callerName: '',
    callerNumber: '',
    type: '',
    idcCode: ''
  };
  state.locationData = {
    streetAddress: '',
    aptSuite: '',
    comments: ''
  };
  state.priority = 1;
  state.navigation = {
    activeNav: null,
    activeSubNav: null
  };

  // Reset form inputs
  document.getElementById('caller-name').value = '';
  document.getElementById('caller-number').value = '';
  document.getElementById('type').value = '';
  document.getElementById('idc-code').value = '';
  document.getElementById('street-address').value = '';
  document.getElementById('apt-suite').value = '';
  document.getElementById('comments').value = '';
  
  // Hide address results
  const addressResults = document.getElementById('addressResults');
  if (addressResults) {
    addressResults.style.display = 'none';
  }

  // Reset priority buttons
  const priorityButtons = document.querySelectorAll('.priority-btn');
  priorityButtons.forEach(function(btn) {
    btn.classList.remove('active');
    btn.setAttribute('aria-pressed', 'false');
  });
  document.querySelector('.priority-btn[data-priority="1"]').classList.add('active');
  document.querySelector('.priority-btn[data-priority="1"]').setAttribute('aria-pressed', 'true');
  
  // Reset map iframe
  const mapIframe = document.getElementById('mapIframe');
  if (mapIframe) {
    mapIframe.src = 'https://www.google.com/maps/d/u/0/embed?mid=1pwDgEjVgBxybEP34OjHv9x0VRGefprE&ehbc=2E312F';
  }
  
  // Reset navigation
  const navButtons = document.querySelectorAll('.code-btn');
  navButtons.forEach(function(btn) {
    btn.classList.remove('active');
  });
  
  const subNavItems = document.querySelectorAll('.sub-nav-item');
  subNavItems.forEach(function(item) {
    item.classList.remove('active');
  });
  
  // Hide sub-nav and reset content
  document.getElementById('subNavContainer').style.display = 'none';
  document.getElementById('contentArea').innerHTML = `
    <article class="protocol-article">
      <h4 class="protocol-title">Select a protocol to view content</h4>
      <div class="protocol-content">
        Click a green button to see sub-navigation options, or click a red CPR button to view content directly.
      </div>
    </article>
  `;

  console.log('Simulation reset complete');
}
