
import React from 'react';
import { Invoice, Customer, Vehicle } from '@/types/billing';
import InvoicePrintHeader from './invoice/print/InvoicePrintHeader';
import InvoicePrintBillTo from './invoice/print/InvoicePrintBillTo';
import InvoicePrintVehicleDetails from './invoice/print/InvoicePrintVehicleDetails';
import InvoicePrintItemsTable from './invoice/print/InvoicePrintItemsTable';
import InvoicePrintTotals from './invoice/print/InvoicePrintTotals';
import InvoicePrintFooter from './invoice/print/InvoicePrintFooter';
import InvoicePrintStyles from './invoice/print/InvoicePrintStyles';

interface InvoicePrintPreviewProps {
  invoice: Invoice;
  customer: Customer;
  vehicle: Vehicle;
  onClose: () => void;
}

const InvoicePrintPreview = ({ invoice, customer, vehicle, onClose }: InvoicePrintPreviewProps) => {
  const handlePrint = () => {
    window.print();
  };

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN');
  };

  // Handle database field names (snake_case) vs TypeScript types (camelCase)
  const invoiceData = invoice as any;
  const customerData = customer as any;
  const vehicleData = vehicle as any;

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-auto">
      {/* Screen controls - hidden when printing */}
      <div className="print:hidden p-4 border-b flex justify-between items-center bg-gray-50">
        <h2 className="text-xl font-bold">Invoice Preview</h2>
        <div className="flex gap-2">
          <button 
            onClick={handlePrint}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Print
          </button>
          <button 
            onClick={onClose}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Close
          </button>
        </div>
      </div>

      {/* Invoice content - this will be printed */}
      <div className="print-content max-w-4xl mx-auto p-8 print:p-4 print:max-w-none print:mx-0">
        <InvoicePrintHeader />
        <InvoicePrintBillTo 
          customerData={customerData} 
          invoiceData={invoiceData} 
          formatDate={formatDate} 
        />
        <InvoicePrintVehicleDetails 
          vehicleData={vehicleData} 
          invoiceData={invoiceData} 
        />
        <InvoicePrintItemsTable invoiceData={invoiceData} />
        <InvoicePrintTotals invoiceData={invoiceData} />
        <InvoicePrintFooter invoiceData={invoiceData} />
      </div>

      <InvoicePrintStyles />
    </div>
  );
};

export default InvoicePrintPreview;
