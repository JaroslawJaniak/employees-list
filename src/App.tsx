import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { EmployeesPage } from './pages/EmployeesPage'
import { DetailsPage } from './pages/DetailsPage';
import { AddPage } from './pages/AddPage';
import { EditPage } from './pages/EditPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <EmployeesPage />
  },
  {
    path: '/details/:id',
    element: <DetailsPage />
  },
  {
    path: '/add',
    element: <AddPage />
  },
  {
    path: '/edit',
    element: <EditPage />
  }
]);

function App() {
  return (
    <>
      <main className='bg-white p-4 h-screen'>
        <RouterProvider router={router} />
      </main>
    </>
  )
}

export default App
