import React, { useState } from "react";
import Input from "../components/Input";
import { Link, useLocation } from "react-router-dom";
import useSignup from "../hooks/useSignuphook";
import useLogin from "../hooks/useLoginhook";

const UserForm = () => {
  const [user, setUser] = useState();
  const { pathname } = useLocation();
  const { signup, loading, error } = useSignup();
  const {
    login,
    loading: LogininLoading,
    error: loginError,
  } = useLogin();

  const onChange = (e) => {
    setUser((user) => {
      return { ...user, [e.target.name]: e.target.value };
    });
  };

  const submitHandler = () => {
    if (pathname == "/signup") {
      const userData = signup(
        user?.userName,
        user?.email,
        user?.password
      );
    }

    if (pathname == "/login") {
      const userData = login(user.email, user.password);
    }
  };

  return (
    <div className="w-full min-h-[92.2vh] flex justify-center items-center bg-dark">
      <form className="w-1/5 border-2 border-stone-300 shadow-stone-300  shadow  rounded p-4 bg-white">
        <div className="text-center font-semibold text-2xl">
          {pathname == "/signup" ? (
            <h1>Join us today!</h1>
          ) : (
            <h1>Welcome back!</h1>
          )}
        </div>

        {pathname == "/signup" && (
          <Input
            className="my-4 w-11/12 mx-auto"
            label={"User Name"}
            name={"userName"}
            onChange={(e) => onChange(e)}
            value={user?.userName}
            type={"text"}
          />
        )}
        <Input
          className="my-4 w-11/12 mx-auto"
          label={"Email"}
          name={"email"}
          onChange={(e) => onChange(e)}
          value={user?.email}
          type={"email"}
        />

        <Input
          label={"Password"}
          name={"password"}
          onChange={(e) => onChange(e)}
          value={user?.password}
          type={"password"}
          className={"my-4 w-11/12 mx-auto "}
        />
        <div className="w-11/12 mx-auto">
          <button
            onClick={submitHandler}
            type="button"
            disabled={loading || LogininLoading}
            className=" block w-full bg-dark py-1 rounded text-white hover:bg-secondary"
          >
            {pathname == "/signup" ? "Sign up" : "Login"}
          </button>
          {pathname == "/signup" && (
            <p className="my-2 text-xs font-light">
              Already have an account?{" "}
              <Link
                to={"/login"}
                className="font-medium text-dark hover:transition-opacity hover:text-secondary"
              >
                Login
              </Link>
            </p>
          )}
          {pathname == "/login" && (
            <p className="my-2 text-xs font-light ">
              Don't have an account yet?{" "}
              <Link
                to={"/signup"}
                className="font-medium text-dark hover:transition-opacity hover:text-secondary"
              >
                Sign up
              </Link>
            </p>
          )}
        </div>
        {(error || loginError) && (
          <p className=" w-11/12 mx-auto text-center py-2 text-sm text-[#f94563e9] border-[#f94563e9] border  bg-[#f9c5c5e8]">
            {error} {loginError}
          </p>
        )}
      </form>
    </div>
  );
};

export default UserForm;
