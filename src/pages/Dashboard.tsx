
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  Car, 
  Receipt, 
  Users, 
  BarChart3, 
  Plus, 
  TrendingUp, 
  Calendar,
  DollarSign,
  Wrench
} from "lucide-react";
import Sidebar from "@/components/Sidebar";
import LogoutButton from "@/components/LogoutButton";
import { useSupabaseData } from "@/hooks/useSupabaseData";

const Dashboard = () => {
  const navigate = useNavigate();
  const { customers, services, parts, invoices, loading } = useSupabaseData();
  const [currentDate] = useState(new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }));

  const totalRevenue = invoices.reduce((sum, invoice) => sum + Number(invoice.total), 0);
  const todayInvoices = invoices.filter(invoice => 
    new Date(invoice.created_at!).toDateString() === new Date().toDateString()
  );
  const todayRevenue = todayInvoices.reduce((sum, invoice) => sum + Number(invoice.total), 0);
  const pendingInvoices = invoices.filter(invoice => invoice.status === 'pending').length;

  const stats = [
    {
      title: "Today's Revenue",
      value: `₹${todayRevenue.toLocaleString('en-IN')}`,
      change: "0%",
      icon: DollarSign,
      color: "text-green-600"
    },
    {
      title: "Vehicles Serviced",
      value: invoices.length.toString(),
      change: "0%",
      icon: Car,
      color: "text-blue-600"
    },
    {
      title: "Active Customers",
      value: customers.length.toString(),
      change: "0%",
      icon: Users,
      color: "text-purple-600"
    },
    {
      title: "Pending Invoices",
      value: pendingInvoices.toString(),
      change: "0%",
      icon: Receipt,
      color: "text-orange-600"
    }
  ];

  const quickActions = [
    { title: "New Invoice", icon: Plus, action: () => navigate('/invoices'), color: "bg-blue-600" },
    { title: "Add Customer", icon: Users, action: () => navigate('/customers'), color: "bg-green-600" },
    { title: "Manage Services", icon: Wrench, action: () => navigate('/services'), color: "bg-purple-600" },
    { title: "View Reports", icon: BarChart3, action: () => navigate('/reports'), color: "bg-orange-600" }
  ];

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
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {currentDate}
              </p>
            </div>
            <div className="flex gap-3">
              <LogoutButton />
              <Button onClick={() => navigate('/invoices')} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                New Invoice
              </Button>
            </div>
          </div>
        </header>

        <div className="p-6 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="flex items-center gap-1 text-sm">
                    <TrendingUp className="h-3 w-3 text-gray-400" />
                    <span className="text-gray-400">{stat.change}</span>
                    <span className="text-gray-500">from yesterday</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Frequently used functions for faster workflow</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="h-20 flex flex-col gap-2 hover:bg-gray-50"
                    onClick={action.action}
                  >
                    <div className={`p-2 rounded-lg ${action.color}`}>
                      <action.icon className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-sm font-medium">{action.title}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest service updates and transactions</CardDescription>
            </CardHeader>
            <CardContent>
              {invoices.length > 0 ? (
                <div className="space-y-4">
                  {invoices.slice(0, 5).map((invoice) => (
                    <div key={invoice.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">Invoice #{invoice.invoice_number}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(invoice.created_at!).toLocaleDateString('en-IN')}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">₹{Number(invoice.total).toLocaleString('en-IN')}</p>
                        <p className="text-xs text-gray-600 capitalize">{invoice.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Car className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                  <p>No recent activity yet.</p>
                  <p className="text-sm">Start by creating your first invoice or adding a customer.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
