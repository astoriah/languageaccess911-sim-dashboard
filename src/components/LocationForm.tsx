import React, { useState } from 'react';

interface LocationData {
  streetAddress: string;
  aptSuite: string;
  comments: string;
}

export const LocationForm: React.FC = () => {
  const [locationData, setLocationData] = useState<LocationData>({
    streetAddress: '',
    aptSuite: '',
    comments: ''
  });

  const [priority, setPriority] = useState<number>(1);

  const handleInputChange = (field: keyof LocationData, value: string) => {
    setLocationData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSearch = () => {
    console.log('Searching for location:', locationData.streetAddress);
  };

  const handlePriorityChange = (newPriority: number) => {
    setPriority(newPriority);
  };

  return (
    <div className="w-full max-md:max-w-full max-md:mt-5">
      <div className="max-md:max-w-full">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
          <div className="w-6/12 max-md:w-full max-md:ml-0">
            <form className="flex w-full flex-col text-xl text-black font-normal max-md:max-w-full max-md:mt-[19px]">
              <fieldset>
                <legend>Location</legend>
                <input
                  type="text"
                  value={locationData.streetAddress}
                  onChange={(e) => handleInputChange('streetAddress', e.target.value)}
                  className="bg-white border self-stretch flex w-full shrink-0 h-[50px] mt-2.5 rounded-[10px] border-[rgba(190,190,190,1)] border-solid px-3"
                  placeholder="Enter street address"
                  aria-label="Street address"
                />
                <div className="text-base mt-[7px]">
                  Street address
                </div>
                
                <div className="self-stretch flex items-stretch gap-5 whitespace-nowrap text-center justify-between mt-4 max-md:max-w-full max-md:mr-[3px]">
                  <input
                    type="text"
                    value={locationData.aptSuite}
                    onChange={(e) => handleInputChange('aptSuite', e.target.value)}
                    className="bg-white border flex w-[199px] shrink-0 h-[50px] rounded-[5px] border-[rgba(190,190,190,1)] border-solid px-3"
                    placeholder="Apt, suite, etc."
                    aria-label="Apartment, suite, etc."
                  />
                  <button
                    type="button"
                    onClick={handleSearch}
                    className="bg-[rgba(179,223,255,1)] flex flex-col items-stretch justify-center px-[68px] py-[13px] rounded-[5px] max-md:px-5 hover:bg-[rgba(159,203,235,1)] transition-colors"
                  >
                    Search
                  </button>
                </div>
                
                <div className="text-base mt-[9px]">
                  Apt. suite, etc.
                </div>
                
                <label htmlFor="comments" className="mt-8 block">
                  Comments
                </label>
                <textarea
                  id="comments"
                  value={locationData.comments}
                  onChange={(e) => handleInputChange('comments', e.target.value)}
                  className="bg-white border self-stretch flex w-full shrink-0 h-[406px] mt-2 rounded-[5px] border-[rgba(190,190,190,1)] border-solid max-md:mr-[3px] p-3 resize-none"
                  placeholder="Enter additional comments or notes..."
                  aria-label="Comments"
                />
              </fieldset>
            </form>
          </div>
          
          <div className="w-6/12 ml-5 max-md:w-full max-md:ml-0">
            <div className="w-full text-xl text-black font-normal whitespace-nowrap text-center max-md:max-w-full max-md:mt-[21px]">
              <div className="bg-white border flex shrink-0 h-[204px] rounded-[5px] border-[rgba(190,190,190,1)] border-solid max-md:max-w-full" 
                   role="img" 
                   aria-label="Map placeholder">
              </div>
              
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/311df0746ea2777efb56f6d33a43da0a894f714e?placeholderIfAbsent=true"
                className="aspect-[1.22] object-contain w-full mt-[30px] rounded-[5px] max-md:max-w-full"
                alt="Location map"
              />
              
              <div className="flex w-[239px] max-w-full items-stretch gap-[13px] mt-[19px]" role="group" aria-label="Priority selection">
                <div className="text-white font-semibold flex-1">
                  <div className="bg-[rgba(6,82,181,1)] flex flex-col items-center w-[50px] justify-center h-[50px] px-5 rounded-[5px]">
                    <div>P</div>
                  </div>
                </div>
                
                {[1, 2, 3].map((priorityLevel) => (
                  <div key={priorityLevel} className="flex-1">
                    <button
                      onClick={() => handlePriorityChange(priorityLevel)}
                      className={`border flex flex-col justify-center px-5 py-[18px] rounded-[5px] border-[rgba(190,190,190,1)] border-solid w-full h-[50px] transition-colors ${
                        priority === priorityLevel 
                          ? 'bg-[rgba(6,82,181,1)] text-white' 
                          : 'bg-white text-black hover:bg-gray-50'
                      }`}
                      aria-label={`Priority ${priorityLevel}`}
                      aria-pressed={priority === priorityLevel}
                    >
                      {priorityLevel}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
