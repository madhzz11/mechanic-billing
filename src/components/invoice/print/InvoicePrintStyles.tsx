import React from 'react';

const InvoicePrintStyles = () => {
  return (
    <style>{`
      @media print {
        * {
          -webkit-print-color-adjust: exact !important;
          color-adjust: exact !important;
        }
        
        /* Hide the wrapper */
        .fixed {
          display: none !important;
        }
        
        /* Show only the print content */
        .print-content {
          display: block !important;
          position: static !important;
          max-width: none !important;
          margin: 0 !important;
          padding: 20px !important;
        }
        
        @page {
          margin: 0.5in;
          size: A4;
        }
        
        /* Ensure only this print content is visible */
        .fixed:not(.print-content) {
          display: none !important;
        }
        
        /* Hide any other modals or overlays */
        [role="dialog"], .modal {
          display: none !important;
        }
      }
    `}</style>
  );
};

export default InvoicePrintStyles;