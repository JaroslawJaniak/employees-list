import { useNavigate } from "react-router-dom";
import { createEmployee } from "../services/API";
import { STATUS_OPTIONS, StatusOption } from "../models/StatusOption";
import { useState } from "react";
import { SelectStatus } from "../components/SelectStatus";

export function AddPage() {
  const navigate = useNavigate();
  const [statusOptions] = useState<StatusOption[]>(STATUS_OPTIONS);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const data: any = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });

    createEmployee(data).then(() => {
      navigate("/");
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mx-6 ">
      <h1 className="pt-4 pb-4">Add Employee</h1>
      <hr className="my-5" />
      <div className="lg:grid grid-cols-3 mb-3 [&>*]:mb-4">
        <div className="col ">
          <label htmlFor="firstname" className="form-label">
            Firstname
          </label>
          <input
            className="block pt-1 pb-1 ps-10 mb-3 text-gray-900 border border-gray-300 rounded w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
            type="text"
            name="firstname"
            required
          />
        </div>
        <div className="col">
          <label htmlFor="lastname" className="form-label">
            Lastname
          </label>
          <input
            className="block pt-1 pb-1 ps-10  text-gray-900 border border-gray-300 rounded w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
            type="text"
            name="lastname"
            required
          />
        </div>
      </div>

      <div className="lg:grid grid-cols-3 mb-3 [&>*]:mb-4">
        <div className="col">
          <label htmlFor="birthdate" className="form-label">
            Birthdate
          </label>
          <input
            className="block pt-1 pb-1 ps-10  text-gray-900 border border-gray-300 rounded w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
            type="date"
            name="birthdate"
            required
          />
        </div>
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="phonenumber" className="form-label">
              Phonenumber
            </label>
            <input
              className="block pt-1 pb-1 ps-10  text-gray-900 border border-gray-300 rounded w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
              type="text"
              name="phonenumber"
              required
            />
          </div>
        </div>
      </div>
      <hr className="my-5" />
      <div className="lg:grid grid-cols-3 mb-3 [&>*]:mb-4">
        <div className="col">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="block pt-1 pb-1 ps-10  text-gray-900 border border-gray-300 rounded w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
            name="address"
            required
          />
        </div>
        <div className="col">
          <label htmlFor="city" className="form-label">
            City
          </label>
          <input
            type="text"
            className="block pt-1 pb-1 ps-10  text-gray-900 border border-gray-300 rounded w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
            name="city"
            required
          />
        </div>
        <div className="col">
          <label htmlFor="postalcode" className="form-label">
            Postal Code
          </label>
          <input
            type="text"
            className="block pt-1 pb-1 ps-10  text-gray-900 border border-gray-300 rounded w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
            name="postalcode"
            required
          />
        </div>
      </div>
      <hr className="my-5" />
      <div className="lg:grid grid-cols-3 w-100 [&>*]:mb-4">
        <div className="col">
          <label htmlFor="status" className="form-label">
            Status
          </label>
          <SelectStatus name="status"></SelectStatus>
        </div>
        <div className="col">
          <label htmlFor="salary" className="form-label">
            Salary
          </label>
          <input
            type="text"
            className="block pt-1 pb-1 ps-10  text-gray-900 border border-gray-300 rounded w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
            name="salary"
            required
          />
        </div>
      </div>
      <hr className="my-5" />
      <div className="grid grid-cols-6 gap-4">
        <button
          className="col-start-5 md:col-start-7 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300 font-medium rounded text-sm px-5 py-2.5  mb-2 w-24 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          type="submit"
        >
          Add
        </button>
      </div>
    </form>
  );
}
