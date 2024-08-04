import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Employee } from "../models/Employee";
import { useEffect, useState } from "react";
import { getEmployee } from "../services/API";

export function DetailsPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();
    const [data, setData] = useState<Employee>(location.state)

    useEffect(() => {
        console.log(data, id);
        if (!data && id) {
            getEmployee(id).then(employee => {
                setData(employee);
            });
        } 
    }, []);

    const handleEditClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        event.preventDefault();

        navigate('/edit' +data.id, { state: data });
    }

    return (
      <>
        <h1 className="uppercase">Detaile Page</h1>

        {data ? (
          <section>
            <div className="grid-cols-3 md:grid md:grid-cols-2 mb-3 ">
              <div className="col">
                <label htmlFor="firstname" className="form-label">
                  Firstname
                </label>
                <input
                  className="block pt-1 pb-1 ps-10  text-gray-900 border border-gray-300 rounded w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                  type="text"
                  id="firstname"
                  value={data.firstname}
                  readOnly
                />
              </div>
              <div className="col">
                <label htmlFor="lastname" className="form-label">
                  Lastname
                </label>
                <input
                  className="block pt-1 pb-1 ps-10  text-gray-900 border border-gray-300 rounded w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                  type="text"
                  id="lastname"
                  value={data.lastname}
                  readOnly
                />
              </div>
              <div className="col">
                <label htmlFor="birthdate" className="form-label">
                  Birthdate
                </label>
                <input
                  className="block pt-1 pb-1 ps-10  text-gray-900 border border-gray-300 rounded w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                  type="text"
                  id="birthdate"
                  value={data.birthdate.toDateString()}
                  readOnly
                />
              </div>
            </div>
            <div className="grid-cols-3 md:grid md:grid-cols-2 mb-3 ">
              <div className="col">
                <label htmlFor="id" className="form-label">
                  ID
                </label>
                <input
                  type="text"
                  className="block pt-1 pb-1 ps-10 mb-3 text-gray-900 border border-gray-300 rounded w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                  id="id"
                  value={data.id}
                  readOnly
                />
              </div>
              <div className="col">
                <label htmlFor="phonenumber" className="form-label">
                  Phonenumber
                </label>
                <input
                  className="block pt-1 pb-1 ps-10  text-gray-900 border border-gray-300 rounded w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                  type="text"
                  id="phonenumber"
                  value={data.phonenumber}
                  readOnly
                />
              </div>
            </div>
            <div className="grid-cols-3 md:grid md:grid-cols-2 mb-3 ">
              <div className="col">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  className="block pt-1 pb-1 ps-10  text-gray-900 border border-gray-300 rounded w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                  id="address"
                  value={data.address}
                  readOnly
                />
              </div>
              <div className="col">
                <label htmlFor="city" className="form-label">
                  City
                </label>
                <input
                  type="text"
                  className="block pt-1 pb-1 ps-10  text-gray-900 border border-gray-300 rounded w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                  id="city"
                  value={data.city}
                  readOnly
                />
              </div>
              <div className="col">
                <label htmlFor="postalcode" className="form-label">
                  Postal Code
                </label>
                <input
                  type="text"
                  className="block pt-1 pb-1 ps-10  text-gray-900 border border-gray-300 rounded w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                  id="postalcode"
                  value={data.postalcode}
                  readOnly
                />
              </div>
            </div>
            <div className=" grid-cols-3 md:grid md:grid-cols-2 mb-3 ">
              <div className="col">
                <label htmlFor="status" className="form-label">
                  Status
                </label>
                <input
                  type="text"
                  className="block pt-1 pb-1 ps-10  text-gray-900 border border-gray-300 rounded w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                  id="status"
                  value={data.status}
                  readOnly
                />
              </div>
              <div className="col">
                <label htmlFor="salary" className="form-label">
                  Salary
                </label>
                <input
                  type="text"
                  className="block pt-1 pb-1 ps-10  text-gray-900 border border-gray-300 rounded w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                  id="salary"
                  value={data.salary}
                  readOnly
                />
              </div>
            </div>
            <div className="grid grid-cols-6 gap-4">
              <button
                onClick={handleEditClick}
                className="col-start-5 md:col-start-6 lg:col-start-7 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300 font-medium rounded text-sm px-5 py-2.5  mb-2 w-24 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              >
                Edit
              </button>
            </div>
          </section>
        ) : (
          ""
        )}
      </>
    );
}