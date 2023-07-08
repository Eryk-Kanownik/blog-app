import { type } from "os";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Children {
  children?: React.ReactNode;
}

const AuthComponent: React.FC<Children> = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      navigate("/");
    }
  }, []);

  return <>{children}</>;
};

export default AuthComponent;
