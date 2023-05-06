import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginHandler = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(true);
    navigate("/dashboard");
  }, [setIsLoggedIn, navigate]);

  return null;
};

export default LoginHandler;
