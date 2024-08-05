import { useLocation, useNavigate, useParams } from "react-router-dom";
import { editEmployee, getEmployee } from "../services/API";
import { STATUS_OPTIONS, StatusOption } from "../models/StatusOption";
import { useEffect, useState } from "react";
import { Employee, EmployeeStatus } from "../models/Employee";
import { StatusSelect } from "../components/StatusSelect";

export function EditPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const [data, setData] = useState<Employee>(location.state);
  const [statusOptions] = useState<StatusOption[]>(STATUS_OPTIONS);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phonenumber, setPhonenumber] = useState<number | null>(null);
  const [birthdate, setBirthdate] = useState<Date | null>(null);
  const [salary, setSalary] = useState<number | null>(null);
  const [status, setStatus] = useState<EmployeeStatus>("ON_LEAVE");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalcode, setPostalcode] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (!data && !!id) {
      // Zaladuj dane z API
      getEmployee(id).then((employee) => {
        setData(employee);
        setFormState(employee);
        checkValidity();
      });
    } else {
      setFormState(data);
      checkValidity();
    }
  }, [data, id]);

  const setFormState = (data: Omit<Employee, "id">): void => {
    setFirstname(data.firstname);
    setLastname(data.lastname);
    setPhonenumber(data.phonenumber);
    setBirthdate(data.birthdate);
    setSalary(data.salary);
    setStatus(data.status);
    setAddress(data.address);
    setCity(data.city);
    setPostalcode(data.postalcode);
  };

  const checkValidity = (): void => {
    const form = document.querySelector<HTMLFormElement>("#edit-form");
    if (form) {
      setIsFormValid(form.checkValidity());
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const employee: Employee = {
      id: data.id,
      firstname,
      lastname,
      phonenumber,
      birthdate,
      salary,
      status,
      address,
      city,
      postalcode,
    };

    editEmployee(employee).then(() => {
      navigate("/");
    });
  };

  const formatDate = (date: Date): string => {
    if (date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day =
        String(date.getDate()).length > 1
          ? String(date.getDate())
          : "0" + date.getDate();

      return `${year}-${month}-${day}`;
    }

    return "";
  };

  return (
    <form onSubmit={handleSubmit} id="edit-form ">
      {data ? (
        <section className="lg:mx-6 ">
          <div className="sm:grid grid-cols-3 [&>*]:mb-4">
            <div className="">
              <label htmlFor="firstname" className="form-label">
                Firstname
              </label>
              <input
                value={firstname}
                onChange={(event) => {
                  setFirstname(event.target.value);
                  checkValidity();
                }}
                className="block pt-1 pb-1 ps-10 mb-3 sm:mb-2 lg:mb-3 text-gray-900 border border-gray-300 rounded w-96 sm:w-64 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                type="text"
                name="firstname"
                required
              />
            </div>
            <div className="">
              <label htmlFor="lastname" className="form-label">
                Lastname
              </label>
              <input
                value={lastname}
                onChange={(event) => {
                  setLastname(event?.target.value);
                  checkValidity();
                }}
                className="block pt-1 pb-1 ps-10 mb-3 sm:mb-2 lg:mb-3 text-gray-900 border border-gray-300 rounded w-96 sm:w-64 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                type="text"
                name="lastname"
                required
              />
            </div>
          </div>
          <div className="sm:grid grid-cols-3 [&>*]:mb-4">
            <div className="">
              <label htmlFor="birthdate" className="form-label">
                Birthdate
              </label>
              <input
                value={formatDate(birthdate)}
                onChange={(event) => {
                  setBirthdate(new Date(event.target.value));
                  checkValidity();
                }}
                className="block pt-1 pb-1 ps-10 mb-3 sm:mb-2 lg:mb-3 text-gray-900 border border-gray-300 rounded w-96 sm:w-64 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                type="date"
                name="birthdate"
                required
              />
            </div>
            <div className="">
              <label htmlFor="phonenumber" className="form-label">
                Phonenumber
              </label>
              <input
                value={phonenumber}
                onChange={(event) => {
                  setPhonenumber(+event.target.value);
                  checkValidity();
                }}
                className="block pt-1 pb-1 ps-10 mb-3 sm:mb-2 lg:mb-3 text-gray-900 border border-gray-300 rounded w-96 sm:w-64 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                type="text"
                name="phonenumber"
                required
              />
            </div>
          </div>
          <div className="sm:grid grid-cols-3 mb-3 sm:mb-2 lg:mb-3 ">
            <div className="">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input
                value={address}
                onChange={(event) => {
                  setAddress(event.target.value);
                  checkValidity();
                }}
                type="text"
                className="block pt-1 pb-1 ps-10 mb-3 sm:mb-2 lg:mb-3 text-gray-900 border border-gray-300 rounded w-96 sm:w-64 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                name="address"
                required
              />
            </div>
            <div className="">
              <label htmlFor="city" className="form-label">
                City
              </label>
              <input
                value={city}
                onChange={(event) => {
                  setCity(event.target.value);
                  checkValidity();
                }}
                type="text"
                className="block pt-1 pb-1 ps-10 mb-3 sm:mb-2 lg:mb-3 text-gray-900 border border-gray-300 rounded w-96 sm:w-64 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                name="city"
                required
              />
            </div>
            <div className="">
              <label htmlFor="postalcode" className="form-label">
                Postal Code
              </label>
              <input
                value={postalcode}
                onChange={(event) => {
                  setPostalcode(event.target.value);
                  checkValidity();
                }}
                type="text"
                className="block pt-1 pb-1 ps-10 mb-3 sm:mb-2 lg:mb-3 text-gray-900 border border-gray-300 rounded w-96 sm:w-64  bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                name="postalcode"
                required
              />
            </div>
          </div>
          <div className="sm:grid grid-cols-3 mb-3 sm:mb-2 lg:mb-3">
            <div className="">
              <label htmlFor="salary" className="form-label">
                Salary
              </label>
              <input
                value={salary?.toString()}
                onChange={(event) => setSalary(+event.target.value)}
                type="text"
                className="block pt-1 pb-1 ps-10 mb-3 sm:mb-2 lg:mb-3 text-gray-900 border border-gray-300 rounded w-96 sm:w-64  bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                name="salary"
                required
              />
            </div>
            <div className="">
              <label htmlFor="status" className="form-label">
                Status
              </label>
              <StatusSelect
                defaultValue={status}
                onChange={(event) => setStatus(event.target.value)}
                name="status"
              ></StatusSelect>
            </div>
          </div>
          <hr className="my-5 sm:my-1" />
          <div className="grid grid-cols-6 gap-4">
            <button
              disabled={!isFormValid}
              className={
                " col-start-5 md:col-start-6 text-white bg-gray-700 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300 font-medium rounded text-sm px-5 sm:py-1 lg:py-2.5 py-2.5 mb-2 w-24 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" +
                (isFormValid ? "" : "btn-disabled")
              }
              type="submit"
            >
              Save
            </button>
          </div>
        </section>
      ) : (
        ""
      )}
    </form>
  );
}
