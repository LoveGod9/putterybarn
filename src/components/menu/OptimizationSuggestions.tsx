
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const OptimizationSuggestions = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Menu Optimization Suggestions</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          <li className="flex gap-3">
            <div className="bg-green-100 text-green-800 p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
              1
            </div>
            <div>
              <h4 className="font-medium">Highlight Signature Burger</h4>
              <p className="text-muted-foreground text-sm">Your most popular and profitable item should be featured prominently on the menu.</p>
            </div>
          </li>
          <li className="flex gap-3">
            <div className="bg-green-100 text-green-800 p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
              2
            </div>
            <div>
              <h4 className="font-medium">Bundle Truffle Fries</h4>
              <p className="text-muted-foreground text-sm">Create a combo deal with your popular sides to increase average order value.</p>
            </div>
          </li>
          <li className="flex gap-3">
            <div className="bg-green-100 text-green-800 p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
              3
            </div>
            <div>
              <h4 className="font-medium">Review Grilled Salmon pricing</h4>
              <p className="text-muted-foreground text-sm">Consider adjusting the price to improve the profit margin while maintaining competitiveness.</p>
            </div>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default OptimizationSuggestions;
