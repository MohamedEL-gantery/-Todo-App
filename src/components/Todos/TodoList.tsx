import { useState } from "react";
import { RiTodoLine } from "react-icons/ri";
import TodoModal from "../../modal/TodoModal";
import type { ITodo } from "../../interface";
import React from "react";
import ConfirmModal from "../../modal/ConfirmModal";
import noDataImage from "../../assets/no-saved-image.png";

interface Iprops {
  todos: ITodo[];
}

const TodoList = ({ todos }: Iprops) => {
  const [isModalOpen, setIsModalOpen] = useState({
    isOpen: false,
    mode: "",
    id: "",
  });
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState({
    isOpen: false,
    id: "",
  });

  if (!todos || todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <img
          src={noDataImage}
          alt="No todos found"
          className="w-64 h-64 mb-4"
        />
        <h3 className="text-xl font-semibold ">No todos found</h3>
        <p>Start by adding your first todo!</p>
      </div>
    );
  }

  return (
    <>
      {todos.map((todo: ITodo) => (
        <React.Fragment key={todo._id}>
          <ul
            className="list rounded-box shadow-md"
            style={{
              backgroundColor: "#1e202e",
            }}
          >
            <li className="list-row">
              <div>
                <RiTodoLine size={30} />
              </div>
              <div
                key={todo._id}
                className="text-xs uppercase font-semibold"
                style={{
                  color: "#ffffffd9",
                }}
              >
                {todo.title}
              </div>

              <button
                className="btn btn-soft btn-primary"
                onClick={() =>
                  setIsModalOpen({
                    mode: "edit",
                    isOpen: true,
                    id: todo._id,
                  })
                }
              >
                Edit
              </button>
              <button
                className="btn btn-soft btn-error"
                onClick={() =>
                  setIsConfirmModalOpen({ id: todo._id, isOpen: true })
                }
              >
                Delete
              </button>
            </li>
          </ul>
          <TodoModal
            isOpen={isModalOpen.isOpen}
            mode={isModalOpen.mode}
            onClose={() => setIsModalOpen({ mode: "", isOpen: false, id: "" })}
            id={isModalOpen.id}
          />
          <ConfirmModal
            isOpen={isConfirmModalOpen.isOpen}
            onClose={() => {
              setIsConfirmModalOpen({ id: "", isOpen: false });
            }}
            id={isConfirmModalOpen.id}
          />
        </React.Fragment>
      ))}
    </>
  );
};

export default TodoList;
