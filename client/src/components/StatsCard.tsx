interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  icon?: React.ReactNode;
}

const StatsCard = ({ title, value, subtitle, trend, icon }: StatsCardProps) => {
  return (
    <div className="gaming-card p-6 space-y-3">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium text-muted-foreground">
          {title}
        </div>
        {icon && (
          <div className="text-primary opacity-70">
            {icon}
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        <div className="text-2xl font-bold text-foreground">
          {value}
        </div>
        
        {subtitle && (
          <div className="text-sm text-muted-foreground">
            {subtitle}
          </div>
        )}
        
        {trend && (
          <div className={`text-xs flex items-center gap-1 ${
            trend.isPositive ? 'text-success' : 'text-red-400'
          }`}>
            <span>{trend.isPositive ? '↗' : '↘'}</span>
            <span>{Math.abs(trend.value)}% from last month</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;