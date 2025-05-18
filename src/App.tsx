import { RouterProvider } from "react-router";
import { Toaster } from "react-hot-toast";

import router from "./router";

function App() {
  return (
    <main>
      <RouterProvider router={router} />
      <Toaster />
    </main>
  );
}

export default App;
