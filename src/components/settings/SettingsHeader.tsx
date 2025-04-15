
import React from 'react';

interface SettingsHeaderProps {
  title: string;
  description: string;
}

const SettingsHeader = ({ title, description }: SettingsHeaderProps) => {
  return (
    <div>
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-gray-500 mt-2">{description}</p>
    </div>
  );
};

export default SettingsHeader;
