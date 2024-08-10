import { useLocation, useParams } from "react-router-dom";
import { editDataEmployee, getDataEmployee } from "../services/API";

import { useEffect, useState, useContext } from "react";
import { Employee, EmployeeStatus } from "../models/Employee";
import { SelectStatus } from "../components/SelectStatus";
import { EmployeesContext } from "../context/EmployeesContext";
import { useTranslation } from "react-i18next";
import { formatDate } from "../utils/formatDate";
import { toast } from "react-toastify";

export function EditPage() {
  const context = useContext(EmployeesContext);

  const location = useLocation();
  const { id } = useParams();
  const { t } = useTranslation();
  const notify = () => toast(t("notify_EDIT_success"), { type: "success" });

  const [data, setData] = useState<Employee>(location.state);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phonenumber, setPhonenumber] = useState<number | null>(null);
  const [birthdate, setBirthdate] = useState<Date | null>(null);
  const [salary, setSalary] = useState<number | null>(null);
  const [status, setStatus] = useState<EmployeeStatus>("ON_LEAVE");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (!data && !!id) {
      // Zaladuj dane z API
      getDataEmployee(id).then((employee) => {
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
    setZipcode(data.zipcode);
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
      salary: salary || 0,
      status,
      address,
      city,
      zipcode,
    };

    editDataEmployee(employee)
      .then(() => {
        context?.setIsDialogEditOpen(false);
        context?.setEmployee(employee);
        setData(employee);
        notify();
        //navigate("/details/" + employee.id, { state: employee });
      })
      .catch(() => {
        toast(t("notify_EDIT_error"), { type: "error" });
      });
  };

  return (
    <form onSubmit={handleSubmit} id="edit-form" className="">
      {data ? (
        <section className="lg:mx-6 ">
          <div className="sm:grid sm:grid-cols-3 md:grid-cols-2 grid-cols-3 [&>*]:mb-4">
            <div className="">
              <label htmlFor="firstname" className="form-label font-fantasy">
                {t("firstname")}
              </label>
              <input
                value={firstname}
                onChange={(event) => {
                  setFirstname(event.target.value);
                  checkValidity();
                }}
                className="block pt-1 pb-1 ps-10 mb-3 sm:mb-2 lg:mb-3 text-gray-900 border border-gray-300 rounded w-80 sm:w-48  md:w-64 lg:w-80  bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                type="text"
                name="firstname"
                required
              />
            </div>
            <div className="">
              <label htmlFor="lastname" className="form-label font-fantasy">
                {t("lastname")}
              </label>
              <input
                value={lastname}
                onChange={(event) => {
                  setLastname(event?.target.value);
                  checkValidity();
                }}
                className="block pt-1 pb-1 ps-10 mb-3 sm:mb-2 lg:mb-3 text-gray-900 border border-gray-300 rounded w-80 sm:w-48  md:w-64 lg:w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                type="text"
                name="lastname"
                required
              />
            </div>

            <div className="">
              <label htmlFor="birthdate" className="form-label font-fantasy">
                {t("birthdate")}
              </label>
              <input
                value={formatDate(birthdate)}
                onChange={(event) => {
                  setBirthdate(new Date(event.target.value));
                  checkValidity();
                }}
                className="block pt-1 pb-1 ps-10 mb-3 sm:mb-2 lg:mb-3 text-gray-900 border border-gray-300 rounded w-80 sm:w-48  md:w-64 lg:w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                type="date"
                name="birthdate"
                required
              />
            </div>
            <div className="">
              <label htmlFor="phonenumber" className="form-label font-fantasy">
                {t("phonenumber")}
              </label>
              <input
                value={phonenumber ? phonenumber.toString() : ""}
                onChange={(event) => {
                  setPhonenumber(+event.target.value);
                  checkValidity();
                }}
                className="block pt-1 pb-1 ps-10 mb-3 sm:mb-2 lg:mb-3 text-gray-900 border border-gray-300 rounded w-80 sm:w-48  md:w-64 lg:w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                type="text"
                name="phonenumber"
                required
              />
            </div>

            <div className="">
              <label htmlFor="address" className="form-label font-fantasy">
                {t("address")}
              </label>
              <input
                value={address}
                onChange={(event) => {
                  setAddress(event.target.value);
                  checkValidity();
                }}
                type="text"
                className="block pt-1 pb-1 ps-10 mb-3 sm:mb-2 lg:mb-3 text-gray-900 border border-gray-300 rounded w-80 sm:w-48  md:w-64 lg:w-80  bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                name="address"
                required
              />
            </div>
            <div className="">
              <label htmlFor="city" className="form-label font-fantasy">
                {t("city")}
              </label>
              <input
                value={city}
                onChange={(event) => {
                  setCity(event.target.value);
                  checkValidity();
                }}
                type="text"
                className="block pt-1 pb-1 ps-10 mb-3 sm:mb-2 lg:mb-3 text-gray-900 border border-gray-300 rounded w-80 sm:w-48  md:w-64 lg:w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                name="city"
                required
              />
            </div>
            <div className="">
              <label htmlFor="postalcode" className="form-label font-fantasy">
                {t("postalcode")}
              </label>
              <input
                value={zipcode}
                onChange={(event) => {
                  setZipcode(event.target.value);
                  checkValidity();
                }}
                type="text"
                className="block pt-1 pb-1 ps-10 mb-3 sm:mb-2 lg:mb-3 text-gray-900 border border-gray-300 rounded w-80 sm:w-48  md:w-64 lg:w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                name="postalcode"
                required
              />
            </div>

            <div className="">
              <label htmlFor="salary" className="form-label font-fantasy">
                {t("salary")}
              </label>
              <input
                value={salary?.toString()}
                onChange={(event) => setSalary(+event.target.value)}
                type="text"
                className="block pt-1 pb-1 ps-10 mb-3 sm:mb-2 lg:mb-3 text-gray-900 border border-gray-300 rounded w-80 sm:w-48 md:w-64 lg:w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                name="salary"
                required
              />
            </div>
            <div className="">
              <label htmlFor="status" className="form-label font-fantasy">
                {t("status")}
              </label>
              <SelectStatus
                defaultValue={status}
                onChange={(event) => setStatus(event.target.value)}
                name="status"
              ></SelectStatus>
            </div>
          </div>
          <hr className="my-3 md:my-2" />
          <div className="grid grid-cols-12 gap-4">
            <button
              className={
                " col-start-10 lg:col-start-11 text-white bg-gray-700 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300 font-medium font-fantasy rounded text-sm px-5 py-1 lg:py-2.5 mb-2 w-24 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" +
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
