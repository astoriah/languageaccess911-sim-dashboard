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
  priority: 1
};

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
  initCallerInfoForm();
  initEmergencyCodes();
  initLocationForm();
  initPriorityButtons();
  initDispatchButtons();
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

// Emergency Codes
function initEmergencyCodes() {
  const codeButtons = document.querySelectorAll('.code-btn');
  
  codeButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      const codeId = this.getAttribute('data-code');
      console.log('Emergency code selected:', codeId);
    });
  });
}

// Location Form
function initLocationForm() {
  const streetAddressInput = document.getElementById('street-address');
  const aptSuiteInput = document.getElementById('apt-suite');
  const commentsTextarea = document.getElementById('comments');
  const searchBtn = document.getElementById('searchBtn');

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
    console.log('Searching for location:', state.locationData.streetAddress);
  });
}

// Priority Buttons
function initPriorityButtons() {
  const priorityButtons = document.querySelectorAll('.priority-btn');

  priorityButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      const priorityLevel = parseInt(this.getAttribute('data-priority'));
      
      // Update state
      state.priority = priorityLevel;
      
      // Update UI
      priorityButtons.forEach(function(btn) {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      });
      
      this.classList.add('active');
      this.setAttribute('aria-pressed', 'true');
    });
  });
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

  // Reset form inputs
  document.getElementById('caller-name').value = '';
  document.getElementById('caller-number').value = '';
  document.getElementById('type').value = '';
  document.getElementById('idc-code').value = '';
  document.getElementById('street-address').value = '';
  document.getElementById('apt-suite').value = '';
  document.getElementById('comments').value = '';

  // Reset priority buttons
  const priorityButtons = document.querySelectorAll('.priority-btn');
  priorityButtons.forEach(function(btn) {
    btn.classList.remove('active');
    btn.setAttribute('aria-pressed', 'false');
  });
  document.querySelector('.priority-btn[data-priority="1"]').classList.add('active');
  document.querySelector('.priority-btn[data-priority="1"]').setAttribute('aria-pressed', 'true');

  console.log('Simulation reset complete');
}
