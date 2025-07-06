
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Printer, 
  X,
  User,
  Car,
  Receipt,
  Calendar,
  FileText
} from "lucide-react";

interface InvoiceViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: any;
  customer: any;
  vehicle: any;
  onPrint: () => void;
}

const InvoiceViewModal = ({ isOpen, onClose, invoice, customer, vehicle, onPrint }: InvoiceViewModalProps) => {
  const [showPrintView, setShowPrintView] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'default';
      case 'pending': return 'secondary';
      case 'overdue': return 'destructive';
      case 'draft': return 'outline';
      default: return 'secondary';
    }
  };

  const handlePrint = () => {
    setShowPrintView(true);
    setTimeout(() => {
      window.print();
      setShowPrintView(false);
    }, 100);
  };

  if (showPrintView) {
    return (
      <div className="print-view fixed inset-0 bg-white z-[9999] overflow-auto">
        <div className="max-w-4xl mx-auto p-4">
          {/* Header */}
          <div className="text-center border-b-2 border-black pb-4 mb-6">
            <div className="flex items-center justify-center mb-4">
              <img 
                src="/lovable-uploads/79150a38-d99d-4155-a317-dc31ab547426.png" 
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

          {/* Invoice Header */}
          <div className="grid grid-cols-2 gap-8 mb-6">
            <div>
              <h2 className="text-xl font-bold mb-3">BILL TO:</h2>
              <div className="space-y-1">
                <p className="font-semibold">{customer.name}</p>
                <p>{customer.phone}</p>
                <p>{customer.email}</p>
                {customer.gst_number && (
                  <p><strong>GST No:</strong> {customer.gst_number}</p>
                )}
              </div>
            </div>
            <div className="text-right">
              <div className="space-y-2">
                <p><strong>Invoice No:</strong> {invoice.invoice_number}</p>
                <p><strong>Date:</strong> {formatDate(invoice.created_at)}</p>
                <p><strong>Due Date:</strong> {formatDate(invoice.due_date)}</p>
                <p><strong>Invoice Type:</strong> {invoice.invoice_type === 'gst' ? 'GST Invoice' : 'Non-GST Invoice'}</p>
              </div>
            </div>
          </div>

          {/* Vehicle Information */}
          <div className="bg-gray-50 p-4 rounded mb-6">
            <h3 className="font-bold mb-2">VEHICLE DETAILS:</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p><strong>Vehicle:</strong> {vehicle.make} {vehicle.model}</p>
                <p><strong>Registration:</strong> {vehicle.vehicle_number}</p>
              </div>
              <div>
                <p><strong>Type:</strong> {vehicle.vehicle_type}</p>
                {invoice.kilometers && (
                  <p><strong>Kilometers:</strong> {invoice.kilometers.toLocaleString()} km</p>
                )}
              </div>
            </div>
          </div>

          {/* Items Table */}
          <table className="w-full border-collapse border border-black mb-6">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-black p-2 text-left">Description</th>
                <th className="border border-black p-2 text-center">Qty</th>
                <th className="border border-black p-2 text-right">Rate</th>
                <th className="border border-black p-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {/* This would be populated with actual invoice items */}
              <tr>
                <td className="border border-black p-2">Sample Service</td>
                <td className="border border-black p-2 text-center">1</td>
                <td className="border border-black p-2 text-right">₹{invoice.subtotal?.toFixed(2)}</td>
                <td className="border border-black p-2 text-right">₹{invoice.subtotal?.toFixed(2)}</td>
              </tr>
              {invoice.labor_charges > 0 && (
                <tr>
                  <td className="border border-black p-2">Labor Charges</td>
                  <td className="border border-black p-2 text-center">1</td>
                  <td className="border border-black p-2 text-right">₹{invoice.labor_charges?.toFixed(2)}</td>
                  <td className="border border-black p-2 text-right">₹{invoice.labor_charges?.toFixed(2)}</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Totals */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div></div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>₹{invoice.subtotal?.toFixed(2)}</span>
              </div>
              {invoice.discount_percentage > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount ({invoice.discount_percentage}%):</span>
                  <span>-₹{invoice.discount_amount?.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Tax:</span>
                <span>₹{invoice.total_gst_amount?.toFixed(2) || '0.00'}</span>
              </div>
              <div className="border-t-2 border-black pt-2">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total Amount:</span>
                  <span>₹{invoice.total?.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          {invoice.notes && (
            <div className="mb-6">
              <h3 className="font-bold mb-2">NOTES:</h3>
              <p className="text-sm border p-3 rounded">{invoice.notes}</p>
            </div>
          )}

          {/* Terms and Signature */}
          <div className="grid grid-cols-2 gap-8 mt-12">
            <div>
              <h3 className="font-bold mb-2">TERMS & CONDITIONS:</h3>
              <div className="text-sm space-y-1">
                <p>• Payment is due within 30 days</p>
                <p>• All services carry warranty as per terms</p>
                <p>• Vehicle will be released only after payment</p>
              </div>
            </div>
            <div className="text-center">
              <div className="border-t border-black mt-16 pt-2">
                <p className="font-bold">Authorized Signature</p>
                <p className="text-sm">OM MURUGAN AUTO WORKS</p>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @media print {
            .print-view {
              position: static !important;
              background: white !important;
              z-index: auto !important;
              overflow: visible !important;
            }
            
            body * {
              visibility: hidden;
            }
            
            .print-view, .print-view * {
              visibility: visible;
            }
            
            @page {
              margin: 0.5in;
              size: A4;
            }
            
            * {
              -webkit-print-color-adjust: exact !important;
              color-adjust: exact !important;
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Invoice Details</h2>
          <div className="flex gap-2">
            <Button onClick={handlePrint} size="sm">
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button onClick={onClose} variant="outline" size="sm">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          {/* Invoice Header Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Receipt className="h-5 w-5" />
                  Invoice Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span>Invoice Number:</span>
                  <span className="font-medium">{invoice.invoice_number}</span>
                </div>
                <div className="flex justify-between">
                  <span>Type:</span>
                  <Badge variant="outline">{invoice.invoice_type}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Status:</span>
                  <Badge variant={getStatusColor(invoice.status)}>{invoice.status}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Created:</span>
                  <span>{formatDate(invoice.created_at)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Due Date:</span>
                  <span>{formatDate(invoice.due_date)}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Customer Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="font-medium">{customer.name}</p>
                <p className="text-sm text-gray-600">{customer.phone}</p>
                <p className="text-sm text-gray-600">{customer.email}</p>
                {customer.gst_number && (
                  <p className="text-sm text-blue-600">GST: {customer.gst_number}</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Vehicle Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="h-5 w-5" />
                Vehicle Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Vehicle</p>
                  <p className="font-medium">{vehicle.make} {vehicle.model}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Registration</p>
                  <p className="font-medium">{vehicle.vehicle_number}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Type</p>
                  <p className="font-medium capitalize">{vehicle.vehicle_type}</p>
                </div>
                {invoice.kilometers && (
                  <div>
                    <p className="text-sm text-gray-600">Kilometers</p>
                    <p className="font-medium">{invoice.kilometers.toLocaleString()} km</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Financial Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Financial Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>₹{invoice.subtotal?.toFixed(2)}</span>
                </div>
                {invoice.labor_charges > 0 && (
                  <div className="flex justify-between">
                    <span>Labor Charges:</span>
                    <span>₹{invoice.labor_charges?.toFixed(2)}</span>
                  </div>
                )}
                {invoice.discount_percentage > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({invoice.discount_percentage}%):</span>
                    <span>-₹{invoice.discount_amount?.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Tax Amount:</span>
                  <span>₹{invoice.total_gst_amount?.toFixed(2) || '0.00'}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total Amount:</span>
                  <span>₹{invoice.total?.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          {invoice.notes && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Notes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{invoice.notes}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InvoiceViewModal;
