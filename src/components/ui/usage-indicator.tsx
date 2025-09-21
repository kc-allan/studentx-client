import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Users, 
  Repeat, 
  Infinity, 
  Trophy, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  TrendingUp 
} from 'lucide-react';
import { UsageType, ClaimAvailability, UsageStats } from '@/types/offer';

interface UsageIndicatorProps {
  usageType: UsageType;
  maxClaimsPerUser?: number;
  cooldownPeriodHours?: number;
  claimAvailability?: ClaimAvailability;
  usageStats?: UsageStats;
  showProgress?: boolean;
  showAlert?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const UsageIndicator: React.FC<UsageIndicatorProps> = ({
  usageType,
  maxClaimsPerUser,
  cooldownPeriodHours,
  claimAvailability,
  usageStats,
  showProgress = false,
  showAlert = true,
  size = 'md'
}) => {
  const getUsageTypeInfo = (type: UsageType) => {
    switch (type) {
      case UsageType.SINGLE_USE:
        return { 
          icon: Users, 
          label: "One-time use", 
          color: "bg-blue-100 text-blue-700 border-blue-200",
          description: "This offer can only be claimed once"
        };
      case UsageType.MULTI_USE:
        return { 
          icon: Repeat, 
          label: `Up to ${maxClaimsPerUser}x`, 
          color: "bg-green-100 text-green-700 border-green-200",
          description: `You can claim this offer up to ${maxClaimsPerUser} times`
        };
      case UsageType.UNLIMITED:
        return { 
          icon: Infinity, 
          label: "Unlimited", 
          color: "bg-purple-100 text-purple-700 border-purple-200",
          description: "This offer can be claimed unlimited times"
        };
      case UsageType.TIERED:
        return { 
          icon: Trophy, 
          label: "Loyalty rewards", 
          color: "bg-yellow-100 text-yellow-700 border-yellow-200",
          description: "Better discounts the more you use this offer"
        };
      default:
        return { 
          icon: Users, 
          label: "One-time use", 
          color: "bg-blue-100 text-blue-700 border-blue-200",
          description: "This offer can only be claimed once"
        };
    }
  };

  const getStatusInfo = () => {
    if (!claimAvailability) return null;

    const { can_claim_now, reason, remaining_claims, current_usage_count } = claimAvailability;

    if (can_claim_now) {
      if (current_usage_count === 0) {
        return {
          type: 'success' as const,
          icon: CheckCircle,
          message: 'Ready to claim',
          description: 'You can claim this offer now'
        };
      } else if (remaining_claims === 'unlimited') {
        return {
          type: 'info' as const,
          icon: Infinity,
          message: 'Available to claim',
          description: 'You can claim this offer again'
        };
      } else {
        return {
          type: 'info' as const,
          icon: Repeat,
          message: `${remaining_claims} claims left`,
          description: `You have ${remaining_claims} more claims available`
        };
      }
    } else {
      return {
        type: 'warning' as const,
        icon: AlertTriangle,
        message: 'Cannot claim now',
        description: reason || 'This offer is not available for claiming'
      };
    }
  };

  const calculateProgress = () => {
    if (!claimAvailability || !maxClaimsPerUser) return 0;
    
    const { current_usage_count } = claimAvailability;
    return Math.min((current_usage_count / maxClaimsPerUser) * 100, 100);
  };

  const formatNextClaimTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffHours = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60));
    
    if (diffHours <= 24) {
      return `${diffHours} hours`;
    } else {
      const diffDays = Math.ceil(diffHours / 24);
      return `${diffDays} days`;
    }
  };

  const usageTypeInfo = getUsageTypeInfo(usageType);
  const statusInfo = getStatusInfo();
  const progress = calculateProgress();

  const UsageIcon = usageTypeInfo.icon;
  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  return (
    <div className="space-y-3">
      {/* Usage Type Badge */}
      <div className="flex flex-wrap gap-2">
        <Badge 
          variant="outline" 
          className={`${usageTypeInfo.color} ${sizeClasses[size]} flex items-center gap-1`}
        >
          <UsageIcon className={size === 'sm' ? 'h-3 w-3' : size === 'md' ? 'h-4 w-4' : 'h-5 w-5'} />
          {usageTypeInfo.label}
        </Badge>

        {/* Cooldown Period Badge */}
        {cooldownPeriodHours && (
          <Badge variant="outline" className={`bg-gray-100 text-gray-700 border-gray-200 ${sizeClasses[size]} flex items-center gap-1`}>
            <Clock className={size === 'sm' ? 'h-3 w-3' : size === 'md' ? 'h-4 w-4' : 'h-5 w-5'} />
            {cooldownPeriodHours}h cooldown
          </Badge>
        )}

        {/* Usage Stats Badge */}
        {usageStats && usageStats.usage_count > 0 && (
          <Badge variant="outline" className={`bg-green-50 text-green-700 border-green-200 ${sizeClasses[size]} flex items-center gap-1`}>
            <TrendingUp className={size === 'sm' ? 'h-3 w-3' : size === 'md' ? 'h-4 w-4' : 'h-5 w-5'} />
            {usageStats.usage_count} claimed
          </Badge>
        )}
      </div>

      {/* Progress Bar for Multi-use Offers */}
      {showProgress && usageType === UsageType.MULTI_USE && maxClaimsPerUser && (
        <div className="space-y-1">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Usage Progress</span>
            <span>{claimAvailability?.current_usage_count || 0}/{maxClaimsPerUser}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      )}

      {/* Status Alert */}
      {showAlert && statusInfo && (
        <Alert 
          className={`
            ${statusInfo.type === 'success' ? 'border-green-200 bg-green-50' : 
              statusInfo.type === 'warning' ? 'border-yellow-200 bg-yellow-50' : 
              'border-blue-200 bg-blue-50'}
          `}
        >
          <statusInfo.icon className="h-4 w-4" />
          <AlertDescription className="font-medium">
            {statusInfo.message}
            {statusInfo.description && (
              <div className="text-sm font-normal mt-1 opacity-90">
                {statusInfo.description}
              </div>
            )}
            
            {/* Next Claim Time */}
            {claimAvailability?.next_available_claim && !claimAvailability.can_claim_now && (
              <div className="text-sm font-normal mt-1 opacity-90">
                Next claim available in {formatNextClaimTime(claimAvailability.next_available_claim)}
              </div>
            )}
          </AlertDescription>
        </Alert>
      )}

      {/* Tier Information for Tiered Offers */}
      {usageType === UsageType.TIERED && usageStats && (
        <div className="p-3 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg border border-yellow-200">
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="h-4 w-4 text-yellow-700" />
            <span className="font-medium text-yellow-800">Loyalty Progress</span>
          </div>
          <div className="text-sm text-yellow-700">
            <div>Claims: {usageStats.usage_count}</div>
            {usageStats.total_savings > 0 && (
              <div>Total Saved: ${(usageStats.total_savings / 100).toFixed(2)}</div>
            )}
          </div>
        </div>
      )}

      {/* Savings Summary */}
      {usageStats && usageStats.total_savings > 0 && (
        <div className="flex justify-between items-center p-2 bg-green-50 rounded-lg border border-green-200">
          <span className="text-sm font-medium text-green-800">Total Savings</span>
          <span className="text-sm font-bold text-green-700">
            ${(usageStats.total_savings / 100).toFixed(2)}
          </span>
        </div>
      )}
    </div>
  );
};