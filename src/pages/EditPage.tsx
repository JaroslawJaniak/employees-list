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
  const [status, setStatus] = useState<EmployeeStatus>('ON_LEAVE');
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
    <form onSubmit={handleSubmit} id="edit-form">
      <h1 className="pt-4 pb-4">Edit Employee</h1>

      {data ? (
        <section>
          <div className="row mb-3 row-gap-3">
            <div className="col-12 col-md-4">
              <label htmlFor="firstname" className="form-label">
                Firstname
              </label>
              <input
                value={firstname}
                onChange={(event) => {
                  setFirstname(event.target.value);
                  checkValidity();
                }}
                className="form-control"
                type="text"
                name="firstname"
                required
              />
            </div>
            <div className="col-12 col-md-4">
              <label htmlFor="lastname" className="form-label">
                Lastname
              </label>
              <input
                value={lastname}
                onChange={(event) => {
                  setLastname(event?.target.value); checkValidity();
                }}
                className="form-control"
                type="text"
                name="lastname"
                required
              />
            </div>
            <div className="col-12 col-md-4">
              <label htmlFor="birthdate" className="form-label">
                Birthdate
              </label>
              <input
                value={formatDate(birthdate)}
                onChange={(event) => {setBirthdate(new Date(event.target.value)); checkValidity();
                }}
                className="form-control"
                type="date"
                name="birthdate"
                required
              />
            </div>
          </div>
          <div className="row mb-3 row-gap-3">
            <div className="col-12">
              <label htmlFor="phonenumber" className="form-label">
                Phonenumber
              </label>
              <input
                value={phonenumber}
                onChange={(event) => {setPhonenumber(+event.target.value); checkValidity();
                }}
                className="form-control"
                type="text"
                name="phonenumber"
                required
              />
            </div>
          </div>
          <div className="row mb-3 row-gap-3">
            <div className="col-12 col-md-4">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input
                value={address}
                onChange={(event) => {setAddress(event.target.value); checkValidity();
                }}
                type="text"
                className="form-control"
                name="address"
                required
              />
            </div>
            <div className="col-12 col-md-4">
              <label htmlFor="city" className="form-label">
                City
              </label>
              <input
                value={city}
                onChange={(event) => {setCity(event.target.value); checkValidity();
                }}
                type="text"
                className="form-control"
                name="city"
                required
              />
            </div>
            <div className="col-12 col-md-4">
              <label htmlFor="postalcode" className="form-label">
                Postal Code
              </label>
              <input
                value={postalcode}
                onChange={(event) => {setPostalcode(event.target.value); checkValidity();
                }}
                type="text"
                className="form-control"
                name="postalcode"
                required
              />
            </div>
          </div>
          <div className="row mb-3 row-gap-3">
            <div className="col-12 col-md-4">
              <label htmlFor="status" className="form-label">
                Status
              </label>
              <StatusSelect
                defaultValue={status}
                onChange={(event) => setStatus(event.target.value)}
                name="status"
              ></StatusSelect>
            </div>
            <div className="col-12 col-md-4">
              <label htmlFor="salary" className="form-label">
                Salary
              </label>
              <input
                value={salary?.toString()}
                onChange={(event) => setSalary(+event.target.value)}
                type="text"
                className="form-control"
                name="salary"
                required
              />
            </div>
          </div>
          <div className="row">
            <button
              disabled={!isFormValid}
              className={
                "btn btn-primary " + (isFormValid ? "" : "btn-disabled")
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
