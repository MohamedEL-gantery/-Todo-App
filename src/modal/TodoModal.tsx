/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import { useEffect } from "react";
import {
  useAddTodoMutation,
  useGetOneTodoQuery,
  useUpdateTodoMutation,
} from "../app/features/todos/todosSlice";

const schema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  status: yup.string().required("Status is required"),
});

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  mode: string;
  id?: string;
}

type FormValues = yup.InferType<typeof schema>;
const TodoModal = ({ isOpen, onClose, mode, id }: IProps) => {
  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();

  const { data, isLoading } = useGetOneTodoQuery(id, {
    skip: !id || mode !== "edit",
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      status: "in progress",
    },
  });

  useEffect(() => {
    const dialog = document.getElementById("my_modal_1") as HTMLDialogElement;
    if (isOpen) {
      dialog?.showModal();
    } else {
      dialog?.close();
      reset();
    }
  }, [isOpen, reset]);

  // Separate useEffect for handling data population
  useEffect(() => {
    if (data?.data && mode === "edit" && id) {
      setValue("title", data.data.title);
      setValue("description", data.data.description);
      setValue("status", data.data.status);
    }
  }, [data, mode, setValue, id]);

  const onSubmit = async (value: FormValues) => {
    try {
      if (mode === "edit" && id) {
        await updateTodo({ id, todo: value }).unwrap();
        toast.success("Todo updated successfully!");
      } else {
        await addTodo(value).unwrap();
        toast.success("Todo added successfully!");
      }
      onClose();
      reset();
    } catch (error) {
      toast.error(
        mode === "edit" ? "Failed to update todo" : "Failed to add todo"
      );
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">
            {mode === "edit" ? "Edit Todo" : "Add Todo"}
          </h3>
          {isLoading && mode === "edit" ? (
            <div className="flex justify-center items-center py-4">
              <span className="loading loading-spinner loading-md"></span>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex flex-col w-full">
                <label htmlFor="Title" className="mb-1">
                  Title
                </label>
                <input
                  id={"Title"}
                  type={"text"}
                  placeholder={"Enter Your Title"}
                  {...register("title")}
                  className={`border-[1px] ${
                    errors.title?.message ? "border-red-500" : "border-gray-300"
                  } shadow-lg focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-lg px-3 py-3 text-md w-full bg-transparent `}
                />
                <p className="text-red-500 text-sm mt-1">
                  {errors.title?.message}
                </p>
              </div>

              <div className="flex flex-col w-full">
                <label htmlFor="Description" className="mb-1">
                  Description
                </label>
                <textarea
                  id={"Description"}
                  placeholder={"Enter Your Description"}
                  {...register("description")}
                  className={`border-[1px] ${
                    errors.description?.message
                      ? "border-red-500"
                      : "border-gray-300"
                  } shadow-lg focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-lg px-3 py-3 text-md w-full bg-transparent `}
                />
                <p className="text-red-500 text-sm mt-1">
                  {errors.description?.message}
                </p>
              </div>

              <div className="flex flex-col w-full">
                <label htmlFor="Status" className="mb-1">
                  Status
                </label>
                <select
                  id={"Status"}
                  {...register("status")}
                  className={`border-[1px] ${
                    errors.status?.message
                      ? "border-red-500"
                      : "border-gray-300"
                  } shadow-lg focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-lg px-3 py-3 text-md w-full bg-transparent `}
                >
                  <option
                    value="in progress"
                    style={{
                      backgroundColor: "#1e202e",
                    }}
                  >
                    In Progress
                  </option>
                  <option
                    value="done"
                    style={{
                      backgroundColor: "#1e202e",
                    }}
                  >
                    Done
                  </option>
                </select>

                <p className="text-red-500 text-sm mt-1">
                  {errors.status?.message}
                </p>
              </div>

              <div className="modal-action">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={onClose}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? "Saving..."
                    : mode === "edit"
                    ? "Update"
                    : "Add Todo"}
                </button>
              </div>
            </form>
          )}
        </div>
      </dialog>
    </>
  );
};

export default TodoModal;
