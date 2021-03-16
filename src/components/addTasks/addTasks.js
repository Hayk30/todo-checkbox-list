import React, { Component } from 'react';
import { Button, FormControl, Modal } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './addTasks.css'
import {formDate} from "../util/util";
import {connect} from 'react-redux'
import {addTask} from '../reduxExample/action'



class AddTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            date: new Date(),
        }
    }

    hendleChange = (ev, type) => {
        console.log(type);
        this.setState({
            [type]: ev.target.value
        })
    }
    hedleKeydown = (ev) => {
        if (ev.key === 'Enter') {
            this.hendleClick()
        }
    }

    hendleClick = () => {
        const { title, description, date } = this.state
        if (!title) {
            return
        }
        const task = {
            title,
            description,
            date: formDate(date.toISOString()),
        }
        this.props.addTask(task)
        // this.props.onAdd(task)

    }

    hendleDateChange=(date)=>{
        this.setState({
            date
        }) 
    }


    render() {
        const { title, date } = this.state;
        const { disabled, onClose } = this.props;
        return (
            <Modal
                show={true}
                onHide={onClose}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add new task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormControl className="formContr"
                        aria-describedby="basic-addon1"
                        onChange={(ev) => this.hendleChange(ev, 'title')}
                        onKeyDown={(ev) => this.hedleKeydown(ev)}
                        disabled={disabled}
                    />
                    <textarea
                        rows="5"
                        className="textareaDiscrip"
                        onChange={(ev) => this.hendleChange(ev, 'description')}
                    />
                    <DatePicker
                        selected={date}
                        onChange={(date) =>this.hendleDateChange(date)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={onClose}
                    >
                        Close
                        </Button>
                    <Button
                        variant="danger"
                        onClick={this.hendleClick}
                        disabled={!title}
                    >
                        Add
                        </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

const mapDispatchToProps =  {
    addTask
}
export default connect(null, mapDispatchToProps)(AddTask)
