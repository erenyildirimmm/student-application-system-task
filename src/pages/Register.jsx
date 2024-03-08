import React, { useState } from "react";
import { Validator } from "../utils/Validator";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import Form from "../components/Form";
import Button from "../components/Button";

const Register = () => {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setRegisterData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validationCheck = (registerData) => {
    const { firstName, lastName, email, password, confirmPassword } =
      registerData;

    console.log(firstName, email);

    let allErrors = [];

    const firstNameValidations = Validator.validate(
      firstName,
      {
        required: true,
        minChar: 3,
        maxChar: 15,
      },
      "first name"
    );
    const lastNameValidations = Validator.validate(
      lastName,
      {
        required: true,
        minChar: 3,
        maxChar: 15,
      },
      "last name"
    );
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
    const confirmPasswordValidations = Validator.validate(
      confirmPassword,
      {
        required: true,
        equals: password,
      },
      "confirm password"
    );
    allErrors = [
      ...firstNameValidations.errors,
      ...lastNameValidations.errors,
      ...emailValidations.errors,
      ...passwordValidations.errors,
      ...confirmPasswordValidations.errors,
    ];

    return allErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validationCheck(registerData);

    if (errors.length > 0) {
      return enqueueSnackbar(errors[0], { variant: "error" });
    }

    navigate("/home");
    enqueueSnackbar("Sign up successful.", {
      variant: "success",
    });
  };
  return (
    <Form title="Sign up" onSubmit={handleSubmit} className="w-full max-w-xs">
      <Input
        onChange={handleChange}
        type="text"
        name="firstName"
        className="mb-4"
        placeholder="First name"
      />
      <Input
        onChange={handleChange}
        type="text"
        name="lastName"
        placeholder="Last name"
        className="mb-4"
      />
      <Input
        onChange={handleChange}
        type="text"
        name="email"
        placeholder="Email"
        className="mb-4"
      />
      <Input
        onChange={handleChange}
        type="password"
        name="password"
        autoComplete="new-password"
        placeholder="Password"
        className="mb-4"
      />
      <Input
        onChange={handleChange}
        type="password"
        name="confirmPassword"
        autoComplete="new-password"
        placeholder="Confirm Password"
        className="mb-4"
      />
      <small>
        Don't have an account?
        <Link to="/login" className="text-orange-600 ml-1 font-semibold">
          Sign in
        </Link>
      </small>
      <Button
        className="px-4 py-2 bg-orange-700 rounded-xl font-semibold uppercase text-sm block ml-auto tracking-wide"
        type="submit"
      >
        Sign up
      </Button>
    </Form>
  );
};

export default Register;
