import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Camera, 
  MapPin, 
  Phone, 
  CheckCircle, 
  Clock,
  Package,
  Navigation,
  Upload,
  User
} from "lucide-react";

const DriverPanel = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [deliveryNotes, setDeliveryNotes] = useState("");
  const [completionDialogOpen, setCompletionDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  // TODO: Get current driver info from MongoDB authentication
  const currentDriver = {
    id: "DRV-002",
    name: "Sarah Wilson",
    vehicle: "Truck - XYZ789"
  };

  // TODO: Fetch assigned route from MongoDB based on driver ID
  const assignedRoute = {
    id: "ROUTE-001",
    name: "Downtown Route A", 
    orders: [
      {
        id: "ORD-001",
        customer: "John Doe",
        phone: "+1234567890",
        address: "123 Main St, City, State 12345",
        products: [
          { name: "Aluminum Foil 200m", quantity: 2 }
        ],
        total: 49.98,
        status: "pending",
        estimatedTime: "10:00 AM",
        notes: "Ring doorbell, customer works from home"
      },
      {
        id: "ORD-003",
        customer: "Mike Johnson", 
        phone: "+1234567892",
        address: "456 Oak Ave, City, State 12345",
        products: [
          { name: "Plastic Wrap 50m", quantity: 4 }
        ],
        total: 35.96,
        status: "completed",
        estimatedTime: "09:30 AM",
        completedAt: "09:45 AM",
        deliveryPhoto: "/placeholder.svg",
        notes: "Left with receptionist in lobby"
      },
      {
        id: "ORD-005",
        customer: "Emily Davis",
        phone: "+1234567893", 
        address: "789 Pine Rd, City, State 12345",
        products: [
          { name: "Aluminum Foil 100m", quantity: 1 }
        ],
        total: 15.99,
        status: "pending",
        estimatedTime: "10:30 AM",
        notes: "Apartment 4B, use back entrance"
      }
    ]
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      // TODO: Upload image to MongoDB GridFS or cloud storage
      console.log("Image selected:", file.name);
    }
  };

  const handleCompleteDelivery = (orderId: string) => {
    if (!selectedImage) {
      alert("Please upload a delivery photo before completing");
      return;
    }

    // TODO: Update order status in MongoDB and save delivery photo
    console.log(`Completing delivery for order: ${orderId}`);
    console.log("Delivery notes:", deliveryNotes);
    console.log("Photo:", selectedImage);
    
    // MongoDB Updates:
    // 1. db.orders.updateOne({ _id: orderId }, { 
    //    $set: { 
    //      status: 'delivered', 
    //      deliveredAt: new Date(),
    //      deliveryPhoto: photoUrl,
    //      deliveryNotes: deliveryNotes,
    //      completedBy: currentDriver.id
    //    }
    // })
    // 2. Upload photo to GridFS or cloud storage
    // 3. Send completion notification to admin/customer

    setCompletionDialogOpen(false);
    setSelectedImage(null);
    setDeliveryNotes("");
    setSelectedOrder(null);
  };

  const openMapsNavigation = (address: string) => {
    // Open navigation in device's default maps app
    const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(address)}`;
    window.open(mapsUrl, '_blank');
  };

  const callCustomer = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-500";
      case "completed": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const pendingOrders = assignedRoute.orders.filter(order => order.status === 'pending');
  const completedOrders = assignedRoute.orders.filter(order => order.status === 'completed');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Driver Header */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div className="min-w-0">
                  <CardTitle>Welcome, {currentDriver.name}</CardTitle>
                  <CardDescription>Vehicle: {currentDriver.vehicle}</CardDescription>
                </div>
              </div>
              <Badge className="bg-green-500 text-white w-fit">
                Route: {assignedRoute.name}
              </Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Progress Overview */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Today's Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{completedOrders.length}</div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{pendingOrders.length}</div>
                <div className="text-sm text-gray-600">Pending</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{assignedRoute.orders.length}</div>
                <div className="text-sm text-gray-600">Total Orders</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pending Deliveries */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Pending Deliveries
            </CardTitle>
            <CardDescription>
              Orders waiting for delivery
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingOrders.map((order) => (
                <div key={order.id} className="border rounded-lg p-4 bg-yellow-50">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold">{order.id}</h3>
                      <p className="text-sm text-gray-600">{order.customer}</p>
                      <p className="text-sm font-medium">Total: ${order.total}</p>
                    </div>
                    <Badge className={`${getStatusColor(order.status)} text-white`}>
                      Est. {order.estimatedTime}
                    </Badge>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span>{order.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Package className="h-4 w-4 text-gray-500" />
                      <span>
                        {order.products.map(p => `${p.name} x${p.quantity}`).join(', ')}
                      </span>
                    </div>
                    {order.notes && (
                      <div className="text-sm text-blue-600 bg-blue-50 p-2 rounded">
                        <strong>Note:</strong> {order.notes}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => openMapsNavigation(order.address)}
                    >
                      <Navigation className="h-4 w-4 mr-2" />
                      Navigate
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => callCustomer(order.phone)}
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </Button>
                    <Dialog 
                      open={completionDialogOpen && selectedOrder === order.id} 
                      onOpenChange={(open) => {
                        setCompletionDialogOpen(open);
                        if (open) setSelectedOrder(order.id);
                        else setSelectedOrder(null);
                      }}
                    >
                      <DialogTrigger asChild>
                        <Button size="sm">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Complete
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Complete Delivery</DialogTitle>
                          <DialogDescription>
                            Upload a photo and add notes to complete this delivery
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="photo">Delivery Photo (Required)</Label>
                            <div className="mt-2">
                              <label htmlFor="photo-upload" className="cursor-pointer">
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400">
                                  {selectedImage ? (
                                    <div>
                                      <Camera className="h-8 w-8 mx-auto mb-2 text-green-600" />
                                      <p className="text-sm font-medium text-green-600">
                                        Photo selected: {selectedImage.name}
                                      </p>
                                    </div>
                                  ) : (
                                    <div>
                                      <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                                      <p className="text-sm text-gray-600">
                                        Click to upload delivery photo
                                      </p>
                                    </div>
                                  )}
                                </div>
                                <input
                                  id="photo-upload"
                                  type="file"
                                  accept="image/*"
                                  capture="environment"
                                  className="hidden"
                                  onChange={handleImageUpload}
                                />
                              </label>
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="notes">Delivery Notes (Optional)</Label>
                            <Textarea
                              id="notes"
                              value={deliveryNotes}
                              onChange={(e) => setDeliveryNotes(e.target.value)}
                              placeholder="Add any notes about the delivery..."
                              rows={3}
                            />
                          </div>
                        </div>
                        <div className="flex justify-end gap-2 mt-4">
                          <Button 
                            variant="outline" 
                            onClick={() => setCompletionDialogOpen(false)}
                          >
                            Cancel
                          </Button>
                          <Button 
                            onClick={() => handleCompleteDelivery(order.id)}
                            disabled={!selectedImage}
                          >
                            Complete Delivery
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Completed Deliveries */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Completed Deliveries
            </CardTitle>
            <CardDescription>
              Successfully delivered orders
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {completedOrders.map((order) => (
                <div key={order.id} className="border rounded-lg p-4 bg-green-50">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{order.id}</h3>
                      <p className="text-sm text-gray-600">{order.customer}</p>
                      <p className="text-sm font-medium">Total: ${order.total}</p>
                      <div className="flex items-center gap-2 text-sm text-green-600 mt-1">
                        <CheckCircle className="h-4 w-4" />
                        <span>Completed at {order.completedAt}</span>
                      </div>
                    </div>
                    <Badge className="bg-green-500 text-white">
                      Delivered
                    </Badge>
                  </div>
                  {order.notes && (
                    <div className="text-sm text-gray-600 mt-2 bg-white p-2 rounded">
                      <strong>Delivery Note:</strong> {order.notes}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DriverPanel;