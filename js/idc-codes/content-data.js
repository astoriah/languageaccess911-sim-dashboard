/**
 * Content Data Configuration
 *
 * HTML content for each emergency type, including:
 * - Vital assessment points
 * - Pre-arrival instructions
 * - CPR instructions for different age groups
 */

export const contentData = {
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
    <p><strong>**If RP cannot tell if the patient is breathing normally, assume the patient is not breathing normally, go directly to age-appropriate CPR PAI.</strong></p>
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
      <li>If patient is able to breathe, talk, or cry (infant):</li>
      <li>Allow position of comfort</li>
      <li>Encourage coughing</li>
    </ul>
  `,
  "fall-accident": `
    <h3>Fall/Accident</h3>
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
    <h5>Short Report</h5>
    <ul>
      <li>Is the patient violent?</li>
      <li>Does the patient have access to a weapon?</li>
      <li>Is the patient acting normally?</li>
      <li>If not, what is different?</li>
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
  "cpr-pai": `
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
    <h4>Foreign Body Airway Obstruction: (confirmed choking now unconscious)</h4>
    <ul>
      <li>After each set of 30 compressions "Look inside the mouth, remove any obvious obstruction". If object is removed give two ventilations between each set of 30 compressions. If object not seen continue with compressions.</li>
    </ul>
    <h4>NOTE:</h4>
    <p>IF CALLER REPORTS VOMITING, INSTRUCT CALLER TO:</p>
    <ul>
      <li>Turn their head to one side.</li>
      <li>Sweep out contents with your fingers before you resume</li>
    </ul>
    
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
  "choking-pai": `
    <h3>Choking PAI</h3>
    
    <h4>CHOKING - ADULT</h4>
    <p><strong>If person is UNCONSCIOUS, go to CPR/Adult Instructions.</strong></p>
    <p><strong>If person is CONSCIOUS:</strong></p>
    <ol>
      <li>Is the person able to TALK or COUGH:</li>
    </ol>
    <ul>
      <li><strong>(If YES):</strong> STOP</li>
      <li><strong>(If NO):</strong> Listen carefully. I'll tell you what to do next.</li>
    </ul>
    <ol>
      <li>Stand BEHIND the person. Wrap your arms AROUND the waist.</li>
      <li>Make a fist with ONE hand and place it against the STOMACH, in the MIDDLE slightly ABOVE the navel.</li>
      <li>GRASP your fist with the other hand.</li>
      <li>PRESS into the stomach with QUICK, UPWARD thrusts. Repeat thrusts until the item is expelled.</li>
    </ol>
    <p><strong>If the person becomes unconscious, go to CPR/Adult Instructions.</strong></p>

    <h4>CHOKING – CHILD (1-8 Yrs.)</h4>
    <p><strong>If child is UNCONSCIOUS, go to CPR/Child Instructions.</strong></p>
    <p><strong>If child is CONSCIOUS:</strong></p>
    <ol>
      <li>Is the child able to TALK or COUGH:</li>
    </ol>
    <ul>
      <li><strong>(If YES):</strong> STOP.</li>
      <li><strong>(If NO):</strong> Listen carefully. I'll tell you what to do next.</li>
    </ul>
    <ol>
      <li>Stand BEHIND the child. Wrap your arms AROUND the waist.</li>
      <li>Make a fist with ONE hand and place it against the STOMACH, in the MIDDLE slightly ABOVE the navel.</li>
      <li>GRASP your fist with the other hand.</li>
      <li>PRESS into the stomach with QUICK, UPWARD thrusts. Repeat thrusts until the item is expelled.</li>
    </ol>
    <p><strong>If the child becomes unconscious, go to CPR/Child Instructions.</strong></p>

    <h4>CHOKING – INFANT (0-12 months)</h4>
    <p><strong>If child is UNCONSCIOUS, go to CPR/Infant Instructions.</strong></p>
    <p><strong>If child is CONSCIOUS:</strong></p>
    <ol>
      <li>Is the child able to CRY or COUGH:</li>
    </ol>
    <ul>
      <li><strong>(If YES):</strong> STOP.</li>
      <li><strong>(If NO):</strong> Listen carefully. I'll tell you what to do next.</li>
    </ul>
    <ol>
      <li>Position the infant FACE DOWN on your forearm, supporting the head and jaw with your hand.</li>
      <li>Give 5 BACK BLOWS between the shoulder blades with the heel of your hand.</li>
      <li>Turn the infant FACE UP on your other forearm.</li>
      <li>Give 5 CHEST THRUSTS using two fingers on the center of the chest, just below the nipple line.</li>
      <li>Continue alternating 5 back blows and 5 chest thrusts until the item is expelled.</li>
    </ol>
    <p><strong>If the child becomes unconscious, go to CPR/Infant Instructions.</strong></p>
  `,
  "childbirth-pai": `
    <h3>Childbirth PAI</h3>
    <ol>
      <li>Has she had a baby before?</li>
      <li>How many minutes between her contractions? <em>Contractions with less than 2 minutes between them (especially if the woman feels a strong desire to push), indicate birth may be imminent.</em></li>
      <li><strong>If there are more than 2 minutes between contractions:</strong> Listen carefully. I'll tell you what to do. Have her LIE in a comfortable position on her LEFT SIDE and take DEEP breaths. I have advised the dispatcher to send help.</li>
      <li><strong>If contractions are less than 2 minutes between contractions and if there is a strong desire to push:</strong> Listen carefully, I'll tell you what to do.
        <ul>
          <li>Get the phone NEXT to her, if you can.</li>
          <li>Ask her to LIE on her BACK and relax, breathing DEEPLY through her MOUTH.</li>
          <li>Ask her to remove underwear and BEND her KNEES.</li>
          <li>Place clean towels UNDER her BUTTOCKS and have additional clean towels ready.</li>
        </ul>
      </li>
      <li><strong>If she starts to deliver (baby's head appears):</strong> Listen carefully. I'll tell you what to do.
        <ul>
          <li>The baby's head should deliver first. CRADLE it and the rest of the baby as it is delivered. DO NOT PUSH OR PULL.</li>
          <li>There will be water and blood with delivery. THIS IS NORMAL.</li>
          <li>When the baby is delivered, CLEAN out its MOUTH and NOSE with a CLEAN, DRY cloth.</li>
          <li>Do NOT attempt to CUT or PULL the cord.</li>
          <li>Wrap the baby in a clean towel, or whatever is handy, and place it between mother's legs.</li>
          <li>Massage mother's lower abdomen very gently.</li>
          <li>If the baby does NOT start breathing on its own, rub its back or gently slap the soles of its feet. If the baby DOESN'T begin breathing IMMEDIATELY, come back to the phone.</li>
          <li><strong>IF THE BABY DOES NOT BEGIN BREATHING ON ITS OWN: GO TO CPR/Neonate Instructions.</strong></li>
          <li>If/When the placenta (tissue at the other end of the umbilical cord) is delivered, WRAP IT.</li>
          <li>Keep the placenta LEVEL with or SLIGHTLY ABOVE the baby.</li>
          <li>If possible, STAY ON THE LINE.</li>
        </ul>
      </li>
      <li><strong>If there are complications (leg, arm, buttocks or umbilical cord presenting):</strong> REASSURE the mother. Tell her you have dispatched aid.</li>
    </ol>

    <h4>Pre-Arrival Instructions for Common Complications:</h4>
    
    <h5>Postpartum Hemorrhage</h5>
    <p><em>(external bleeding from the vagina, persistent abdominal rigidity or tenderness and signs of shock.)</em></p>
    <ul>
      <li>Firmly massage the lower abdomen in a circular motion.</li>
      <li>(Treat for shock): Keep the mother warm and elevate legs.</li>
      <li>Place a sanitary napkin over the vaginal opening.</li>
    </ul>

    <h5>Breech Presentation</h5>
    <p><em>(If a foot or arm presents, delivery is not possible in the field.)</em></p>
    <ul>
      <li>Support the baby with your hands, allowing the buttocks and trunk to deliver spontaneously.</li>
      <li>Support the legs and trunk of the infant. Never attempt to pull baby from vagina by legs or trunk.</li>
      <li>Raise the infant's body up until its face protrudes.</li>
    </ul>
    <p><strong>Did the baby deliver?</strong></p>
    <ul>
      <li><strong>(If unsuccessful, provide an airway for the baby):</strong> Push the vaginal wall away from baby's face.</li>
      <li>Keep doing that until help arrives.</li>
      <li>If the head does not deliver within 3 minutes of trying the above: Maintain the airway.</li>
      <li>Don't pull or touch the extremity. Place the mother with legs and buttocks elevated (Put something under her buttocks to elevate).</li>
    </ul>

    <h5>Prolapsed Umbilical Cord</h5>
    <ul>
      <li>Place the mother on her knees with her head resting on the floor and her buttocks in the air. Do not permit her to lie flat.</li>
      <li>Attempt to keep pressure off the cord.</li>
    </ul>
  `,
};
