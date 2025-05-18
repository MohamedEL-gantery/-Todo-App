import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import AuthButtons from "./AuthButtons";
import { useGetTodosQuery } from "../../app/features/todos/todosSlice";
import type { ITodo } from "../../interface";

interface UserData {
  name: string;
  email: string;
  id: string;
  accessToken: string;
}

const Home = () => {
  const { data, isLoading } = useGetTodosQuery({});

  const [userData, setUserData] = useState<UserData | null>(null);
  const currentTime = new Date();

  useEffect(() => {
    const userDataString = Cookies.get("user");
    if (userDataString) {
      const parsedData = JSON.parse(userDataString) as UserData;
      setUserData(parsedData);
    }
  }, []);

  // Format date
  const formattedDate = currentTime.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <div className="px-6 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Todo App</h1>
          <p className="text-lg mb-8">Your personal task management solution</p>
        </div>

        <div className="mt-6 border-t border-gray-200 pt-6">
          <div className="text-center">
            <p className="text-lg">{formattedDate}</p>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          {userData ? (
            <>
              <div className="text-center">
                <h2 className="text-2xl mb-2">Welcome back, {userData.name}</h2>
              </div>
              <div className="flex justify-center items-center gap-6 mt-4">
                <div className="stats  border-base-300 border">
                  <div className="stat">
                    <div className="stat-title" style={{ color: "#7263d8" }}>
                      Tasks
                    </div>
                    <div className="stat-value">
                      {isLoading ? (
                        <span className="loading loading-ring loading-xs"></span>
                      ) : (
                        data?.data?.total
                      )}
                    </div>
                  </div>

                  <div className="stat">
                    <div className="stat-title " style={{ color: "#7263d8" }}>
                      Done
                    </div>
                    <div className="stat-value">
                      {isLoading ? (
                        <span className="loading loading-ring loading-xs"></span>
                      ) : (
                        data?.data?.docs.filter(
                          (todo: ITodo) => todo.status === "done"
                        ).length
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <AuthButtons />
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
