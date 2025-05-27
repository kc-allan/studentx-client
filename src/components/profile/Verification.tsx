
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  AlertCircle,
  XCircle,
  Mail,
  School,
  Shield,
  Clock,
  Star,
  Award,
  GraduationCap,
  ExternalLink,
  RefreshCw
} from "lucide-react";

interface VerificationTasksProps {
  onChangeTab?: (tab: string) => void;
  user: {
    isVerified: boolean;
    verificationLevel: number;
    email: string;
    phone: string;
    university: string;
  };
}

export const VerificationTasks: React.FC<VerificationTasksProps> = ({ user, onChangeTab }) => {
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'in_progress' | 'completed' | 'failed'>('pending');

  const verificationSteps = [
    {
      id: 'profile_completion',
      title: 'Complete Profile',
      description: 'Add your university and graduation year information',
      icon: School,
      status: 'pending',
      points: 15,
      required: false
    },
    // {
    //   id: 'email',
    //   title: 'Verify University Email',
    //   description: 'Confirm your .edu email address to begin verification',
    //   icon: Mail,
    //   status: 'completed',
    //   points: 25,
    //   required: true
    // },
    {
      id: 'sheerid_verification',
      title: 'Student Status Verification',
      description: 'Complete identity verification through our secure partner SheerID',
      icon: GraduationCap,
      status: verificationStatus,
      points: 50,
      required: true
    },

  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-success" />;
      case 'in_progress':
        return <RefreshCw className="h-5 w-5 text-warning animate-spin" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-warning" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-destructive" />;
      default:
        return <AlertCircle className="h-5 w-5 text-neutral-medium" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-success/10 text-success border-success/20';
      case 'in_progress':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'pending':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'failed':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      default:
        return 'bg-neutral-lighter text-neutral-medium border-neutral-lighter';
    }
  };

  const completedSteps = verificationSteps.filter(step => step.status === 'completed').length;
  const totalPoints = verificationSteps.reduce((sum, step) =>
    step.status === 'completed' ? sum + step.points : sum, 0
  );
  const maxPoints = verificationSteps.reduce((sum, step) => sum + step.points, 0);


  const handleSheerIDVerification = async () => {
    setVerificationStatus('in_progress');

    try {
      // @ts-ignore
      const sheerId = await import('https://cdn.jsdelivr.net/npm/@sheerid/jslib@2/sheerid-install.js');

      const userId = '216b5d06-ce3f-4d2e-83f4-9694791cf65d'; // Replace with actual user ID
      const prefillParams = new URLSearchParams({
        "first-name": "John",
        "last-name": "Doe",
        "email": "john@example.com",
      }).toString();
      sheerId.default.loadInModal(
        `https://services.sheerid.com/verify/681c4612419b11377be7f69e/?userId=${userId}&${prefillParams}&email=user@example.com`,
        {
          mobileRedirect: false,
          closeButtonText: "Close",
          metadata: {
            userId: "216b5d06-ce3f-4d2e-83f4-9694791cf65d",
            verificationType: "student",
          },
          prefill: {
            "first-name": "John",  // Use kebab-case
            "last-name": "Doe",   // Use kebab-case
            "email": "john@example.com",
            "birth-date": "1990-01-01",  // Format: YYYY-MM-DD
            "schoolName": "Harvard University", // Some keys may be camelCase
          },
          redirectUrl: `https://1bjd0zgg-4000.uks1.devtunnels.ms/sheerid/callback?userId=${userId}`,
        }
      );
      sheerId.conversion.convert({ amount: "XX.XX" });
    } catch (error) {
      console.error("SheerID failed to load:", error);
      setVerificationStatus('failed');
    }
  };



  return (
    <div className="space-y-6">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@sheerid/jslib@2/sheerid-install.css" type="text/css" />
      {/* Progress Overview */}
      <Card className="border-neutral-lighter">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-brand-primary" />
                Student Identity Verification
              </CardTitle>
              <CardDescription>
                Verify your student status to access exclusive deals
              </CardDescription>
            </div>
            <Badge className="bg-brand-primary/10 text-brand-primary border-brand-primary/20">
              <Star className="h-3 w-3 mr-1" />
              {totalPoints}/{maxPoints} points
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Verification Progress</span>
                <span className="text-sm text-neutral-medium">
                  {completedSteps}/{verificationSteps.length} completed
                </span>
              </div>
              <Progress value={(completedSteps / verificationSteps.length) * 100} className="h-3" />
            </div>
            {completedSteps === verificationSteps.length ? (
              <div className="text-success text-sm font-medium">
                <div className='flex items-center gap-2'>
                  <CheckCircle className="inline h-4 w-4" />
                  <h1 className='text-lg'>You're all set</h1>
                </div>
                <p className="text-neutral-400">You've completed all verification steps. You can now browse all exclusive deals on StudentX</p>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-neutral-lighter">
                <div className="text-center">
                  <div className="text-2xl font-bold text-brand-primary">{user.verificationLevel}%</div>
                  <div className="text-sm text-neutral-medium">Verified</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-success">{totalPoints}</div>
                  <div className="text-sm text-neutral-medium">Trust Points</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-brand-accent">{completedSteps}</div>
                  <div className="text-sm text-neutral-medium">Steps Done</div>
                </div>
              </div>
            )}

          </div>
        </CardContent>
      </Card>

      {/* Verification Steps */}
      <div className="grid grid-cols-1 gap-4">
        {verificationSteps.map((step, index) => {
          const StepIcon = step.icon;
          return (
            <Card key={step.id} className="border-neutral-lighter">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center">
                      <StepIcon className="h-6 w-6 text-brand-primary" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-text-primary">{step.title}</h3>
                      <Badge className={getStatusColor(step.status)}>
                        {step.status === 'completed' && 'Completed'}
                        {step.status === 'in_progress' && 'In Progress'}
                        {step.status === 'pending' && 'Pending'}
                        {step.status === 'failed' && 'Failed'}
                      </Badge>
                      {step.required && (
                        <Badge variant="outline" className="text-xs">Required</Badge>
                      )}
                    </div>

                    <p className="text-neutral-medium text-sm mb-4">{step.description}</p>

                    {step.id === 'profile_completion' && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                        <div className="flex items-start gap-3">
                          <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-blue-900 mb-1">Complete Your Profile</h4>
                            <p className="text-sm text-blue-700 mb-3">
                              Add required data onm your profile to continue with your verification.
                            </p>
                            <Button
                              onClick={() => onChangeTab('account')} // Replace with actual profile completion logic
                              className="bg-blue-600 hover:bg-blue-700 text-white"
                            >
                              Complete Profile
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}

                    {step.id === 'sheerid_verification' && step.status === 'pending' && (
                      <div className="space-y-3">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                            <div>
                              <h4 className="font-medium text-blue-900 mb-1">Secure Verification with SheerID</h4>
                              <p className="text-sm text-blue-700 mb-3">
                                We partner with SheerID, a trusted third-party verification service, to securely confirm your student status. Your personal information is protected and never stored by us.
                              </p>
                              <Button
                                onClick={handleSheerIDVerification}
                                id="modal-button"
                                className="modal-button bg-blue-600 hover:bg-blue-700 text-white"
                              >
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Start Verification
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {step.id === 'sheerid_verification' && step.status === 'in_progress' && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <div className="flex items-center gap-3">
                          <RefreshCw className="h-5 w-5 text-yellow-600 animate-spin" />
                          <div>
                            <h4 className="font-medium text-yellow-900">Verification in Progress</h4>
                            <p className="text-sm text-yellow-700">
                              Your verification is being processed. This typically takes 1-2 minutes.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {step.status === 'completed' && (
                      <div className="flex items-center gap-2 text-sm text-success">
                        <CheckCircle className="h-4 w-4" />
                        <span>Verification complete</span>
                      </div>
                    )}

                    {step.status === 'failed' && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-red-900 mb-1">Verification Failed</h4>
                            <p className="text-sm text-red-700 mb-3">
                              We couldn't verify your student status. Please try again or contact support for assistance.
                            </p>
                            <Button
                              onClick={handleSheerIDVerification}
                              variant="outline"
                              className="border-red-300 text-red-700 hover:bg-red-50"
                            >
                              Try Again
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex-shrink-0 flex items-center gap-2">
                    {getStatusIcon(step.status)}
                    <span className="text-sm font-medium text-brand-primary">+{step.points} pts</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Benefits Card */}
      <Card className="border-brand-primary/20 bg-gradient-to-r from-brand-primary/5 to-brand-accent/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-brand-primary" />
            Student Verification Benefits
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-text-primary">Unlock Exclusive Access</h4>
              <ul className="text-sm text-neutral-medium space-y-1">
                <li>• Access to verified student deals</li>
                <li>• Higher discount percentages</li>
                <li>• Priority access to limited offers</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-text-primary">Trusted & Secure</h4>
              <ul className="text-sm text-neutral-medium space-y-1">
                <li>• Verified by SheerID</li>
                <li>• Your data stays secure</li>
                <li>• Instant verification process</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};