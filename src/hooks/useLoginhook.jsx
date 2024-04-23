import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../store/AuthContextProvider";
export default function useLogin() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, dispatch } = useContext(AuthContext);
  const login = (email = "", password = "") => {
    // send data
    setError("");
    setLoading(true);
    axios
      .post(
        "https://book-store-backend-qtea.onrender.com/users/login",
        {
          email,
          password,
        }
      )
      .then((response) => {
        const user = response.data;
        dispatch({ type: "SIGNUP", payload: user });
        setLoading(false);
        localStorage.setItem("user", JSON.stringify(user));
        return user;
      })
      .catch((error) => {
        setLoading(false);
        setError(error.response.data);
      });
  };

  return { login, loading, error };
}
