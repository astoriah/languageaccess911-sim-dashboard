import React, { useState } from 'react';

interface CallerInfo {
  callerName: string;
  callerNumber: string;
  type: string;
  idcCode: string;
}

export const CallerInfoForm: React.FC = () => {
  const [callerInfo, setCallerInfo] = useState<CallerInfo>({
    callerName: '',
    callerNumber: '',
    type: '',
    idcCode: ''
  });

  const handleInputChange = (field: keyof CallerInfo, value: string) => {
    setCallerInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <section className="bg-neutral-100 px-5 py-[17px]">
      <form className="flex w-full items-stretch gap-[39px] text-xl text-black font-normal flex-wrap max-md:max-w-full">
        <div className="grow my-auto">
          <label htmlFor="caller-name" className="block">
            Caller Name
          </label>
        </div>
        <div className="flex gap-[15px] flex-wrap grow shrink basis-auto">
          <input
            id="caller-name"
            type="text"
            value={callerInfo.callerName}
            onChange={(e) => handleInputChange('callerName', e.target.value)}
            className="bg-white border w-[271px] shrink-0 max-w-full h-[50px] rounded-[5px] border-[rgba(190,190,190,1)] border-solid px-3"
            aria-label="Caller Name"
          />
          <label htmlFor="caller-number" className="self-stretch basis-auto my-auto">
            Caller Number
          </label>
          <input
            id="caller-number"
            type="tel"
            value={callerInfo.callerNumber}
            onChange={(e) => handleInputChange('callerNumber', e.target.value)}
            className="bg-white border w-[271px] shrink-0 max-w-full h-[50px] rounded-[5px] border-[rgba(190,190,190,1)] border-solid px-3"
            aria-label="Caller Number"
          />
          <label htmlFor="type" className="self-stretch my-auto">
            Type
          </label>
          <select
            id="type"
            value={callerInfo.type}
            onChange={(e) => handleInputChange('type', e.target.value)}
            className="bg-white border w-[207px] shrink-0 h-[50px] rounded-[5px] border-[rgba(190,190,190,1)] border-solid px-3"
            aria-label="Call Type"
          >
            <option value="">Select Type</option>
            <option value="emergency">Emergency</option>
            <option value="non-emergency">Non-Emergency</option>
            <option value="medical">Medical</option>
            <option value="fire">Fire</option>
            <option value="police">Police</option>
          </select>
          <label htmlFor="idc-code" className="self-stretch my-auto">
            IDC Code
          </label>
          <input
            id="idc-code"
            type="text"
            value={callerInfo.idcCode}
            onChange={(e) => handleInputChange('idcCode', e.target.value)}
            className="bg-white border w-[138px] shrink-0 h-[50px] rounded-[5px] border-[rgba(190,190,190,1)] border-solid px-3"
            aria-label="IDC Code"
          />
        </div>
      </form>
    </section>
  );
};
