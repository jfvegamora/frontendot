import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { PrivateRoutes, PublicRoutes } from "../../interfaces";
import { AppStore, useAppSelector } from "../../redux/store";

interface Props {
  privateValidation: boolean;
}

const PrivateValidationFragment = <Outlet />;
const PublicValidationFragment = (
  <Navigate replace to={PrivateRoutes.PERSONAS} />
);

export const AuthGuard: React.FC<Props> = ({ privateValidation }) => {
  const userState = useAppSelector((store: AppStore) => store.user);
  return userState.nombre ? (
    privateValidation ? (
      PrivateValidationFragment
    ) : (
      PublicValidationFragment
    )
  ) : (
    <Navigate replace to={PublicRoutes.LOGIN} />
  );
};

export default AuthGuard;
