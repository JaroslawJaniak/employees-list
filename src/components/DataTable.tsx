import { useState, useContext, useEffect } from "react";
import { Employee } from "../models/Employee";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { EmployeesContext } from "../context/EmployeesContext";
import { NavButton } from "./NavButton";

interface TableProps {
  data: Employee[];
  itemsPerPage: number;
}

export function Table({ data, itemsPerPage }: TableProps) {
  const context = useContext(EmployeesContext);
  const navigate = useNavigate();
  const [displayData, setDisplayData] = useState<Employee[]>(data);
  const [sortKey, setSortKey] = useState<null | keyof Employee>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc" | null>(
    null
  );

  //-------------------------------------------------------------------------------
  //const [currentPage, setCurrentPage] = useState(1);

  const pageCount = Math.ceil(data.length / itemsPerPage);

  const handlePageClick = (page: number) => {
    if (page < 1) page = 1;
    if (page > pageCount) page = pageCount;
    context?.setCurrentPage(page);
    console.log("current page: " + context?.currentPage);
    setDisplayData(data.slice((page - 1) * itemsPerPage, page * itemsPerPage));
  };
  //-------------------------------------------------------------------------------
  const { t } = useTranslation();

  useEffect(() => {
    setDisplayData(
      data.slice(
        (context?.currentPage - 1) * itemsPerPage,
        context?.currentPage * itemsPerPage
      )
    );
    return () => {};
  }, [itemsPerPage]);

  const handleSearchType = (event: React.KeyboardEvent) => {
    const input = event.target as HTMLInputElement;
    const phrase = input.value.toLowerCase();

    const d = data.filter((item) => {
      return (
        item.firstname.toLowerCase().includes(phrase) ||
        item.lastname.toLowerCase().includes(phrase) ||
        item.phonenumber.toString().includes(phrase)
      );
    });

    setDisplayData(d);
  };

  const getSortDirection = (key: keyof Employee): "asc" | "desc" | null => {
    if (key === sortKey) {
      if (sortDirection === null) {
        return "asc";
      } else if (sortDirection === "asc") {
        return "desc";
      } else {
        return null;
      }
    }

    return "asc";
  };

  const handleSort = (event: React.MouseEvent, key: keyof Employee) => {
    event.preventDefault();

    const tempSortDirection = getSortDirection(key);

    let sortedData;
    if (tempSortDirection === "asc") {
      sortedData = [...displayData].sort((a, b) => sortAsc(a, b, key));
    } else if (tempSortDirection === "desc") {
      sortedData = [...displayData].sort((a, b) => sortDesc(a, b, key));
    } else {
      sortedData = [...data];
    }

    setDisplayData(sortedData);
    setSortKey(key);
    setSortDirection(tempSortDirection);
  };

  const handleRowClick = (
    event: React.MouseEvent,
    selectedEmployee: Employee
  ): void => {
    event.preventDefault();
    context?.setEmployee(selectedEmployee);
    navigate("/details/" + selectedEmployee.id, { state: selectedEmployee });
  };

  const sortAsc = (a: Employee, b: Employee, key: keyof Employee): number => {
    if (a[key] > b[key]) {
      return 1;
    }

    if (a[key] < b[key]) {
      return -1;
    }

    return 0;
  };

  const sortDesc = (a: Employee, b: Employee, key: keyof Employee): number => {
    if (a[key] < b[key]) {
      return 1;
    }

    if (a[key] > b[key]) {
      return -1;
    }

    return 0;
  };

  const ascSvg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      width="24"
      height="24"
    >
      <path
        d="M7.75735 5.63605L6.34314 7.05026L12 12.7071L17.6569 7.05029L16.2427 5.63608L12 9.87872L7.75735 5.63605Z"
        fill="currentColor"
      />
      <path
        d="M6.34314 12.7071L7.75735 11.2929L12 15.5356L16.2427 11.2929L17.6569 12.7071L12 18.364L6.34314 12.7071Z"
        fill="currentColor"
      />
    </svg>
  );

  const descSvg = (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.6569 11.2929L16.2427 12.7071L12 8.46444L7.75735 12.7071L6.34314 11.2929L12 5.63605L17.6569 11.2929Z"
        fill="currentColor"
      />
      <path
        d="M17.6569 16.9497L16.2427 18.3639L12 14.1213L7.75735 18.364L6.34314 16.9498L12 11.2929L17.6569 16.9497Z"
        fill="currentColor"
      />
    </svg>
  );

  const renderSortSVG = (key: keyof Employee) => {
    if (sortKey !== key) {
      return "";
    }

    switch (sortDirection) {
      case "asc":
        return ascSvg;
      case "desc":
        return descSvg;
      default:
        return "";
    }
  };

  return (
    <>
      <div className=" pb-4 bg-white dark:bg-gray-900 text-sm">
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        <div className="relative mt-1">
          <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            id="table-search"
            className="block pt-1 pb-1 ps-10  text-gray-900 border border-gray-300 rounded w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
            onKeyUp={handleSearchType}
            placeholder={t("searchphrase")}
            type="text"
          />
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-lg mb-12 sm:mb-8 lg:mb-12">
        <table className="w-full text-xs text-center  dark:text-gray-400 border-collapse sm:table-fixed lg:text-base">
          <thead className=" text-white bg-gray-900 dark:bg-gray-700 dark:text-gray-400">
            <tr className="h-12  ">
              <th
                className="cursor-pointer "
                onClick={(event) => handleSort(event, "id")}
              >
                <div className="flex justify-center ">
                  {t("id")}
                  {renderSortSVG("id")}
                </div>
              </th>
              <th
                className="cursor-pointer "
                onClick={(event) => handleSort(event, "firstname")}
              >
                <div className="flex justify-center md:uppercase">
                  {t("firstname")}
                  {renderSortSVG("firstname")}
                </div>
              </th>
              <th
                className="cursor-pointer"
                onClick={(event) => handleSort(event, "lastname")}
              >
                <div className="flex justify-center md:uppercase">
                  {t("lastname")}
                  {renderSortSVG("lastname")}
                </div>
              </th>
              <th
                className="cursor-pointer  "
                onClick={(event) => handleSort(event, "salary")}
              >
                <div className="flex justify-center md:uppercase">
                  {t("salary")} {renderSortSVG("salary")}
                </div>
              </th>
              <th
                className="cursor-pointer "
                onClick={(event) => handleSort(event, "status")}
              >
                <div className="flex justify-center md:uppercase">
                  {t("status")} {renderSortSVG("status")}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {displayData.map((item) => (
              <tr
                key={item.id}
                className="cursor-pointer py-3 px-6 border-b border-neutral-200 hover:bg-neutral-100 hover:shadow-lg"
                onClick={(event) => handleRowClick(event, item)}
              >
                <td className="w-4 p-4">{item.id}</td>
                <td>{item.firstname}</td>
                <td>{item.lastname}</td>
                <td>{item.salary}</td>
                <td>{t("status_" + item.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mx-auto fixed w-full bottom-8 sm:bottom-0 md:bottom-8 right-0 ">
        <div className="mx-auto px-2 w-11/12 md:w-3/4 lg:w-1/4 flex justify-between bg-white">
          <button
            onClick={() => handlePageClick(context?.currentPage - 1)}
            disabled={context?.currentPage === 1}
            className="  text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300 font-medium rounded text-sm w-16 h-8   py-1.5 me-2 mb-2  dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            <svg
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="inline-block"
            >
              <path
                d="M16.2426 6.34317L14.8284 4.92896L7.75739 12L14.8285 19.0711L16.2427 17.6569L10.5858 12L16.2426 6.34317Z"
                fill="currentColor"
              />
            </svg>
          </button>
          <span>
            {t("page")} {""}
            {context?.currentPage} {t("of")} {pageCount}{" "}
          </span>
          <button
            onClick={() => handlePageClick(context?.currentPage + 1)}
            disabled={context?.currentPage === pageCount}
            className="  text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300 font-medium rounded text-sm w-16 h-8   py-1.0 me-2 mb-2  dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            <svg
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="inline-block"
            >
              <path
                d="M10.5858 6.34317L12 4.92896L19.0711 12L12 19.0711L10.5858 17.6569L16.2427 12L10.5858 6.34317Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
