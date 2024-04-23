import React, { useContext, useEffect } from "react";
import UserForm from "../components/UserForm";
import { AuthContext } from "../store/AuthContextProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);
  return <UserForm />;
};

export default Login;
