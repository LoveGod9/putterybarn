
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from "@/components/ui/badge";

const IntegrationsTab = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>System Integrations</CardTitle>
          <CardDescription>
            Connect external systems with your restaurant management platform.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Point of Sale (POS) System</p>
                <p className="text-sm text-gray-500">Connected to Toast POS</p>
              </div>
              <div className="flex gap-2">
                <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Connected</Badge>
                <Button variant="outline" size="sm">Configure</Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Online Ordering Platform</p>
                <p className="text-sm text-gray-500">Not connected</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm">Connect</Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Accounting Software</p>
                <p className="text-sm text-gray-500">Connected to QuickBooks</p>
              </div>
              <div className="flex gap-2">
                <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Connected</Badge>
                <Button variant="outline" size="sm">Configure</Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Reservation System</p>
                <p className="text-sm text-gray-500">Not connected</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm">Connect</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>API Access</CardTitle>
          <CardDescription>
            Manage API keys for custom integrations.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="apiKey" className="block text-gray-700">API Key</label>
            <div className="flex gap-2">
              <Input id="apiKey" defaultValue="••••••••••••••••••••••••••••••" readOnly className="flex-1" />
              <Button variant="outline">Show</Button>
              <Button variant="outline">Copy</Button>
            </div>
            <p className="text-sm text-muted-foreground">Last generated: July 15, 2023</p>
          </div>
          
          <div className="flex justify-end">
            <Button>Regenerate API Key</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IntegrationsTab;
