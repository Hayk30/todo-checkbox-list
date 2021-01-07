import React,{ Component} from 'react'
import { Button, Modal } from 'react-bootstrap';
import './editTaskModal.css'

export default class EditTaskModal extends Component {
    constructor(props) {
        super(props)
        this.state={
            ...props.data,
        }
    }
    hendleTextChange=(event)=>{
        this.setState({ 
            title:event.target.value
        });
    }
    hendleSave=()=>{
        const {title}=this.state;
        if(!title){
            return
        }
        this.props.onSave(this.state);
    }
    render() {
        const {title}= this.state
        const {props}=this;
        return (
            <Modal show={true} onHide={props.onClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input 
                    type="text" 
                    className="inp"
                    value={title} 
                    onChange={this.hendleTextChange} 
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={this.hendleSave}>
                        Save
                        </Button>
                    <Button variant="danger" onClick={props.onClose}>
                        Delete
                        </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}