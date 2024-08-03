import { useNavigate } from "react-router-dom";
import { createEmployee } from "../services/API";
import { STATUS_OPTIONS, StatusOption } from "../models/StatusOption";
import { useState } from "react";

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
        })

        createEmployee(data).then(() => {
            navigate('/');
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1 className="pt-4 pb-4">Add Employee</h1>
            <div className="row mb-3">
                <div className="col">
                    <label htmlFor="firstname" className="form-label">Firstname</label>
                    <input className="form-control" type="text" name="firstname" required />
                </div>
                <div className="col">
                    <label htmlFor="lastname" className="form-label">Lastname</label>
                    <input className="form-control" type="text" name="lastname" required/>
                </div>
                <div className="col">
                    <label htmlFor="birthdate" className="form-label">Birthdate</label>
                    <input className="form-control" type="date" name="birthdate" required />
                </div>
            </div>
            <div className="row mb-3">
                <div className="col">
                <label htmlFor="phonenumber" className="form-label">Phonenumber</label>
                <input className="form-control" type="text" name="phonenumber" required />
                </div>
            </div>
            <div className="row mb-3">
                <div className="col">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input type="text" className="form-control" name="address" required />
                </div>
                <div className="col">
                    <label htmlFor="city" className="form-label">City</label>
                    <input type="text" className="form-control" name="city" required />
                </div>
                <div className="col">
                    <label htmlFor="postalcode" className="form-label">Postal Code</label>
                    <input type="text" className="form-control" name="postalcode" required />
                </div>
            </div>
            <div className="row mb-3">
                <div className="col">
                    <label htmlFor="status" className="form-label">Status</label>
                    <select className="form-control" name="status">
                        {statusOptions.map((status) => (<option value={status.value}>{status.label}</option>))}
                    </select>
                </div>
                <div className="col">
                    <label htmlFor="salary" className="form-label">Salary</label>
                    <input type="text" className="form-control" name="salary" required />
                </div>
            </div>
            <div className="row">
                <button className="btn btn-primary" type="submit">Add</button>
            </div>
        </form>
    )
}