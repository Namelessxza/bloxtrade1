import { useState } from "react";
import { Badge, Shield, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FilterState {
  itemType: string;
  rarity: string;
  verifiedOnly: boolean;
}

interface QuickFiltersProps {
  onFiltersChange: (filters: FilterState) => void;
}

const QuickFilters = ({ onFiltersChange }: QuickFiltersProps) => {
  const [filters, setFilters] = useState<FilterState>({
    itemType: "all",
    rarity: "all",
    verifiedOnly: false
  });

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const defaultFilters = {
      itemType: "all",
      rarity: "all",
      verifiedOnly: false
    };
    setFilters(defaultFilters);
    onFiltersChange(defaultFilters);
  };

  const hasActiveFilters = filters.itemType !== "all" || filters.rarity !== "all" || filters.verifiedOnly;

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Item Type Filter */}
      <Select value={filters.itemType} onValueChange={(value) => handleFilterChange('itemType', value)}>
        <SelectTrigger className="w-32 bg-gaming-card border-border/30">
          <Badge className="h-3 w-3 mr-2" />
          <SelectValue placeholder="Item Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="weapons">Weapons</SelectItem>
          <SelectItem value="armor">Armor</SelectItem>
          <SelectItem value="magic-items">Magic Items</SelectItem>
          <SelectItem value="vehicles">Vehicles</SelectItem>
          <SelectItem value="cosmetics">Cosmetics</SelectItem>
        </SelectContent>
      </Select>

      {/* Rarity Filter */}
      <Select value={filters.rarity} onValueChange={(value) => handleFilterChange('rarity', value)}>
        <SelectTrigger className="w-28 bg-gaming-card border-border/30">
          <Star className="h-3 w-3 mr-2" />
          <SelectValue placeholder="Rarity" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Rarity</SelectItem>
          <SelectItem value="mythic">
            <span className="flex items-center">
              <span className="w-2 h-2 rounded-full bg-gaming-purple mr-2"></span>
              Mythic
            </span>
          </SelectItem>
          <SelectItem value="legendary">
            <span className="flex items-center">
              <span className="w-2 h-2 rounded-full bg-yellow-400 mr-2"></span>
              Legendary
            </span>
          </SelectItem>
          <SelectItem value="epic">
            <span className="flex items-center">
              <span className="w-2 h-2 rounded-full bg-gaming-cyan mr-2"></span>
              Epic
            </span>
          </SelectItem>
          <SelectItem value="rare">
            <span className="flex items-center">
              <span className="w-2 h-2 rounded-full bg-gaming-green mr-2"></span>
              Rare
            </span>
          </SelectItem>
        </SelectContent>
      </Select>

      {/* Verified Traders Toggle */}
      <Button
        variant={filters.verifiedOnly ? "default" : "outline"}
        size="sm"
        onClick={() => handleFilterChange('verifiedOnly', !filters.verifiedOnly)}
        className={`${filters.verifiedOnly ? 'gaming-button-primary' : 'border-border/30 hover:bg-muted/20'}`}
      >
        <Shield className="h-3 w-3 mr-2" />
        Verified Only
      </Button>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="text-muted-foreground hover:text-foreground"
        >
          Clear Filters
        </Button>
      )}

      {/* Active Filter Count */}
      {hasActiveFilters && (
        <span className="text-xs text-muted-foreground px-2 py-1 bg-muted/20 rounded-full">
          {Object.values(filters).filter(value => value !== "all" && value !== false).length} active
        </span>
      )}
    </div>
  );
};

export default QuickFilters;