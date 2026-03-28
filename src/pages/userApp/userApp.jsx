import React, { useEffect, useState } from 'react'
import './UserApp.css'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'

const UserApp = () => {
    const [rows,setRows] = useState([])

    useEffect(() => {
        const fetchUserAppointments = async () => {
            try {
                const storedUser = JSON.parse(localStorage.getItem("user"));
                const user_id = storedUser?.user_id;

                const res = await axios.get(
                    `http://localhost/backend_consult/api/getUserAppointment.php?user_id=${user_id}`
                );

                const formatted = res.data.map(item => ({
                    ...item,
                    id: item.id
                }));

                setRows(formatted);

            } catch (err) {
                console.log(err);
            }
        };

        fetchUserAppointments();
    }, [])

    const deleteAppointment = async (id) => {
        if (!window.confirm("Are you sure you want to delete this appointment?")) return;
        try {
            const res = await axios.get(
                `http://localhost/backend_consult/api/deleteAppointmentUser.php?id=${id}`
            );
            if (res.data.success) {
                alert("Deleted successfully");
                setRows(prev => prev.filter(row => row.id !== id));
            } else {
                alert("Failed to delete");
            }
        } catch (err) {
            console.log(err);
        }
    }

    const columns = [
        {field: "name", headerName: "Counsellor Name", width: 200 },
        {field: "email", headerName: "Email", width: 200 },
        {field: "phone", headerName: "Phone Number", width: 150 },
        {field: "time", headerName: "Section Time", width: 130 },
        {field: "date", headerName: "Section Date", width: 130 },
        {field: "type", headerName: "Type", width: 150 },
        {field: "issue", headerName: "Issue", width: 200 },
        {field: "status", headerName: "Status", width: 150 },
        {field: "action",headerName: "Action",width: 150,
            renderCell: (params) => (
                <>
                <button className="btn-delete" onClick={() => deleteAppointment(params.row.id)}>Delete</button>
                </>
            )
        }
    ]
    return (
        <div className="page">
            <div className="table-page">
                <h2>Session</h2>
                <div style={{ height: 500, width: "99%" }}>
                    <DataGrid rows={rows} columns={columns} pageSizeOptions={[5, 10]} initialState={{ pagination: { paginationModel: { pageSize: 5 },},}}/>
                </div>
            </div>
        </div>
    )
}

export default UserApp