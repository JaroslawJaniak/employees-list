import React, { useEffect, useState, useContext } from "react";
import { Table } from "../components/DataTable";
import { Employee } from "../models/Employee";
import { useNavigate } from "react-router-dom";
import { fetchDataEmployees } from "../services/API";
import { Loader } from "../components/Loader";
import { EmployeesContext } from "../context/EmployeesContext";
import { useTranslation } from "react-i18next";

export function EmployeesPage() {
  const context = useContext(EmployeesContext);
  const navigate = useNavigate();
  const [data, setData] = useState<Employee[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    // getAllEmployees().then((employees) => {
    //   setData(employees);
    //   context?.setEmployees(employees);
    // });

    fetchDataEmployees().then((data) => {
      setData(data);
      context?.setEmployees(data);
    });
  }, []);

  const handleAddClick = (event: React.MouseEvent): void => {
    event.preventDefault();
    navigate("/add");
  };

  return (
    <>
      {data.length > 0 ? (
        <>
          {" "}
          <div className="grid grid-cols-12 mt-20">
            <button
              onClick={handleAddClick}
              className="col-start-7 sm:col-start-10  sm:mb-12  text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300 font-medium font-fantasy rounded text-sm px-5 py-2.5  mb-2 w-48 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              {t("add")}
            </button>
          </div>
          <Table data={data}></Table>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}
