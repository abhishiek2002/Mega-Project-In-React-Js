import React, { useState } from "react";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";
import { login } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Button, Input, Logo } from "./index";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [register, handleSubmit] = useForm();

  //   logical part of Signup Page

  const create = async (data) => {
    setError("");
    try {
      // createAccount will create account and login simultaneously. For reference goto `src/appwrite/auth.js`
      const session = await authService.createAccount(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  //   JSX part of Signup component

  return (
    <div className="flex items-center justify-center">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        {/* logo */}
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>

        {/* Heading Tags Of Signup Page */}
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium transition-all duration-200 hover:underline"
          >
            Login
          </Link>
        </p>

        {/* Showing Error If Signup Page encounter any */}
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        {/* Now, actual form start from here */}
        <form onSubmit={handleSubmit(create)}>
          <div className="space-y-5">
            {/* Name Input Component */}
            <Input
              label="Full Name: "
              placeholder="Enter your full name"
              {...register("name", {
                required: true,
              })}
            />

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
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
