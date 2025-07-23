import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';


const EditProject = (props) => {
    const [project, setProject] = useState(props.project);
    const [validated, setValidated] = useState(false);
    const handleFieldChange = (event) => {
        var proj = project;
        proj[event.target.name] = event.target.value;
    };
    const handleSave = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            setValidated(true);
            return;
        }

        let projectToPost = project;

        if (project && project.id > 0) {
            //update
            fetch(import.meta.env.VITE_API_URL, {
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(projectToPost)
            })
                .then(res => res.json())
                .then(res => {
                    if (res.status === true && res.data)
                        setProject(res.data);
                    alert('updated successfully');
                })
                .catch(err => alert("Error Updating Data"));
        } else {
            //create
            fetch(import.meta.env.VITE_API_URL, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(projectToPost)
            })
                .then(res => res.json())
                .then(res => {
                    if (res.status === true && res.data) {
                        setProject(res.data);
                        alert('created successfully');
                    }     
                })
                .catch(err => alert("Error Creating Data"));
        }
    }
    return (
        <>
            <Form noValidate validated={validated} onSubmit={handleSave}>
                <Form.Group controlId="formProjectName">
                    <Form.Label>Project Name</Form.Label>
                    <Form.Control name="name" defaultValue={project.name} required type="text" autoComplete="off" placeholder="Enter Project Name" onChange={handleFieldChange}></Form.Control>
                    <Form.Control.Feedback type="invalid">
                        Please enter a Project Name.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formProjectDescription">
                    <Form.Label>Project Description</Form.Label>
                    <Form.Control name="description" defaultValue={project.description} type="textarea" rows={3} placeholder="Enter Project Description" onChange={handleFieldChange}></Form.Control>
                </Form.Group>
                <Form.Group controlId="formProjectOwner">
                    <Form.Label>Project Owner</Form.Label>
                    <Form.Control name="owner" defaultValue={project.owner} type="textarea" rows={3} placeholder="Enter Project Owner" onChange={handleFieldChange}></Form.Control>
                </Form.Group>
                <Form.Group controlId="formProjectStatus">
                    <Form.Label>Project Status</Form.Label>
                    <Form.Control name="status" as="select" required defaultValue={project.status} onChange={handleFieldChange} type="select" rows={3}>
                        <option value=''>Project Status...</option>
                        <option value="Planned">Planned</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                        Please enter a Select a Project Status.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formProjectStartDate">
                    <Form.Label>Project Start Date</Form.Label>
                    <Form.Control name="startDate" required defaultValue={project.startDate != null ? project.startDate.split('T')[0] : '' } type="date" rows={3} onChange={handleFieldChange}></Form.Control>
                    <Form.Control.Feedback type="invalid">
                        Please enter a Start Date.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formProjectEndDate">
                    <Form.Label>Project End Date</Form.Label>
                    <Form.Control name="endDate" required defaultValue={project.endDate != null ? project.endDate.split('T')[0] : '' } type="date" rows={3} onChange={handleFieldChange}></Form.Control>
                    <Form.Control.Feedback type="invalid">
                        Please enter a Project End Date.
                    </Form.Control.Feedback>
                </Form.Group>
                <Button type="submit">{project && project.id > 0 ? "Update" : "Create"}</Button>
            </Form>
        </>
    )
}

export default EditProject;