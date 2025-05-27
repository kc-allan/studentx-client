import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/auth';

const ProtectedRoute = ({ children, allowedRoles }) => {
	const { userRole, isAuthenticated } = useSelector((state: RootState) => ({
		user: state.auth.user,
		userRole: state.auth.role,
		isAuthenticated: !!state.auth.user,
	}));
	const navigate = useNavigate();

	if (!isAuthenticated) {
		return <Navigate to="/auth?page=login" replace />;
	}

	if (!allowedRoles.includes(userRole)) {
		navigate(-1);
		toast({
			title: 'Access Denied',
			description: 'You do not have permission to access this resource. Please log in with an authorized account.',
			variant: 'destructive',
		})
		return null;
	}

	return children;
};

export default ProtectedRoute;
