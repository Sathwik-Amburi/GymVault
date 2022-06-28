import { FC } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../store";

interface RoleWrapperProps {
  allowedRoles: string[];
  children: React.ReactElement;
}

const RoleWrapper: FC<RoleWrapperProps> = ({
  allowedRoles,
  children,
}: RoleWrapperProps) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.authentication.isAuthenticated
  );
  const role = useSelector((state: RootState) => state.authentication.role);

  return isAuthenticated && allowedRoles.includes(role) ? (
    children
  ) : isAuthenticated ? (
    <Navigate to={{ pathname: "/user/unauthorized" }} />
  ) : (
    <Navigate to={{ pathname: "/user/login" }} />
  );
};

export default RoleWrapper;
