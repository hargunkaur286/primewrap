import type { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from "recharts";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  ShoppingCart, 
  Package, 
  DollarSign,
  Eye,
  Download,
  Calendar,
  type LucideIcon
} from "lucide-react";

const CHART_COLORS = ["#0B2D5C", "#FFC400", "#000000"] as const;

type StatCardProps = {
  title: string;
  value: ReactNode;
  change: number;
  subtitle: string;
  icon: LucideIcon;
};

const Analytics = () => {
  // TODO: Replace with MongoDB aggregation queries
  const analyticsData = {
    overview: {
      totalRevenue: 45780.30,
      revenueGrowth: 12.5,
      totalOrders: 342,
      ordersGrowth: 8.3,
      totalCustomers: 156,
      customersGrowth: 15.2,
      averageOrderValue: 133.86,
      avgOrderGrowth: 4.1,
      websiteVisits: 2840,
      visitsGrowth: 18.7,
      conversionRate: 3.2
    },
    salesData: [
      { date: "Jan 1", revenue: 1200, orders: 15 },
      { date: "Jan 2", revenue: 1500, orders: 18 },
      { date: "Jan 3", revenue: 1100, orders: 12 },
      { date: "Jan 4", revenue: 1800, orders: 22 },
      { date: "Jan 5", revenue: 2100, orders: 25 },
      { date: "Jan 6", revenue: 1900, orders: 23 },
      { date: "Jan 7", revenue: 2300, orders: 28 }
    ],
    productPerformance: [
      { name: "Aluminum Foil 200m", sales: 45, revenue: 1124.55, percentage: 35 },
      { name: "Aluminum Foil 100m", sales: 32, revenue: 511.68, percentage: 25 },
      { name: "Plastic Wrap 50m", sales: 28, revenue: 251.72, percentage: 22 },
      { name: "Bubble Wrap Roll", sales: 18, revenue: 359.82, percentage: 18 }
    ],
    inventoryStatus: [
      { name: "In Stock", value: 78, color: "#0B2D5C" },
      { name: "Low Stock", value: 15, color: "#FFC400" },
      { name: "Out of Stock", value: 7, color: "#000000" }
    ],
    customerMetrics: {
      newCustomers: 23,
      returningCustomers: 89,
      topCustomers: [
        { name: "John Doe", orders: 8, revenue: 890.45 },
        { name: "Jane Smith", orders: 6, revenue: 745.20 },
        { name: "Mike Johnson", orders: 5, revenue: 623.80 }
      ]
    },
    deliveryMetrics: {
      onTimeDelivery: 94.5,
      averageDeliveryTime: 2.3,
      deliveryIssues: 3,
      completionRate: 98.2
    }
  };

  const StatCard = ({ title, value, change, icon: Icon, subtitle }: StatCardProps) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center text-xs text-muted-foreground">
          {change > 0 ? (
            <TrendingUp className="h-3 w-3 text-primary mr-1" />
          ) : (
            <TrendingDown className="h-3 w-3 text-muted-foreground mr-1" />
          )}
          <span className={change > 0 ? "text-primary" : "text-muted-foreground"}>
            {Math.abs(change)}%
          </span>
          <span className="ml-1">{subtitle}</span>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
            <p className="text-gray-600">Comprehensive business insights and performance metrics</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Select defaultValue="30">
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
                <SelectItem value="365">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="w-full sm:w-auto">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Total Revenue" 
            value={`$${analyticsData.overview.totalRevenue.toLocaleString()}`}
            change={analyticsData.overview.revenueGrowth}
            icon={DollarSign}
            subtitle="from last month"
          />
          <StatCard 
            title="Total Orders" 
            value={analyticsData.overview.totalOrders}
            change={analyticsData.overview.ordersGrowth}
            icon={ShoppingCart}
            subtitle="from last month"
          />
          <StatCard 
            title="Website Visits" 
            value={analyticsData.overview.websiteVisits.toLocaleString()}
            change={analyticsData.overview.visitsGrowth}
            icon={Eye}
            subtitle="from last month"
          />
          <StatCard 
            title="Conversion Rate" 
            value={`${analyticsData.overview.conversionRate}%`}
            change={2.1}
            icon={TrendingUp}
            subtitle="from last month"
          />
        </div>

        <Tabs defaultValue="sales" className="space-y-6">
          <TabsList>
            <TabsTrigger value="sales">Sales Analytics</TabsTrigger>
            <TabsTrigger value="products">Product Performance</TabsTrigger>
            <TabsTrigger value="customers">Customer Insights</TabsTrigger>
            <TabsTrigger value="inventory">Inventory Status</TabsTrigger>
            <TabsTrigger value="delivery">Delivery Metrics</TabsTrigger>
          </TabsList>

          <TabsContent value="sales">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Trend</CardTitle>
                  <CardDescription>Daily revenue over the past week</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={analyticsData.salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="revenue" stroke={CHART_COLORS[0]} fill={CHART_COLORS[0]} fillOpacity={0.2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Orders Trend</CardTitle>
                  <CardDescription>Number of orders over the past week</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={analyticsData.salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="orders" stroke={CHART_COLORS[1]} strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Average Order Value</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">${analyticsData.overview.averageOrderValue}</div>
                  <div className="flex items-center text-sm text-primary mt-2">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    +{analyticsData.overview.avgOrderGrowth}% from last month
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Total Customers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{analyticsData.overview.totalCustomers}</div>
                  <div className="flex items-center text-sm text-primary mt-2">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    +{analyticsData.overview.customersGrowth}% from last month
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Monthly Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">+{analyticsData.overview.revenueGrowth}%</div>
                  <div className="text-sm text-muted-foreground mt-2">Revenue growth rate</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="products">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Products</CardTitle>
                  <CardDescription>Best-selling products by revenue</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={analyticsData.productPerformance}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="revenue" fill={CHART_COLORS[0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Product Sales Distribution</CardTitle>
                  <CardDescription>Sales percentage by product</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={analyticsData.productPerformance}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill={CHART_COLORS[0]}
                        dataKey="sales"
                        label={({ name, percentage }) => `${name}: ${percentage}%`}
                      >
                        {analyticsData.productPerformance.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Product Performance Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.productPerformance.map((product, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                      <div>
                        <h3 className="font-medium">{product.name}</h3>
                        <p className="text-sm text-muted-foreground">{product.sales} units sold</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${product.revenue}</p>
                        <Badge>{product.percentage}% of sales</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customers">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Acquisition</CardTitle>
                  <CardDescription>New vs returning customers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium">New Customers</h3>
                        <p className="text-3xl font-bold text-blue-600">{analyticsData.customerMetrics.newCustomers}</p>
                      </div>
                      <div className="text-right">
                        <h3 className="text-lg font-medium">Returning Customers</h3>
                        <p className="text-3xl font-bold text-green-600">{analyticsData.customerMetrics.returningCustomers}</p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ 
                          width: `${(analyticsData.customerMetrics.newCustomers / 
                            (analyticsData.customerMetrics.newCustomers + analyticsData.customerMetrics.returningCustomers)) * 100}%` 
                        }}
                      ></div>
                    </div>
                    <div className="text-sm text-gray-600 text-center">
                      {Math.round((analyticsData.customerMetrics.newCustomers / 
                        (analyticsData.customerMetrics.newCustomers + analyticsData.customerMetrics.returningCustomers)) * 100)}% new customers
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Customers</CardTitle>
                  <CardDescription>Highest value customers by revenue</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.customerMetrics.topCustomers.map((customer, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <Users className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">{customer.name}</p>
                            <p className="text-sm text-gray-600">{customer.orders} orders</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${customer.revenue}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="inventory">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Inventory Overview</CardTitle>
                  <CardDescription>Current stock status distribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={analyticsData.inventoryStatus}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill={CHART_COLORS[0]}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {analyticsData.inventoryStatus.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Stock Alerts</CardTitle>
                  <CardDescription>Products requiring attention</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Package className="h-4 w-4 text-red-600" />
                        <span className="font-medium text-red-800">Out of Stock</span>
                      </div>
                      <p className="text-sm text-red-700">7 products need immediate restocking</p>
                    </div>
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Package className="h-4 w-4 text-yellow-600" />
                        <span className="font-medium text-yellow-800">Low Stock</span>
                      </div>
                      <p className="text-sm text-yellow-700">15 products are running low</p>
                    </div>
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Package className="h-4 w-4 text-green-600" />
                        <span className="font-medium text-green-800">Well Stocked</span>
                      </div>
                      <p className="text-sm text-green-700">78% of products are well stocked</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="delivery">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">On-Time Delivery</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {analyticsData.deliveryMetrics.onTimeDelivery}%
                  </div>
                  <p className="text-xs text-muted-foreground">of deliveries on time</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Avg Delivery Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">
                    {analyticsData.deliveryMetrics.averageDeliveryTime} days
                  </div>
                  <p className="text-xs text-muted-foreground">average delivery time</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Delivery Issues</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">
                    {analyticsData.deliveryMetrics.deliveryIssues}
                  </div>
                  <p className="text-xs text-muted-foreground">issues this month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Completion Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {analyticsData.deliveryMetrics.completionRate}%
                  </div>
                  <p className="text-xs text-muted-foreground">successful deliveries</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Analytics;