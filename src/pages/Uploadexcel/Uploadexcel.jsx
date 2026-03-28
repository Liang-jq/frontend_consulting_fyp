import React, { useState } from 'react'
import './Uploadexcel.css'
import axios from 'axios';

const uploadexcel = () => {
    const [file, setFile] = useState(null);
    const handleFile = (e) => {setFile(e.target.files[0]);}

    const uploadFile = async () => {
        const formData = new FormData();
        formData.append("file", file);

        const res=await axios.post(
            "http://localhost/backend_consult/api/uploadExcel.php",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        )
        console.log(res.data);
        alert("Uploaded!");
    }

    return (
        <div>
            <input type="file" accept=".xlsx,.xls,.csv" onChange={handleFile} />
            <button onClick={uploadFile}>Upload</button>
        </div>
    )
}

export default uploadexcel