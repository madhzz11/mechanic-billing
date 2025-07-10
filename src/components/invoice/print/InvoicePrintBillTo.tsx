import React from 'react';

interface InvoicePrintBillToProps {
  customerData: any;
  invoiceData: any;
  formatDate: (dateString: string | null | undefined) => string;
}

const InvoicePrintBillTo = ({ customerData, invoiceData, formatDate }: InvoicePrintBillToProps) => {
  return (
    <div className="grid grid-cols-2 gap-8 mb-6">
      <div>
        <h2 className="text-xl font-bold mb-3">BILL TO:</h2>
        <div className="space-y-1">
          <p className="font-semibold">{customerData.name || 'N/A'}</p>
          <p>{customerData.phone || 'N/A'}</p>
          <p>{customerData.email || 'N/A'}</p>
          {(customerData.gst_number || customerData.gstNumber) && (
            <p><strong>GST No:</strong> {customerData.gst_number || customerData.gstNumber}</p>
          )}
        </div>
      </div>
      <div className="text-right">
        <div className="space-y-2">
          <p><strong>Invoice No:</strong> {invoiceData.invoice_number || invoiceData.invoiceNumber || 'N/A'}</p>
          <p><strong>Date:</strong> {formatDate(invoiceData.created_at || invoiceData.createdAt)}</p>
          <p><strong>Due Date:</strong> {formatDate(invoiceData.due_date || invoiceData.dueDate)}</p>
          <p><strong>Invoice Type:</strong> {(invoiceData.invoice_type || invoiceData.invoiceType) === 'gst' ? 'GST Invoice' : 'Non-GST Invoice'}</p>
        </div>
      </div>
    </div>
  );
};

export default InvoicePrintBillTo;