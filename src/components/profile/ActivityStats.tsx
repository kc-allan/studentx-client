
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  DollarSign, 
  ShoppingCart, 
  Star, 
  Calendar,
  Trophy,
  Target,
  Award,
  Zap,
  Search,
  ExternalLink,
  Plus
} from "lucide-react";

interface ActivityStatsProps {
  user: {
    totalSavings: number;
    dealsUsed: number;
    membershipTier: string;
    joinDate: string;
  };
}

export const ActivityStats: React.FC<ActivityStatsProps> = ({ user }) => {
  const monthlyGoal = 500;
  const monthlyProgress = (user.totalSavings % monthlyGoal) / monthlyGoal * 100;
  const isNewUser = user.totalSavings === 0 && user.dealsUsed === 0;
  
  const stats = [
    {
      title: 'Total Savings',
      value: `$${user?.totalSavings?.toLocaleString()}`,
      description: 'Lifetime savings',
      icon: DollarSign,
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      title: 'Deals Used',
      value: user?.dealsUsed?.toString(),
      description: 'This month',
      icon: ShoppingCart,
      color: 'text-brand-primary',
      bgColor: 'bg-brand-primary/10'
    },
    {
      title: 'Avg. Discount',
      value: user.dealsUsed > 0 ? '32%' : '0%',
      description: 'Average savings per deal',
      icon: Target,
      color: 'text-brand-accent',
      bgColor: 'bg-brand-accent/10'
    },
    {
      title: 'Member Level',
      value: user.membershipTier,
      description: 'Current tier',
      icon: Award,
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    }
  ];

  const monthlyStats = [
    { label: 'This Month', value: isNewUser ? '$0' : '$247', change: isNewUser ? 'Start saving!' : '+12%' },
    { label: 'Last Month', value: isNewUser ? '$0' : '$189', change: isNewUser ? 'No data yet' : '+8%' },
    { label: 'Best Month', value: isNewUser ? '$0' : '$324', change: isNewUser ? 'Coming soon!' : 'Record!' },
  ];

  if (isNewUser) {
    return (
      <div className="space-y-6">
        {/* New User Stats - Show potential */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="border-neutral-lighter">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${stat.bgColor} flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${stat.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-lg sm:text-2xl font-bold text-text-primary">{stat.value}</div>
                      <div className="text-xs sm:text-sm text-neutral-medium">{stat.description}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Getting Started Guide */}
        <Card className="border-brand-primary/20 bg-linear-to-r from-brand-primary/5 to-brand-accent/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-brand-primary" />
              Start Your Savings Journey
            </CardTitle>
            <CardDescription>
              Follow these steps to maximize your student savings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-brand-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-brand-primary">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-text-primary mb-1">Verify Your Student Status</h4>
                    <p className="text-sm text-neutral-medium">Unlock exclusive student discounts</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-brand-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-brand-primary">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-text-primary mb-1">Browse & Save Deals</h4>
                    <p className="text-sm text-neutral-medium">Discover deals that match your interests</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-brand-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-brand-primary">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-text-primary mb-1">Start Shopping</h4>
                    <p className="text-sm text-neutral-medium">Use your first deal and start saving</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-brand-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-brand-primary">4</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-text-primary mb-1">Share & Earn</h4>
                    <p className="text-sm text-neutral-medium">Refer friends for bonus rewards</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <Button className="bg-brand-primary hover:bg-brand-primary/90">
                <Search className="h-4 w-4 mr-2" />
                Explore Deals
              </Button>
              <Button variant="outline">
                <ExternalLink className="h-4 w-4 mr-2" />
                Learn More
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Main Stats Grid - Responsive */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="border-neutral-lighter">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${stat.bgColor} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${stat.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-lg sm:text-2xl font-bold text-text-primary">{stat.value}</div>
                    <div className="text-xs sm:text-sm text-neutral-medium">{stat.description}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Detailed Analytics - Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Goal Progress */}
        <Card className="border-neutral-lighter">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Target className="h-5 w-5 text-brand-primary" />
              Monthly Savings Goal
            </CardTitle>
            <CardDescription>
              Track your progress towards this month's savings target
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-text-primary mb-1">
                ${(user.totalSavings % monthlyGoal).toFixed(0)}
              </div>
              <div className="text-sm text-neutral-medium">
                of ${monthlyGoal} goal
              </div>
            </div>
            
            <Progress value={monthlyProgress} className="h-3" />
            
            <div className="flex justify-between text-xs text-neutral-medium">
              <span>$0</span>
              <span className={monthlyProgress >= 100 ? 'text-success font-medium' : ''}>
                {monthlyProgress.toFixed(0)}% complete
              </span>
              <span>${monthlyGoal}</span>
            </div>

            {monthlyProgress >= 100 && (
              <Badge className="w-full justify-center bg-success/10 text-success border-success/20">
                <Trophy className="h-3 w-3 mr-1" />
                Goal Achieved!
              </Badge>
            )}
          </CardContent>
        </Card>

        {/* Savings Trend */}
        <Card className="border-neutral-lighter">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-5 w-5 text-brand-primary" />
              Savings Trend
            </CardTitle>
            <CardDescription>
              Your monthly savings performance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {monthlyStats.map((month, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-text-primary text-sm">{month.label}</div>
                  <div className="text-xl sm:text-2xl font-bold text-text-primary">{month.value}</div>
                </div>
                <Badge 
                  variant="outline" 
                  className={
                    month.change.includes('+') 
                      ? 'text-success border-success/20' 
                      : month.change === 'Record!' 
                        ? 'text-warning border-warning/20'
                        : 'text-neutral-medium'
                  }
                >
                  {month.change}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Milestones */}
      <Card className="border-neutral-lighter">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Star className="h-5 w-5 text-brand-primary" />
            Recent Milestones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-brand-primary/5 rounded-lg border border-brand-primary/10">
              <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center flex-shrink-0">
                <Trophy className="h-4 w-4 text-brand-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-text-primary text-sm sm:text-base">Reached $1,000 Total Savings!</p>
                <p className="text-xs text-neutral-medium">November 15, 2024</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-success/5 rounded-lg border border-success/10">
              <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                <Zap className="h-4 w-4 text-success" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-text-primary text-sm sm:text-base">10 Deals in One Month</p>
                <p className="text-xs text-neutral-medium">November 8, 2024</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-warning/5 rounded-lg border border-warning/10">
              <div className="w-8 h-8 rounded-full bg-warning/10 flex items-center justify-center flex-shrink-0">
                <Award className="h-4 w-4 text-warning" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-text-primary text-sm sm:text-base">Upgraded to Gold Member</p>
                <p className="text-xs text-neutral-medium">October 28, 2024</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};