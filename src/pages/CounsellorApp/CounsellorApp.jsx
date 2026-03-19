import React, { useEffect, useState } from 'react'
import './CounsellorApp.css'
import { DataGrid } from '@mui/x-data-grid'
import SidebarCounsellor from '../../components/SidebarCounsellor/SidebarCounsellor'
import axios from 'axios'
import { toast } from 'react-toastify'

const CounsellorApp = () => {
    const [rows,setRows] = useState([])
    
    useEffect(() => {
    const fetchAppointments = async () => {
        try {
            const storedUser = JSON.parse(localStorage.getItem("user"));
            const counsellor_id = storedUser?.counsellor_id; // This will be the correct counsellor id
            const res = await axios.get(
                `http://localhost/backend_consult/api/getAppointment.php?counsellor_id=${counsellor_id}`
            );

            // DataGrid needs "id"
            const formatted = res.data.map(item => ({
                ...item,
                id: item.id   // make sure your DB has id column
            }));
            console.log("Counsellor ID:", counsellor_id);
            console.log("Response:", formatted);

            setRows(formatted);

        } catch (err) {
            console.log(err);
        }
    };

    fetchAppointments();
}, []);

    const approveUser = async (id) => {
        try {
            const form = new FormData();
            form.append("id", id);
            const res = await axios.post(
                "http://localhost/backend_consult/api/approveAppointment.php",
                form
            );

            if (res.data.success) {
                toast.success("Appointment approved!");
                setRows((prev) =>prev.map((row) =>row.id === id ? { ...row, status: "approved" } : row))
            } else {
                toast.error("Failed to approve");
            }
        } catch (err) {
            console.log(err);
            toast.error("Error occurred");
        }
    }

    const deleteAppointment = async (id) => {
        if (!window.confirm("Are you sure you want to delete this appointment?")) return;
        try {
            const form = new FormData();
            form.append("id", id);

            const res = await axios.post(
                "http://localhost/backend_consult/api/deleteAppointment.php",
                form
            );

            if (res.data.success) {
                toast.success("Deleted successfully!");
                setRows(prev => prev.filter(row => row.id !== id));
            } else {
                toast.error("Delete failed");
            }
        } catch (err) {
            console.log(err);
            toast.error("Error occurred");
        }
    }

    const columns = [
        { field: "name", headerName: "Name", width: 160 },
        { field: "email", headerName: "Email", width: 200 },
        { field: "phone", headerName: "Phone Number", width: 150 },
        { field: "date", headerName: "Section Date", width: 120 },
        { field: "time", headerName: "Section Time", width: 120 },
        { field: "type", headerName: "Group/Individual", width: 150 },
        { field: "issue", headerName: "Topic Type", width: 150 },
        {
            field: "action",
            headerName: "Action",
            width: 170,
            renderCell: (params) => { 
                const isApproved = params.row.status === "approved";

                return (
                    <>
                        <button className={`btn-approve ${isApproved ? "disabled-btn" : ""}`} onClick={() => approveUser(params.row.id)} disabled={isApproved}>{isApproved ? "Approve" : "Approve"}</button>
                        <button className="btn-delete" onClick={() => deleteAppointment(params.row.id)}>Delete</button>
                    </>
                )
            }
        }
    ]

    return (
        <div className="page">
            <SidebarCounsellor/>
            <div className="table-page">
                <h2>List of Students</h2>
                <div style={{ height: 500, width: "99%" }}>
                    <DataGrid rows={rows} columns={columns} pageSizeOptions={[5, 10]} initialState={{ pagination: { paginationModel: { pageSize: 5 },},}}/>
                </div>
            </div>
        </div>
    )
}

export default CounsellorApp