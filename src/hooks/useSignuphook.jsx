import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../store/AuthContextProvider";
export default function useSignup() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, dispatch } = useContext(AuthContext);
  const signup = (
    userName = "",
    email = "",
    password = ""
  ) => {
    // send data
    setError("");
    setLoading(true);
    axios
      .post(
        "https://book-store-backend-qtea.onrender.com/users/signup",
        {
          userName,
          email,
          password,
        }
      )
      .then((response) => {
        const user = response.data;
        dispatch({ type: "SIGNUP", payload: user });
        setLoading(false);
        localStorage("user", user);
        return user;
      })
      .catch((error) => {
        setError(error?.response?.data);
      });
  };

  return { signup, loading, error };
}
