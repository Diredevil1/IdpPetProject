import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Molecules/Login/Login";
import Register from "./Organisms/Register/Register";
import Layout from "./Organisms/Layout/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/layout",
    element: <Layout />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
