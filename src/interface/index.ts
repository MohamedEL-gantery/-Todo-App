export interface IRegisterInput {
  label: "Name" | "Email" | "Password" | "Confirm Password";
  name: "email" | "password" | "name" | "passwordConform";
  placeholder: string;
  type: string;
}

export interface ILoginInput {
  label: "Email" | "Password";
  name: "email" | "password";
  placeholder: string;
  type: string;
}

export interface ITodo {
  _id: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}
