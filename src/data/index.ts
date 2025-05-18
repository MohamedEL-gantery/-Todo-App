import type { ILoginInput, IRegisterInput } from "../interface";

export const Register_Form: IRegisterInput[] = [
  {
    label: "Name",
    name: "name",
    placeholder: "Enter Your Name",
    type: "text",
  },
  {
    label: "Email",
    name: "email",
    placeholder: "Enter Your Email",
    type: "email",
  },
  {
    label: "Password",
    name: "password",
    placeholder: "Enter Your Password",
    type: "password",
  },
  {
    label: "Confirm Password",
    name: "passwordConform",
    placeholder: "Confirm Your Password",
    type: "password",
  },
] as const;

export const Login_Form: ILoginInput[] = [
  {
    label: "Email",
    name: "email",
    placeholder: "Enter Your Email",
    type: "email",
  },
  {
    label: "Password",
    name: "password",
    placeholder: "Enter Your Password",
    type: "password",
  },
] as const;
