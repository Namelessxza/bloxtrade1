import { ShoppingCart, TrendingUp, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface GameItemCardProps {
  id: string;
  title: string;
  image: string;
  currentPrice: number;
  originalPrice?: number;
  discount?: number;
  rarity: "Common" | "Rare" | "Epic" | "Legendary" | "Mythic";
  game: string;
  isOnSale?: boolean;
  isTrending?: boolean;
}

const GameItemCard = ({
  title,
  image,
  currentPrice,
  originalPrice,
  discount,
  rarity,
  game,
  isOnSale = false,
  isTrending = false,
}: GameItemCardProps) => {
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Common":
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
      case "Rare":
        return "bg-primary/20 text-primary border-primary/30";
      case "Epic":
        return "bg-secondary/20 text-secondary border-secondary/30";
      case "Legendary":
        return "bg-warning/20 text-warning border-warning/30";
      case "Mythic":
        return "bg-primary/20 text-primary border-primary/30";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  return (
    <div className="gaming-card group cursor-pointer relative overflow-hidden">
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
        {isOnSale && discount && (
          <Badge className="bg-red-500/90 text-white border-0 font-semibold">
            -{discount}%
          </Badge>
        )}
        {isTrending && (
          <Badge className="bg-accent/90 text-accent-foreground border-0 flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            HOT
          </Badge>
        )}
      </div>

      {/* Rarity indicator */}
      <div className="absolute top-3 right-3 z-10">
        <Badge className={`${getRarityColor(rarity)} border font-medium`}>
          {rarity}
        </Badge>
      </div>

      {/* Item Image */}
      <div className="relative aspect-square overflow-hidden rounded-t-xl">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gaming-dark/60 via-transparent to-transparent" />
      </div>

      {/* Item Info */}
      <div className="p-4 space-y-3">
        <div>
          <div className="text-xs text-muted-foreground font-medium mb-1">
            {game}
          </div>
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-2">
            {title}
          </h3>
        </div>

        {/* Pricing */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-success">
                ${currentPrice.toFixed(2)}
              </span>
              {originalPrice && originalPrice > currentPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ${originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span>4.8 (124)</span>
            </div>
          </div>

          <Button
            size="sm"
            className="gaming-button-primary h-8 px-3 shadow-none"
          >
            <ShoppingCart className="h-3 w-3 mr-1" />
            Buy
          </Button>
        </div>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
    </div>
  );
};

export default GameItemCard;