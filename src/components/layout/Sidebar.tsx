
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BarChart, Clipboard, Users, Settings, ChartPie, Calendar } from 'lucide-react';

// NavItem component for sidebar navigation items
const NavItem = ({ 
  to, 
  icon: Icon, 
  label,
  active 
}: { 
  to: string; 
  icon: React.ElementType; 
  label: string;
  active: boolean;
}) => {
  return (
    <Link
      to={to}
      className={`flex items-center p-3 rounded-lg transition-colors ${
        active 
        ? 'bg-greenery-600 text-white' 
        : 'text-gray-600 hover:bg-greenery-100'
      }`}
    >
      <Icon size={20} className={`mr-3 ${active ? 'text-white' : 'text-gray-500'}`} />
      <span className="font-medium">{label}</span>
    </Link>
  );
};

const Sidebar = () => {
  const location = useLocation();

  // Navigation items for the sidebar
  const navItems = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/analytics', label: 'Analytics', icon: BarChart },
    { path: '/inventory', label: 'Inventory', icon: Clipboard },
    { path: '/reservations', label: 'Reservations', icon: Calendar },
    { path: '/menu', label: 'Menu', icon: ChartPie },
    { path: '/staff', label: 'Staff', icon: Users },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-64 h-screen bg-white shadow-md flex flex-col">
      <div className="p-5 border-b">
        <h1 className="text-xl font-bold text-greenery-700">Puttery Barn</h1>
        <p className="text-sm text-gray-500">Restaurant Admin</p>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavItem 
              key={item.path} 
              to={item.path} 
              icon={item.icon} 
              label={item.label}
              active={location.pathname === item.path}
            />
          ))}
        </nav>
      </div>
      <div className="p-4 border-t">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-greenery-200 flex items-center justify-center">
            <span className="font-medium text-greenery-700">AB</span>
          </div>
          <div className="ml-3">
            <p className="font-medium text-gray-800">Admin User</p>
            <p className="text-sm text-gray-500">admin@putterybarn.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
