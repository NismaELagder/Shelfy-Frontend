import { useContext } from "react";
import { AuthContext } from "../store/AuthContextProvider.jsx";
const useLogout = () => {
  const { dispatch } = useContext(AuthContext);
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("user");
  };

  return { logout };
};

export default useLogout;
