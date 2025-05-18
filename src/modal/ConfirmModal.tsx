/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from "react";
import { useDeleteTodoMutation } from "../app/features/todos/todosSlice";
import toast from "react-hot-toast";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  id: string;
}

const ConfirmModal = ({ isOpen, onClose, id }: IProps) => {
  const [deleteTodo, { isLoading }] = useDeleteTodoMutation();

  useEffect(() => {
    const dialog = document.getElementById("my_modal_1") as HTMLDialogElement;
    if (isOpen) {
      dialog?.showModal();
    } else {
      dialog?.close();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const onConfirm = async () => {
    try {
      await deleteTodo(id).unwrap();
      toast.success("Todo deleted successfully!");
      onClose();
    } catch (error) {
      toast.error("Failed to delete todo");
    }
  };

  return (
    <>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">
            Are you sure you want to delete this todo?
          </h3>
          <div className="flex justify-between gap-4">
            <button
              className="btn btn-soft btn-primary"
              onClick={onClose}
              disabled={isLoading}
            >
              cancel
            </button>
            <button
              className="btn btn-soft btn-error"
              onClick={onConfirm}
              disabled={isLoading}
            >
              {isLoading ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ConfirmModal;
