import React from 'react';
import EditProject from './edit-project';
import { Modal } from 'react-bootstrap';
const EditProjectModal = (props) => {
    return (
        <>
            <Modal show={props.show} onHide={props.handleClose} backdrop="static" keyboard={false} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit This Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditProject project={ props.modalData } />
                </Modal.Body>
            </Modal>
        </>
    )
}

export default EditProjectModal;