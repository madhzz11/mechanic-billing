import React from 'react';

const InvoicePrintStyles = () => {
  return (
    <style>{`
      @media print {
        * {
          -webkit-print-color-adjust: exact !important;
          color-adjust: exact !important;
        }
        
        /* Hide everything by default */
        body * {
          visibility: hidden !important;
        }
        
        /* Hide all modals, dialogs, and overlays */
        [role="dialog"],
        .modal,
        .dialog,
        .overlay,
        .sidebar,
        .navigation,
        .header,
        .footer,
        .print\\:hidden {
          display: none !important;
          visibility: hidden !important;
        }
        
        /* Show only the print preview container and its children */
        .fixed.inset-0.bg-white.z-50,
        .fixed.inset-0.bg-white.z-50 *,
        .print-content,
        .print-content * {
          visibility: visible !important;
          display: block !important;
        }
        
        /* Reset the print preview container for printing */
        .fixed.inset-0.bg-white.z-50 {
          position: static !important;
          background: white !important;
          z-index: auto !important;
        }
        
        /* Style the actual print content */
        .print-content {
          position: static !important;
          max-width: none !important;
          margin: 0 !important;
          padding: 20px !important;
          width: 100% !important;
          height: auto !important;
        }
        
        /* Page settings */
        @page {
          margin: 0.5in;
          size: A4;
        }
        
        /* Ensure proper spacing for tables and text */
        table {
          page-break-inside: avoid;
          break-inside: avoid;
        }
        
        tr {
          page-break-inside: avoid;
          break-inside: avoid;
        }
        
        /* Hide print controls */
        .print\\:hidden,
        button {
          display: none !important;
        }
      }
    `}</style>
  );
};

export default InvoicePrintStyles;