import React from 'react';

const InvoicePrintHeader = () => {
  return (
    <div className="text-center border-b-2 border-black pb-4 mb-6">
      <div className="flex items-center justify-center mb-4">
        <img 
          src="/lovable-uploads/867f2348-4515-4cb0-8064-a7222ce3b23f.png" 
          alt="OM MURUGAN AUTO WORKS" 
          className="h-16 w-16 mr-4"
        />
        <div>
          <h1 className="text-3xl font-bold">OM MURUGAN AUTO WORKS</h1>
          <p className="text-lg mt-2">Complete Auto Care Solutions</p>
        </div>
      </div>
      <p className="text-sm">Phone: +91 98765 43210 | Email: info@ommurugan.com</p>
    </div>
  );
};

export default InvoicePrintHeader;