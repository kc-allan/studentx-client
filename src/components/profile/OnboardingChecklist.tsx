import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  CheckCircle2,
  Circle,
  User,
  ShieldCheck,
  ChevronRight,
  X,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface OnboardingChecklistProps {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    major?: string;
    studentId?: string;
    graduationYear?: string;
    isVerified: boolean;
    verificationStatus: string;
  };
  onNavigateToTab: (tab: string) => void;
  onOpenOnboarding: () => void;
  onDismiss: () => void;
}

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  isComplete: boolean;
  action: () => void;
  actionLabel: string;
}

export const OnboardingChecklist: React.FC<OnboardingChecklistProps> = ({
  user,
  onNavigateToTab,
  onOpenOnboarding,
  onDismiss
}) => {
  const [isDismissed, setIsDismissed] = useState(false);

  // Calculate profile completeness
  const hasPersonalDetails = !!(user.phone);
  const hasStudentInfo = !!(user.major || user.studentId || user.graduationYear);
  const isVerified = user.isVerified || user.verificationStatus === 'completed';

  const checklistItems: ChecklistItem[] = [
    {
      id: 'account',
      title: 'Create your account',
      description: 'Sign up for StudentX',
      icon: CheckCircle2,
      isComplete: true, // Always complete if they're seeing this
      action: () => {},
      actionLabel: 'Done'
    },
    {
      id: 'personal',
      title: 'Add personal details',
      description: 'Phone number & location',
      icon: User,
      isComplete: hasPersonalDetails,
      action: () => onNavigateToTab('account'),
      actionLabel: 'Complete'
    },
    {
      id: 'student',
      title: 'Add student information',
      description: 'Major, student ID & graduation year',
      icon: User,
      isComplete: hasStudentInfo,
      action: () => onNavigateToTab('account'),
      actionLabel: 'Complete'
    },
    {
      id: 'verification',
      title: 'Verify student status',
      description: 'Unlock exclusive student deals',
      icon: ShieldCheck,
      isComplete: isVerified,
      action: () => onNavigateToTab('verification?scrollTo=student-verify-button'),
      actionLabel: 'Verify'
    }
  ];

  const completedCount = checklistItems.filter(item => item.isComplete).length;
  const progress = (completedCount / checklistItems.length) * 100;
  const allComplete = completedCount === checklistItems.length;

  const handleDismiss = () => {
    setIsDismissed(true);
    // Store dismissal in session (will reappear on next visit if incomplete)
    sessionStorage.setItem('checklist_dismissed', 'true');
    onDismiss();
  };

  // Check if checklist was dismissed this session
  const wasSessionDismissed = sessionStorage.getItem('checklist_dismissed') === 'true';

  // Don't show if all complete or dismissed this session
  if (allComplete || isDismissed || wasSessionDismissed) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="border-blue-200 bg-linear-to-r from-blue-50 via-indigo-50 to-blue-50 mb-6 overflow-hidden">
          <CardContent className="p-0">
            {/* Header */}
            <div className="flex items-center justify-between p-4 pb-3 border-b border-blue-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Complete Your Profile</h3>
                  <p className="text-sm text-gray-500">
                    {completedCount} of {checklistItems.length} steps completed
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDismiss}
                className="text-gray-400 hover:text-gray-600 hover:bg-blue-100 -mr-2"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Progress bar */}
            <div className="px-4 pt-3">
              <Progress value={progress} className="h-2" />
            </div>

            {/* Checklist items */}
            <div className="p-4 pt-3">
              <div className="space-y-2">
                {checklistItems.map((item, index) => (
                  <div
                    key={item.id}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                      item.isComplete
                        ? 'bg-green-50/50'
                        : 'bg-white hover:bg-gray-50 cursor-pointer'
                    }`}
                    onClick={() => !item.isComplete && item.action()}
                  >
                    <div className={`flex-shrink-0 ${item.isComplete ? 'text-green-500' : 'text-gray-300'}`}>
                      {item.isComplete ? (
                        <CheckCircle2 className="h-6 w-6" />
                      ) : (
                        <Circle className="h-6 w-6" />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium text-sm ${item.isComplete ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-500">{item.description}</p>
                    </div>

                    {!item.isComplete && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 flex-shrink-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          item.action();
                        }}
                      >
                        {item.actionLabel}
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Footer CTA */}
            <div className="px-4 pb-4">
              <Button
                onClick={onOpenOnboarding}
                className="w-full bg-brand-primary hover:bg-brand-primary/80 text-white"
              >
                Continue Setup
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

export default OnboardingChecklist;
