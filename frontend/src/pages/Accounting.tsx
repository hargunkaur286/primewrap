import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  Download, 
  Upload, 
  RefreshCw, 
  DollarSign, 
  FileText, 
  Calendar,
  CheckCircle,
  AlertTriangle,
  Settings
} from "lucide-react";

const Accounting = () => {
  const [isQuickBooksConnected, setIsQuickBooksConnected] = useState(false);
  const [isSyncingData, setIsSyncingData] = useState(false);
  const [quickBooksSetupOpen, setQuickBooksSetupOpen] = useState(false);

  // TODO: Replace with MongoDB queries from accounting/invoices collections
  const financialData = {
    summary: {
      totalRevenue: 45780.30,
      totalExpenses: 12340.50,
      netProfit: 33439.80,
      outstandingInvoices: 5680.25,
      paidInvoices: 40100.05,
      taxesOwed: 3456.78
    },
    invoices: [
      {
        id: "INV-2024-001",
        orderId: "ORD-001",
        customer: "John Doe",
        amount: 49.98,
        status: "paid",
        issueDate: "2024-01-15",
        dueDate: "2024-01-30",
        paidDate: "2024-01-20",
        quickBooksId: "QB-INV-001"
      },
      {
        id: "INV-2024-002",
        orderId: "ORD-002",
        customer: "Jane Smith",
        amount: 156.75,
        status: "outstanding",
        issueDate: "2024-01-14",
        dueDate: "2024-01-29",
        paidDate: null,
        quickBooksId: null
      },
      {
        id: "INV-2024-003",
        orderId: "ORD-003",
        customer: "Mike Johnson",
        amount: 234.20,
        status: "overdue",
        issueDate: "2024-01-10",
        dueDate: "2024-01-25",
        paidDate: null,
        quickBooksId: "QB-INV-003"
      }
    ],
    expenses: [
      {
        id: "EXP-001",
        description: "Product inventory purchase",
        category: "Cost of Goods",
        amount: 8500.00,
        date: "2024-01-12",
        status: "recorded",
        quickBooksId: "QB-EXP-001"
      },
      {
        id: "EXP-002",
        description: "Delivery vehicle fuel",
        category: "Transportation",
        amount: 450.30,
        date: "2024-01-15",
        status: "pending",
        quickBooksId: null
      }
    ],
    quickBooksSync: {
      lastSync: "2024-01-15 14:30:00",
      pendingItems: 5,
      syncedItems: 156,
      errors: 2
    }
  };

  const [quickBooksCredentials, setQuickBooksCredentials] = useState({
    clientId: "",
    clientSecret: "",
    companyId: "",
    environment: "sandbox" // sandbox or production
  });

  const handleQuickBooksConnection = () => {
    // TODO: Implement QuickBooks OAuth flow
    console.log("Connecting to QuickBooks:", quickBooksCredentials);
    // Steps:
    // 1. Save credentials to MongoDB secrets
    // 2. Initiate OAuth flow
    // 3. Store access tokens securely
    // 4. Test connection
    setIsQuickBooksConnected(true);
    setQuickBooksSetupOpen(false);
  };

  const handleSyncToQuickBooks = async () => {
    setIsSyncingData(true);
    try {
      // TODO: Sync data to QuickBooks API
      console.log("Syncing data to QuickBooks...");
      
      // Sync Process:
      // 1. Get all unsynced invoices from MongoDB
      // 2. Create/update invoices in QuickBooks
      // 3. Get all unsynced expenses from MongoDB  
      // 4. Create/update expenses in QuickBooks
      // 5. Update sync status in MongoDB
      // 6. Handle any sync errors
      
      setTimeout(() => {
        setIsSyncingData(false);
        console.log("Sync completed successfully");
      }, 3000);
    } catch (error) {
      setIsSyncingData(false);
      console.error("Sync failed:", error);
    }
  };

  const handleExportData = (format: 'csv' | 'excel' | 'pdf') => {
    // TODO: Generate and download financial reports
    console.log(`Exporting financial data as ${format}`);
    // MongoDB aggregation queries to generate reports:
    // - Profit & Loss statement
    // - Invoice summary
    // - Expense report
    // - Tax report
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid": return "bg-green-500";
      case "outstanding": return "bg-yellow-500";
      case "overdue": return "bg-red-500";
      case "recorded": return "bg-blue-500";
      case "pending": return "bg-gray-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Accounting Integration</h1>
            <p className="text-gray-600">Manage finances and integrate with QuickBooks</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Dialog open={quickBooksSetupOpen} onOpenChange={setQuickBooksSetupOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto">
                  <Settings className="h-4 w-4 mr-2" />
                  QuickBooks Setup
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>QuickBooks Integration Setup</DialogTitle>
                  <DialogDescription>
                    Connect your QuickBooks account for automatic data synchronization
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="clientId">Client ID</Label>
                    <Input
                      id="clientId"
                      value={quickBooksCredentials.clientId}
                      onChange={(e) => setQuickBooksCredentials({...quickBooksCredentials, clientId: e.target.value})}
                      placeholder="Enter QuickBooks App Client ID"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="clientSecret">Client Secret</Label>
                    <Input
                      id="clientSecret"
                      type="password"
                      value={quickBooksCredentials.clientSecret}
                      onChange={(e) => setQuickBooksCredentials({...quickBooksCredentials, clientSecret: e.target.value})}
                      placeholder="Enter QuickBooks App Client Secret"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="companyId">Company ID</Label>
                    <Input
                      id="companyId"
                      value={quickBooksCredentials.companyId}
                      onChange={(e) => setQuickBooksCredentials({...quickBooksCredentials, companyId: e.target.value})}
                      placeholder="Enter QuickBooks Company ID"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="environment">Environment</Label>
                    <Select 
                      value={quickBooksCredentials.environment} 
                      onValueChange={(value) => setQuickBooksCredentials({...quickBooksCredentials, environment: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sandbox">Sandbox (Testing)</SelectItem>
                        <SelectItem value="production">Production</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" onClick={() => setQuickBooksSetupOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleQuickBooksConnection}>
                    Connect to QuickBooks
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button 
              onClick={handleSyncToQuickBooks}
              disabled={!isQuickBooksConnected || isSyncingData}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isSyncingData ? 'animate-spin' : ''}`} />
              {isSyncingData ? 'Syncing...' : 'Sync to QuickBooks'}
            </Button>
          </div>
        </div>

        {/* QuickBooks Connection Status */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  QuickBooks Integration Status
                </CardTitle>
                <CardDescription>
                  Current connection and sync status
                </CardDescription>
              </div>
              <Badge className={isQuickBooksConnected ? "bg-green-500" : "bg-red-500"}>
                {isQuickBooksConnected ? "Connected" : "Disconnected"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {isQuickBooksConnected ? (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{financialData.quickBooksSync.syncedItems}</div>
                  <div className="text-sm text-gray-600">Synced Items</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">{financialData.quickBooksSync.pendingItems}</div>
                  <div className="text-sm text-gray-600">Pending Sync</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{financialData.quickBooksSync.errors}</div>
                  <div className="text-sm text-gray-600">Sync Errors</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium">Last Sync</div>
                  <div className="text-sm text-gray-600">{financialData.quickBooksSync.lastSync}</div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">QuickBooks is not connected. Set up the integration to automatically sync your financial data.</p>
                <Button onClick={() => setQuickBooksSetupOpen(true)}>
                  Connect QuickBooks
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Financial Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                ${financialData.summary.totalRevenue.toLocaleString()}
              </div>
              <p className="text-sm text-gray-600 mt-2">
                This month's total revenue
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Net Profit</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">
                ${financialData.summary.netProfit.toLocaleString()}
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Revenue minus expenses
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Outstanding Invoices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">
                ${financialData.summary.outstandingInvoices.toLocaleString()}
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Awaiting payment
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="invoices" className="space-y-6">
          <TabsList>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="reports">Financial Reports</TabsTrigger>
            <TabsTrigger value="taxes">Tax Management</TabsTrigger>
          </TabsList>

          <TabsContent value="invoices">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Invoice Management</CardTitle>
                    <CardDescription>
                      Track and manage customer invoices
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => handleExportData('csv')}>
                      <Download className="h-4 w-4 mr-2" />
                      Export CSV
                    </Button>
                    <Button>Generate Invoice</Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Issue Date</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>QuickBooks</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {financialData.invoices.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell className="font-medium">{invoice.id}</TableCell>
                        <TableCell>{invoice.customer}</TableCell>
                        <TableCell className="font-medium">${invoice.amount}</TableCell>
                        <TableCell>
                          <Badge className={`${getStatusColor(invoice.status)} text-white`}>
                            {invoice.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{invoice.issueDate}</TableCell>
                        <TableCell>{invoice.dueDate}</TableCell>
                        <TableCell>
                          {invoice.quickBooksId ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <AlertTriangle className="h-4 w-4 text-yellow-500" />
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <FileText className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Download className="h-4 w-4" />
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

          <TabsContent value="expenses">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Expense Tracking</CardTitle>
                    <CardDescription>
                      Monitor business expenses and costs
                    </CardDescription>
                  </div>
                  <Button>Add Expense</Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Expense ID</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>QuickBooks</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {financialData.expenses.map((expense) => (
                      <TableRow key={expense.id}>
                        <TableCell className="font-medium">{expense.id}</TableCell>
                        <TableCell>{expense.description}</TableCell>
                        <TableCell>{expense.category}</TableCell>
                        <TableCell className="font-medium">${expense.amount}</TableCell>
                        <TableCell>{expense.date}</TableCell>
                        <TableCell>
                          <Badge className={`${getStatusColor(expense.status)} text-white`}>
                            {expense.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {expense.quickBooksId ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <AlertTriangle className="h-4 w-4 text-yellow-500" />
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profit & Loss Statement</CardTitle>
                  <CardDescription>
                    Generate comprehensive P&L reports
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Total Revenue</span>
                      <span className="font-medium">${financialData.summary.totalRevenue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Expenses</span>
                      <span className="font-medium">${financialData.summary.totalExpenses.toLocaleString()}</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-bold">
                      <span>Net Profit</span>
                      <span className="text-green-600">${financialData.summary.netProfit.toLocaleString()}</span>
                    </div>
                    <div className="space-y-2 mt-4">
                      <Button className="w-full" onClick={() => handleExportData('pdf')}>
                        <Download className="h-4 w-4 mr-2" />
                        Export PDF Report
                      </Button>
                      <Button className="w-full" variant="outline" onClick={() => handleExportData('excel')}>
                        <Download className="h-4 w-4 mr-2" />
                        Export Excel Report
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Cash Flow Summary</CardTitle>
                  <CardDescription>
                    Current cash flow status
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Paid Invoices</span>
                      <span className="font-medium text-green-600">${financialData.summary.paidInvoices.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Outstanding Invoices</span>
                      <span className="font-medium text-yellow-600">${financialData.summary.outstandingInvoices.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Monthly Expenses</span>
                      <span className="font-medium text-red-600">${financialData.summary.totalExpenses.toLocaleString()}</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-bold">
                      <span>Available Cash</span>
                      <span className="text-blue-600">${(financialData.summary.paidInvoices - financialData.summary.totalExpenses).toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="taxes">
            <Card>
              <CardHeader>
                <CardTitle>Tax Management</CardTitle>
                <CardDescription>
                  Track tax obligations and generate tax reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-4">Tax Summary</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Estimated Taxes Owed</span>
                        <span className="font-medium">${financialData.summary.taxesOwed.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax Quarter</span>
                        <span>Q1 2024</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Due Date</span>
                        <span>April 15, 2024</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-4">Generate Tax Reports</h3>
                    <div className="space-y-2">
                      <Button className="w-full" variant="outline">
                        <Calendar className="h-4 w-4 mr-2" />
                        Quarterly Tax Report
                      </Button>
                      <Button className="w-full" variant="outline">
                        <FileText className="h-4 w-4 mr-2" />
                        Annual Tax Summary
                      </Button>
                      <Button className="w-full" variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Export for Accountant
                      </Button>
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

export default Accounting;