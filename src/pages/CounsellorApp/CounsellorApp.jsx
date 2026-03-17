import React, { useState } from 'react'
import './CounsellorApp.css'
import { DataGrid } from '@mui/x-data-grid'
import SidebarCounsellor from '../../components/SidebarCounsellor/SidebarCounsellor'

const CounsellorApp = () => {
    const [rows,setRows] = useState([])

    const columns = [
        { field: "name", headerName: "Name", width: 100 },
        { field: "email", headerName: "Email", width: 200 },
        { field: "phone", headerName: "Phone Number", width: 150 },
        { field: "sectionDate", headerName: "Section Date", width: 100 },
        { field: "type", headerName: "Group/Individual", width: 130 },
        { field: "topic", headerName: "Topic Type", width: 250 },

        {
            field: "action",
            headerName: "Action",
            width: 170,
            renderCell: (params) => (
                <>
                <button className="btn-approve" onClick={() => approveUser(params.row.id)}>Approve</button>

                <button className="btn-delete">Delete</button>
                </>
            )
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