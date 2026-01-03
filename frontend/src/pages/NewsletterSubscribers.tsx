// src/pages/NewsletterSubscribers.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE } from '@/lib/apiBase';
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
import { Textarea } from '@/components/ui/textarea';
import {
  Mail,
  Search,
  Send,
  Download,
  Calendar,
  Users,
  TrendingUp,
  UserX,
} from 'lucide-react';

interface Subscriber {
  _id: string;
  email: string;
  createdAt: string;
}

interface EnrichedSubscriber {
  id: string;
  email: string;
  status: 'active' | 'unsubscribed' | 'bounced';
  source: 'website' | 'popup' | 'footer' | 'social_media';
  subscribeDate: string;
  totalEmails: number;
  lastOpened: string | null;
}

export default function NewsletterSubscribers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [raw, setRaw] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch from backend
  useEffect(() => {
    axios
      .get<{ success: boolean; data: Subscriber[] }>(
        `${API_BASE}/api/v1/user/subscribers`,
        { withCredentials: true }
      )
      .then((res) => {
        setRaw(res.data.data);
      })
      .catch((err) => {
        console.error('Failed to fetch subscribers:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Enrich to match your UI’s expected shape
  const subscribers: EnrichedSubscriber[] = raw.map((s) => ({
    id: s._id,
    email: s.email,
    status: 'active',       // default — you can extend your schema
    source: 'website',      // default
    subscribeDate: s.createdAt,
    totalEmails: 0,         // default
    lastOpened: null,       // default
  }));

  // Filters & stats
  const filtered = subscribers.filter((sub) =>
    sub.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const total = subscribers.length;
  const activeCount = subscribers.filter((s) => s.status === 'active').length;
  const unsubCount = subscribers.filter((s) => s.status !== 'active').length;
  const totalSent = subscribers.reduce((sum, s) => sum + s.totalEmails, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'unsubscribed':
        return 'bg-red-500';
      case 'bounced':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };
  const getSourceColor = (source: string) => {
    switch (source) {
      case 'website':
        return 'bg-blue-500';
      case 'popup':
        return 'bg-purple-500';
      case 'footer':
        return 'bg-green-500';
      case 'social_media':
        return 'bg-pink-500';
      default:
        return 'bg-gray-500';
    }
  };

  if (loading) {
    return <p className="p-6 text-center">Loading subscribers…</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header + Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Newsletter Subscribers
            </h1>
            <p className="text-gray-600">
              Manage your email subscribers and send newsletters
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 w-full sm:w-auto">
                  <Send className="h-4 w-4 mr-2" />
                  Send Newsletter
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Send Newsletter</DialogTitle>
                  <DialogDescription>
                    Compose and send a newsletter to all active subscribers
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Subject</label>
                    <Input placeholder="Newsletter subject line..." />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Content</label>
                    <Textarea
                      placeholder="Write your newsletter content here..."
                      rows={8}
                    />
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>
                      Recipients: {activeCount} active subscriber
                      {activeCount !== 1 && 's'}
                    </span>
                  </div>
                  <div className="flex space-x-3">
                    <Button>Send Newsletter</Button>
                    <Button variant="outline">Save as Draft</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export List
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Subscribers
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{total}</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Active Subscribers
              </CardTitle>
              <Mail className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeCount}</div>
              <p className="text-xs text-muted-foreground">Currently subscribed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex justify-between pb-2">
              <CardTitle className="text-sm font-medium">Emails Sent</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalSent}</div>
              <p className="text-xs text-muted-foreground">Total this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Unsubscribed
              </CardTitle>
              <UserX className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{unsubCount}</div>
              <p className="text-xs text-muted-foreground">
                No longer subscribed
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Subscriber Directory</CardTitle>
            <CardDescription>Search and manage newsletter subscribers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search subscribers by email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Subscribers ({filtered.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Subscribe Date</TableHead>
                    <TableHead>Emails Received</TableHead>
                    <TableHead>Last Opened</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((sub) => (
                    <TableRow key={sub.id}>
                      <TableCell className="font-medium">
                        {sub.email}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`${getStatusColor(
                            sub.status
                          )} text-white`}
                        >
                          {sub.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`${getSourceColor(
                            sub.source
                          )} text-white`}
                        >
                          {sub.source.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(sub.subscribeDate).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>{sub.totalEmails}</TableCell>
                      <TableCell>
                        {sub.lastOpened
                          ? new Date(sub.lastOpened).toLocaleDateString()
                          : 'Never'}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Mail className="h-3 w-3" />
                          </Button>
                          {sub.status === 'active' && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-500 hover:text-red-700"
                            >
                              <UserX className="h-3 w-3" />
                            </Button>
                          )}
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
