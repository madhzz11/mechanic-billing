import React from 'react';

interface InvoicePrintVehicleDetailsProps {
  vehicleData: any;
  invoiceData: any;
}

const InvoicePrintVehicleDetails = ({ vehicleData, invoiceData }: InvoicePrintVehicleDetailsProps) => {
  return (
    <div className="bg-gray-50 print:bg-gray-100 p-4 rounded mb-6">
      <h3 className="font-bold mb-2">VEHICLE DETAILS:</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p><strong>Vehicle:</strong> {vehicleData.make || 'N/A'} {vehicleData.model || ''}</p>
          <p><strong>Registration:</strong> {vehicleData.vehicle_number || vehicleData.vehicleNumber || 'N/A'}</p>
        </div>
        <div>
          <p><strong>Type:</strong> {vehicleData.vehicle_type || vehicleData.vehicleType || 'N/A'}</p>
          {invoiceData.kilometers && (
            <p><strong>Kilometers:</strong> {invoiceData.kilometers.toLocaleString()} km</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvoicePrintVehicleDetails;