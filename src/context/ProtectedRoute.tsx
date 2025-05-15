import { Navigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/auth';

const ProtectedRoute = ({ children, allowedRoles }) => {
	const { user, isAuthenticated } = useSelector((state: RootState) => ({
		user: state.auth.user,
		isAuthenticated: !!state.auth.user,
	}));

	if (!isAuthenticated) {
		return <Navigate to="/auth?page=login" replace />;
	}

	if (!allowedRoles.includes(user.role)) {
		toast({
			title: 'Access Denied',
			description: 'You do not have permission to access this page.',
			variant: 'destructive',
		})
		return null;
	}

	return children;
};

export default ProtectedRoute;
