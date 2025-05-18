import { useState } from "react";
import TodoList from "./TodoList";
import TodoModal from "../../modal/TodoModal";
import { useGetTodosQuery } from "../../app/features/todos/todosSlice";
import type { ITodo } from "../../interface";

const Todo = () => {
  const { data, isLoading } = useGetTodosQuery({});
  const [activeFilter, setActiveFilter] = useState<
    "done" | "in progress" | "all"
  >("all");

  const [isModalOpen, setIsModalOpen] = useState({
    isOpen: false,
    mode: "",
  });

  const filteredTodos =
    data?.data?.docs.filter((todo: ITodo) => {
      if (activeFilter === "all") return true;
      return todo.status === activeFilter;
    }) || [];

  return (
    <>
      <div className="flex flex-col gap-4 justify-center ">
        <div role="tablist" className="tabs tabs-border">
          <a
            role="tab"
            className={`tab ${activeFilter === "all" ? "tab-active" : ""}`}
            onClick={() => setActiveFilter("all")}
          >
            All Todos
          </a>
          <a
            role="tab"
            className={`tab ${activeFilter === "done" ? "tab-active" : ""}`}
            onClick={() => setActiveFilter("done")}
          >
            Done Todos
          </a>
          <a
            role="tab"
            className={`tab ${
              activeFilter === "in progress" ? "tab-active" : ""
            }`}
            onClick={() => setActiveFilter("in progress")}
          >
            in Progress Todos
          </a>
        </div>
        <div className="flex flex-row  justify-between">
          <p
            style={{
              color: "#ffffffd9",
            }}
          >
            Your tasks will appear here
          </p>
          <button
            className="btn btn-soft btn-primary"
            onClick={() => setIsModalOpen({ mode: "add", isOpen: true })}
          >
            Add New Todo
          </button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center">
            <span className="loading loading-dots loading-xl"></span>
            loading...
          </div>
        ) : (
          <TodoList todos={filteredTodos} />
        )}
      </div>
      <TodoModal
        isOpen={isModalOpen.isOpen}
        mode={isModalOpen.mode}
        onClose={() => setIsModalOpen({ mode: "", isOpen: false })}
      />
    </>
  );
};

export default Todo;
