import React, { useEffect, useState } from "react";
import { Table } from "../components/Table";
import { Employee } from "../models/Employee";
import { useNavigate } from "react-router-dom";
import { getAllEmployees } from "../services/API";

export function EmployeesPage() {
    const navigate = useNavigate();
    const [data, setData] = useState<Employee[]>([]);

      useEffect(() => {
        getAllEmployees().then(employees => {
            setData(employees);
        });
      }, []);


      const handleAddClick = (event: React.MouseEvent): void => {
        event.preventDefault();
        navigate('/add');
      }

    return (
      <>
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="uppercase">Employees</h1>
          <div className="grid grid-cols-6 gap-4">
            <button
              onClick={handleAddClick}
              className="col-start-6 col-end-7 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300 font-medium rounded text-sm px-5 py-2.5  mb-2 w-24 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              Add
            </button>
          </div>
        </div>

        {data.length > 0 ? <Table data={data}></Table> : ""}
      </>
    );
}