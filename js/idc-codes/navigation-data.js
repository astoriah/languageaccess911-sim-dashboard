/**
 * Navigation Data Configuration
 *
 * Sub-navigation items for each main emergency type button.
 * Each item contains an IDC (International Diagnostic Code) and label.
 */

export const subNavData = {
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
  "fall-accident": [
    { id: "24M1", label: "24M1 - Unconscious or not breathing" },
    { id: "24M2", label: "24M2 - Decreased LOC, non-responsive to verbal or touch" },
    { id: "24M3", label: "24M3 - Respiratory Distress, unable to speak or leaning forward to breathe" },
    { id: "24M4", label: "24M4 - Trauma with shock: near syncope when sitting or standing" },
    { id: "24M5", label: "24M5 - Falls 10ft or greater, patient still down" },
    { id: "24R1", label: "24R1 - Single syncope" },
    { id: "24R2", label: "24R2 - Falls associated with or preceded by: Pain/discomfort in chest, Dizziness, Headache, Diabetic" },
    { id: "24R6", label: "24R6 - Major laceration with controllable bleeding" },
    { id: "24R7", label: "24R7 - Extremity fracture, single femur, or hip fracture/dislocation" },
    { id: "24R8", label: "24R8 - No verifiable info from RP" },
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
    { id: "14R7", label: "14R7 - Breathing difficulty" },
    { id: "14R8", label: "14R8 - Acute alcohol and/or drug intoxication (responsive)" },
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
    {
      id: "18M2",
      label:
        "18M2 - Sudden onset of headache with: slurred speech, blurred/double vision, weakness/paralysis, vomiting",
    },
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
