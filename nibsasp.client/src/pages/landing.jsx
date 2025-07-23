import React, { useState } from 'react';
import { Col, Button } from 'react-bootstrap';
import DataTable from '../components/data-table';
import CreateProject from '../components/create-project-modal';

const Landing = () =>
{
    const [show, setShow] = useState(false);

    return (
        <>
            <Col xs={12} md={2} className="align-self-center">
                <Button className="float-right" onClick={() => setShow(true)}>Add New Project</Button>
            </Col>
            <DataTable />
            <CreateProject show={show} handleClose={() => setShow(false)}/>
        </>
    )
}

export default Landing;