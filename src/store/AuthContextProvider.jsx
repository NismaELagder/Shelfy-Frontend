import React, {
  createContext,
  useEffect,
  useReducer,
} from "react";

export const AuthContext = createContext({
  user: null,
  dispatch: () => {},
});

//AuthReducer fn
const authReducer = (state, action) => {
  if (action.type == "SIGNUP") {
    return { user: action.payload };
  }

  if (action.type == "LOGOUT") {
    return { user: null };
  }
  return state;
};

//
const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  useEffect(() => {
    if (localStorage.getItem("user")) {
      dispatch({
        type: "SIGNUP",
        payload: JSON.parse(localStorage.getItem("user")),
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
