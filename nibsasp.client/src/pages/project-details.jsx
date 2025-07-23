import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
const ProjectDetail = () => {
    const [project, setProject] = useState({});
    const { id }  = useParams();
    useEffect(() => {
        fetch(import.meta.env.VITE_API_URL + '/id?id=' + id)
            .then(res => res.json())
            .then(res => {
                if (res.status === true) {
                    setProject(res.data);
                }
            })
            .catch(err => alert("Error getting data"));
    }
    , []);
    return (
        <>
            <Row>
                {project && 
                    <>
                        <Col xs={12} md={8}>
                        <h3>{project.name}</h3>
                        <p>{project.description || 'N/A'}</p>
                        <div>Owner: {project.owner}</div>
                        <div>Status: {project.status}</div>
                        <div>Start Date: {project.startDate != null ? project.startDate.split('T')[0] : ''}</div>
                        <div>End Date: {project.endDate != null ? project.endDate.split('T')[0] : ''}</div>
                        </Col>
                    </>
                }
            </Row>
        </>
    )
}

export default ProjectDetail