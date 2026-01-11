import { useEffect, useCallback, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface UseUnsavedChangesOptions {
  /** Whether there are unsaved changes */
  hasUnsavedChanges: boolean;
  /** Message to show in the confirmation dialog */
  message?: string;
  /** Callback when user confirms leaving */
  onConfirmLeave?: () => void;
}

interface UseUnsavedChangesReturn {
  /** Component to render for the confirmation dialog */
  ConfirmDialog: React.FC;
  /** Function to check if it's safe to proceed (shows dialog if needed) */
  confirmIfUnsaved: (callback: () => void) => void;
  /** Reset the unsaved state (call after successful save) */
  resetUnsaved: () => void;
}

/**
 * Hook to handle unsaved changes protection
 * - Shows browser warning on tab close/refresh
 * - Provides utility to confirm before custom actions
 * 
 * Note: This version works with BrowserRouter (non-data router)
 * For full navigation blocking, the app would need to use createBrowserRouter
 */
export function useUnsavedChanges({
  hasUnsavedChanges,
  message = 'You have unsaved changes. Are you sure you want to leave? Your changes will be lost.',
  onConfirmLeave
}: UseUnsavedChangesOptions): UseUnsavedChangesReturn {
  const [showDialog, setShowDialog] = useState(false);
  const [pendingCallback, setPendingCallback] = useState<(() => void) | null>(null);

  // Handle browser close/refresh
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = message;
        return message;
      }
    };

    if (hasUnsavedChanges) {
      window.addEventListener('beforeunload', handleBeforeUnload);
    }

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [hasUnsavedChanges, message]);

  const handleConfirmLeave = useCallback(() => {
    onConfirmLeave?.();
    if (pendingCallback) {
      pendingCallback();
      setPendingCallback(null);
    }
    setShowDialog(false);
  }, [onConfirmLeave, pendingCallback]);

  const handleCancelLeave = useCallback(() => {
    setPendingCallback(null);
    setShowDialog(false);
  }, []);

  const confirmIfUnsaved = useCallback((callback: () => void) => {
    if (hasUnsavedChanges) {
      setPendingCallback(() => callback);
      setShowDialog(true);
    } else {
      callback();
    }
  }, [hasUnsavedChanges]);

  const resetUnsaved = useCallback(() => {
    // This is a no-op since we rely on the hasUnsavedChanges prop
    // The parent component should manage the dirty state
  }, []);

  const ConfirmDialog: React.FC = () => (
    <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
          <AlertDialogDescription>
            {message}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancelLeave}>
            Stay on Page
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirmLeave}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Leave Without Saving
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  return {
    ConfirmDialog,
    confirmIfUnsaved,
    resetUnsaved
  };
}

/**
 * Simple hook to track dirty state of a form
 * Compares current values with initial values
 */
export function useDirtyState<T extends Record<string, unknown>>(
  initialValues: T,
  currentValues: T
): boolean {
  return JSON.stringify(initialValues) !== JSON.stringify(currentValues);
}

export default useUnsavedChanges;
