
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

const Settings = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-gray-500 mt-2">Manage your restaurant's settings and preferences</p>
        </div>
        
        <Tabs defaultValue="general">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Restaurant Information</CardTitle>
                <CardDescription>
                  Basic information about your restaurant.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="restaurantName">Restaurant Name</Label>
                    <Input id="restaurantName" defaultValue="Puttery Barn" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" defaultValue="(555) 123-4567" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" defaultValue="contact@putterybarn.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input id="website" defaultValue="www.putterybarn.com" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" defaultValue="123 Main Street" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" defaultValue="New York" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input id="state" defaultValue="NY" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipcode">ZIP Code</Label>
                    <Input id="zipcode" defaultValue="10001" />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Business Hours</CardTitle>
                <CardDescription>
                  Set your restaurant's regular operating hours.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                    <div key={day} className="flex items-center justify-between">
                      <div className="w-24 font-medium">{day}</div>
                      <div className="flex items-center gap-2 flex-1">
                        <Switch id={`${day.toLowerCase()}-open`} defaultChecked={day !== 'Sunday'} />
                        <Label htmlFor={`${day.toLowerCase()}-open`} className="text-sm font-normal">
                          Open
                        </Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2">
                          <Input 
                            className="w-24" 
                            defaultValue={day !== 'Sunday' ? "11:00 AM" : ""} 
                            disabled={day === 'Sunday'} 
                          />
                          <span>to</span>
                          <Input 
                            className="w-24" 
                            defaultValue={day !== 'Sunday' ? "10:00 PM" : ""} 
                            disabled={day === 'Sunday'} 
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="flex justify-end mt-6">
                    <Button>Save Hours</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-6 mt-6">
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
          </TabsContent>
          
          <TabsContent value="integrations" className="space-y-6 mt-6">
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
                  <Label htmlFor="apiKey">API Key</Label>
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
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

// Badge component needed for Settings page but not imported above
const Badge = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
      {children}
    </span>
  );
};

export default Settings;
