import { useContext } from "react";
import { AuthContext } from "../store/AuthContextProvider.jsx";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const { dispatch } = useContext(AuthContext);
  const Navigate = useNavigate();

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("user");
    Navigate("/login");
  };

  return { logout };
};

export default useLogout;
