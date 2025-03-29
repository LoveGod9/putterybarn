
import React from 'react';
import { Card } from "@/components/ui/card";
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  percentageChange?: number;
  className?: string;
  gradient?: boolean;
}

const StatCard = ({
  title,
  value,
  icon,
  percentageChange,
  className,
  gradient = false
}: StatCardProps) => {
  const isPositive = percentageChange && percentageChange > 0;
  const isNegative = percentageChange && percentageChange < 0;

  return (
    <Card className={cn(
      "relative overflow-hidden",
      gradient ? "bg-gradient-to-br from-greenery-600 to-greenery-700 text-white" : "bg-white",
      className
    )}>
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className={cn(
              "text-sm font-medium mb-1",
              gradient ? "text-greenery-100" : "text-gray-500"
            )}>
              {title}
            </p>
            <h3 className="text-2xl font-bold">{value}</h3>
            
            {percentageChange !== undefined && (
              <div className={cn(
                "mt-2 text-sm flex items-center",
                isPositive ? (gradient ? "text-green-200" : "text-green-500") : "",
                isNegative ? (gradient ? "text-red-200" : "text-red-500") : "",
                !isPositive && !isNegative ? (gradient ? "text-greenery-100" : "text-gray-500") : ""
              )}>
                {isPositive && "▲ "}
                {isNegative && "▼ "}
                {Math.abs(percentageChange).toFixed(1)}%
                <span className="ml-1">vs last week</span>
              </div>
            )}
          </div>
          
          <div className={cn(
            "p-2 rounded-full",
            gradient ? "bg-white bg-opacity-20" : "bg-greenery-100"
          )}>
            {icon}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default StatCard;
