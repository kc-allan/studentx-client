import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, TrendingUp, DollarSign, Gift, Users, Calendar, Star, Trophy, Repeat, Infinity } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import axiosInstance from '@/api/axios';

interface AggregateStats {
  total_savings: number;
  total_claims: number;
  total_redemptions: number;
  unique_offers_claimed: number;
  average_savings_per_redemption: number;
}

interface TopOffer {
  offer: {
    id: string;
    title: string;
    merchant_name: string;
  };
  total_savings: number;
  usage_count: number;
  total_redemptions: number;
}

interface RecentActivity {
  offer: {
    id: string;
    title: string;
    merchant_name: string;
  };
  last_claimed_at: string;
  usage_count: number;
}

interface SavingsSummaryData {
  aggregate_stats: AggregateStats;
  top_offers_by_savings: TopOffer[];
  recent_activity: RecentActivity[];
}

export const SavingsDashboard: React.FC = () => {
  const [data, setData] = useState<SavingsSummaryData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchSavingsSummary = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/offer/user/savings-summary');
      
      if (response.data) {
        setData(response.data.data);
      }
    } catch (error) {
      toast({
        title: "Error fetching savings summary",
        description: error.response?.data?.message || "Could not load your savings data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavingsSummary();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount / 100); // Convert from cents
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="p-8 text-center">
            <Loader2 className="animate-spin h-8 w-8 text-brand-primary mx-auto mb-4" />
            <p className="text-text-secondary">Loading your savings data...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="p-8 text-center">
            <Gift className="h-12 w-12 text-neutral-medium mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-text-primary mb-2">No Savings Data</h3>
            <p className="text-text-secondary mb-4">Start claiming offers to see your savings summary</p>
            <Button onClick={() => navigate('/deals')} className="bg-brand-primary hover:bg-brand-primary/90">
              Browse Deals
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { aggregate_stats, top_offers_by_savings, recent_activity } = data;

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="border-neutral-lighter">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {formatCurrency(aggregate_stats.total_savings)}
            </div>
            <div className="text-sm text-neutral-medium">Total Saved</div>
          </CardContent>
        </Card>

        <Card className="border-neutral-lighter">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-brand-primary mb-1">
              {aggregate_stats.total_claims}
            </div>
            <div className="text-sm text-neutral-medium">Total Claims</div>
          </CardContent>
        </Card>

        <Card className="border-neutral-lighter">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {aggregate_stats.total_redemptions}
            </div>
            <div className="text-sm text-neutral-medium">Redeemed</div>
          </CardContent>
        </Card>

        <Card className="border-neutral-lighter">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">
              {aggregate_stats.unique_offers_claimed}
            </div>
            <div className="text-sm text-neutral-medium">Unique Offers</div>
          </CardContent>
        </Card>

        <Card className="border-neutral-lighter">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600 mb-1">
              {formatCurrency(aggregate_stats.average_savings_per_redemption)}
            </div>
            <div className="text-sm text-neutral-medium">Avg. Savings</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Offers by Savings */}
        <Card className="border-neutral-lighter">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-600" />
              Top Money Savers
            </CardTitle>
            <CardDescription>
              Your most valuable offers based on total savings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {top_offers_by_savings.length > 0 ? (
              top_offers_by_savings.map((item, index) => (
                <div key={item.offer.id} className="flex items-center justify-between p-3 bg-background-subtle rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">#{index + 1}</Badge>
                      <span className="font-medium text-sm">{item.offer.title}</span>
                    </div>
                    <p className="text-xs text-neutral-medium">{item.offer.merchant_name}</p>
                    <div className="flex items-center gap-4 text-xs text-neutral-medium mt-1">
                      <span>{item.usage_count} claims</span>
                      <span>{item.total_redemptions} redeemed</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-600">
                      {formatCurrency(item.total_savings)}
                    </div>
                    <div className="text-xs text-neutral-medium">saved</div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-neutral-medium text-center py-8">
                No savings data available yet
              </p>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="border-neutral-lighter">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Your latest coupon claims and interactions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recent_activity.length > 0 ? (
              recent_activity.map((activity) => (
                <div key={`${activity.offer.id}-${activity.last_claimed_at}`} 
                     className="flex items-center justify-between p-3 bg-background-subtle rounded-lg">
                  <div className="flex-1">
                    <span className="font-medium text-sm">{activity.offer.title}</span>
                    <p className="text-xs text-neutral-medium">{activity.offer.merchant_name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        <Repeat className="h-3 w-3 mr-1" />
                        {activity.usage_count}x claimed
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-neutral-medium">
                      {formatDate(activity.last_claimed_at)}
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-1 text-xs h-6"
                      onClick={() => navigate(`/offer/${activity.offer.id}`)}
                    >
                      View
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-neutral-medium text-center py-8">
                No recent activity
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-brand-primary/20 bg-brand-primary/5">
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-8 w-8 text-brand-primary mx-auto mb-2" />
            <h3 className="font-semibold text-text-primary mb-1">Discover More Offers</h3>
            <p className="text-sm text-text-secondary mb-4">
              Find new deals to maximize your savings
            </p>
            <Button onClick={() => navigate('/deals')} className="bg-brand-primary hover:bg-brand-primary/90">
              Browse Deals
            </Button>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-6 text-center">
            <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <h3 className="font-semibold text-text-primary mb-1">Share Your Success</h3>
            <p className="text-sm text-text-secondary mb-4">
              Tell friends about the money you've saved
            </p>
            <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white">
              Share Savings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};