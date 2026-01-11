
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BadgeCheck,
  Star,
  Trophy,
  Camera,
  Share2,
  Download,
  MapPin,
  Calendar,
  School,
  Award,
  ShieldCheck
} from "lucide-react";
import Header from '../Header';

interface ProfileHeaderProps {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    avatar: string;
    university: string;
    graduationYear: string;
    major: string;
    isVerified: boolean;
    totalSavings: number;
    dealsUsed: number;
    membershipTier: string;
    joinDate: string;
  };
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  const [showShareMenu, setShowShareMenu] = useState(false);

  const getTierColor = (tier: string) => {
    switch (tier.toLowerCase()) {
      case 'gold': return 'bg-yellow-500';
      case 'silver': return 'bg-gray-400';
      case 'bronze': return 'bg-amber-600';
      default: return 'bg-brand-primary';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

  return (
    <div className="relative bg-linear-to-br flex justify-center from-neutral-900 via-neutral-950 to-black text-white">
      <Header />
      <div className="absolute inset-0 overflow-hidden opacity-15">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB4PSIwIiB5PSIwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSgzMCkiPjxwYXRoIGQ9Ik0tMTAgLTEwIEwyMCAtMTAgTDIwIDIwIEwtMTAgMjAgWiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjAuNSIgZmlsbD0ibm9uZSIvPjwvcGF0dGVybj48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BhdHRlcm4pIi8+PC9zdmc+')] animate-very-slow-pan"></div>
      </div>
      <div className="container mx-auto px-4 py-8 pt-24">
        {/* Header Content */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
          {/* Avatar Section */}
          <div className="relative">
            <Avatar className="w-24 h-24 lg:w-32 lg:h-32 border-4 border-white/20">
              <AvatarImage src={user.avatar} alt={`${user.firstName} ${user.lastName}`} />
              <AvatarFallback className="text-2xl lg:text-3xl font-bold bg-white/10">
                {user.firstName[0]}{user.lastName[0]}
              </AvatarFallback>
            </Avatar>
            {/* <Button
              size="icon"
              variant="secondary"
              className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20"
            >
              <Camera className="h-4 w-4" />
            </Button> */}
          </div>

          {/* User Info */}
          <div className="flex-1 space-y-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl lg:text-3xl font-bold">
                  {user.firstName} {user.lastName}
                </h1>
                {user.isVerified && (
                  <ShieldCheck className="h-6 w-6 text-white" />
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm">
                <div className="flex items-center gap-1">
                  <School className="h-4 w-4" />
                  <span>{user.university}</span>
                </div>
                {user.graduationYear && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Class of {user.graduationYear}</span>
                  </div>
                )}
                {user.major && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{user.major}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-6 lg:gap-8">
              {/* <div className="text-center lg:text-left">
                <div className="text-2xl lg:text-3xl font-bold">
                  ${user.totalSavings.toLocaleString()}
                </div>
                <div className="text-white/70 text-sm">Total Saved</div>
              </div> */}
              <div className="text-center lg:text-left">
                <div className="text-2xl lg:text-3xl font-bold">
                  {user.dealsUsed}
                </div>
                <div className="text-white/70 text-sm">Deals Used</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl lg:text-3xl font-bold">
                  {formatDate(user.joinDate)}
                </div>
                <div className="text-white/70 text-sm">Member Since</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            {/* <Button
              variant="secondary"
              className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white"
              onClick={() => setShowShareMenu(!showShareMenu)}
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share Profile
            </Button> */}
            {/* <Button
              variant="secondary"
              className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white"
            >
              <Download className="h-4 w-4 mr-2" />
              Get App
            </Button> */}
          </div>
        </div>

        {/* Achievement Highlights */}
        {/* <div className="mt-8 flex flex-wrap gap-3">
          <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
            <Star className="h-3 w-3 mr-1" />
            Top Saver This Month
          </Badge>
          <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
            <Trophy className="h-3 w-3 mr-1" />
            Deal Hunter Level 3
          </Badge>
          <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
            <BadgeCheck className="h-3 w-3 mr-1" />
            Verified Student
          </Badge>
        </div> */}
      </div>
    </div>
  );
};