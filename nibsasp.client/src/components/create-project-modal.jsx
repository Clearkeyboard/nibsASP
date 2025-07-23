import React from 'react';
import EditProject from './edit-project';
import { Modal } from 'react-bootstrap';
const CreateProjectModal = (props) => {
    const project = {
        name: '',
        owner: '',
        description: '',
        status: '',
        starDate: '',
        endDate: ''
    }
    return (
        <>
            <Modal show={props.show} onHide={props.handleClose} backdrop="static" keyboard={false} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditProject project={project} />
                </Modal.Body>
            </Modal>
        </>
    )
}

export default CreateProjectModal;