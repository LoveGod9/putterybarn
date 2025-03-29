
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Sample staff data
const staffMembers = [
  { 
    id: 1, 
    name: 'John Smith', 
    position: 'Head Chef', 
    department: 'Kitchen', 
    hourlyRate: 28.50, 
    hoursThisWeek: 38,
    status: 'Full-time'
  },
  { 
    id: 2, 
    name: 'Maria Garcia', 
    position: 'Sous Chef', 
    department: 'Kitchen', 
    hourlyRate: 22.00, 
    hoursThisWeek: 40,
    status: 'Full-time'
  },
  { 
    id: 3, 
    name: 'Alex Johnson', 
    position: 'Server', 
    department: 'Service', 
    hourlyRate: 15.00, 
    hoursThisWeek: 25,
    status: 'Part-time'
  },
  { 
    id: 4, 
    name: 'Sarah Wilson', 
    position: 'Bartender', 
    department: 'Bar', 
    hourlyRate: 18.50, 
    hoursThisWeek: 32,
    status: 'Full-time'
  },
  { 
    id: 5, 
    name: 'Michael Brown', 
    position: 'Host', 
    department: 'Service', 
    hourlyRate: 14.00, 
    hoursThisWeek: 20,
    status: 'Part-time'
  },
  { 
    id: 6, 
    name: 'Emily Davis', 
    position: 'Server', 
    department: 'Service', 
    hourlyRate: 15.00, 
    hoursThisWeek: 28,
    status: 'Part-time'
  },
];

// Sample schedule data
const scheduleData = [
  { id: 1, name: 'John Smith', monday: '9AM-5PM', tuesday: '9AM-5PM', wednesday: '9AM-5PM', thursday: '9AM-5PM', friday: '9AM-5PM', saturday: 'Off', sunday: 'Off' },
  { id: 2, name: 'Maria Garcia', monday: '10AM-6PM', tuesday: '10AM-6PM', wednesday: '10AM-6PM', thursday: '10AM-6PM', friday: '10AM-6PM', saturday: 'Off', sunday: 'Off' },
  { id: 3, name: 'Alex Johnson', monday: 'Off', tuesday: '4PM-10PM', wednesday: '4PM-10PM', thursday: 'Off', friday: '4PM-10PM', saturday: '12PM-8PM', sunday: '12PM-8PM' },
  { id: 4, name: 'Sarah Wilson', monday: '3PM-11PM', tuesday: '3PM-11PM', wednesday: 'Off', thursday: '3PM-11PM', friday: '3PM-11PM', saturday: '3PM-11PM', sunday: 'Off' },
  { id: 5, name: 'Michael Brown', monday: 'Off', tuesday: 'Off', wednesday: '5PM-9PM', thursday: '5PM-9PM', friday: '5PM-9PM', saturday: '12PM-8PM', sunday: '12PM-8PM' },
  { id: 6, name: 'Emily Davis', monday: '4PM-10PM', tuesday: 'Off', wednesday: 'Off', thursday: '4PM-10PM', friday: '4PM-10PM', saturday: '12PM-8PM', sunday: '12PM-8PM' },
];

const Staff = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">Staff Management</h1>
            <p className="text-gray-500 mt-2">Manage staff schedules and performance</p>
          </div>
          <Button>+ Add New Staff</Button>
        </div>
        
        {/* Tabs for different views */}
        <Tabs defaultValue="staff">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="staff">Staff List</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
          </TabsList>
          
          {/* Staff List Tab */}
          <TabsContent value="staff" className="space-y-4 mt-6">
            {/* Staff Members Table */}
            <Card>
              <CardHeader>
                <CardTitle>Staff Members</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                      <tr>
                        <th className="px-4 py-3">Name</th>
                        <th className="px-4 py-3">Position</th>
                        <th className="px-4 py-3">Department</th>
                        <th className="px-4 py-3">Hourly Rate</th>
                        <th className="px-4 py-3">Hours This Week</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {staffMembers.map((staff) => (
                        <tr key={staff.id} className="bg-white border-b">
                          <td className="px-4 py-3 font-medium">{staff.name}</td>
                          <td className="px-4 py-3">{staff.position}</td>
                          <td className="px-4 py-3">{staff.department}</td>
                          <td className="px-4 py-3">${staff.hourlyRate.toFixed(2)}</td>
                          <td className="px-4 py-3">{staff.hoursThisWeek}</td>
                          <td className="px-4 py-3">
                            <Badge variant={staff.status === 'Full-time' ? "default" : "secondary"}>
                              {staff.status}
                            </Badge>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">Edit</Button>
                              <Button variant="outline" size="sm">View</Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
            
            {/* Department Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Kitchen Staff</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-2xl font-bold">2</p>
                      <p className="text-sm text-gray-500">Members</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">78</p>
                      <p className="text-sm text-gray-500">Hours this week</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Service Staff</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-2xl font-bold">3</p>
                      <p className="text-sm text-gray-500">Members</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">73</p>
                      <p className="text-sm text-gray-500">Hours this week</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Bar Staff</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-2xl font-bold">1</p>
                      <p className="text-sm text-gray-500">Members</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">32</p>
                      <p className="text-sm text-gray-500">Hours this week</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Schedule Tab */}
          <TabsContent value="schedule" className="space-y-4 mt-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Weekly Schedule</CardTitle>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">Previous Week</Button>
                  <Button variant="outline" size="sm">Next Week</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                      <tr>
                        <th className="px-4 py-3">Staff Member</th>
                        <th className="px-4 py-3">Monday</th>
                        <th className="px-4 py-3">Tuesday</th>
                        <th className="px-4 py-3">Wednesday</th>
                        <th className="px-4 py-3">Thursday</th>
                        <th className="px-4 py-3">Friday</th>
                        <th className="px-4 py-3">Saturday</th>
                        <th className="px-4 py-3">Sunday</th>
                      </tr>
                    </thead>
                    <tbody>
                      {scheduleData.map((schedule) => (
                        <tr key={schedule.id} className="bg-white border-b">
                          <td className="px-4 py-3 font-medium">{schedule.name}</td>
                          <td className="px-4 py-3">
                            <span className={schedule.monday === 'Off' ? "text-gray-400" : ""}>
                              {schedule.monday}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={schedule.tuesday === 'Off' ? "text-gray-400" : ""}>
                              {schedule.tuesday}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={schedule.wednesday === 'Off' ? "text-gray-400" : ""}>
                              {schedule.wednesday}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={schedule.thursday === 'Off' ? "text-gray-400" : ""}>
                              {schedule.thursday}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={schedule.friday === 'Off' ? "text-gray-400" : ""}>
                              {schedule.friday}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={schedule.saturday === 'Off' ? "text-gray-400" : ""}>
                              {schedule.saturday}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={schedule.sunday === 'Off' ? "text-gray-400" : ""}>
                              {schedule.sunday}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Staff;
