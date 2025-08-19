import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  MapPin, 
  Plus, 
  Search, 
  Truck, 
  User,
  MessageSquare,
  Route,
  Clock,
  CheckCircle
} from "lucide-react";

const DeliveryManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateRouteOpen, setIsCreateRouteOpen] = useState(false);

  // TODO: Replace with MongoDB queries from deliveryRoutes and drivers collections
  const drivers = [
    {
      id: "DRV-001",
      name: "Michael Johnson",
      phone: "+1234567890",
      email: "michael@company.com",
      vehicle: "Van - ABC123",
      status: "available",
      currentRoute: null,
      totalDeliveries: 156,
      rating: 4.8
    },
    {
      id: "DRV-002", 
      name: "Sarah Wilson",
      phone: "+1234567891",
      email: "sarah@company.com",
      vehicle: "Truck - XYZ789",
      status: "on-route",
      currentRoute: "ROUTE-001",
      totalDeliveries: 203,
      rating: 4.9
    },
    {
      id: "DRV-003",
      name: "David Chen",
      phone: "+1234567892", 
      email: "david@company.com",
      vehicle: "Van - DEF456",
      status: "off-duty",
      currentRoute: null,
      totalDeliveries: 98,
      rating: 4.7
    }
  ];

  const routes = [
    {
      id: "ROUTE-001",
      name: "Downtown Route A",
      driverId: "DRV-002",
      driverName: "Sarah Wilson",
      orders: ["ORD-001", "ORD-003", "ORD-005"],
      status: "in-progress",
      estimatedTime: "2.5 hours",
      distance: "25.3 km",
      createdAt: "2024-01-15 08:00 AM",
      startedAt: "2024-01-15 09:15 AM",
      stops: [
        { orderId: "ORD-001", address: "123 Main St", status: "pending", estimatedTime: "10:00 AM" },
        { orderId: "ORD-003", address: "456 Oak Ave", status: "completed", completedTime: "09:45 AM" },
        { orderId: "ORD-005", address: "789 Pine Rd", status: "pending", estimatedTime: "10:30 AM" }
      ]
    },
    {
      id: "ROUTE-002",
      name: "Suburban Route B", 
      driverId: null,
      driverName: null,
      orders: ["ORD-002", "ORD-004"],
      status: "pending",
      estimatedTime: "1.8 hours",
      distance: "18.7 km",
      createdAt: "2024-01-15 10:00 AM",
      stops: [
        { orderId: "ORD-002", address: "321 Elm St", status: "pending", estimatedTime: "" },
        { orderId: "ORD-004", address: "654 Maple Dr", status: "pending", estimatedTime: "" }
      ]
    }
  ];

  const [newRoute, setNewRoute] = useState({
    name: "",
    selectedOrders: [] as string[],
    notes: ""
  });

  const handleCreateRoute = () => {
    // TODO: Create new delivery route in MongoDB
    console.log("Creating route:", newRoute);
    // MongoDB Query: db.deliveryRoutes.insertOne({ ...newRoute, createdAt: new Date(), status: 'pending' })
    setIsCreateRouteOpen(false);
    setNewRoute({ name: "", selectedOrders: [], notes: "" });
  };

  const handleAssignDriver = (routeId: string, driverId: string) => {
    // TODO: Assign driver to route in MongoDB
    console.log(`Assigning driver ${driverId} to route ${routeId}`);
    // MongoDB Query: db.deliveryRoutes.updateOne({ _id: routeId }, { $set: { driverId, status: 'assigned' } })
  };

  const handleSendRouteToDriver = (routeId: string, method: 'whatsapp' | 'internal') => {
    // TODO: Send route details via WhatsApp or internal notification
    console.log(`Sending route ${routeId} via ${method}`);
    if (method === 'whatsapp') {
      // Integration with WhatsApp Business API
      // Send route details, order addresses, customer contact info
    } else {
      // Internal notification system
      // Push notification to driver mobile app
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available": return "bg-green-500";
      case "on-route": return "bg-blue-500"; 
      case "off-duty": return "bg-gray-500";
      case "pending": return "bg-yellow-500";
      case "in-progress": return "bg-purple-500";
      case "completed": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Delivery Management</h1>
            <p className="text-gray-600">Manage routes, assign drivers, and track deliveries</p>
          </div>
          <Dialog open={isCreateRouteOpen} onOpenChange={setIsCreateRouteOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Route
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create Delivery Route</DialogTitle>
                <DialogDescription>
                  Create a new delivery route and assign orders
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="routeName">Route Name</Label>
                  <Input
                    id="routeName"
                    value={newRoute.name}
                    onChange={(e) => setNewRoute({...newRoute, name: e.target.value})}
                    placeholder="Enter route name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Select Orders</Label>
                  <div className="border rounded-lg p-4 max-h-40 overflow-y-auto">
                    {/* TODO: Fetch pending orders from MongoDB */}
                    {["ORD-006", "ORD-007", "ORD-008"].map((orderId) => (
                      <div key={orderId} className="flex items-center space-x-2 mb-2">
                        <input
                          type="checkbox"
                          id={orderId}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setNewRoute({...newRoute, selectedOrders: [...newRoute.selectedOrders, orderId]});
                            } else {
                              setNewRoute({...newRoute, selectedOrders: newRoute.selectedOrders.filter(id => id !== orderId)});
                            }
                          }}
                        />
                        <label htmlFor={orderId} className="text-sm">{orderId} - Customer Name - $XX.XX</label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={newRoute.notes}
                    onChange={(e) => setNewRoute({...newRoute, notes: e.target.value})}
                    placeholder="Add any special instructions"
                    rows={3}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={() => setIsCreateRouteOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateRoute}>
                  Create Route
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="routes" className="space-y-6">
          <TabsList>
            <TabsTrigger value="routes">Delivery Routes</TabsTrigger>
            <TabsTrigger value="drivers">Drivers</TabsTrigger>
            <TabsTrigger value="tracking">Live Tracking</TabsTrigger>
          </TabsList>

          <TabsContent value="routes">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Delivery Routes</CardTitle>
                    <CardDescription>
                      Manage and track delivery routes
                    </CardDescription>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search routes..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {routes.map((route) => (
                    <div key={route.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div>
                            <h3 className="font-semibold">{route.name}</h3>
                            <p className="text-sm text-gray-600">
                              {route.orders.length} orders • {route.distance} • Est. {route.estimatedTime}
                            </p>
                          </div>
                          <Badge className={`${getStatusColor(route.status)} text-white`}>
                            {route.status.replace('-', ' ')}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          {!route.driverId ? (
                            <Select onValueChange={(value) => handleAssignDriver(route.id, value)}>
                              <SelectTrigger className="w-40">
                                <SelectValue placeholder="Assign Driver" />
                              </SelectTrigger>
                              <SelectContent>
                                {drivers.filter(d => d.status === 'available').map((driver) => (
                                  <SelectItem key={driver.id} value={driver.id}>
                                    {driver.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          ) : (
                            <div className="text-sm">
                              <p className="font-medium">{route.driverName}</p>
                              <p className="text-gray-600">Assigned</p>
                            </div>
                          )}
                          {route.driverId && (
                            <>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleSendRouteToDriver(route.id, 'whatsapp')}
                              >
                                <MessageSquare className="h-4 w-4 mr-2" />
                                WhatsApp
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleSendRouteToDriver(route.id, 'internal')}
                              >
                                Send Route
                              </Button>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Route Stops */}
                      <div className="border-t pt-4">
                        <h4 className="text-sm font-medium mb-3">Route Stops</h4>
                        <div className="space-y-2">
                          {route.stops.map((stop, idx) => (
                            <div key={idx} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                              <div className="flex items-center gap-3">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                                  stop.status === 'completed' ? 'bg-green-500 text-white' : 'bg-gray-300'
                                }`}>
                                  {stop.status === 'completed' ? <CheckCircle className="h-3 w-3" /> : idx + 1}
                                </div>
                                <div>
                                  <p className="font-medium">{stop.orderId}</p>
                                  <p className="text-sm text-gray-600">{stop.address}</p>
                                </div>
                              </div>
                              <div className="text-right text-sm">
                                {stop.status === 'completed' ? (
                                  <span className="text-green-600 font-medium">✓ {stop.completedTime}</span>
                                ) : (
                                  <span className="text-gray-600">Est. {stop.estimatedTime}</span>
                                )}
                              </div>
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

          <TabsContent value="drivers">
            <Card>
              <CardHeader>
                <CardTitle>Driver Management</CardTitle>
                <CardDescription>
                  Manage driver assignments and performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Driver</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Vehicle</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Current Route</TableHead>
                      <TableHead>Performance</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {drivers.map((driver) => (
                      <TableRow key={driver.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <User className="h-4 w-4 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium">{driver.name}</p>
                              <p className="text-sm text-gray-600">{driver.id}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <p>{driver.phone}</p>
                            <p className="text-gray-600">{driver.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>{driver.vehicle}</TableCell>
                        <TableCell>
                          <Badge className={`${getStatusColor(driver.status)} text-white`}>
                            {driver.status.replace('-', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {driver.currentRoute ? (
                            <span className="font-medium">{driver.currentRoute}</span>
                          ) : (
                            <span className="text-gray-400">None</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <p>{driver.totalDeliveries} deliveries</p>
                            <p className="text-yellow-600">★ {driver.rating}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              View Details
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

          <TabsContent value="tracking">
            <Card>
              <CardHeader>
                <CardTitle>Live Tracking</CardTitle>
                <CardDescription>
                  Real-time tracking of active deliveries
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Active Routes</h3>
                    {routes.filter(r => r.status === 'in-progress').map((route) => (
                      <div key={route.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{route.name}</h4>
                          <Badge className="bg-blue-500 text-white">Live</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">Driver: {route.driverName}</p>
                        <div className="text-sm">
                          <p>Progress: {route.stops.filter(s => s.status === 'completed').length}/{route.stops.length} stops</p>
                          <p>ETA: {route.estimatedTime}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-gray-100 rounded-lg p-4 min-h-96 flex items-center justify-center">
                    <div className="text-center text-gray-600">
                      <MapPin className="h-12 w-12 mx-auto mb-2" />
                      <p>Real-time Map View</p>
                      <p className="text-sm">TODO: Integrate with Google Maps API</p>
                      <p className="text-sm">Show driver locations and routes</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DeliveryManagement;