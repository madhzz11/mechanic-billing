import React from 'react';

interface InvoicePrintTotalsProps {
  invoiceData: any;
}

const InvoicePrintTotals = ({ invoiceData }: InvoicePrintTotalsProps) => {
  return (
    <div className="grid grid-cols-2 gap-8 mb-8">
      <div></div>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>₹{(invoiceData.subtotal || 0).toFixed(2)}</span>
        </div>
        {(invoiceData.discount_percentage || invoiceData.discount || 0) > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount ({invoiceData.discount_percentage || invoiceData.discount || 0}%):</span>
            <span>-₹{(invoiceData.discount_amount || ((invoiceData.subtotal || 0) * (invoiceData.discount_percentage || invoiceData.discount || 0)) / 100).toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span>{(invoiceData.invoice_type || invoiceData.invoiceType) === 'gst' ? 'GST:' : 'Tax:'}</span>
          <span>₹{(invoiceData.total_gst_amount || invoiceData.taxAmount || 0).toFixed(2)}</span>
        </div>
        <div className="border-t-2 border-black pt-2">
          <div className="flex justify-between font-bold text-lg">
            <span>Total Amount:</span>
            <span>₹{(invoiceData.total || 0).toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePrintTotals;