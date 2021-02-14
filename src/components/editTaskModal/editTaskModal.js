import React, { Component } from 'react'
import { Button, Modal, FormControl } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './editTaskModal.css'
import {formDate} from "../util/util";

export default class EditTaskModal extends Component {
    constructor(props) {
        super(props)
        const {date}=props.data
        this.state = {
            ...props.data,
            date:date ? new Date(date) : new Date(),
        }
    }
    hendleTextChange = (event) => {
        const {name, value} = event.target
        this.setState({
            [name]: value
        });
    }
    hendleSave = () => {
        const { title, date } = this.state;
        if (!title) {
            return
        }
        this.props.onSave({...this.state, date: formDate(date.toISOString())});
    }
    hendleDateChange=(date)=>{
        this.setState({
            date
        })
    }
    render() {
        const { title, description,date } = this.state
        const { props } = this;
        return (
            <Modal
                show={true}
                onHide={props.onClose}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add new task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormControl
                        name="title"
                        value={title}
                        placeholder="Title"
                        className="formContr"
                        aria-describedby="basic-addon1"
                        onChange={this.hendleTextChange} 
                        // disabled={disabled}
                    />
                    <textarea
                        name="description"
                        value={description}
                        placeholder="Description"
                        rows="5"
                        className="textareaDiscrip"
                        onChange={this.hendleTextChange}
                    />
                    <DatePicker
                        selected={date}
                        onChange={this.hendleDateChange}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={props.onClose}
                    >
                        Close
                        </Button>
                    <Button
                        variant="danger"
                        onClick={this.hendleSave}
                        disabled={!title}
                    >
                        Add
                        </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}