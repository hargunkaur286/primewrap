import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Package, 
  ShoppingCart, 
  Truck, 
  Users, 
  TrendingUp, 
  Calculator,
  Plus,
  FileText,
  MapPin
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // TODO: Replace with MongoDB queries
  const dashboardStats = {
    totalOrders: 156,
    pendingOrders: 23,
    completedOrders: 133,
    totalProducts: 45,
    lowStockItems: 7,
    activeDrivers: 12,
    todayRevenue: 5240.50,
    monthlyRevenue: 45780.30
  };

  const recentOrders = [
    // TODO: Fetch from MongoDB - orders collection
    { id: "ORD-001", customer: "John Doe", status: "pending", amount: 89.99, date: "2024-01-15" },
    { id: "ORD-002", customer: "Jane Smith", status: "delivered", amount: 156.75, date: "2024-01-15" },
    { id: "ORD-003", customer: "Mike Johnson", status: "out-for-delivery", amount: 234.20, date: "2024-01-14" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-500";
      case "delivered": return "bg-green-500";
      case "out-for-delivery": return "bg-blue-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your business today.</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.totalOrders}</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.pendingOrders}</div>
              <p className="text-xs text-muted-foreground">
                Needs attention
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.lowStockItems}</div>
              <p className="text-xs text-muted-foreground">
                Requires restocking
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${dashboardStats.todayRevenue}</div>
              <p className="text-xs text-muted-foreground">
                +8% from yesterday
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Order Management
              </CardTitle>
              <CardDescription>
                Manage orders, track delivery status, and generate invoices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Link to="/dashboard/orders">
                  <Button className="w-full">View All Orders</Button>
                </Link>
                <Link to="/dashboard/orders/new">
                  <Button variant="outline" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Order
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Product Management
              </CardTitle>
              <CardDescription>
                Add, edit products and manage inventory levels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Link to="/dashboard/products">
                  <Button className="w-full">Manage Products</Button>
                </Link>
                <Link to="/dashboard/products/new">
                  <Button variant="outline" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Product
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Delivery Management
              </CardTitle>
              <CardDescription>
                Create routes, assign drivers, and track deliveries
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Link to="/dashboard/delivery">
                  <Button className="w-full">Manage Routes</Button>
                </Link>
                <Link to="/dashboard/drivers">
                  <Button variant="outline" className="w-full">
                    <Users className="h-4 w-4 mr-2" />
                    Driver Panel
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Orders & Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Latest customer orders and their status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{order.id}</p>
                      <p className="text-sm text-gray-600">{order.customer}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${order.amount}</p>
                      <Badge className={`${getStatusColor(order.status)} text-white text-xs`}>
                        {order.status.replace('-', ' ')}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/dashboard/orders">
                <Button variant="outline" className="w-full mt-4">
                  View All Orders
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Access</CardTitle>
              <CardDescription>Frequently used features</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                  <Link to="/dashboard/users">
                  <Button variant="outline" className="w-full h-16 flex flex-col">
                    <TrendingUp className="h-5 w-5 mb-1" />
                    <span className="text-xs">Users</span>
                  </Button>
                </Link>
                <Link to="/dashboard/newsletter">
                  <Button variant="outline" className="w-full h-16 flex flex-col">
                    <Calculator className="h-5 w-5 mb-1" />
                    <span className="text-xs">Newsletter Subscribers</span>
                  </Button>
                </Link>
                <Link to="/dashboard/contact-queries">
                  <Button variant="outline" className="w-full h-16 flex flex-col">
                    <FileText className="h-5 w-5 mb-1" />
                    <span className="text-xs">Customer Queries</span>
                  </Button>
                </Link>
                <Link to="/dashboard/analytics">
                  <Button variant="outline" className="w-full h-16 flex flex-col">
                    <TrendingUp className="h-5 w-5 mb-1" />
                    <span className="text-xs">Analytics</span>
                  </Button>
                </Link>
                <Link to="/dashboard/accounting">
                  <Button variant="outline" className="w-full h-16 flex flex-col">
                    <Calculator className="h-5 w-5 mb-1" />
                    <span className="text-xs">Accounting</span>
                  </Button>
                </Link>
                <Link to="/dashboard/orders">
                  <Button variant="outline" className="w-full h-16 flex flex-col">
                    <FileText className="h-5 w-5 mb-1" />
                    <span className="text-xs">Invoices</span>
                  </Button>
                </Link>
                <Link to="/dashboard/delivery">
                  <Button variant="outline" className="w-full h-16 flex flex-col">
                    <MapPin className="h-5 w-5 mb-1" />
                    <span className="text-xs">Routes</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;