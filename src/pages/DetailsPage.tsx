import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Employee } from "../models/Employee";
import { useEffect, useState } from "react";
import { getEmployee, deleteEmployee } from "../services/API";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { useTranslation } from "react-i18next";
import { useTranslateStatus } from "../models/StatusOption";
import { Loader } from "../components/Loader";
import Dialog from "../components/gpt/Dialog";

export function DetailsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { translateStatus } = useTranslateStatus();
  const { t } = useTranslation();
  const { id } = useParams();
  const [data, setData] = useState<Employee>(location.state);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (!data && id) {
      getEmployee(id).then((employee) => {
        setData(employee);
      });
    }
  }, []);

  const handleEditClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    event.preventDefault();

    navigate("/edit/" + data.id, { state: data });
  };

  const handleConfirmDeleteDialog = (event: React.MouseEvent): void => {
    event.preventDefault();

    deleteEmployee(id as string).then((response) => {
      if (response) {
        navigate("/");
      }
    });
  };

  const handleDeleteClick = (event: React.MouseEvent): void => {
    event.preventDefault();
    openDialog();
    
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  return (
    <>
      <Dialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        title={t("delete_dialog_description")}
      >
        <div className="grid grid-cols-4 ">
          <button
            className="  col-start-1 text-white bg-red-700 hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-gray-300 font-medium rounded text-sm px-3 py-1.5  mb-2 w-24 "
            type="submit"
            onClick={handleConfirmDeleteDialog}
          >
            YES
          </button>
          <button
            className="col-end-5 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300 font-medium rounded text-sm px-3 py-1.5  mb-2 w-24 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            type="submit"
            onClick={closeDialog}
          >
            NO
          </button>
        </div>
      </Dialog>

      {data ? (
        <section className="mx-6 ">
          <h1 className="pt-4 pb-4">Details</h1>
          <hr className="my-5" />
          <div className="lg:grid grid-cols-3 mb-3 [&>*]:mb-4">
            <div className="col ">
              <label htmlFor="firstname" className="form-label">
                ID
              </label>
              <input
                className="block pt-1 pb-1 ps-10 mb-3 text-gray-900 border border-gray-300 rounded w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                type="text"
                value={data.id}
                readOnly
              />
            </div>
            <div className="col ">
              <label htmlFor="firstname" className="form-label">
                Firstname
              </label>
              <input
                className="block pt-1 pb-1 ps-10 mb-3 text-gray-900 border border-gray-300 rounded w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                type="text"
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
                value={data.lastname}
                readOnly
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
                type="text"
                id="birthdate"
                value={data?.birthdate?.toDateString()}
                readOnly
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
                  value={data.phonenumber}
                  readOnly
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
                value={data.postalcode}
                readOnly
              />
            </div>
          </div>
          <hr className="my-5" />
          <div className="lg:grid grid-cols-3 w-100 [&>*]:mb-4">
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
                value={data.salary}
                readOnly
              />
            </div>
          </div>
          <hr className="my-5" />
          <div className="grid grid-cols-6 gap-4">
            <button
              className="col-start-3 md:col-start-6 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300 font-medium rounded text-sm px-5 py-2.5  mb-2 w-24 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              type="submit"
              onClick={handleEditClick}
            >
              Edit
            </button>
            <button
              className="col-start-5 md:col-start-7 text-white bg-red-700 hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-gray-300 font-medium rounded text-sm px-5 py-2.5  mb-2 w-24 "
              type="submit"
              onClick={handleDeleteClick}
            >
              Delete
            </button>
          </div>
        </section>
      ) : (
        <Loader />
      )}
    </>
  );
}
