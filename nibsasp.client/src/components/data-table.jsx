import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component-with-filter';
import { Button } from 'react-bootstrap';
import EditProjectModal from './edit-project-modal';

const ProjectTable = (props) => {
    useEffect(() => {
        fetchTableData()
    }, []);
    const handleButtonClick = (e, row) => {
        e.preventDefault();
        setShow(true);
        setModalData(row);
    };
    const handleDeleteClick = (e, row) => {
        fetch(import.meta.env.VITE_API_URL + "?id=" + row.id, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.status === true)
                alert('Deleted successfully');
                fetchTableData();
                
            })
            .catch(err => alert("Error Deleting Data"));
        
    }
    const [show, setShow] = useState(false);
    const [modalData, setModalData] = useState();
    const [data, setData] = useState([]);
    const [perPage, setPerPage] = useState(4);
    const navigate = useNavigate();
    const columns = [
        {
            name: 'Name',
            selector: row => row.name
        },
        {
            name: 'Owner',
            selector: row => row.owner
        },
        {
            name: 'Description',
            cell: (row) => (
                <Button
                    className="btn btn-outline btn-xs"
                    onClick={() => navigate('/details/' + row.id)}>
                    See Description
                </Button>
            )
        },
        {
            name: 'Status',
            selector: row => row.status,
            filterable: true
        },
        {
            name: 'Start Date',
            selector: row => row.startDate.split('T')[0]
        },
        {
            name: 'End Date',
            selector: row => row.endDate.split('T')[0]
        },
        {
            name: 'Actions',
            cell: (row) => (
                <div>
                    <Button className="btn btn-outline btn-xs" onClick={(e) => handleButtonClick(e, row)}> Edit </Button>
                    <Button variant='danger' onClick={(e) => handleDeleteClick(e, row)}>Delete</Button>
                </div>
            )
        }
    ];
    const customStyles = {
        headCells: {
            style: {
                "align-items": 'flex-start'
            }
        }
    };

    async function fetchTableData() {
        const URL = import.meta.env.VITE_API_URL;
        const response = await fetch(URL)

        const projectsData = await response.json()
        setData(projectsData.data.projects)
        }

    return (
        <div>
            <DataTable
                striped
                actions
                columns={columns}
                data={data}
                pagination
                customStyles={customStyles} />
            <EditProjectModal show={show} modalData={modalData} handleClose={() => setShow(false)} />
        </div>       
    );
}

export default ProjectTable;