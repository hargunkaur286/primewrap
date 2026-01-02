// import React, { useState } from 'react';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Badge } from '@/components/ui/badge';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Users, Search, Filter, UserPlus, Edit2, Trash2, Mail, Phone, Calendar } from 'lucide-react';

// const UsersManagement = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterRole, setFilterRole] = useState('all');

//   // TODO: Replace with MongoDB query - users collection
//   const users = [
//     {
//       id: '1',
//       name: 'John Doe',
//       email: 'john@example.com',
//       phone: '+1 234 567 8900',
//       role: 'customer',
//       status: 'active',
//       joinDate: '2024-01-15',
//       totalOrders: 23,
//       totalSpent: 1250.50
//     },
//     {
//       id: '2',
//       name: 'Jane Smith',
//       email: 'jane@example.com',
//       phone: '+1 234 567 8901',
//       role: 'admin',
//       status: 'active',
//       joinDate: '2023-12-10',
//       totalOrders: 0,
//       totalSpent: 0
//     },
//     {
//       id: '3',
//       name: 'Mike Johnson',
//       email: 'mike@example.com',
//       phone: '+1 234 567 8902',
//       role: 'customer',
//       status: 'inactive',
//       joinDate: '2024-01-20',
//       totalOrders: 7,
//       totalSpent: 420.75
//     },
//   ];

//   const getRoleColor = (role: string) => {
//     switch (role) {
//       case 'admin': return 'bg-red-500';
//       case 'customer': return 'bg-blue-500';
//       case 'driver': return 'bg-green-500';
//       default: return 'bg-gray-500';
//     }
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'active': return 'bg-green-500';
//       case 'inactive': return 'bg-yellow-500';
//       case 'suspended': return 'bg-red-500';
//       default: return 'bg-gray-500';
//     }
//   };

//   const filteredUsers = users.filter(user => {
//     const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesFilter = filterRole === 'all' || user.role === filterRole;
//     return matchesSearch && matchesFilter;
//   });

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-8">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900 mb-2">Users Management</h1>
//             <p className="text-gray-600">Manage user accounts, roles, and permissions</p>
//           </div>
//           <Dialog>
//             <DialogTrigger asChild>
//               <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
//                 <UserPlus className="h-4 w-4 mr-2" />
//                 Add New User
//               </Button>
//             </DialogTrigger>
//             <DialogContent>
//               <DialogHeader>
//                 <DialogTitle>Add New User</DialogTitle>
//                 <DialogDescription>
//                   Create a new user account with role and permissions.
//                 </DialogDescription>
//               </DialogHeader>
//               {/* TODO: Add user creation form */}
//               <div className="text-center py-4 text-gray-500">
//                 User creation form will be integrated with MongoDB
//               </div>
//             </DialogContent>
//           </Dialog>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Total Users</CardTitle>
//               <Users className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{users.length}</div>
//               <p className="text-xs text-muted-foreground">+12% from last month</p>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Active Users</CardTitle>
//               <Users className="h-4 w-4 text-green-600" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{users.filter(u => u.status === 'active').length}</div>
//               <p className="text-xs text-muted-foreground">Currently online</p>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Customers</CardTitle>
//               <Users className="h-4 w-4 text-blue-600" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{users.filter(u => u.role === 'customer').length}</div>
//               <p className="text-xs text-muted-foreground">Registered customers</p>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Admins</CardTitle>
//               <Users className="h-4 w-4 text-red-600" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{users.filter(u => u.role === 'admin').length}</div>
//               <p className="text-xs text-muted-foreground">Admin accounts</p>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Filters and Search */}
//         <Card className="mb-6">
//           <CardHeader>
//             <CardTitle>User Directory</CardTitle>
//             <CardDescription>Search and filter users by name, email, or role</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="flex flex-col md:flex-row gap-4">
//               <div className="relative flex-1">
//                 <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                 <Input
//                   placeholder="Search users by name or email..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-10"
//                 />
//               </div>
//               <Select value={filterRole} onValueChange={setFilterRole}>
//                 <SelectTrigger className="w-full md:w-48">
//                   <Filter className="h-4 w-4 mr-2" />
//                   <SelectValue placeholder="Filter by role" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">All Roles</SelectItem>
//                   <SelectItem value="admin">Admin</SelectItem>
//                   <SelectItem value="customer">Customer</SelectItem>
//                   <SelectItem value="driver">Driver</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Users Table */}
//         <Card>
//           <CardHeader>
//             <CardTitle>All Users ({filteredUsers.length})</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="overflow-x-auto">
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>User</TableHead>
//                     <TableHead>Contact</TableHead>
//                     <TableHead>Role</TableHead>
//                     <TableHead>Status</TableHead>
//                     <TableHead>Join Date</TableHead>
//                     <TableHead>Orders</TableHead>
//                     <TableHead>Total Spent</TableHead>
//                     <TableHead>Actions</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {filteredUsers.map((user) => (
//                     <TableRow key={user.id}>
//                       <TableCell>
//                         <div>
//                           <div className="font-medium">{user.name}</div>
//                           <div className="text-sm text-gray-500">{user.email}</div>
//                         </div>
//                       </TableCell>
//                       <TableCell>
//                         <div className="space-y-1">
//                           <div className="flex items-center text-sm">
//                             <Mail className="h-3 w-3 mr-1" />
//                             {user.email}
//                           </div>
//                           <div className="flex items-center text-sm">
//                             <Phone className="h-3 w-3 mr-1" />
//                             {user.phone}
//                           </div>
//                         </div>
//                       </TableCell>
//                       <TableCell>
//                         <Badge className={`${getRoleColor(user.role)} text-white`}>
//                           {user.role}
//                         </Badge>
//                       </TableCell>
//                       <TableCell>
//                         <Badge className={`${getStatusColor(user.status)} text-white`}>
//                           {user.status}
//                         </Badge>
//                       </TableCell>
//                       <TableCell>
//                         <div className="flex items-center text-sm">
//                           <Calendar className="h-3 w-3 mr-1" />
//                           {new Date(user.joinDate).toLocaleDateString()}
//                         </div>
//                       </TableCell>
//                       <TableCell>{user.totalOrders}</TableCell>
//                       <TableCell>${user.totalSpent.toFixed(2)}</TableCell>
//                       <TableCell>
//                         <div className="flex space-x-2">
//                           <Button variant="outline" size="sm">
//                             <Edit2 className="h-3 w-3" />
//                           </Button>
//                           <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
//                             <Trash2 className="h-3 w-3" />
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

// export default UsersManagement;


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
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { API_BASE } from '@/lib/apiBase';
import { Users as UsersIcon, Search, Filter, UserPlus, Edit2, Trash2, Mail, Phone, Calendar } from 'lucide-react';

interface CartItem {
  product: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface UserType {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  accountVerified: boolean;
  cart: CartItem[];
  createdAt: string;
}

const getRoleColor = (role: string) => {
  switch (role) {
    case 'admin': return 'bg-red-500';
    case 'customer': return 'bg-blue-500';
    case 'driver': return 'bg-green-500';
    default: return 'bg-gray-500';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'bg-green-500';
    case 'inactive': return 'bg-yellow-500';
    case 'suspended': return 'bg-red-500';
    default: return 'bg-gray-500';
  }
};

export default function UsersManagement() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await axios.get<{ success: boolean; data: UserType[] }>(
          `${API_BASE}/api/v1/user/all`,
          { withCredentials: true }
        );
        setUsers(res.data.data);
      } catch (err: any) {
        console.error('fetchUsers error', err);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) {
    return <p className="p-8 text-center">Loading users…</p>;
  }
  if (error) {
    return <p className="p-8 text-center text-red-500">Error: {error}</p>;
  }

  // augment each user with derived fields
  const enriched = users.map(u => {
    const role = 'customer'; // default until you add real roles
    const status = u.accountVerified ? 'active' : 'inactive';
    const totalOrders = u.cart.length;
    const totalSpent = u.cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
    return { ...u, role, status, totalOrders, totalSpent };
  });

  const filtered = enriched.filter(u => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || u.role === filterRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Users Management</h1>
            <p className="text-gray-600">Manage user accounts, roles, and permissions</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                <UserPlus className="h-4 w-4 mr-2" />
                Add New User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>
                  Create a new user account with role and permissions.
                </DialogDescription>
              </DialogHeader>
              <div className="text-center py-4 text-gray-500">
                User creation form will be integrated here.
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <UsersIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{enriched.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <UsersIcon className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {enriched.filter(u => u.status === 'active').length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Customers</CardTitle>
              <UsersIcon className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {enriched.filter(u => u.role === 'customer').length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Admins</CardTitle>
              <UsersIcon className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {enriched.filter(u => u.role === 'admin').length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search & Filter */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>User Directory</CardTitle>
            <CardDescription>Search and filter users by name, email, or role</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search users by name or email..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterRole} onValueChange={setFilterRole}>
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="customer">Customer</SelectItem>
                  <SelectItem value="driver">Driver</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Users ({filtered.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Total Spent</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map(u => (
                    <TableRow key={u._id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{u.name}</div>
                          <div className="text-sm text-gray-500">{u.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <Mail className="h-3 w-3 mr-1" /> {u.email}
                          </div>
                          {u.phone && (
                            <div className="flex items-center text-sm">
                              <Phone className="h-3 w-3 mr-1" /> {u.phone}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getRoleColor(u.role)} text-white`}>
                          {u.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getStatusColor(u.status)} text-white`}>
                          {u.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(u.createdAt).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>{u.totalOrders}</TableCell>
                      <TableCell>${u.totalSpent.toFixed(2)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit2 className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
                            <Trash2 className="h-3 w-3" />
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
      </div>
    </div>
  );
}
