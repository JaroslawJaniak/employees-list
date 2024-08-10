import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { EmployeesPage } from "./pages/EmployeesPage";
import { DetailsPage } from "./pages/DetailsPage";
import { AddPage } from "./pages/AddPage";
import { EditPage } from "./pages/EditPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Main } from "./components/Main";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Main>
        <EmployeesPage />
      </Main>
    ),
  },
  {
    path: "/details/:id",
    element: (
      <Main>
        <DetailsPage />
      </Main>
    ),
  },
  {
    path: "/add",
    element: (
      <Main>
        <AddPage />
      </Main>
    ),
  },
  {
    path: "/edit/:id",
    element: (
      <Main>
        <EditPage />
      </Main>
    ),
  },
]);

function App() {
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
