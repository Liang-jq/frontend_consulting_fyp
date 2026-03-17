import React, { useEffect, useState } from 'react'
import { DataGrid } from "@mui/x-data-grid"
import './Listofstudent.css'
import SidebarAdmin from '../../components/SidebarAdmin/sidebarAdmin';
import axios from 'axios';

const Listofstudent = () => { 
  const [rows,setRows] = useState([]);

  useEffect(() => {
    axios.get("http://localhost/backend_consult/api/PendingCounsellor.php")
      .then(res => setRows(res.data))
      .catch(err => console.log(err));
  }, []);

  const approveUser = (id) => {
    axios.post("http://localhost/backend_consult/api/approveCounsellor.php", { id })
      .then(() => setRows(prev => prev.filter(row => row.id !== id)))
      .catch(err => console.log(err));
  }

const columns = [
    { field: "name", headerName: "Name", width: 100 },
    { field: "matric", headerName: "Matric Number", width: 120 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phone", headerName: "Phone Number", width: 150 },
    { field: "year", headerName: "Year", width: 100 },
    { field: "language", headerName: "Language", width: 130 },
    { field: "description", headerName: "About Us", width: 250 },

    {
      field: "action",
      headerName: "Action",
      width: 170,
      renderCell: (params) => (
        <>
          <button 
            className="btn-approve" 
            onClick={() => approveUser(params.row.id)}
          >
            Approve
          </button>

          <button className="btn-delete">
            Delete
          </button>
        </>
      )
    }
  ]

  return (
    <div className="page">
      <SidebarAdmin/>
      <div className="table-page">
        <h2>List of Students</h2>
        <div style={{ height: 500, width: "99%" }}>
          <DataGrid rows={rows} columns={columns} pageSizeOptions={[5, 10]} initialState={{ pagination: { paginationModel: { pageSize: 5 },},}}/>
        </div>
      </div>
    </div>
  )
}

export default Listofstudent