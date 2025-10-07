import React from 'react';
import { CallerInfoForm } from '@/components/CallerInfoForm';
import { EmergencyCodesPanel } from '@/components/EmergencyCodesPanel';
import { LocationForm } from '@/components/LocationForm';
import { DispatchButtons } from '@/components/DispatchButtons';

const Index = () => {
  return (
    <main className="min-h-screen bg-gray-50">
      <CallerInfoForm />
      
      <div className="mt-[25px] px-5 max-md:max-w-full">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
          <div className="w-[33%] max-md:w-full max-md:ml-0">
            <EmergencyCodesPanel />
          </div>
          
          <div className="w-[67%] ml-5 max-md:w-full max-md:ml-0">
            <LocationForm />
            <DispatchButtons />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Index;
