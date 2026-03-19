import React from 'react'
import './userApp.css'
import { DataGrid } from '@mui/x-data-grid'

const userApp = () => {
    const columns = [
        {field: "name", headerName: "Counsellor Name", width: 100 },
        {field: "email", headerName: "Email", width: 200 },
        {field: "phone", headerName: "Phone Number", width: 150 },
        {field: "year", headerName: "Section Time", width: 100 },
        {field: "language", headerName: "Section Date", width: 130 },
        {field: "description", headerName: "Type", width: 250 },
        {field: "issue", headerName: "Issue", width: 120 },
        {field: "status", headerName: "Ststus", width: 100 },
        {field: "action",headerName: "Action",width: 170,
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

export default userApp