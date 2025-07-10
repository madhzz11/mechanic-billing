import React from 'react';

interface InvoicePrintItemsTableProps {
  invoiceData: any;
}

const InvoicePrintItemsTable = ({ invoiceData }: InvoicePrintItemsTableProps) => {
  return (
    <table className="w-full border-collapse border border-black mb-6">
      <thead>
        <tr className="bg-gray-100">
          <th className="border border-black p-2 text-left">Description</th>
          <th className="border border-black p-2 text-center">HSN/SAC Code</th>
          <th className="border border-black p-2 text-center">Qty</th>
          <th className="border border-black p-2 text-right">Rate</th>
          <th className="border border-black p-2 text-right">Discount</th>
          <th className="border border-black p-2 text-right">Amount</th>
        </tr>
      </thead>
      <tbody>
        {(invoiceData.items || []).map((item: any, index: number) => (
          <tr key={index}>
            <td className="border border-black p-2">
              {item.name || 'N/A'}
              <div className="text-sm text-gray-600 capitalize">({item.item_type || item.type || 'item'})</div>
            </td>
            <td className="border border-black p-2 text-center">{item.sac_hsn_code || '-'}</td>
            <td className="border border-black p-2 text-center">{item.quantity || 0}</td>
            <td className="border border-black p-2 text-right">₹{(item.unit_price || item.unitPrice || 0).toFixed(2)}</td>
            <td className="border border-black p-2 text-right">₹{(item.discount_amount || item.discount || 0).toFixed(2)}</td>
            <td className="border border-black p-2 text-right">₹{(item.total_amount || item.total || 0).toFixed(2)}</td>
          </tr>
        ))}
        {(invoiceData.labor_charges || invoiceData.laborCharges || 0) > 0 && (
          <tr>
            <td className="border border-black p-2">Labor Charges</td>
            <td className="border border-black p-2 text-center">-</td>
            <td className="border border-black p-2 text-center">1</td>
            <td className="border border-black p-2 text-right">₹{(invoiceData.labor_charges || invoiceData.laborCharges || 0).toFixed(2)}</td>
            <td className="border border-black p-2 text-right">₹0.00</td>
            <td className="border border-black p-2 text-right">₹{(invoiceData.labor_charges || invoiceData.laborCharges || 0).toFixed(2)}</td>
          </tr>
        )}
        {(invoiceData.extra_charges || invoiceData.extraCharges || []).map((charge: any, index: number) => (
          <tr key={`extra-${index}`}>
            <td className="border border-black p-2">{charge.name || 'Extra Charge'}</td>
            <td className="border border-black p-2 text-center">-</td>
            <td className="border border-black p-2 text-center">1</td>
            <td className="border border-black p-2 text-right">₹{(charge.amount || 0).toFixed(2)}</td>
            <td className="border border-black p-2 text-right">₹0.00</td>
            <td className="border border-black p-2 text-right">₹{(charge.amount || 0).toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default InvoicePrintItemsTable;