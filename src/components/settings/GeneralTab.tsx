
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

const GeneralTab = () => {
  return (
    <div className="space-y-6">
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
    </div>
  );
};

export default GeneralTab;
