
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SettingsHeader from '@/components/settings/SettingsHeader';
import GeneralTab from '@/components/settings/GeneralTab';
import NotificationsTab from '@/components/settings/NotificationsTab';
import IntegrationsTab from '@/components/settings/IntegrationsTab';

const Settings = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <SettingsHeader 
          title="Settings" 
          description="Manage your restaurant's settings and preferences" 
        />
        
        <Tabs defaultValue="general">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-6 mt-6">
            <GeneralTab />
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-6 mt-6">
            <NotificationsTab />
          </TabsContent>
          
          <TabsContent value="integrations" className="space-y-6 mt-6">
            <IntegrationsTab />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;
