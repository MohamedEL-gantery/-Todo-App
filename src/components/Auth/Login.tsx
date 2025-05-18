import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Login_Form } from "../../data";
import toast from "react-hot-toast";
import axiosInstance from "../../config/axios.config";
import Cookies from "js-cookie";

const schema = yup.object({
  email: yup.string().email().required("Email is required"),
  password: yup.string().min(6).max(30).required("Password is required"),
});

type FormValues = yup.InferType<typeof schema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (value: FormValues) => {
    try {
      const { data } = await axiosInstance.post("/auths/login", value);
      if (data.status === "success") {
        const user = {
          id: data.user._id,
          email: data.user.email,
          name: data.user.name,
          accessToken: data.accessToken,
        };

        Cookies.set("user", JSON.stringify(user));

        window.location.href = "/";
      } else {
        toast.error(data.message || "Something went wrong");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // Handle network/server errors
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {Login_Form.map((item) => (
        <div className="flex flex-col w-full" key={item.name}>
          <label htmlFor={item.name} className="mb-1">
            {item.label}
          </label>
          <input
            id={item.name}
            type={item.type}
            placeholder={item.placeholder}
            {...register(item.name)}
            className={`border-[1px] ${
              errors[item.name]?.message ? "border-red-500" : "border-gray-300"
            } shadow-lg focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-lg px-3 py-3 text-md w-full bg-transparent `}
          />
          <p className="text-red-500 text-sm mt-1">
            {errors[item.name]?.message}
          </p>
        </div>
      ))}
      <button
        type="submit"
        className="w-full py-2 px-4 rounded-lg"
        style={{
          backgroundColor: "#7263d8",
        }}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Loading..." : "Login"}
      </button>
    </form>
  );
};

export default Login;
