import React from 'react';

interface DispatchButton {
  id: string;
  label: string;
  type: 'primary' | 'secondary' | 'warning';
}

const dispatchButtons: DispatchButton[] = [
  { id: 'sheriff', label: 'Sheriff', type: 'primary' },
  { id: 'police-i3', label: 'Police I3', type: 'primary' },
  { id: 'fire-i3', label: 'Fire I3', type: 'primary' },
  { id: 'lang-access', label: 'Lang. Access', type: 'primary' },
  { id: 'ems-i3', label: 'EMS I3', type: 'primary' },
  { id: 'non-emerg', label: 'Non Emerg', type: 'primary' },
  { id: 'security', label: 'Security', type: 'secondary' },
  { id: 'utility', label: 'Utility', type: 'secondary' },
  { id: 'jail', label: 'Jail', type: 'secondary' },
  { id: 'hospital', label: 'Hospital', type: 'secondary' },
  { id: 'tow', label: 'Tow', type: 'secondary' },
  { id: 'reset-simulation', label: 'Reset Simulation', type: 'warning' }
];

export const DispatchButtons: React.FC = () => {
  const handleButtonClick = (buttonId: string) => {
    console.log(`Dispatch button clicked: ${buttonId}`);
    
    if (buttonId === 'reset-simulation') {
      const confirmed = window.confirm('Are you sure you want to reset the simulation?');
      if (confirmed) {
        console.log('Simulation reset confirmed');
      }
    }
  };

  const getButtonStyles = (type: string) => {
    switch (type) {
      case 'primary':
        return 'bg-[rgba(179,223,255,1)] text-black font-normal hover:bg-[rgba(159,203,235,1)]';
      case 'secondary':
        return 'text-white font-bold border-[rgba(179,223,255,1)] border-solid border-2 hover:bg-[rgba(179,223,255,0.1)]';
      case 'warning':
        return 'bg-[rgba(238,175,57,1)] text-black font-normal hover:bg-[rgba(218,155,37,1)]';
      default:
        return 'bg-[rgba(179,223,255,1)] text-black font-normal';
    }
  };

  return (
    <section className="bg-[rgba(6,82,181,1)] w-full mt-[15px] px-[29px] py-[17px] rounded-[5px] max-md:max-w-full max-md:px-5">
      <div className="flex gap-[40px_53px] text-xl text-black font-normal text-center flex-wrap max-md:max-w-full">
        {dispatchButtons.slice(0, 4).map((button) => (
          <div key={button.id} className="whitespace-nowrap flex-1">
            <button
              onClick={() => handleButtonClick(button.id)}
              className={`${getButtonStyles(button.type)} flex flex-col items-stretch justify-center px-6 py-[18px] rounded-[5px] w-full transition-colors`}
              aria-label={button.label}
            >
              {button.label}
            </button>
          </div>
        ))}
      </div>
      
      <div className="mt-4 max-md:max-w-full">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
          <div className="w-[54%] max-md:w-full max-md:ml-0">
            <div className="w-full text-xl text-white font-bold whitespace-nowrap text-center max-md:mt-10">
              <div className="flex items-stretch gap-[40px_55px]">
                {dispatchButtons.slice(6, 8).map((button) => (
                  <div key={button.id} className="flex-1">
                    <button
                      onClick={() => handleButtonClick(button.id)}
                      className={`${getButtonStyles(button.type)} flex flex-col items-stretch justify-center px-12 py-4 rounded-[5px] w-full transition-colors`}
                      aria-label={button.label}
                    >
                      {button.label}
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex items-stretch gap-[40px_55px] mt-[18px]">
                {dispatchButtons.slice(8, 10).map((button) => (
                  <div key={button.id} className="flex-1">
                    <button
                      onClick={() => handleButtonClick(button.id)}
                      className={`${getButtonStyles(button.type)} flex flex-col justify-center px-12 py-[18px] rounded-[5px] w-full transition-colors`}
                      aria-label={button.label}
                    >
                      {button.label}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="w-[23%] ml-5 max-md:w-full max-md:ml-0">
            <div className="grow text-xl text-center max-md:mt-10">
              <button
                onClick={() => handleButtonClick('ems-i3')}
                className="bg-[rgba(179,223,255,1)] flex flex-col items-stretch text-black font-normal justify-center px-14 py-[18px] rounded-[5px] max-md:px-5 w-full hover:bg-[rgba(159,203,235,1)] transition-colors"
                aria-label="EMS I3"
              >
                EMS I3
              </button>
              <button
                onClick={() => handleButtonClick('tow')}
                className="flex flex-col items-stretch text-white font-bold whitespace-nowrap justify-center mt-[18px] px-[67px] py-[18px] rounded-[5px] border-[rgba(179,223,255,1)] border-solid border-2 max-md:px-5 w-full hover:bg-[rgba(179,223,255,0.1)] transition-colors"
                aria-label="Tow"
              >
                Tow
              </button>
            </div>
          </div>
          
          <div className="w-[23%] ml-5 max-md:w-full max-md:ml-0">
            <div className="grow text-xl text-black font-normal text-center max-md:mt-10">
              <button
                onClick={() => handleButtonClick('non-emerg')}
                className="bg-[rgba(179,223,255,1)] flex flex-col items-stretch justify-center px-[37px] py-4 rounded-[5px] max-md:px-5 w-full hover:bg-[rgba(159,203,235,1)] transition-colors"
                aria-label="Non Emergency"
              >
                Non Emerg
              </button>
              <button
                onClick={() => handleButtonClick('reset-simulation')}
                className="bg-[rgba(238,175,57,1)] flex flex-col items-stretch justify-center mt-[18px] px-[11px] py-[18px] rounded-[5px] w-full hover:bg-[rgba(218,155,37,1)] transition-colors"
                aria-label="Reset Simulation"
              >
                Reset Simulation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
