import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";

import { Validator } from "../utils/Validator";
import { enqueueSnackbar } from "notistack";
import Form from "../components/Form";
import Button from "../components/Button";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [userData, setUserData] = useState(null);

  const getUser = async () => {
    try {
      const response = await axios.get("/data/user.json");
      const data = response.data;
      setUserData((user) => data.users);
    } catch (error) {
      enqueueSnackbar("data cannot be accessed", "error");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validationCheck = (loginData) => {

    let allErrors = [];

    const { email, password } = loginData;

    const emailValidations = Validator.validate(
      email,
      {
        required: true,
        isEmail: true,
      },
      "email"
    );
    const passwordValidations = Validator.validate(
      password,
      {
        required: true,
        minChar: 8,
      },
      "password"
    );
    allErrors = [...emailValidations.errors, ...passwordValidations.errors];

    return allErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = loginData;

    const errors = validationCheck(loginData);

    if (errors.length > 0) {
      return enqueueSnackbar(errors[0], { variant: "error" });
    }
    if (email !== userData[0].email && password !== userData[0].email) {
      return enqueueSnackbar("Invalid username or password.", {
        variant: "error",
      });
    }
    navigate("/home");
    enqueueSnackbar("Login successful.", {
      variant: "success",
    });
  };

  return (
    <Form title="Sign in" onSubmit={handleSubmit} className="w-full max-w-xs">
      <Input
        onChange={handleChange}
        type="text"
        name="email"
        className="mb-4"
        placeholder="Email"
      />
      <Input
        onChange={handleChange}
        type="password"
        name="password"
        autoComplete="new-password"
        placeholder="Password"
        className="mb-4"
      />
      <small>
        Don't have an account?
        <Link to="/register" className="text-orange-600 ml-1 font-semibold">
          Sign in
        </Link>
      </small>
      <Button
        className="px-4 py-2 bg-orange-700 rounded-xl font-semibold uppercase text-sm block ml-auto tracking-wide"
        type="submit"
      >
        Sign in
      </Button>
    </Form>
  );
};

export default Login;
