
import React from 'react';
import { MenuItem } from '@/types/menu';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface OptimizationSuggestionsProps {
  menuItems?: MenuItem[];
}

const OptimizationSuggestions = ({ menuItems = [] }: OptimizationSuggestionsProps) => {
  // Generate suggestions based on menu data
  const generateSuggestions = () => {
    if (!menuItems.length) return [];
    
    const suggestions = [];
    
    // Find low popularity but high profit items
    const hiddenGems = menuItems
      .filter(item => item.popularity < 50 && item.profitMargin > 60)
      .slice(0, 3);
    
    if (hiddenGems.length) {
      suggestions.push({
        title: "Promote Hidden Gems",
        description: "These high-profit items are underperforming in popularity. Consider featuring them prominently.",
        items: hiddenGems
      });
    }
    
    // Find low profit margin items
    const lowProfitItems = menuItems
      .filter(item => item.profitMargin < 30 && item.popularity > 60)
      .slice(0, 3);
    
    if (lowProfitItems.length) {
      suggestions.push({
        title: "Consider Price Adjustments",
        description: "These popular items have low profit margins. Consider a slight price increase.",
        items: lowProfitItems
      });
    }
    
    // Find very unpopular items
    const unpopularItems = menuItems
      .filter(item => item.popularity < 20 && !item.disabled)
      .slice(0, 3);
    
    if (unpopularItems.length) {
      suggestions.push({
        title: "Menu Pruning Candidates",
        description: "These items are rarely ordered. Consider refreshing or replacing them.",
        items: unpopularItems
      });
    }
    
    return suggestions;
  };
  
  const suggestions = generateSuggestions();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Menu Optimization Suggestions</CardTitle>
        <CardDescription>
          Data-driven recommendations to improve your menu performance
        </CardDescription>
      </CardHeader>
      <CardContent>
        {suggestions.length > 0 ? (
          <div className="space-y-6">
            {suggestions.map((suggestion, index) => (
              <div key={index} className="space-y-3">
                <h3 className="font-semibold text-lg">{suggestion.title}</h3>
                <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                <div className="flex flex-wrap gap-2">
                  {suggestion.items.map(item => (
                    <Badge key={item.id} variant="outline" className="px-3 py-1">
                      {item.name} (${item.price.toFixed(2)})
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            <p>Not enough menu data to generate suggestions.</p>
            <p className="text-sm mt-2">Add more menu items with sales data to receive optimization recommendations.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OptimizationSuggestions;
