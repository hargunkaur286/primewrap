import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Search, 
  Download, 
  Send, 
  Eye, 
  Plus,
  Filter,
  Mail,
  MessageSquare
} from "lucide-react";

const OrderManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  // TODO: Replace with MongoDB queries from orders collection
  const orders = [
    {
      id: "ORD-001",
      customer: "John Doe",
      email: "john@example.com",
      phone: "+1234567890",
      products: [
        { name: "Aluminum Foil 200m", quantity: 2, price: 24.99 }
      ],
      total: 49.98,
      status: "pending",
      orderDate: "2024-01-15",
      deliveryDate: "2024-01-17",
      address: "123 Main St, City, State 12345",
      timeline: [
        { stage: "order-placed", date: "2024-01-15 10:30 AM", completed: true },
        { stage: "payment-received", date: "2024-01-15 10:35 AM", completed: true },
        { stage: "out-for-delivery", date: "", completed: false },
        { stage: "delivered", date: "", completed: false }
      ]
    },
    {
      id: "ORD-002", 
      customer: "Jane Smith",
      email: "jane@example.com",
      phone: "+1234567891",
      products: [
        { name: "Aluminum Foil 100m", quantity: 1, price: 15.99 },
        { name: "Plastic Wrap 50m", quantity: 3, price: 8.99 }
      ],
      total: 42.96,
      status: "delivered",
      orderDate: "2024-01-14",
      deliveryDate: "2024-01-16",
      address: "456 Oak Ave, City, State 12345",
      timeline: [
        { stage: "order-placed", date: "2024-01-14 02:15 PM", completed: true },
        { stage: "payment-received", date: "2024-01-14 02:20 PM", completed: true },
        { stage: "out-for-delivery", date: "2024-01-16 09:00 AM", completed: true },
        { stage: "delivered", date: "2024-01-16 02:30 PM", completed: true }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-500";
      case "payment-received": return "bg-blue-500";
      case "out-for-delivery": return "bg-purple-500";
      case "delivered": return "bg-green-500";
      case "cancelled": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const handleGenerateInvoice = (orderId: string) => {
    // TODO: Generate PDF invoice and save to MongoDB/GridFS or file storage
    console.log(`Generate invoice for order: ${orderId}`);
    // MongoDB Query: db.invoices.insertOne({ orderId, generatedAt: new Date(), ... })
  };

  const handleSendInvoice = (orderId: string, method: 'email' | 'whatsapp') => {
    // TODO: Send invoice via email or WhatsApp integration
    console.log(`Send invoice for order ${orderId} via ${method}`);
    // Integration with email service or WhatsApp Business API
  };

  const handleStatusUpdate = (orderId: string, newStatus: string) => {
    // TODO: Update order status in MongoDB
    console.log(`Update order ${orderId} status to ${newStatus}`);
    // MongoDB Query: db.orders.updateOne({ _id: orderId }, { $set: { status: newStatus, updatedAt: new Date() } })
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Management</h1>
            <p className="text-gray-600">Track and manage all customer orders</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create New Order
          </Button>
        </div>

        <Tabs defaultValue="all-orders" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all-orders">All Orders</TabsTrigger>
            <TabsTrigger value="pending">Pending ({orders.filter(o => o.status === 'pending').length})</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
          </TabsList>

          <TabsContent value="all-orders">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <div>
                    <CardTitle>All Orders</CardTitle>
                    <CardDescription>
                      Complete list of customer orders with status tracking
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search orders..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <Button variant="outline">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Products</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Order Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{order.customer}</p>
                            <p className="text-sm text-gray-500">{order.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {order.products.map((product, idx) => (
                              <div key={idx}>
                                {product.name} × {product.quantity}
                              </div>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">${order.total}</TableCell>
                        <TableCell>
                          <Badge className={`${getStatusColor(order.status)} text-white`}>
                            {order.status.replace('-', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell>{order.orderDate}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleGenerateInvoice(order.id)}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleSendInvoice(order.id, 'email')}
                            >
                              <Mail className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleSendInvoice(order.id, 'whatsapp')}
                            >
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pending">
            <Card>
              <CardHeader>
                <CardTitle>Pending Orders</CardTitle>
                <CardDescription>Orders awaiting processing or payment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.filter(order => order.status === 'pending').map((order) => (
                    <div key={order.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-semibold">{order.id}</h3>
                          <p className="text-sm text-gray-600">{order.customer} - ${order.total}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => handleStatusUpdate(order.id, 'payment-received')}>
                            Mark as Paid
                          </Button>
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                        </div>
                      </div>
                      
                      {/* Order Timeline */}
                      <div className="border-t pt-4">
                        <h4 className="text-sm font-medium mb-2">Order Progress</h4>
                        <div className="flex items-center space-x-4">
                          {order.timeline.map((stage, idx) => (
                            <div key={idx} className="flex items-center">
                              <div className={`w-3 h-3 rounded-full ${stage.completed ? 'bg-green-500' : 'bg-gray-300'}`} />
                              <span className="ml-2 text-xs">{stage.stage.replace('-', ' ')}</span>
                              {idx < order.timeline.length - 1 && <div className="w-8 h-px bg-gray-300 ml-4" />}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Add similar TabsContent for in-progress and delivered */}
        </Tabs>
      </div>
    </div>
  );
};

export default OrderManagement;