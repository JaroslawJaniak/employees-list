import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { EmployeesPage } from "./pages/EmployeesPage";
import { DetailsPage } from "./pages/DetailsPage";
import { AddPage } from "./pages/AddPage";
import { EditPage } from "./pages/EditPage";
import { BackButton } from "./components/ButtonBack";
import { LanguageSelector } from "./components/LanguageSelector";
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
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
