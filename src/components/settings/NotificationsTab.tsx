
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

const NotificationsTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
        <CardDescription>
          Choose when and how you want to receive alerts and notifications.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Inventory Alerts</p>
              <p className="text-sm text-gray-500">Receive alerts when inventory items are running low</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Sales Reports</p>
              <p className="text-sm text-gray-500">Daily summary of sales and revenue</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Staff Schedule Changes</p>
              <p className="text-sm text-gray-500">Alerts when staff request time off or schedule changes</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Customer Feedback</p>
              <p className="text-sm text-gray-500">Notifications for new customer reviews and feedback</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">System Updates</p>
              <p className="text-sm text-gray-500">Updates about new features and improvements</p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="font-medium">Notification Methods</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="emailNotifications">Email Address</Label>
              <Input id="emailNotifications" defaultValue="manager@putterybarn.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneNotifications">Phone Number</Label>
              <Input id="phoneNotifications" defaultValue="(555) 987-6543" />
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button>Save Preferences</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationsTab;
