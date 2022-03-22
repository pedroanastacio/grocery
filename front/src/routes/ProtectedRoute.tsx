import React, { memo } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

type Props = {
	children?: React.ReactNode,
	redirectPath: string,
	isAllowed: boolean
}

const ProtectedRoute: React.FC<Props> = ({ children, redirectPath, isAllowed }) => {

	if(!isAllowed) return <Navigate to={redirectPath} replace={true} />;

	return children ? <>{children}</> : <Outlet />;
};

export default memo(ProtectedRoute);