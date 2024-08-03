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

        navigate('/edit', { state: data });
    }

    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <h1 className="pt-4 pb-4">Detaile Page</h1>
                <button onClick={handleEditClick} className="btn btn-warning">Edit</button>
            </div>
     
            { data ? 
                <section>
                            <div className="row mb-3">
                <div className="col">
                    <label htmlFor="firstname" className="form-label">Firstname</label>
                    <input className="form-control" type="text" id="firstname" value={data.firstname} readOnly />
                </div>
                <div className="col">
                    <label htmlFor="lastname" className="form-label">Lastname</label>
                    <input className="form-control" type="text" id="lastname" value={data.lastname} readOnly />
                </div>
                <div className="col">
                    <label htmlFor="birthdate" className="form-label">Birthdate</label>
                    <input className="form-control" type="text" id="birthdate" value={data.birthdate.toDateString()} readOnly />
                </div>
            </div>
            <div className="row mb-3">
                <div className="col">
                <label htmlFor="phonenumber" className="form-label">Phonenumber</label>
                <input className="form-control" type="text" id="phonenumber" value={data.phonenumber} readOnly />
                </div>
            </div>
            <div className="row mb-3">
                <div className="col">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input type="text" className="form-control" id="address" value={data.address} readOnly />
                </div>
                <div className="col">
                    <label htmlFor="city" className="form-label">City</label>
                    <input type="text" className="form-control" id="city" value={data.city} readOnly />
                </div>
                <div className="col">
                    <label htmlFor="postalcode" className="form-label">Postal Code</label>
                    <input type="text" className="form-control" id="postalcode" value={data.postalcode} readOnly />
                </div>
            </div>
            <div className="row mb-3">
                <div className="col">
                    <label htmlFor="id" className="form-label">ID</label>
                    <input type="text" className="form-control" id="id" value={data.id} readOnly />
                </div>
                <div className="col">
                    <label htmlFor="status" className="form-label">Status</label>
                    <input type="text" className="form-control" id="status" value={data.status} readOnly />
                </div>
                <div className="col">
                    <label htmlFor="salary" className="form-label">Salary</label>
                    <input type="text" className="form-control" id="salary" value={data.salary} readOnly />
                </div>
            </div>
                </section> : ''

            }

        </>
    )
}