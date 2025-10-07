import React from 'react';

interface EmergencyCode {
  id: string;
  label: string;
  type: 'emergency' | 'cpr';
}

const emergencyCodes: EmergencyCode[] = [
  { id: 'cardiac-arrest', label: 'Cardiac Arrest', type: 'emergency' },
  { id: 'choking', label: 'Choking', type: 'emergency' },
  { id: 'head-neck', label: 'Head/Neck', type: 'emergency' },
  { id: 'mental-emotion', label: 'Mental/Emotion', type: 'emergency' },
  { id: 'od-poisoning', label: 'O.D/Poisoning', type: 'emergency' },
  { id: 'pregnancy-childbirth', label: 'Pregnancy/Childbirth', type: 'emergency' },
  { id: 'stroke', label: 'Stroke', type: 'emergency' },
  { id: 'seizures', label: 'Seizures', type: 'emergency' },
  { id: 'pediatrics', label: 'Pediatrics', type: 'emergency' },
  { id: 'cpr-adult-aed', label: 'CPR Adult/AED PAI', type: 'cpr' },
  { id: 'cpr-child', label: 'CPR Child 1-8', type: 'cpr' },
  { id: 'cpr-infant', label: 'CPR Infant/Newborn', type: 'cpr' }
];

export const EmergencyCodesPanel: React.FC = () => {
  const handleCodeClick = (codeId: string) => {
    console.log(`Emergency code selected: ${codeId}`);
  };

  const renderCodeButton = (code: EmergencyCode) => {
    const bgColor = code.type === 'emergency' 
      ? 'bg-[rgba(14,156,57,0.5)]' 
      : 'bg-[rgba(230,31,31,1)]';
    
    return (
      <div key={code.id} className="flex-1">
        <button
          onClick={() => handleCodeClick(code.id)}
          className={`${bgColor} flex flex-col items-stretch justify-center px-4 py-3 rounded-[5px] w-full text-center hover:opacity-80 transition-opacity`}
          aria-label={`Select ${code.label} protocol`}
        >
          <div>{code.label}</div>
        </button>
      </div>
    );
  };

  const emergencyCodesOnly = emergencyCodes.filter(code => code.type === 'emergency');
  const cprCodes = emergencyCodes.filter(code => code.type === 'cpr');

  return (
    <aside className="bg-white border flex w-full flex-col items-stretch text-sm text-black font-bold mt-3 mx-auto py-5 rounded-[5px] border-[rgba(190,190,190,1)] border-solid max-md:max-w-full max-md:mt-8">
      <div className="self-center flex w-[398px] max-w-full items-stretch gap-7 text-center">
        {emergencyCodesOnly.slice(0, 3).map(renderCodeButton)}
      </div>
      <div className="self-center flex w-[398px] max-w-full items-stretch gap-7 whitespace-nowrap text-center mt-[17px]">
        {emergencyCodesOnly.slice(3, 6).map(renderCodeButton)}
      </div>
      <div className="self-center flex w-[398px] max-w-full items-stretch gap-7 whitespace-nowrap text-center mt-[17px]">
        {emergencyCodesOnly.slice(6, 9).map(renderCodeButton)}
      </div>
      <div className="self-center flex w-[398px] max-w-full items-stretch gap-7 text-center mt-[17px]">
        {cprCodes.map(renderCodeButton)}
      </div>
      
      <div className="w-[452px] shrink-0 max-w-full h-0.5 mt-[22px] border-[rgba(6,82,181,1)] border-solid border-2" />
      
      <section className="font-normal ml-6 mt-4 max-md:ml-2.5">
        <h3>Medic Response</h3>
      </section>
      
      <div className="border shrink-0 h-px mt-2.5 border-[rgba(190,190,190,1)] border-solid max-md:max-w-full" />
      
      <div className="flex flex-col items-stretch font-normal ml-6 mt-4 max-md:ml-2.5">
        <div>BLS Red Response</div>
        <div className="mt-[26px]">BLS Yellow Response</div>
      </div>
      
      <div className="border shrink-0 h-px mt-2.5 border-[rgba(190,190,190,1)] border-solid max-md:max-w-full" />
      
      <div className="flex flex-col items-stretch font-normal ml-[23px] mt-3 max-md:ml-2.5">
        <div>Vital Points</div>
        <div className="mt-[25px]">Pre-arrival Instructions</div>
      </div>
      
      <div className="w-[452px] shrink-0 max-w-full h-0.5 mt-[11px] border-[rgba(6,82,181,1)] border-solid border-2" />
      
      <article className="flex flex-col text-xl font-normal mt-2.5 pl-[23px] pr-[61px] max-md:max-w-full max-md:px-5">
        <h4 className="underline">
          6M1 - Unconscious or not breathing
        </h4>
        <div className="mt-[22px]">
          <strong>Medic:</strong>
          <br />
          <strong>If unsure about consciousness, use</strong>
          <br />
          <strong>questions below to probe further:</strong>
          <ul className="list-disc ml-5">
            <li>Does the patient respond to you?</li>
          </ul>
          • Respond to your voice (can they
          <br />
          answer your questions).
          <br />
          • Respond when you try to wake
          <br />
          them up.
          <br />
          <strong>If unsure about breathing normally,</strong>
          <br />
          <strong>inquire further:</strong>
          <br />
          • Does the patient's chest rise and fall?
          <br />
          • Describe the patient's breathing.
        </div>
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/f245750b3ba95375da5252e84a53378b1717e971?placeholderIfAbsent=true"
          className="aspect-[0.61] object-contain w-3.5 self-center mt-[34px]"
          alt="Protocol indicator"
        />
      </article>
    </aside>
  );
};
