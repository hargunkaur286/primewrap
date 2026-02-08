import { useEffect, useMemo, useState } from "react";
import axios from "axios";
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
  Eye, 
  Plus,
  Filter,
  Mail,
  MessageSquare
} from "lucide-react";

import { API_BASE } from "@/lib/apiBase";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

type ApiOrderItem = {
  product?: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
};

type ApiUser = {
  _id: string;
  name?: string;
  email?: string;
};

type ApiOrder = {
  _id: string;
  user?: string | ApiUser | null;
  guestName?: string;
  guestEmail?: string;
  items: ApiOrderItem[];
  total: number;
  status: OrderStatus;
  createdAt?: string;
  orderDate?: string;
  deliveryAddress?: string;
  paymentMethod?: string;
  trackingNumber?: string | null;
};

const OrderManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [orders, setOrders] = useState<ApiOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<ApiOrder | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/v1/user/orders`, {
          withCredentials: true,
        });
        setOrders(res.data?.orders || []);
      } catch (err: any) {
        setError(
          err?.response?.data?.message || err?.message || "Failed to fetch orders",
        );
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const tabCounts = useMemo(() => {
    const pending = orders.filter((o) => o.status === "pending").length;
    const inProgress = orders.filter(
      (o) => o.status === "processing" || o.status === "shipped",
    ).length;
    const delivered = orders.filter((o) => o.status === "delivered").length;
    return { pending, inProgress, delivered };
  }, [orders]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-500";
      case "processing": return "bg-blue-500";
      case "shipped": return "bg-purple-500";
      case "delivered": return "bg-green-500";
      case "cancelled": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getDisplayId = (order: ApiOrder) => {
    const suffix = order._id?.slice(-6)?.toUpperCase();
    return suffix ? `ORD-${suffix}` : order._id;
  };

  const getCustomerName = (order: ApiOrder) => {
    if (order.guestName) return order.guestName;
    if (typeof order.user === "object" && order.user?.name) return order.user.name;
    return "Guest";
  };

  const getCustomerEmail = (order: ApiOrder) => {
    if (order.guestEmail) return order.guestEmail;
    if (typeof order.user === "object" && order.user?.email) return order.user.email;
    return "";
  };

  const humanizeProduct = (value?: string) => {
    const base = String(value || "")
      .replace(/[_-]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    if (!base) return "Item";
    return base
      .split(" ")
      .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : ""))
      .join(" ");
  };

  const getItemDisplayName = (item: ApiOrderItem) => {
    if (item?.name && String(item.name).trim()) return item.name;
    if (item?.product) return humanizeProduct(item.product);
    return "Item";
  };

  const getOrderDate = (order: ApiOrder) => {
    const raw = order.createdAt || order.orderDate;
    if (!raw) return "";
    const date = new Date(raw);
    return Number.isNaN(date.getTime()) ? String(raw) : date.toLocaleDateString();
  };

  const openDetails = (order: ApiOrder) => {
    setSelectedOrder(order);
    setDetailsOpen(true);
  };

  const getDeliveryAddress = (order: ApiOrder) => order.deliveryAddress || "—";
  const getPaymentMethod = (order: ApiOrder) => order.paymentMethod || "—";
  const getTrackingNumber = (order: ApiOrder) => order.trackingNumber || "—";

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

  const filteredOrders = orders.filter((order) => {
    const displayId = getDisplayId(order).toLowerCase();
    const customerName = getCustomerName(order).toLowerCase();
    const q = searchTerm.trim().toLowerCase();
    if (!q) return true;
    return displayId.includes(q) || customerName.includes(q);
  });

  if (loading) {
    return <p className="p-8 text-center">Loading orders…</p>;
  }
  if (error) {
    return <p className="p-8 text-center text-red-600">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4 sm:p-6 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Management</h1>
            <p className="text-gray-600">Track and manage all customer orders</p>
          </div>
          <Button className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Create New Order
          </Button>
        </div>

        <Tabs defaultValue="all-orders" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all-orders">All Orders</TabsTrigger>
            <TabsTrigger value="pending">Pending ({tabCounts.pending})</TabsTrigger>
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
                <div className="w-full overflow-x-auto">
                  <Table className="min-w-[900px]">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="whitespace-nowrap">Order ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead className="hidden lg:table-cell">Products</TableHead>
                        <TableHead className="whitespace-nowrap">Total</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="hidden md:table-cell whitespace-nowrap">Order Date</TableHead>
                        <TableHead className="whitespace-nowrap">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredOrders.map((order) => (
                        <TableRow key={order._id}>
                          <TableCell className="font-medium whitespace-nowrap">{getDisplayId(order)}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{getCustomerName(order)}</p>
                            {getCustomerEmail(order) ? (
                              <p className="text-sm text-gray-500 break-words hidden sm:block">{getCustomerEmail(order)}</p>
                            ) : null}
                          </div>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <div className="text-sm">
                            {order.items?.map((item, idx) => (
                              <div key={`${order._id}-${idx}`}>
                                {getItemDisplayName(item)} × {item.quantity}
                              </div>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">${Number(order.total || 0).toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge className={`${getStatusColor(order.status)} text-white`}>
                            {order.status.replace('-', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell whitespace-nowrap">{getOrderDate(order)}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-2 min-w-[180px]">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0"
                              onClick={() => openDetails(order)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="h-8 w-8 p-0"
                              onClick={() => handleGenerateInvoice(order._id)}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="h-8 w-8 p-0"
                              onClick={() => handleSendInvoice(order._id, 'email')}
                            >
                              <Mail className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="h-8 w-8 p-0"
                              onClick={() => handleSendInvoice(order._id, 'whatsapp')}
                            >
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
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
                    <div key={order._id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-semibold">{getDisplayId(order)}</h3>
                          <p className="text-sm text-gray-600">
                            {getCustomerName(order)} - ${Number(order.total || 0).toFixed(2)}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => handleStatusUpdate(order._id, 'processing')}>
                            Mark Processing
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => openDetails(order)}>
                            View Details
                          </Button>
                        </div>
                      </div>
                      <div className="border-t pt-4">
                        <h4 className="text-sm font-medium mb-2">Items</h4>
                        <div className="text-sm text-gray-700 space-y-1">
                          {order.items?.map((item, idx) => (
                            <div key={`${order._id}-pending-${idx}`}>
                              {getItemDisplayName(item)} × {item.quantity}
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

        <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Order Details</DialogTitle>
              <DialogDescription>
                {selectedOrder ? getDisplayId(selectedOrder) : ""}
              </DialogDescription>
            </DialogHeader>

            {selectedOrder ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Customer</p>
                    <p className="font-medium">{getCustomerName(selectedOrder)}</p>
                    {getCustomerEmail(selectedOrder) ? (
                      <p className="text-sm text-gray-600">{getCustomerEmail(selectedOrder)}</p>
                    ) : null}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <Badge className={`${getStatusColor(selectedOrder.status)} text-white`}>
                      {selectedOrder.status}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Order Date</p>
                    <p className="font-medium">{getOrderDate(selectedOrder) || "—"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="font-medium">${Number(selectedOrder.total || 0).toFixed(2)}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Payment Method</p>
                    <p className="font-medium">{getPaymentMethod(selectedOrder)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Tracking Number</p>
                    <p className="font-medium">{getTrackingNumber(selectedOrder)}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Delivery Address</p>
                  <p className="font-medium">{getDeliveryAddress(selectedOrder)}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-2">Items</p>
                  <div className="space-y-2">
                    {selectedOrder.items?.map((item, idx) => (
                      <div key={`${selectedOrder._id}-details-${idx}`} className="flex justify-between bg-gray-50 rounded p-2">
                        <div>
                          <p className="font-medium">{getItemDisplayName(item)}</p>
                          <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            ${Number((item.price || 0) * (item.quantity || 0)).toFixed(2)}
                          </p>
                          {item.quantity > 1 ? (
                            <p className="text-xs text-gray-600">
                              ${Number(item.price || 0).toFixed(2)} each
                            </p>
                          ) : null}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default OrderManagement;