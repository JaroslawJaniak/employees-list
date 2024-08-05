import { useState } from "react";
import { Employee } from "../models/Employee";
import { useNavigate } from "react-router-dom";

interface TableProps {
  data: Employee[];
}

export function Table({ data }: TableProps) {
  const navigate = useNavigate();
  const [displayData, setDisplayData] = useState<Employee[]>(data);
  const [sortKey, setSortKey] = useState<null | keyof Employee>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc" | null>(
    null
  );

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
            placeholder="Wyszukiwana fraza..."
            type="text"
          />
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-lg mb-12 sm:mb-8 lg:mb-12">
        <table className="w-full text-xs text-center text-gray-500 dark:text-gray-400 border-collapse table-fixed">
          <thead className=" text-white bg-neutral-800 dark:bg-gray-700 dark:text-gray-400">
            <tr className="h-12">
              <th
                className="cursor-pointer "
                onClick={(event) => handleSort(event, "id")}
              >
                <div className="flex justify-center">
                  {" "}
                  ID {renderSortSVG("id")}
                </div>
              </th>
              <th
                className="cursor-pointer "
                onClick={(event) => handleSort(event, "firstname")}
              >
                <div className="flex justify-center">
                  Firstname{renderSortSVG("firstname")}
                </div>
              </th>
              <th
                className="cursor-pointer"
                onClick={(event) => handleSort(event, "lastname")}
              >
                <div className="flex justify-center">
                  Lastname{renderSortSVG("lastname")}
                </div>
              </th>
              <th
                className="cursor-pointer  "
                onClick={(event) => handleSort(event, "salary")}
              >
                <div className="flex justify-center">
                  Salary {renderSortSVG("salary")}
                </div>
              </th>
              <th
                className="cursor-pointer "
                onClick={(event) => handleSort(event, "status")}
              >
                <div className="flex justify-center">
                  Status {renderSortSVG("status")}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {displayData.map((item) => (
              <tr
                key={item.id}
                className="cursor-pointer py-3 px-6 border-b border-neutral-200 hover:bg-neutral-100"
                onClick={(event) => handleRowClick(event, item)}
              >
                <td className="w-4 p-4">{item.id}</td>
                <td>{item.firstname}</td>
                <td>{item.lastname}</td>
                <td>{item.salary}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
