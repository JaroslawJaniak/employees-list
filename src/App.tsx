import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { EmployeesPage } from "./pages/EmployeesPage";
import { DetailsPage } from "./pages/DetailsPage";
import { AddPage } from "./pages/AddPage";
import { EditPage } from "./pages/EditPage";
import { BackButton } from "./components/BackButton";
import { LanguageSelector } from "./components/LanguageSelector";



const router = createBrowserRouter([
  {
    path: "/",
    element: <EmployeesPage />,
  },
  {
    path: "/details/:id",
    element: <DetailsPage />,
  },
  {
    path: "/add",
    element: <AddPage />,
  },
  {
    path: "/edit/:id",
    element: <EditPage />,
  },
]);

function App() {
  return (
    <>
      <main className="bg-white p-2 h-screen relative">
        <nav className=" p-3 fixed md:static ">
          <div className="grid grid-cols-2 ">
            <BackButton />
            <LanguageSelector />
          </div>
        </nav>
        <div className="mt-12">
          <RouterProvider router={router} />
        </div>
      </main>
    </>
  );
}

export default App;
