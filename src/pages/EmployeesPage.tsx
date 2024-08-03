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
                <h1 className='pt-4 pb-4'>Employees</h1>
                <button onClick={handleAddClick} className="btn btn-primary">Add</button>
            </div>

            { data.length > 0 ? <Table data={data}></Table> : ''}  
        </>
    )
}