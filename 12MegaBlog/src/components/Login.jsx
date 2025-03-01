import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { Logo, Input, Button } from "../components/index";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //   logic of login
  const login = async ({ email, password }) => {
    setError("");
    try {
      const session = await authService.login({ email, password });
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin(userData));
          navigate("/");
        }

      }
    } catch (error) {
      setError(error.message);
    }
  };

  //   component jsx of login

  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-lg p-10 border border-black/10`}
      >
        {/* logo */}
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>

        {/* Heading Tags Of Login Page */}
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>

        {/* If page encounter some error then paragraph tag */}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Now, actual Form start from here */}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            {/* Email Input Component */}
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />

            {/* Password Input Component */}
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />

            {/* Submit Button */}
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
