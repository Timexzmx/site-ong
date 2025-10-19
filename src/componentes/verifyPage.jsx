import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function VerifyPage({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token || !token.startsWith("Bearer ")) {
      navigate("/login");
    }
  }, [navigate]);

  return <>{children}</>;
}

export default VerifyPage;
