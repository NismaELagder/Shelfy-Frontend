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
    <div className="h-screen w-screen flex flex-col justify-center items-center bg-stone-200 sm:px-16 sm:py-6">
      <form className="flex basis-7/12 w-5/6 sm:w-3/5 sm:basis-9/12 xl:w-3/12 justify-center flex-col items-center bg-white rounded border border-slate-200">
        <div className="flex flex-col basis-1/5 items-center justify-around bg-white mx-auto">
          <p className="block text-3xl text-indigo-600 font-logo font-extrabold">Shelfy</p>
          <div className="flex basis-2/10 justify-center items-start bg-white text-lg w-full font-medium">
            {pathname == "/signup" ? (
              <h1>Join us today</h1>
            ) : (
              <h1>Welcome back</h1>
            )}
          </div>
        </div>

        <div className="flex basis-2/5 bg-white flex-col justify-around w-full px-3 sm:px-8">
          {pathname == "/signup" && (
            <Input
              className=""
              label={"Username*"}
              name={"userName"}
              onChange={(e) => onChange(e)}
              value={user?.userName}
              type={"text"}
            />
          )}
          <Input
            className=""
            label={"Email*"}
            name={"email"}
            onChange={(e) => onChange(e)}
            value={user?.email}
            type={"email"}
          />

          <Input
            label={"Password*"}
            name={"password"}
            onChange={(e) => onChange(e)}
            value={user?.password}
            type={"password"}
            className={""}
          />
          <button
            onClick={submitHandler}
            type="button"
            disabled={loading || LogininLoading}
            className="block border w-full rounded border-stone-200 px-3 py-1 mt-4 bg-black text-white"
          >
            {pathname == "/signup" ? "Sign up" : "Login"}
          </button>

          <div className="w-full py-1 mt-4">
            {pathname == "/signup" && (
              <p className="">
                Already have an account?{" "}
                <Link
                  to={"/login"}
                  className="hover:text-indigo-700 font-bold underline"
                >
                  Login
                </Link>
              </p>
            )}
            {pathname == "/login" && (
              <p className="">
                Don't have an account yet?{" "}
                <Link
                  to={"/signup"}
                  className="hover:text-indigo-700 font-bold underline"
                >
                  Sign up
                </Link>
              </p>
            )}
            {(error || loginError) && (
              <p className="block w-full bg-red-300">
                {error} {loginError}
              </p>
            )}

          </div>
        </div>

      </form>

    </div>
  );
};

export default UserForm;
