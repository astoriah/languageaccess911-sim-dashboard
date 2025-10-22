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
  initIDCToggle();
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

// IDC Toggle Functionality
function initIDCToggle() {
  const toggleBtn = document.getElementById("idcToggleBtn");
  const subNavContainer = document.getElementById("subNavContainer");
  const idcToggleTargets = document.querySelectorAll(".idc-toggle-target");

  // Check localStorage for saved state, default to hidden (false)
  const savedState = localStorage.getItem("idcCodesVisible");
  let isVisible = savedState === "true";

  // Apply initial state
  updateIDCVisibility(isVisible);

  // Toggle button click handler
  toggleBtn.addEventListener("click", function () {
    isVisible = !isVisible;
    updateIDCVisibility(isVisible);
    // Save state to localStorage
    localStorage.setItem("idcCodesVisible", isVisible);
    console.log("IDC codes visibility toggled:", isVisible);
  });

  function updateIDCVisibility(visible) {
    if (visible) {
      // Show IDC elements
      subNavContainer.classList.remove("hidden");
      idcToggleTargets.forEach(function (el) {
        el.classList.remove("hidden");
      });
      toggleBtn.classList.add("active");
      toggleBtn.textContent = "Hide IDC Codes";
    } else {
      // Hide IDC elements
      subNavContainer.classList.add("hidden");
      idcToggleTargets.forEach(function (el) {
        el.classList.add("hidden");
      });
      toggleBtn.classList.remove("active");
      toggleBtn.textContent = "Show IDC Codes";
    }
  }
}

// Navigation System
function initNavigation() {
  const navButtons = document.querySelectorAll(".code-btn");
  const subNavContainer = document.getElementById("subNavContainer");
  const subNavList = document.getElementById("subNavList");
  const contentArea = document.getElementById("contentArea");
  const idcCodeInput = document.getElementById("idc-code");
  const typeSelect = document.getElementById("type");

  // Define sub-navigation items for each main button
  const subNavData = {
    cardiac: [
      { id: "6M1", label: "6M1 - Unconscious or not breathing" },
      { id: "6M2", label: "6M2 - Obvious DOA, Child" },
      { id: "6R1", label: "6R1 - Obvious DOA, cold and stiff, no CPR in progress" },
      { id: "6R2", label: "6R2 - Adult patient with DNR, caller refusing to do CPR" },
    ],
    choking: [
      { id: "8M1", label: "8M1 - Unconscious or not breathing" },
      { id: "8M2", label: "8M2 - Unable to talk or cry (infants)" },
      { id: "8M3", label: "8M3 - Turning blue" },
      { id: "8R1", label: "8R1 - Able to talk or cry (infants)" },
      { id: "8R2", label: "8R2 - Breathing without difficulty" },
      { id: "8R3", label: "8R3 - No verifiable info from RP" },
    ],
    "head-neck": [
      { id: "12M1", label: "12M1 - Unconscious or not breathing" },
      { id: "12M2", label: "12M2 - Decreased LOC, nonresponsive to verbal or touch" },
      { id: "12R1", label: "12R1 - Disoriented, able to walk/talk" },
      { id: "12R2", label: "12R2 - No verifiable info from RP" },
      { id: "12R4", label: "12R4 - Visual difficulty" },
      { id: "12R5", label: "12R5 - Vertigo/Dizziness" },
    ],
    mental: [
      { id: "13M1", label: "13M1 - Unconscious or not breathing" },
      { id: "13M2", label: "13M2 - Suicide attempt with GSW, stabbing, or penetrating injury" },
      { id: "13M3", label: "13M3 - Excited delirium, police request" },
      { id: "13R1", label: "13R1 - Self-inflicted injuries" },
      { id: "13R2", label: "13R2 - Unusual behavior" },
      { id: "13R3", label: "13R3 - Panic attack" },
      { id: "13R5", label: "13R5 - No verifiable info from RP" },
    ],
    poisoning: [
      { id: "14M1", label: "14M1 - Unconscious or not breathing" },
      { id: "14M2", label: "14M2 - Respiratory Distress" },
      { id: "14M3", label: "14M3 - Decreased LOC, non-responsive to verbal or touch" },
      { id: "14M4", label: "14M4 - Intentional overdose with Rx meds" },
      { id: "14M5", label: "14M5 - Ingestion of caustic substance, with difficulty swallowing" },
      { id: "14R1", label: "14R1 - Intentional/accidental, with over the counter (OTC) meds" },
      { id: "14R2", label: "14R2 - No verifiable info from RP" },
      { id: "14R3", label: "14R3 - Reported O.D., patient denial or unknown substance taken" },
      { id: "14R7", label: "14R7 - Breathing difficulty / Acute alcohol and/or drug intoxication (responsive)" },
    ],
    pregnancy: [
      { id: "15M1", label: "15M1 - Unconscious or not breathing" },
      { id: "15M2", label: "15M2 - Pregnant, vaginal with sign of shock (syncope when sitting/standing)" },
      { id: "15M3", label: "15M3 - Sign of shock: Syncope when sitting/standing" },
      { id: "15M4", label: "15M4 - Labor pains/contractions (1st preg. < 2 min., 2nd preg. < 5 min.)" },
      { id: "15M6", label: "15M6 - Complications: Breech, abnormal presentation" },
      { id: "15R1", label: "15R1 - Vaginal bleeding" },
      { id: "15R2", label: "15R2 - 1st pregnancy with > 2 min. between contractions" },
      { id: "15R3", label: "15R3 - 2nd pregnancy with > 5 min. between contractions" },
      { id: "15R4", label: "15R4 - Abdominal injury w/o contractions, > 20 weeks pregnant" },
    ],
    seizures: [
      { id: "16M1", label: "16M1 - Not breathing after seizure stops" },
      { id: "16M2", label: "16M2 - Seizing now, > 5 minutes" },
      { id: "16M3", label: "16M3 - Multiple seizures, > 3 per hour" },
      { id: "16M4", label: "16M4 - Severe headache prior to seizure" },
      { id: "16M5", label: "16M5 - Diabetic" },
      { id: "16M7", label: "16M7 - Secondary to alcohol/drug use, overdose, or withdrawals" },
      { id: "16M8", label: "16M8 - Secondary to head injury in last 24 hours" },
      { id: "16R1", label: "16R1 - First time seizure" },
      { id: "16R2", label: "16R2 - Seizure(s) with history of seizure disorder" },
      { id: "16R3", label: "16R3 - Seizure(s), unknown history" },
      { id: "16R4", label: "16R4 - No verifiable info from RP" },
    ],
    stroke: [
      { id: "18M1", label: "18M1 - Unconscious or not breathing" },
      { id: "18M2", label: "18M2 - Sudden onset of headache with: slurred speech/blurred vision/weakness/vomiting" },
      { id: "18M3", label: "18M3 - Decreased LOC, non-responsive to verbal or touch" },
      { id: "18R1", label: "18R1 - Unilateral weakness, paralysis" },
      { id: "18R2", label: "18R2 - Weakness, numbness, or unable to stand/walk" },
      { id: "18R3", label: "18R3 - Diabetic" },
      { id: "18R4", label: "18R4 - Breathing difficulty" },
      { id: "18R5", label: "18R5 - No verifiable info from RP" },
    ],
    pediatrics: [
      { id: "20M1", label: "20M1 - Unconscious/unresponsive: Listless, limp, difficult or unable to awaken" },
      { id: "20M2", label: "20M2 - Able to awaken, poor appearance: Blue lips, mottled, gray/white" },
      { id: "20M3", label: "20M3 - Respiratory distress" },
      { id: "20M4", label: "20M4 - Seizures: multiple or extended" },
      { id: "20M5", label: "20M5 - Medication overdose, confirmed ingestion < 30 minutes" },
      { id: "20R1", label: "20R1 - Breathing difficulty" },
      { id: "20R2", label: "20R2 - Seizures: First time, w/ history, w/ fever" },
      { id: "20R3", label: "20R3 - Medication overdose: unconfirmed, > 30 min since ingestion" },
    ],
  };

  // Define content for each main button
  const contentData = {
    cardiac: `
      <h3>Cardiac Arrest</h3>
      <h4>Vital Points</h4>
      <h5>Medic:</h5>
      <p>If unsure about consciousness, use questions below to probe further:</p>
      <ul>
        <li>Does the patient respond to you?</li>
        <li>Respond to your voice (can they answer your questions?)</li>
        <li>Respond when you try to wake them.</li>
      </ul>
      <p>If unsure about breathing normally, inquire further:</p>
      <ul>
        <li>Does the patient's chest rise and fall?</li>
        <li>Describe the patient's breathing. Listen for sounds and frequency of breaths (agonal respirations described as):</li>
        <li>gurgling</li>
        <li>moaning</li>
        <li>barely breathing</li>
        <li>breathing every once in awhile</li>
        <li>takes breath now and then</li>
        <li>occasional breathing</li>
      </ul>
      <p><strong>If RP cannot tell if the patient is breathing normally, assume the patient is not breathing normally, go directly to age-appropriate CPR PAI.</strong></p>
      <h4>Pre-Arrival Instructions</h4>
      <ul>
        <li>If unconscious and not breathing normally, go directly to age-appropriate CPR PAI</li>
        <li>If unconscious and breathing normally, go directly to Unconscious/Breathing PAI</li>
      </ul>
    `,
    choking: `
      <h3>Choking</h3>
      <h4>Vital Points</h4>
      <h5>Medic:</h5>
      <ul>
        <li>Does the chest rise and fall?</li>
        <li>Is the patient able to talk or cry (infants)?</li>
        <li>Is the patient turning blue?</li>
        <li>Was the person eating or did they have anything in their mouth?</li>
        <li>If the child is 6 years or below, Remember, sometimes febrile seizures are originally reported as obstructed airways.</li>
        <li>If airway obstruction ruled out – go to PEDs card</li>
      </ul>
      <h4>Pre-Arrival Instructions</h4>
      <ul>
        <li>If patient is unable to talk or cry (infant), go directly to age-appropriate Choking PAI</li>
        <li>If patient is able to breathe, talk, or cry (infant): monitor</li>
      </ul>
    `,
    "head-neck": `
      <h3>Head/Neck</h3>
      <h4>Vital Points</h4>
      <p><strong>Ask to speak directly to the patient if possible!</strong></p>
      <h5>Medic:</h5>
      <ul>
        <li>Did the headache come on suddenly or gradually?</li>
        <li>Does the patient have any vision problems?</li>
        <li>Can the patient respond to you and follow simple commands?</li>
        <li>Can the patient answer your questions?</li>
        <li>Does the patient know where they are and who they are?</li>
        <li>Is the headache different than headaches the patient has had in the past?</li>
        <li>What was the patient doing when the headache started?</li>
        <li>How is the patient acting? If unusual, what is different about them?</li>
        <li>How does the patient look?</li>
      </ul>
      <h4>Pre-Arrival Instructions</h4>
      <ul>
        <li>Nothing by mouth.</li>
        <li>Allow patient to find position of comfort.</li>
        <li>Gather patient meds.</li>
      </ul>
    `,
    mental: `
      <h3>Mental/Emotion</h3>
      <h4>Vital Points</h4>
      <p><strong>Ask to speak directly to the patient if possible!</strong></p>
      <h5>Medic:</h5>
      <ul>
        <li>What happened?</li>
        <li>Is the scene secure?</li>
        <li>Is the suspect in the area? If yes, get description.</li>
        <li>Does the patient have a weapon or access to a weapon?</li>
        <li>Has the patient harmed themself?</li>
        <li>If yes, with what?</li>
        <li>What are the injuries?</li>
        <li>What part of the body is injured?</li>
      </ul>
      <h5>BLS Red:</h5>
      <ul>
        <li>Do you think the patient might harm themself?</li>
        <li>If yes, with what?</li>
        <li>Can the patient respond to you and follow simple commands?</li>
        <li>Can the patient answer your questions?</li>
        <li>If appropriate, has the patient taken any drugs or alcohol?</li>
        <li>Is the patient acting normally?</li>
        <li>If not, what is different or unusual?</li>
      </ul>
      <h4>Pre-Arrival Instructions</h4>
      <ul>
        <li>Keep patient in area, if safe.</li>
        <li>Keep patient calm.</li>
        <li>If you feel you are in danger, leave the scene if it's safe to do so.</li>
        <li>Does patient have access to any weapons?</li>
        <li>Gather patient meds.</li>
      </ul>
    `,
    poisoning: `
      <h3>O.D./Poisoning</h3>
      <h4>Vital Points</h4>
      <p><strong>Ask to speak directly to the patient if possible!</strong></p>
      <h5>Medic:</h5>
      <ul>
        <li>Can the patient speak normally?</li>
        <li>Is the patient having any trouble breathing?</li>
        <li>Can the patient respond to you and follow simple commands?</li>
        <li>Can the patient answer your questions?</li>
        <li>Is the patient having difficulty swallowing?</li>
        <li>What type of substance did the patient take?</li>
        <li>Was alcohol involved?</li>
        <li>If yes, what age is the patient?</li>
        <li>Recreational drugs?</li>
        <li>If yes, what kind?</li>
        <li>Prescription meds?</li>
        <li>If yes, what kind and how many?</li>
        <li>Has the patient had a seizure?</li>
        <li>Has the patient vomited?</li>
      </ul>
      <h5>BLS Red:</h5>
      <ul>
        <li>If the patient took medications, were they prescription meds?</li>
        <li>If yes, how many?</li>
        <li>How long ago did they ingest the substance?</li>
      </ul>
      <h4>Pre-Arrival Instructions</h4>
      <ul>
        <li>If unconscious and breathing normally, go directly to Unconscious/Breathing PAI.</li>
        <li>If patient responsive and laying down put them on their side.</li>
        <li>Keep patient in area/house if safe.</li>
        <li>Retrieve container of substance taken.</li>
        <li>Don't place patient in bath or shower.</li>
        <li>Nothing by mouth.</li>
        <li>Gather patient meds.</li>
      </ul>
      <h4>Assessment Questions</h4>
      <ul>
        <li>Is the patient violent?</li>
        <li>Does the patient have access to a weapon?</li>
        <li>Is the patient acting normally?</li>
        <li>If not, what is different?</li>
      </ul>
    `,
    pregnancy: `
      <h3>Pregnancy/GYN</h3>
      <h4>Vital Points</h4>
      <p><strong>Ask to speak directly to the patient if possible!</strong></p>
      <h5>Medic:</h5>
      <ul>
        <li>Is she bleeding?</li>
        <li>How does the patient look?</li>
        <li>How does she feel when they sit up?</li>
        <li>How long has she been having contractions?</li>
        <li>How many minutes between the beginning of one contraction to the beginning of the next?</li>
        <li>Is this her first pregnancy?</li>
        <li>How many weeks along is she?</li>
        <li>Has she received pre-natal care?</li>
        <li>Was there an injury?</li>
        <li>Has she had a seizure?</li>
        <li>Does she feel the urge to have a bowel movement?</li>
        <li>If post-delivery, is the baby breathing?</li>
      </ul>
      <h5>BLS Red:</h5>
      <ul>
        <li>Has she had any problems during pregnancy?</li>
      </ul>
      <h4>Pre-Arrival Instructions</h4>
      <h5>Childbirth Guidelines</h5>
      <ul>
        <li>If childbirth is imminent, go directly to appropriate Childbirth PAI.</li>
        <li>Do not let patient go to toilet.</li>
        <li>Have patient lie down on left side.</li>
        <li>Keep patient warm.</li>
        <li>Gather patient meds.</li>
        <li>Gather clean clothes or towels.</li>
      </ul>
    `,
    seizures: `
      <h3>Seizures</h3>
      <h4>Vital Points</h4>
      <p><strong>Ask to speak directly to the patient if possible!</strong></p>
      <h5>Medic:</h5>
      <ul>
        <li>How long has the patient been seizing?</li>
        <li>Is the patient still seizing?</li>
        <li>Has the patient had a seizure before?</li>
        <li>Is the patient diabetic?</li>
        <li>If female, is the woman pregnant? If yes, how many weeks pregnant?</li>
        <li>Has the patient taken any medication, recreational drugs, or alcohol?</li>
        <li>Has the patient had a recent head injury? If yes, when?</li>
        <li><strong>Remember to assess and re-assess breathing after the seizure!</strong></li>
      </ul>
      <h4>Pre-Arrival Instructions</h4>
      <ul>
        <li>If unconscious and not breathing, go directly to age-appropriate CPR PAI.</li>
        <li>If unconscious and breathing normally, go directly to Unconscious/Breathing PAI.</li>
        <li>Clear area around patient.</li>
        <li>Do not restrain patient.</li>
        <li>Do not place anything in patient's mouth.</li>
        <li>After seizure has stopped, assess breathing.</li>
        <li>Have patient lie on side.</li>
        <li>If peds seizure, remove clothing to cool patient.</li>
        <li>Gather patient meds.</li>
      </ul>
    `,
    stroke: `
      <h3>Stroke/CVA</h3>
      <h4>Vital Points</h4>
      <p><strong>Ask to speak directly to the patient if possible!</strong></p>
      <h5>Medic:</h5>
      <ul>
        <li>When did symptoms start?</li>
        <li>When was patient last seen acting normally?</li>
        <li><strong>IF LESS THAN 6 HRS SINCE ONSET OF SYMPTOMS, PROMPT RESPONDERS FOR STROKE PROTOCOL</strong></li>
        <li>Does the patient respond to you?</li>
        <li>Do they respond to your voice? (Can they answer your questions or follow simple commands)?</li>
        <li>Do they respond when you try to wake them?</li>
        <li>If acting unusual, what is different?</li>
        <li>Has the patient had a headache?</li>
        <li>Is the patient's speech slurred?</li>
        <li>Is the patient having any trouble breathing?</li>
        <li>Is the patient diabetic?</li>
      </ul>
      <h5>BLS Red:</h5>
      <ul>
        <li>How does the patient look?</li>
      </ul>
      <h4>Pre-Arrival Instructions</h4>
      <h5>Patient Care Instructions</h5>
      <ul>
        <li>Keep patient calm.</li>
        <li>Position of comfort.</li>
        <li>Nothing by mouth.</li>
        <li>Gather patient meds.</li>
        <li>Test patient's blood sugar, if you have the equipment and training to do this. Give results to the aid crew when they arrive.</li>
      </ul>
    `,
    pediatrics: `
      <h3>Pediatric Emerg.</h3>
      <h4>Vital Points</h4>
      <h5>Medic:</h5>
      <ul>
        <li>Does the child respond to you?</li>
        <li>How does the child look?</li>
        <li>What is the child's skin color?</li>
        <li>Is the child having any trouble breathing?</li>
        <li>Was the child breathing or did they have something in their mouth?</li>
        <li>Has the child had a seizure?</li>
        <li>Has the child been sick?</li>
        <li>If yes, was it rapid onset?</li>
        <li>If yes, how long has the child been sick?</li>
        <li>Does the child have a fever or feel hot to the touch?</li>
        <li>Is the child drooling or having difficulty swallowing?</li>
      </ul>
      <h5>BLS Red:</h5>
      <ul>
        <li>Does the child have any medical or congenital problems?</li>
      </ul>
      <p><strong>Note:</strong> Consider suspicious RP/abuse, check previous events history. Consider police response, especially if described mechanism does not fit severity of injury/condition.</p>
      <h4>Pre-Arrival Instructions</h4>
      <ul>
        <li>If unconscious and not breathing, go directly to age-appropriate CPR PAI.</li>
        <li>Keep child calm.</li>
        <li>Nothing by mouth.</li>
        <li>If febrile seizure, remove clothing to cool patient.</li>
      </ul>
    `,
    "cpr-adult": `
      <h3>CPR PAI - ADULT</h3>
      <ol>
        <li>Does anyone there know CPR? (Trained bystanders may still need instructions. Ask!)</li>
        <li>Get the phone NEXT to the person.</li>
        <li>Listen carefully. I'll tell you what to do.</li>
      </ol>
      <ul>
        <li>Get them FLAT on their back on the floor.</li>
        <li>BARE the chest.</li>
        <li>KNEEL by their side.</li>
        <li>Put the HEEL of your HAND on the CENTER of their CHEST, right BETWEEN the NIPPLES.</li>
        <li>Put your OTHER HAND ON TOP of THAT hand.</li>
        <li>PUSH DOWN FIRMLY, ONLY on the HEELS of your hands, 2 inches.</li>
        <li>Do it 50 times, just like you're PUMPING the chest. Count OUTLOUD 1-2-3...50. *** (correct rate if needed)</li>
        <li>KEEP DOING IT: KEEP PUMPING the CHEST UNTIL HELP TAKES OVER. I'll stay on the line.</li>
        <li>***If rescuer becomes too tired to continue instruct them to rest a short time then continue compressions as soon as possible.***</li>
      </ul>
      <h4>Ventilation Instructions:</h4>
      <p>(for use when suspected cardiac arrest secondary to respiratory arrest)</p>
      <ul>
        <li>PINCH the NOSE: With your other hand, LIFT the CHIN so the head BENDS BACK.</li>
        <li>Completely COVER their MOUTH with your MOUTH.</li>
        <li>GIVE TWO BREATHS OF AIR (come back to the phone).</li>
        <li>***Then back to compression instructions (#4 above) but give 30 compressions between breaths.***</li>
      </ul>
      <h4>Foreign Body Airway Obstruction:</h4>
      <p>(confirmed choking now unconscious)</p>
      <ul>
        <li>After each set of 30 compressions "Look inside the mouth, remove any obvious obstruction". If object is removed give two ventilations between each set of 30 compressions. If object not seen continue with compressions.</li>
      </ul>
      <h4>NOTE:</h4>
      <p>IF CALLER REPORTS VOMITING, INSTRUCT CALLER TO:</p>
      <ul>
        <li>Turn their head to one side.</li>
      </ul>
    `,
    "cpr-child": `
      <h3>CPR PAI – CHILD (1-8 Yrs.)</h3>
      <ol>
        <li>Does anyone there know CHILD CPR? (Trained bystanders may still need instructions. Ask!)</li>
        <li>Listen carefully. I'll tell you what to do.</li>
      </ol>
      <ul>
        <li>Move the child to a HARD surface (table or floor) near the phone.</li>
        <li>BARE the chest.</li>
        <li>PINCH the NOSE.</li>
        <li>With your OTHER hand, LIFT the CHIN and TILT the head back.</li>
        <li>If possible choking: "Look inside mouth, remove any obvious obstruction".</li>
        <li>Completely COVER their mouth with your mouth and give 2 breaths.</li>
      </ol>
      <ol start="3">
        <li>THEN COME BACK TO THE PHONE. If I'm not here, stay on the line.</li>
        <li>Listen carefully. I'll tell you what to do next.</li>
      </ol>
      <ul>
        <li>Put the HEEL of ONLY ONE HAND on the CENTER of the chest, right BETWEEN the NIPPLES.</li>
        <li>PUSH down firmly one-half the depth of the chest.</li>
        <li>Do this 30 times QUICKLY. Count OUTLOUD 1-2-3-4-5...30</li>
        <li>Then PINCH the NOSE, LIFT the CHIN, and gently tilt the head back.</li>
        <li>Give 2 breaths.</li>
        <li>Keep doing it until help can take over. I'll stay on the line.</li>
      </ul>
      <h4>NOTE:</h4>
      <p>IF CALLER REPORTS VOMITING, INSTRUCT CALLER TO:</p>
      <ul>
        <li>Turn their head to one side.</li>
        <li>Sweep it all out with your fingers before you resume ventilations.</li>
      </ul>
    `,
    "cpr-infant": `
      <h3>CPR PAI – INFANT (0-12 months)</h3>
      <ol>
        <li>Does anyone there know INFANT CPR? (Trained bystanders may still need instructions. Ask!)</li>
        <li>Bring the baby to the phone.</li>
        <li>Listen carefully. I'll tell you what to do.</li>
      </ol>
      <ul>
        <li>Lay the baby FLAT on their BACK on a table.</li>
        <li>BARE the baby's CHEST.</li>
        <li>LIFT the CHIN slightly. MAKE SURE THE NECK REMAINS LEVEL.</li>
        <li>If possible choking: "Look inside mouth, remove any obvious obstruction".</li>
        <li>TIGHTLY COVER the baby's MOUTH AND NOSE with your mouth.</li>
        <li>GIVE 2 BREATHS of air.</li>
        <li>THEN COME BACK TO THE PHONE. If I'm not here, stay on the line.</li>
      </ul>
      <ol start="4">
        <li>Listen carefully. I'll tell you what to do next.</li>
      </ol>
      <ul>
        <li>Put your FIRST AND MIDDLE fingertips on the CENTER of the chest, right BETWEEN the NIPPLES.</li>
        <li>PUSH down one-half the depth of the chest. Do it 30 times RAPIDLY. Count OUTLOUD 1-2-3-4-5...30</li>
        <li>Go do that. Then come back to the phone.</li>
      </ul>
      <ol start="5">
        <li>Listen carefully.</li>
      </ol>
      <p>NEXT, LIFT the CHIN slightly, MAKING SURE THE NECK REMAINS LEVEL, and give 2 quick breaths of air. Then, put your FIRST AND MIDDLE FINGERS on the CENTER OF THE CHEST, right BETWEEN the NIPPLES. PUSH down one-half the depth of the chest. Do it 30 times RAPIDLY. Count OUTLOUD 1-2-3-4-5...30. Follow with 2 breaths. KEEP DOING THIS. REMEMBER, 2 breaths, then 30 quick compressions. Keep doing it until help takes over. I'll stay on the line.</p>
      <h4>NOTE:</h4>
      <p>IF CALLER REPORTS VOMITING, INSTRUCT CALLER TO:</p>
      <ul>
        <li>Turn their head to the side.</li>
        <li>Sweep it out with your fingers before you resume ventilations. (Do not attempt to get anything out of the mouth that you cannot see - No Blind finger sweeps).</li>
      </ul>
    `,
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
      "1536 EASTLAKE AVE E (EASTLAKE VETERINARY HOSPITAL)",
      "1536 EASTLAKE AVE (MCDONALD'S)",
      "1540 EASTLAKE AVE E (EASTLAKE SPECIALTY MARKET)",
      "1540 EASTLAKE AVE",
      "1550 EASTLAKE AVE E (LA BELLE ELAINE'S BRIDAL)",
      "1550 EASTLAKE AVE (NORTEX BIOTECH LAB)",
      "1551 EASTLAKE AVE E (WASHINGTON BIOTECHNOLOGY)",
      "1551 EASTLAKE AVE (FURTHERDAY APT)",
      "1600 EASTLAKE AVE E (THE VICTOR TAVEN)",
      "1600 EASTLAKE AVE",
      "1629 EASTLAKE AVE E (SIAM ON EASTLAKE)",
      "1629 EASTLAKE AVE",
    ],
    1: [
      "207 PONTIUS AVE N (BEHNKE FAMILY HOUSE)",
      "207 PONTIONE AVE (7-11 SOUTH LAKE UNION)",
      "207 PONTER ST",
      "219 PONTIUS AVE N (WILLIAMS BUILDING)",
      "219 PONTIONE AVE",
      "219 PONTER ST (FAIRVIEW APT)",
      "224 PONTIUS AVE N (GOLDEN KEY CONSTRUCTION)",
      "224 PONTIONE AVE (STARBUCKS)",
      "224 PONTER ST (REI)",
      "309 PONTIUS AVE N (COMMON ARCE)",
      "309 PONTIONE AVE (QFC SOUTH LACK UNION)",
      "309 PONTER ST (CASCADE APT)",
      "325 PONTIUS AVE N",
      "325 PONTIONE AVE (POWER GYM)",
      "325 PONTER ST (TEA LEAF CAFE)",
      "425 PONTIUS AVE N (PONTIUS BUILDING)",
      "425 PONTIONE AVE (HOMEVIEW APTS)",
      "425 PONTER ST",
      "528 PONTIUS AVE N (AMLI SOUTH LAKE UNION)",
      "528 PONTIONE AVE",
      "528 PONTER ST",
    ],
    2: [
      "1906 E ALDER ST",
      "1906 E ALDER AVE",
      "1906 E ALTER ST",
      "1910 E ALDER ST",
      "1910 E ALDER AVE",
      "1910 ALTER ST",
      "1913 E ALDER ST",
      "1913 E ALDER AVE",
      "1913 ALTER ST",
      "1914 E ALDER ST",
      "1914 E ALDER AVE",
      "1914 ALTER ST",
      "1917 E ALDER ST",
      "1917 E ALDER AVE",
      "1917 ALTER ST",
      "1918 E ALDER ST",
      "1918 E ALDER AVE",
      "1918 ALTER ST",
      "1921 E ALDER ST",
      "1921 E ALDER AVE",
      "1921 ALTER ST",
      "2007 E ALDER ST",
      "2007 E ALDER AVE",
      "2007 ALTER ST",
      "2011 E ALDER ST",
      "2011 E ALDER AVE",
      "2011 ALTER ST (BOYS AND GIRLS CLUB)",
      "2100 E ALDER ST",
      "2100 E ALDER AVE",
      "2100 ALTER ST",
      "2119 E ALDER ST",
      "2119 E ALDER AVE",
      "2119 ALTER ST",
    ],
    3: [
      "1507 BELMONT AVE (BOWIE SALON AND SPA)",
      "1507 BELMONT PLACE (76 GAS)",
      "1507 BELLEVUE AVE (SAFEWAY GROCERIES)",
      "1510 BELMONT AVE (MENYA MUSASHI TSUKEMEN & RAMEN)",
      "1510 BELMONT PLACE (STITCHES)",
      "1510 BELLEVUE AVE (SALT & STRAW)",
      "1513 BELMONT AVE",
      "1513 BELMONT PLACE",
      "1513 BELLEVUE AVE (SUNNYVIEW APTS)",
      "1515 BELMONT AVE (THE HELEN APTS)",
      "1515 BELMONT PLACE (THE CARMEN APTS)",
      "1515 BELLEVUE AVE (PLANET FITNESS CAPITOL HILL)",
      "1519 BELMONT AVE (REPUBLIC PARKING)",
      "1519 BELMONT PLACE (UNITED STATES POST OFFICE)",
      "1519 BELLEVUE AVE",
      "1530 BELMONT AVE (AVA CAPITOL HILL APTS)",
      "1530 BELMONT PLACE (CAPITOL CORNER STORE)",
      "1530 BELLEVUE AVE (EVA APTS)",
      "1535 BELMONT AVE",
      "1535 BELMONT PLACE (CHIPOTLE)",
      "1535 BELLEVUE AVE (JOY RETIREMENT COMMUNITY)",
      "5013 BELMONT AVE (TONY'S BISTRO)",
      "5013 BELMONT PLACE (VEE APTS)",
      "5013 BELLEVUE AVE (NEMO APTS)",
      "1511 BOYLSTON AVE (GLENCOE APT)",
      "1517 BOYLSTON AVE (THE BOYLSTON HOTEL)",
      "1525 BOYLSTON AVE",
      "1529 BOYLSTON AVE (RECHERCHE APT)",
      "500 E PIKE ST (ADD3)",
      "514 E PIKE ST (LA JOSIE'S)",
      "516 E PIKE ST (HALF AND HALF DOUGHNUT CO.)",
      "610 E PIKE ST",
      "501 E PINE ST (RAYGUN LOUNGE)",
      "519 E PINE ST (NEKO CAT CAFE)",
      "601 E PINE ST (BE HERE NOW.)",
      "611 E PINE ST (CAPITOL LOANS)",
      "619 E PINE ST (MASSIVE)",
      "1500 SUMMIT AVE (LOCAL FIT)",
      "1512 SUMMIT AVE (SUMMIT ARMS APTS)",
      "1518 SUMMIT AVE",
      "1526 SUMMIT AVE (501 E PINE ST PARKING)",
    ],
    4: [
      "1610 E THOMAS ST",
      "1610 THOMAS ST",
      "1610 THOMPSON AVE",
      "1618 E THOMAS ST",
      "1618 THOMAS ST (TIMELESS APTS)",
      "1618 THOMPSON AVE",
      "1620 E THOMAS ST",
      "1620 THOMAS ST",
      "1620 THOMPSON AVE",
      "1633 E THOMAS ST",
      "1633 THOMAS ST",
      "1633 THOMPSON AVE",
      "1713 E THOMAS ST",
      "1713 THOMAS ST",
      "1713 THOMPSON AVE",
      "1714 E THOMAS ST",
      "1714 THOMAS ST",
      "1714 THOMPSON AVE",
      "1717 E THOMAS ST",
      "1717 THOMAS ST (SOMOS CAFE)",
      "1717 THOMPSON AVE",
      "1722 E THOMAS ST",
      "1722 THOMAS ST",
      "1722 THOMPSON AVE",
      "1730 E THOMAS ST",
      "1730 THOMAS ST",
      "1730 THOMPSON AVE",
      "1807 E THOMAS ST",
      "1807 THOMAS ST",
      "1807 THOMPSON AVE",
      "1808 E THOMAS ST (RUGGED COUNTRY LODGE)",
      "1808 THOMAS ST",
      "1808 THOMPSON AVE",
      "1811 E THOMAS ST",
      "1811 THOMAS ST (SUNSET PROPERTIES)",
      "1811 THOMPSON AVE",
      "1820 E THOMAS ST (CORYELL COURT)",
      "1820 THOMAS ST",
      "1820 THOMPSON AVE",
      "1821 E THOMAS ST (THOMAS MANOR)",
      "1821 THOMAS ST",
      "1821 THOMPSON AVE",
    ],
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

// Priority Buttons
function initPriorityButtons() {
  const priorityButtons = document.querySelectorAll(".priority-btn");
  const mapIframe = document.getElementById("mapIframe");

  // Map URLs for different priority levels
  const mapUrls = {
    default: "https://www.google.com/maps/d/u/0/embed?mid=1HNRF0DNc1kRFEpBJPUlq9407sh28EZc&ehbc=2E312F&noprof=1",
    priority1: "https://www.google.com/maps/d/u/0/embed?mid=1Abzt71sTWbeySFxRCFPCT5s3yW7aGzg&ehbc=2E312F&noprof=1",
    priority2: "https://www.google.com/maps/d/u/0/embed?mid=1lQxqZSTYZjHc4C1ylMFlL52RmsoecnE&ehbc=2E312F&noprof=1",
    priority3: "https://www.google.com/maps/d/u/0/embed?mid=1kZ6pyuGSbwXmO7p1yduXuveGFRfd0as&ehbc=2E312F&noprof=1",
    priority4: "https://www.google.com/maps/d/u/0/embed?mid=1NDdxeO7eDowM_wxpxr0e9SBFFPJZsc0&ehbc=2E312F&noprof=1",
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
  
  const audio988 = document.getElementById("audio988");
  const audioLangLine = document.getElementById("audioLangLine");
  
  // Add error handling for audio files
  audio988.addEventListener("error", function(e) {
    console.error("Error loading 988 audio file:", e);
    alert("Error loading 988 audio file. Please check the file path.");
  });
  
  audioLangLine.addEventListener("error", function(e) {
    console.error("Error loading Language Line audio file:", e);
    alert("Error loading Language Line audio file. Please check the file path.");
  });
  
  // Add loaded event to confirm audio is ready
  audio988.addEventListener("loadeddata", function() {
    console.log("988 audio loaded successfully");
  });
  
  audioLangLine.addEventListener("loadeddata", function() {
    console.log("Language Line audio loaded successfully");
  });
  
  let currentAudio = null;

  dispatchButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const buttonId = this.getAttribute("data-dispatch");
      console.log("Dispatch button clicked:", buttonId);

      if (buttonId === "988") {
        // Play 988 audio
        playAudio(audio988);
      } else if (buttonId === "lang-access") {
        // Play Language Line audio
        playAudio(audioLangLine);
      } else if (buttonId === "reset-simulation") {
        const confirmed = confirm("Are you sure you want to reset the simulation?");
        if (confirmed) {
          console.log("Simulation reset confirmed");
          resetSimulation();
        }
      }
    });
  });

  // Audio playback function (no modal)
  function playAudio(audioElement) {
    // Stop any currently playing audio
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    // Set the current audio
    currentAudio = audioElement;

    // Play audio with error handling
    audioElement.currentTime = 0;
    const playPromise = audioElement.play();
    
    if (playPromise !== undefined) {
      playPromise
        .then(function() {
          console.log("Audio playback started successfully");
        })
        .catch(function(error) {
          console.error("Error playing audio:", error);
          alert("Error playing audio. Please check browser console.");
        });
    }

    // Reset current audio when ended
    audioElement.addEventListener("ended", function () {
      currentAudio = null;
    });
  }
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
