import { useLocation, useNavigate, useParams } from "react-router-dom";
import { EmployeesContext } from "../context/EmployeesContext";
import { Employee } from "../models/Employee";
import { useEffect, useState, useContext } from "react";
import { getDataEmployee, deleteEmployee } from "../services/API";

import { useTranslation } from "react-i18next";
import { useTranslateStatus } from "../models/StatusOption";
import { Loader } from "../components/Loader";
import DialogConfirm from "../components/DialogConfirm";
import DialogEdit from "../components/DialogEdit";

import { EditPage } from "./EditPage";

export function DetailsPage() {
  const context = useContext(EmployeesContext);
  const location = useLocation();
  const navigate = useNavigate();

  const { translateStatus } = useTranslateStatus();
  const { t } = useTranslation();

  const { id } = useParams();

  const [data, setData] = useState<Employee>(location.state);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const closeDialogEdit = () => context?.setIsDialogEditOpen(false);

  useEffect(() => {
    if (!data && id) {
      console.log("0");

      getDataEmployee(id).then((employee) => {
        setData(employee);
      });
    }
  }, []);

  const handleEditClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    event.preventDefault();
    context?.setIsDialogEditOpen(true);
    //navigate("/edit/" + data.id, { state: data });

    if (context?.isDialogEditOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
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

  return (
    <>
      <DialogConfirm
        isOpen={isDialogOpen}
        onClose={closeDialog}
        title={`${t("delete_dialog_description")}`}
      >
        <div className="grid grid-cols-4 ">
          <button
            className="  col-start-1 text-white bg-red-700 hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-gray-300 font-medium rounded text-sm px-3 py-1.5  mb-2 w-24 "
            type="submit"
            onClick={handleConfirmDeleteDialog}
          >
            {t("yes")}
          </button>
          <button
            className="col-end-5 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300 font-medium rounded text-sm px-3 py-1.5  mb-2 w-24 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            type="submit"
            onClick={closeDialog}
          >
            {t("no")}
          </button>
        </div>
      </DialogConfirm>

      <DialogEdit
        isOpen={context?.isDialogEditOpen}
        onClose={closeDialogEdit}
        title={t("delete_dialog_description")}
      >
        <EditPage />
      </DialogEdit>

      {data ? (
        <section className={`mx-6 text-sm`}>
          <h1 className="pt-4 pb-4 uppercase text-xl">Details:</h1>
          <hr className="my-5" />
          <div className="lg:grid grid-cols-3 mb-3 [&>*]:mb-4">
            <div className="">
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
                {t("firstname")}
              </label>
              <input
                className="block pt-1 pb-1 ps-10 mb-3 text-gray-900 border border-gray-300 rounded w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                type="text"
                value={
                  context?.employee?.firstname
                    ? context?.employee?.firstname
                    : data.firstname
                }
                readOnly
              />
            </div>
            <div className="col">
              <label htmlFor="lastname" className="form-label">
                {t("lastname")}
              </label>
              <input
                className="block pt-1 pb-1 ps-10  text-gray-900 border border-gray-300 rounded w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                type="text"
                value={
                  context?.employee?.lastname
                    ? context?.employee?.lastname
                    : data.lastname
                }
                readOnly
              />
            </div>
          </div>

          <div className="lg:grid grid-cols-3 mb-3 [&>*]:mb-4">
            <div className="col">
              <label htmlFor="birthdate" className="form-label">
                {t("bithdate")}
              </label>
              <input
                className="block pt-1 pb-1 ps-10  text-gray-900 border border-gray-300 rounded w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                type="text"
                id="birthdate"
                value={
                  context?.employee?.birthdate
                    ? context?.employee?.birthdate
                    : data?.birthdate?.toDateString()
                }
                readOnly
              />
            </div>
            <div className="row mb-3">
              <div className="col">
                <label htmlFor="phonenumber" className="form-label">
                  {t("phonenumber")}
                </label>
                <input
                  className="block pt-1 pb-1 ps-10  text-gray-900 border border-gray-300 rounded w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                  type="text"
                  value={
                    context?.employee?.phonenumber
                      ? context?.employee?.phonenumber
                      : data.phonenumber
                  }
                  readOnly
                />
              </div>
            </div>
          </div>
          <hr className="my-5" />
          <div className="lg:grid grid-cols-3 mb-3 [&>*]:mb-4">
            <div className="col">
              <label htmlFor="address" className="form-label">
                {t("address")}
              </label>
              <input
                type="text"
                className="block pt-1 pb-1 ps-10  text-gray-900 border border-gray-300 rounded w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                value={
                  context?.employee?.address
                    ? context?.employee?.address
                    : data.address
                }
                readOnly
              />
            </div>
            <div className="col">
              <label htmlFor="city" className="form-label">
                {t("city")}
              </label>
              <input
                type="text"
                className="block pt-1 pb-1 ps-10  text-gray-900 border border-gray-300 rounded w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                value={
                  context?.employee?.city ? context?.employee?.city : data.city
                }
                readOnly
              />
            </div>
            <div className="col">
              <label htmlFor="postalcode" className="form-label">
                {t("postalcode")}
              </label>
              <input
                type="text"
                className="block pt-1 pb-1 ps-10  text-gray-900 border border-gray-300 rounded w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                value={
                  context?.employee?.zipcode
                    ? context?.employee?.zipcode
                    : data.zipcode
                }
                readOnly
              />
            </div>
          </div>
          <hr className="my-5" />
          <div className="lg:grid grid-cols-3 w-100 [&>*]:mb-4">
            <div className="col">
              <label htmlFor="status" className="form-label">
                {t("status")}
              </label>
              <input
                type="text"
                className="block pt-1 pb-1 ps-10 uppercase text-gray-900 border border-gray-300 rounded w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                id="status"
                value={
                  context?.employee?.status
                    ? context?.employee?.status
                    : translateStatus(data.status)
                }
                readOnly
              />
            </div>
            <div className="col">
              <label htmlFor="salary" className="form-label">
                {t("salary")}
              </label>
              <input
                type="text"
                className="block pt-1 pb-1 ps-10  text-gray-900 border border-gray-300 rounded w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                value={
                  context?.employee?.salary
                    ? context?.employee?.salary
                    : data.salary
                }
                readOnly
              />
            </div>
          </div>
          <hr className="my-5" />
          <div className="grid grid-cols-6 gap-4">
            <button
              className="col-start-3 sm:col-start-5 md:col-start-6 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300 font-medium rounded text-sm px-5 py-2.5  mb-2 w-24 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              type="submit"
              onClick={handleEditClick}
            >
              {t("edit")}
            </button>
            <button
              className="col-start-5 sm:col-start-6 md:col-start-7 text-white bg-red-700 hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-gray-300 font-medium rounded text-sm px-5 py-2.5  mb-2 w-24 "
              type="submit"
              onClick={handleDeleteClick}
            >
              {t("delete")}
            </button>
          </div>
        </section>
      ) : (
        <Loader />
      )}
    </>
  );
}
