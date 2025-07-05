
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Plus, 
  Search, 
  Phone, 
  Mail, 
  Car,
  Users
} from "lucide-react";
import Sidebar from "@/components/Sidebar";
import LogoutButton from "@/components/LogoutButton";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useSupabaseData } from "@/hooks/useSupabaseData";

const Customers = () => {
  const { customers, fetchCustomers, loading } = useSupabaseData();
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [submitting, setSubmitting] = useState(false);
  
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    gstNumber: "",
    vehicleModel: "",
    vehicleNumber: "",
    vehicleMake: "",
    vehicleType: "car" as const,
    vehicleYear: ""
  });

  const filteredCustomers = customers.filter(customer =>
    customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone?.includes(searchTerm) ||
    customer.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCustomer = async () => {
    if (!newCustomer.name || !newCustomer.phone) {
      toast.error("Please fill in required fields (Name and Phone)");
      return;
    }
    
    setSubmitting(true);
    
    try {
      // Insert customer
      const { data: customerData, error: customerError } = await supabase
        .from('customers')
        .insert({
          name: newCustomer.name,
          phone: newCustomer.phone,
          email: newCustomer.email || null,
          address: newCustomer.address || null,
          gst_number: newCustomer.gstNumber || null
        })
        .select()
        .single();

      if (customerError) throw customerError;

      // Insert vehicle if provided
      if (newCustomer.vehicleModel && newCustomer.vehicleNumber && newCustomer.vehicleMake) {
        const { error: vehicleError } = await supabase
          .from('vehicles')
          .insert({
            customer_id: customerData.id,
            make: newCustomer.vehicleMake,
            model: newCustomer.vehicleModel,
            vehicle_number: newCustomer.vehicleNumber,
            vehicle_type: newCustomer.vehicleType,
            year: newCustomer.vehicleYear ? parseInt(newCustomer.vehicleYear) : null
          });

        if (vehicleError) throw vehicleError;
      }

      toast.success("Customer added successfully!");
      setShowAddForm(false);
      setNewCustomer({
        name: "",
        phone: "",
        email: "",
        address: "",
        gstNumber: "",
        vehicleModel: "",
        vehicleNumber: "",
        vehicleMake: "",
        vehicleType: "car",
        vehicleYear: ""
      });
      fetchCustomers();
    } catch (error: any) {
      toast.error(error.message || "Failed to add customer");
    } finally {
      setSubmitting(false);
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
            <div className="flex gap-3">
              <LogoutButton />
              <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Customer
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add New Customer</DialogTitle>
                    <DialogDescription>
                      Enter customer details to create a new record
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Customer Name *</Label>
                      <Input 
                        id="name"
                        value={newCustomer.name}
                        onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
                        placeholder="Enter customer name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input 
                        id="phone"
                        value={newCustomer.phone}
                        onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
                        placeholder="Enter phone number"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email"
                        type="email"
                        value={newCustomer.email}
                        onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})}
                        placeholder="Enter email address"
                      />
                    </div>
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input 
                        id="address"
                        value={newCustomer.address}
                        onChange={(e) => setNewCustomer({...newCustomer, address: e.target.value})}
                        placeholder="Enter address"
                      />
                    </div>
                    <div>
                      <Label htmlFor="gstNumber">GST Number</Label>
                      <Input 
                        id="gstNumber"
                        value={newCustomer.gstNumber}
                        onChange={(e) => setNewCustomer({...newCustomer, gstNumber: e.target.value})}
                        placeholder="Enter GST number"
                      />
                    </div>
                    <div className="border-t pt-4">
                      <h4 className="font-medium mb-3">Vehicle Details (Optional)</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label htmlFor="vehicleMake">Vehicle Make</Label>
                          <Input 
                            id="vehicleMake"
                            value={newCustomer.vehicleMake}
                            onChange={(e) => setNewCustomer({...newCustomer, vehicleMake: e.target.value})}
                            placeholder="e.g., Honda"
                          />
                        </div>
                        <div>
                          <Label htmlFor="vehicleModel">Vehicle Model</Label>
                          <Input 
                            id="vehicleModel"
                            value={newCustomer.vehicleModel}
                            onChange={(e) => setNewCustomer({...newCustomer, vehicleModel: e.target.value})}
                            placeholder="e.g., City"
                          />
                        </div>
                      </div>
                      <div className="mt-3">
                        <Label htmlFor="vehicleNumber">Vehicle Number</Label>
                        <Input 
                          id="vehicleNumber"
                          value={newCustomer.vehicleNumber}
                          onChange={(e) => setNewCustomer({...newCustomer, vehicleNumber: e.target.value})}
                          placeholder="e.g., TN 01 AB 1234"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3 mt-3">
                        <div>
                          <Label htmlFor="vehicleType">Vehicle Type</Label>
                          <Select value={newCustomer.vehicleType} onValueChange={(value: any) => setNewCustomer({...newCustomer, vehicleType: value})}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="car">Car</SelectItem>
                              <SelectItem value="bike">Bike</SelectItem>
                              <SelectItem value="scooter">Scooter</SelectItem>
                              <SelectItem value="truck">Truck</SelectItem>
                              <SelectItem value="van">Van</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="vehicleYear">Year</Label>
                          <Input 
                            id="vehicleYear"
                            value={newCustomer.vehicleYear}
                            onChange={(e) => setNewCustomer({...newCustomer, vehicleYear: e.target.value})}
                            placeholder="e.g., 2020"
                          />
                        </div>
                      </div>
                    </div>
                    <Button 
                      onClick={handleAddCustomer} 
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      disabled={submitting}
                    >
                      {submitting ? "Adding..." : "Add Customer"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </header>

        <div className="p-6">
          {/* Search and Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
            <div className="lg:col-span-3">
              <Card>
                <CardContent className="pt-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input 
                      placeholder="Search customers by name, phone, or email..." 
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
            <div>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{customers.length}</p>
                    <p className="text-sm text-gray-600">Total Customers</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Customers List */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Database</CardTitle>
              <CardDescription>Manage your customer information and service history</CardDescription>
            </CardHeader>
            <CardContent>
              {filteredCustomers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredCustomers.map((customer) => (
                    <div key={customer.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-3">
                        <Avatar>
                          <AvatarFallback className="bg-blue-100 text-blue-600">
                            {getInitials(customer.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 truncate">{customer.name}</h3>
                          <div className="mt-1 space-y-1">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Phone className="h-3 w-3" />
                              <span>{customer.phone}</span>
                            </div>
                            {customer.email && (
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Mail className="h-3 w-3" />
                                <span className="truncate">{customer.email}</span>
                              </div>
                            )}
                            {customer.gst_number && (
                              <div className="text-xs text-gray-500">
                                GST: {customer.gst_number}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Users className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No customers yet</h3>
                  <p className="mb-4">Start building your customer database by adding your first customer.</p>
                  <Button onClick={() => setShowAddForm(true)} className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Customer
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Customers;
