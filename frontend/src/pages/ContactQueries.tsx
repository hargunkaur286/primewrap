// import React, { useState } from 'react';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Badge } from '@/components/ui/badge';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
// import { Textarea } from '@/components/ui/textarea';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { MessageCircle, Search, Filter, Eye, Reply, Calendar, Mail, Phone, Clock } from 'lucide-react';

// const ContactQueries = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterStatus, setFilterStatus] = useState('all');

//   // TODO: Replace with MongoDB query - contact_messages collection
//   const queries = [
//     {
//       id: 'CQ-001',
//       name: 'John Doe',
//       email: 'john@example.com',
//       phone: '+1 234 567 8900',
//       subject: 'Product Inquiry',
//       message: 'I would like to know more about your eco-friendly packaging options for bulk orders.',
//       status: 'new',
//       priority: 'medium',
//       submittedAt: '2024-01-15T10:30:00Z',
//       lastReply: null,
//       category: 'product_inquiry'
//     },
//     {
//       id: 'CQ-002',
//       name: 'Jane Smith',
//       email: 'jane@example.com',
//       phone: '+1 234 567 8901',
//       subject: 'Order Issue',
//       message: 'My order #ORD-002 was damaged during shipping. Can you help with a replacement?',
//       status: 'replied',
//       priority: 'high',
//       submittedAt: '2024-01-14T14:20:00Z',
//       lastReply: '2024-01-14T16:30:00Z',
//       category: 'order_support'
//     },
//     {
//       id: 'CQ-003',
//       name: 'Mike Johnson',
//       email: 'mike@example.com',
//       phone: '+1 234 567 8902',
//       subject: 'Partnership Opportunity',
//       message: 'We are interested in becoming a distributor for your products in the Alberta region.',
//       status: 'in_progress',
//       priority: 'high',
//       submittedAt: '2024-01-13T09:15:00Z',
//       lastReply: '2024-01-13T11:20:00Z',
//       category: 'business'
//     },
//     {
//       id: 'CQ-004',
//       name: 'Sarah Wilson',
//       email: 'sarah@example.com',
//       phone: null,
//       subject: 'Website Feedback',
//       message: 'The checkout process is a bit confusing. Consider simplifying the payment steps.',
//       status: 'resolved',
//       priority: 'low',
//       submittedAt: '2024-01-12T16:45:00Z',
//       lastReply: '2024-01-12T18:00:00Z',
//       category: 'feedback'
//     }
//   ];

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'new': return 'bg-blue-500';
//       case 'replied': return 'bg-green-500';
//       case 'in_progress': return 'bg-yellow-500';
//       case 'resolved': return 'bg-gray-500';
//       default: return 'bg-gray-500';
//     }
//   };

//   const getPriorityColor = (priority: string) => {
//     switch (priority) {
//       case 'high': return 'bg-red-500';
//       case 'medium': return 'bg-yellow-500';
//       case 'low': return 'bg-green-500';
//       default: return 'bg-gray-500';
//     }
//   };

//   const getCategoryColor = (category: string) => {
//     switch (category) {
//       case 'product_inquiry': return 'bg-blue-500';
//       case 'order_support': return 'bg-purple-500';
//       case 'business': return 'bg-green-500';
//       case 'feedback': return 'bg-orange-500';
//       default: return 'bg-gray-500';
//     }
//   };

//   const filteredQueries = queries.filter(query => {
//     const matchesSearch = query.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          query.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          query.subject.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesFilter = filterStatus === 'all' || query.status === filterStatus;
//     return matchesSearch && matchesFilter;
//   });

//   const newQueries = queries.filter(q => q.status === 'new').length;
//   const inProgressQueries = queries.filter(q => q.status === 'in_progress').length;
//   const highPriorityQueries = queries.filter(q => q.priority === 'high').length;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-8">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact Queries</h1>
//             <p className="text-gray-600">Manage customer inquiries and support requests</p>
//           </div>
//           <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
//             <Reply className="h-4 w-4 mr-2" />
//             Quick Reply Templates
//           </Button>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Total Queries</CardTitle>
//               <MessageCircle className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{queries.length}</div>
//               <p className="text-xs text-muted-foreground">+12% from last month</p>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">New Queries</CardTitle>
//               <Clock className="h-4 w-4 text-blue-600" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{newQueries}</div>
//               <p className="text-xs text-muted-foreground">Requires attention</p>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">In Progress</CardTitle>
//               <MessageCircle className="h-4 w-4 text-yellow-600" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{inProgressQueries}</div>
//               <p className="text-xs text-muted-foreground">Being handled</p>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">High Priority</CardTitle>
//               <MessageCircle className="h-4 w-4 text-red-600" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{highPriorityQueries}</div>
//               <p className="text-xs text-muted-foreground">Urgent responses needed</p>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Filters and Search */}
//         <Card className="mb-6">
//           <CardHeader>
//             <CardTitle>Query Directory</CardTitle>
//             <CardDescription>Search and filter customer inquiries</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="flex flex-col md:flex-row gap-4">
//               <div className="relative flex-1">
//                 <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                 <Input
//                   placeholder="Search queries by name, email, or subject..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-10"
//                 />
//               </div>
//               <Select value={filterStatus} onValueChange={setFilterStatus}>
//                 <SelectTrigger className="w-full md:w-48">
//                   <Filter className="h-4 w-4 mr-2" />
//                   <SelectValue placeholder="Filter by status" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">All Status</SelectItem>
//                   <SelectItem value="new">New</SelectItem>
//                   <SelectItem value="replied">Replied</SelectItem>
//                   <SelectItem value="in_progress">In Progress</SelectItem>
//                   <SelectItem value="resolved">Resolved</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Queries Table */}
//         <Card>
//           <CardHeader>
//             <CardTitle>All Queries ({filteredQueries.length})</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="overflow-x-auto">
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Query ID</TableHead>
//                     <TableHead>Customer</TableHead>
//                     <TableHead>Subject</TableHead>
//                     <TableHead>Category</TableHead>
//                     <TableHead>Status</TableHead>
//                     <TableHead>Priority</TableHead>
//                     <TableHead>Submitted</TableHead>
//                     <TableHead>Actions</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {filteredQueries.map((query) => (
//                     <TableRow key={query.id}>
//                       <TableCell className="font-medium">{query.id}</TableCell>
//                       <TableCell>
//                         <div>
//                           <div className="font-medium">{query.name}</div>
//                           <div className="text-sm text-gray-500 space-y-1">
//                             <div className="flex items-center">
//                               <Mail className="h-3 w-3 mr-1" />
//                               {query.email}
//                             </div>
//                             {query.phone && (
//                               <div className="flex items-center">
//                                 <Phone className="h-3 w-3 mr-1" />
//                                 {query.phone}
//                               </div>
//                             )}
//                           </div>
//                         </div>
//                       </TableCell>
//                       <TableCell className="max-w-xs truncate">{query.subject}</TableCell>
//                       <TableCell>
//                         <Badge className={`${getCategoryColor(query.category)} text-white`}>
//                           {query.category.replace('_', ' ')}
//                         </Badge>
//                       </TableCell>
//                       <TableCell>
//                         <Badge className={`${getStatusColor(query.status)} text-white`}>
//                           {query.status.replace('_', ' ')}
//                         </Badge>
//                       </TableCell>
//                       <TableCell>
//                         <Badge className={`${getPriorityColor(query.priority)} text-white`}>
//                           {query.priority}
//                         </Badge>
//                       </TableCell>
//                       <TableCell>
//                         <div className="flex items-center text-sm">
//                           <Calendar className="h-3 w-3 mr-1" />
//                           {new Date(query.submittedAt).toLocaleDateString()}
//                         </div>
//                       </TableCell>
//                       <TableCell>
//                         <div className="flex space-x-2">
//                           <Dialog>
//                             <DialogTrigger asChild>
//                               <Button variant="outline" size="sm">
//                                 <Eye className="h-3 w-3" />
//                               </Button>
//                             </DialogTrigger>
//                             <DialogContent className="max-w-2xl">
//                               <DialogHeader>
//                                 <DialogTitle>Query Details - {query.id}</DialogTitle>
//                                 <DialogDescription>
//                                   Complete customer inquiry information
//                                 </DialogDescription>
//                               </DialogHeader>
//                               <div className="space-y-4">
//                                 <div className="grid grid-cols-2 gap-4">
//                                   <div>
//                                     <h4 className="font-semibold">Customer</h4>
//                                     <p>{query.name}</p>
//                                     <p className="text-sm text-gray-500">{query.email}</p>
//                                     {query.phone && <p className="text-sm text-gray-500">{query.phone}</p>}
//                                   </div>
//                                   <div>
//                                     <h4 className="font-semibold">Status & Priority</h4>
//                                     <div className="space-y-2">
//                                       <Badge className={`${getStatusColor(query.status)} text-white`}>
//                                         {query.status.replace('_', ' ')}
//                                       </Badge>
//                                       <Badge className={`${getPriorityColor(query.priority)} text-white`}>
//                                         {query.priority}
//                                       </Badge>
//                                     </div>
//                                   </div>
//                                 </div>
//                                 <div>
//                                   <h4 className="font-semibold">Subject</h4>
//                                   <p>{query.subject}</p>
//                                 </div>
//                                 <div>
//                                   <h4 className="font-semibold">Message</h4>
//                                   <p className="bg-gray-50 p-3 rounded">{query.message}</p>
//                                 </div>
//                                 <div className="space-y-2">
//                                   <h4 className="font-semibold">Reply</h4>
//                                   <Textarea placeholder="Type your reply here..." rows={4} />
//                                   <div className="flex space-x-2">
//                                     <Button>Send Reply</Button>
//                                     <Button variant="outline">Mark as Resolved</Button>
//                                   </div>
//                                 </div>
//                               </div>
//                             </DialogContent>
//                           </Dialog>
//                           <Button variant="outline" size="sm">
//                             <Reply className="h-3 w-3" />
//                           </Button>
//                         </div>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default ContactQueries;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Search, Eye } from 'lucide-react';
import { API_BASE } from '@/lib/apiBase';

interface MessageType {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

const ContactQueries = () => {
  const [queries, setQueries] = useState<MessageType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        const res = await axios.get<{ success: boolean; data: MessageType[] }>(
          `${API_BASE}/api/v1/user/contact`,
          { withCredentials: true }
        );
        setQueries(res.data.data);
      } catch (err: any) {
        console.error('fetchMessages error', err);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  // filter by name/email/message
  const filtered = queries.filter(q =>
    (q.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (q.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (q.message || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <p className="p-8 text-center">Loading messages…</p>;
  }
  if (error) {
    return <p className="p-8 text-center text-red-500">Error: {error}</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4 sm:p-6 overflow-x-hidden">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Contact Messages</h1>
            <p className="text-gray-600">All submissions from your “Contact Us” form</p>
          </div>
        </div>

        {/* Search */}
        <Card>
          <CardHeader>
            <CardTitle>Search Messages</CardTitle>
            <CardDescription>Filter by name, email or message content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search…"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardHeader>
            <CardTitle>Messages ({filtered.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {filtered.length === 0 ? (
              <p className="text-center py-8 text-gray-500">No messages found.</p>
            ) : (
              <div className="overflow-x-auto">
                <Table className="min-w-[760px]">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="hidden md:table-cell">ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead className="hidden lg:table-cell">Message</TableHead>
                      <TableHead className="whitespace-nowrap">Submitted</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map(msg => (
                      <TableRow key={msg._id}>
                        <TableCell className="hidden md:table-cell font-medium whitespace-nowrap">{msg._id}</TableCell>
                        <TableCell className="break-words">{msg.name}</TableCell>
                        <TableCell className="break-words">{msg.email}</TableCell>
                        <TableCell className="hidden lg:table-cell max-w-xs truncate">{msg.message}</TableCell>
                        <TableCell>
                          {new Date(msg.createdAt).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-lg">
                              <DialogHeader>
                                <DialogTitle>Message Details</DialogTitle>
                                <DialogDescription>
                                  Full message from {msg.name}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="mt-4 space-y-4">
                                <p><strong>Name:</strong> {msg.name}</p>
                                <p><strong>Email:</strong> {msg.email}</p>
                                <p><strong>Submitted:</strong> {new Date(msg.createdAt).toLocaleString()}</p>
                                <div>
                                  <strong>Message:</strong>
                                  <Textarea
                                    value={msg.message}
                                    readOnly
                                    rows={6}
                                    className="mt-2"
                                  />
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContactQueries;
