import React from 'react'
import { Button, Modal } from 'react-bootstrap';

export default function Confirm(props) {
    return (
            <Modal show={true} onHide={props.onClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you whant delete this {props.count} task</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={props.onClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={props.onSubmite}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
    )
}

