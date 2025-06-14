
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, 
  Search, 
  Edit,
  Trash2,
  Wrench,
  Settings,
  Package
} from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";

const Services = () => {
  const [showAddServiceForm, setShowAddServiceForm] = useState(false);
  const [showAddPartForm, setShowAddPartForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [newService, setNewService] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
    category: ""
  });

  const [newPart, setNewPart] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: ""
  });

  const services = [];
  const parts = [];

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredParts = parts.filter(part =>
    part.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    part.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddService = () => {
    if (!newService.name || !newService.price) {
      toast.error("Please fill in required fields");
      return;
    }
    
    toast.success("Service added successfully!");
    setShowAddServiceForm(false);
    setNewService({
      name: "",
      description: "",
      price: "",
      duration: "",
      category: ""
    });
  };

  const handleAddPart = () => {
    if (!newPart.name || !newPart.price) {
      toast.error("Please fill in required fields");
      return;
    }
    
    toast.success("Part added successfully!");
    setShowAddPartForm(false);
    setNewPart({
      name: "",
      description: "",
      price: "",
      stock: "",
      category: ""
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Services & Parts</h1>
          </div>
        </header>

        <div className="p-6">
          {/* Search */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  placeholder="Search services and parts..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="services" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="services">Services Catalog</TabsTrigger>
              <TabsTrigger value="parts">Parts Inventory</TabsTrigger>
            </TabsList>

            {/* Services Tab */}
            <TabsContent value="services">
              <div className="space-y-6">
                {/* Services Header */}
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold">Services Catalog</h2>
                    <p className="text-gray-600">Manage your service offerings and pricing</p>
                  </div>
                  <Dialog open={showAddServiceForm} onOpenChange={setShowAddServiceForm}>
                    <DialogTrigger asChild>
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Service
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Service</DialogTitle>
                        <DialogDescription>
                          Create a new service offering for your catalog
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="serviceName">Service Name *</Label>
                          <Input 
                            id="serviceName"
                            value={newService.name}
                            onChange={(e) => setNewService({...newService, name: e.target.value})}
                            placeholder="Enter service name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="serviceDescription">Description</Label>
                          <Textarea 
                            id="serviceDescription"
                            value={newService.description}
                            onChange={(e) => setNewService({...newService, description: e.target.value})}
                            placeholder="Describe the service"
                            rows={3}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="servicePrice">Price (₹) *</Label>
                            <Input 
                              id="servicePrice"
                              type="number"
                              value={newService.price}
                              onChange={(e) => setNewService({...newService, price: e.target.value})}
                              placeholder="0"
                            />
                          </div>
                          <div>
                            <Label htmlFor="serviceDuration">Duration</Label>
                            <Input 
                              id="serviceDuration"
                              value={newService.duration}
                              onChange={(e) => setNewService({...newService, duration: e.target.value})}
                              placeholder="e.g., 2 hours"
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="serviceCategory">Category</Label>
                          <Input 
                            id="serviceCategory"
                            value={newService.category}
                            onChange={(e) => setNewService({...newService, category: e.target.value})}
                            placeholder="e.g., Maintenance, Repair"
                          />
                        </div>
                        <Button onClick={handleAddService} className="w-full bg-blue-600 hover:bg-blue-700">
                          Add Service
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                {/* Empty State for Services */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center py-12 text-gray-500">
                      <Wrench className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No services yet</h3>
                      <p className="mb-4">Create your first service to start building your catalog.</p>
                      <Button onClick={() => setShowAddServiceForm(true)} className="bg-blue-600 hover:bg-blue-700">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Your First Service
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Parts Tab */}
            <TabsContent value="parts">
              <div className="space-y-6">
                {/* Parts Header */}
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold">Parts Inventory</h2>
                    <p className="text-gray-600">Manage your spare parts stock and pricing</p>
                  </div>
                  <Dialog open={showAddPartForm} onOpenChange={setShowAddPartForm}>
                    <DialogTrigger asChild>
                      <Button className="bg-green-600 hover:bg-green-700">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Part
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Part</DialogTitle>
                        <DialogDescription>
                          Add a new spare part to your inventory
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="partName">Part Name *</Label>
                          <Input 
                            id="partName"
                            value={newPart.name}
                            onChange={(e) => setNewPart({...newPart, name: e.target.value})}
                            placeholder="Enter part name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="partDescription">Description</Label>
                          <Textarea 
                            id="partDescription"
                            value={newPart.description}
                            onChange={(e) => setNewPart({...newPart, description: e.target.value})}
                            placeholder="Describe the part"
                            rows={3}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="partPrice">Price (₹) *</Label>
                            <Input 
                              id="partPrice"
                              type="number"
                              value={newPart.price}
                              onChange={(e) => setNewPart({...newPart, price: e.target.value})}
                              placeholder="0"
                            />
                          </div>
                          <div>
                            <Label htmlFor="partStock">Stock Quantity</Label>
                            <Input 
                              id="partStock"
                              type="number"
                              value={newPart.stock}
                              onChange={(e) => setNewPart({...newPart, stock: e.target.value})}
                              placeholder="0"
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="partCategory">Category</Label>
                          <Input 
                            id="partCategory"
                            value={newPart.category}
                            onChange={(e) => setNewPart({...newPart, category: e.target.value})}
                            placeholder="e.g., Filters, Brake System"
                          />
                        </div>
                        <Button onClick={handleAddPart} className="w-full bg-green-600 hover:bg-green-700">
                          Add Part
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                {/* Empty State for Parts */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center py-12 text-gray-500">
                      <Package className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No parts yet</h3>
                      <p className="mb-4">Add your first spare part to start building your inventory.</p>
                      <Button onClick={() => setShowAddPartForm(true)} className="bg-green-600 hover:bg-green-700">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Your First Part
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Services;
