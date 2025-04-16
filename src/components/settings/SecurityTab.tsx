
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Users, Key, Lock } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

const SecurityTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Settings</CardTitle>
        <CardDescription>
          Manage security settings and user permissions for your restaurant
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-4 pb-4 border-b">
            <div className="bg-primary/10 p-2 rounded-full">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium">User Permissions</h3>
              <p className="text-sm text-muted-foreground">
                Each user can only access their own customer records
              </p>
            </div>
            <Switch checked={true} disabled />
          </div>
          
          <div className="flex items-center gap-4 pb-4 border-b">
            <div className="bg-primary/10 p-2 rounded-full">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium">Row Level Security</h3>
              <p className="text-sm text-muted-foreground">
                Enhanced data protection with row-level security policies for customers and reservations
              </p>
            </div>
            <Switch checked={true} disabled />
          </div>
          
          <div className="flex items-center gap-4 pb-4 border-b">
            <div className="bg-primary/10 p-2 rounded-full">
              <Lock className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium">Reservation Security</h3>
              <p className="text-sm text-muted-foreground">
                Users can only access reservation tables they've created
              </p>
            </div>
            <Switch checked={true} disabled />
          </div>
          
          <div className="flex items-center gap-4 pb-4">
            <div className="bg-primary/10 p-2 rounded-full">
              <Key className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium">API Access Control</h3>
              <p className="text-sm text-muted-foreground">
                Securely manage your API keys and access permissions
              </p>
            </div>
            <Button variant="outline" size="sm">Manage Keys</Button>
          </div>
        </div>
        
        <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
          <h3 className="font-medium text-amber-800 mb-2">Important Note</h3>
          <p className="text-sm text-amber-700">
            Your customer data and reservation tables are now protected with user-level access controls. Each staff member 
            can only view, edit, and manage records they've created. This ensures data privacy and security across your organization.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecurityTab;
