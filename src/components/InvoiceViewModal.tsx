import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Printer, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
interface InvoiceViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: any;
  customer: any;
  vehicle: any;
  onPrint: () => void;
}
const InvoiceViewModal = ({
  isOpen,
  onClose,
  invoice,
  customer,
  vehicle,
  onPrint
}: InvoiceViewModalProps) => {
  const [invoiceItems, setInvoiceItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (invoice?.id && isOpen) {
      fetchInvoiceItems();
    }
  }, [invoice?.id, isOpen]);
  const fetchInvoiceItems = async () => {
    try {
      setLoading(true);
      const {
        data,
        error
      } = await supabase.from('invoice_items').select('*').eq('invoice_id', invoice.id);
      if (error) {
        console.error('Error fetching invoice items:', error);
        return;
      }
      console.log('Fetched invoice items:', data);
      setInvoiceItems(data || []);
    } catch (error) {
      console.error('Error fetching invoice items:', error);
    } finally {
      setLoading(false);
    }
  };
  if (!invoice || !customer || !vehicle) return null;
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN');
  };
  return <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle>Invoice Preview</DialogTitle>
            <div className="flex gap-2">
              <Button onClick={onPrint} size="sm" className="mx-[30px]">
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
              
            </div>
          </div>
        </DialogHeader>

        {/* Invoice Content - Styled to match the second image */}
        <div className="print-content bg-white p-6">
          {/* Header */}
          <div className="text-center border-b-2 border-black pb-4 mb-6">
            <div className="flex items-center justify-center mb-2">
              <img src="/lovable-uploads/867f2348-4515-4cb0-8064-a7222ce3b23f.png" alt="OM MURUGAN AUTO WORKS" className="h-12 w-12 mr-3" />
              <div>
                <h1 className="text-2xl font-bold">OM MURUGAN AUTO WORKS</h1>
                <p className="text-sm">Complete Auto Care Solutions</p>
              </div>
            </div>
            <div className="text-xs space-y-1">
              <p>Door No.8, 4th Main Road, Manikandapuram, Thirumullaivoyal,</p>
              <p>Chennai-600 062.</p>
              <div className="flex justify-center gap-4 mt-2">
                <p><strong>GSTIN/UIN:</strong> 33AXNPGZ146F1ZR</p>
                <p><strong>State Name:</strong> Tamil Nadu, <strong>Code:</strong> 33</p>
              </div>
              <div className="flex justify-center gap-4">
                <p><strong>E-Mail:</strong> gopalakrish.p86@gmail.com</p>
                <p><strong>Phone:</strong> + 91 9884551560</p>
              </div>
            </div>
          </div>

          {/* Invoice Details */}
          <div className="grid grid-cols-2 gap-8 mb-4">
            <div>
              <h3 className="font-bold mb-2">BILL TO:</h3>
              <div className="space-y-1 text-sm">
                <p className="font-semibold">{customer.name}</p>
                <p>{customer.phone}</p>
                <p>{customer.email}</p>
                {customer.gst_number && <p><strong>GST No:</strong> {customer.gst_number}</p>}
              </div>
            </div>
            <div className="text-right">
              <div className="space-y-1 text-sm">
                <p><strong>Invoice No:</strong> {invoice.invoice_number}</p>
                <p><strong>Date:</strong> {formatDate(invoice.created_at)}</p>
                <p><strong>Due Date:</strong> {formatDate(invoice.due_date || invoice.created_at)}</p>
                <p><strong>Invoice Type:</strong> {invoice.invoice_type === 'gst' ? 'GST Invoice' : 'Non-GST Invoice'}</p>
              </div>
            </div>
          </div>

          {/* Vehicle Details */}
          <div className="bg-gray-50 p-3 rounded mb-4">
            <h3 className="font-bold mb-2">VEHICLE DETAILS:</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p><strong>Vehicle:</strong> {vehicle.make} {vehicle.model}</p>
                <p><strong>Registration:</strong> {vehicle.vehicle_number}</p>
              </div>
              <div>
                <p><strong>Type:</strong> {vehicle.vehicle_type}</p>
                {invoice.kilometers && <p><strong>Kilometers:</strong> {invoice.kilometers.toLocaleString()} km</p>}
              </div>
            </div>
          </div>

          {/* Items Table */}
          <table className="w-full border-collapse border border-black mb-4 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-black p-2 text-left">HSN/SAC Code</th>
                <th className="border border-black p-2 text-left">Description</th>
                <th className="border border-black p-2 text-center">Qty</th>
                <th className="border border-black p-2 text-right">Rate</th>
                <th className="border border-black p-2 text-right">Discount</th>
                <th className="border border-black p-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {/* Display invoice items */}
              {invoiceItems.map((item: any, index: number) => <tr key={index}>
                  <td className="border border-black p-2">{item.sac_hsn_code || '-'}</td>
                  <td className="border border-black p-2">
                    {item.name}
                    <div className="text-xs text-gray-600 capitalize">({item.item_type})</div>
                  </td>
                  <td className="border border-black p-2 text-center">{item.quantity}</td>
                  <td className="border border-black p-2 text-right">₹{item.unit_price.toFixed(2)}</td>
                  <td className="border border-black p-2 text-right">₹{(item.discount_amount || 0).toFixed(2)}</td>
                  <td className="border border-black p-2 text-right">₹{item.total_amount.toFixed(2)}</td>
                </tr>)}
              
              {/* Labor charges if present */}
              {invoice.labor_charges > 0 && <tr>
                  <td className="border border-black p-2">-</td>
                  <td className="border border-black p-2">
                    Labor Charges
                    <div className="text-xs text-gray-600">(Service)</div>
                  </td>
                  <td className="border border-black p-2 text-center">1</td>
                  <td className="border border-black p-2 text-right">₹{invoice.labor_charges.toFixed(2)}</td>
                  <td className="border border-black p-2 text-right">₹0.00</td>
                  <td className="border border-black p-2 text-right">₹{invoice.labor_charges.toFixed(2)}</td>
                </tr>}
              
              {/* Extra charges if present */}
              {invoice.extra_charges?.map((charge: any, index: number) => <tr key={`extra-${index}`}>
                  <td className="border border-black p-2">-</td>
                  <td className="border border-black p-2">
                    {charge.name}
                    <div className="text-xs text-gray-600">(Extra Charge)</div>
                  </td>
                  <td className="border border-black p-2 text-center">1</td>
                  <td className="border border-black p-2 text-right">₹{charge.amount.toFixed(2)}</td>
                  <td className="border border-black p-2 text-right">₹0.00</td>
                  <td className="border border-black p-2 text-right">₹{charge.amount.toFixed(2)}</td>
                </tr>)}
              
              {/* Show loading state or empty message */}
              {loading && <tr>
                  <td colSpan={6} className="border border-black p-4 text-center">
                    Loading invoice items...
                  </td>
                </tr>}
              
              {!loading && invoiceItems.length === 0 && invoice.labor_charges === 0 && (!invoice.extra_charges || invoice.extra_charges.length === 0) && <tr>
                  <td colSpan={6} className="border border-black p-4 text-center text-gray-500">
                    No items found for this invoice
                  </td>
                </tr>}
            </tbody>
          </table>

          {/* Totals */}
          <div className="flex justify-end mb-6">
            <div className="w-64 space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>₹{invoice.subtotal.toFixed(2)}</span>
              </div>
              {invoice.invoice_type === 'gst' && <>
                  <div className="flex justify-between">
                    <span>CGST:</span>
                    <span>₹{(invoice.cgst_amount || 0).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>SGST:</span>
                    <span>₹{(invoice.sgst_amount || 0).toFixed(2)}</span>
                  </div>
                </>}
              <div className="border-t border-black pt-1">
                <div className="flex justify-between font-bold">
                  <span>Total Amount:</span>
                  <span>₹{invoice.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          {invoice.notes && <div className="mb-6">
              <h3 className="font-bold mb-2">NOTES:</h3>
              <p className="text-sm border p-3 rounded">{invoice.notes}</p>
            </div>}

          {/* Terms and Signature */}
          <div className="grid grid-cols-2 gap-8 mt-8">
            <div>
              <h3 className="font-bold mb-2">TERMS & CONDITIONS:</h3>
              <div className="text-xs space-y-1">
                <p>• Payment is due within 30 days</p>
                <p>• All services carry warranty as per terms</p>
                <p>• Vehicle will be released only after payment</p>
              </div>
            </div>
            <div className="text-center">
              <div className="border-t border-black mt-12 pt-2">
                <p className="font-bold text-sm">Authorized Signature</p>
                <p className="text-xs">OM MURUGAN AUTO WORKS</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>;
};
export default InvoiceViewModal;