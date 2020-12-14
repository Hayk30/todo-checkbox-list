import React, { Component } from 'react';
// import Lists from './lists';
import './todo.css'
import { InputGroup, Button, FormControl, Container, Row, Col, Card } from 'react-bootstrap';
import idGenerator from './idGenerator';

class Todo extends Component {
    state = {
        tasks: [],
        inpValues: ''
    }
    hendleChange = (ev) => {
        this.setState({
            inpValues: ev.target.value
        })
        console.log(ev.target.value)
    }
    hendleClick = (ev) => {
        const { inpValues } = this.state
        if(!inpValues) {
            return
        }
        const myId={
            text:inpValues,
            _id: idGenerator()       
        }
        const newTasks= [myId, ...this.state.tasks]
       


        // const newTasks = [...this.state.tasks]
        // newTasks.push(inpValues)

        this.setState({
            tasks: newTasks,
            inpValues: ""
        })
    }
    hedleKeydown=(ev)=>{
        if(ev.key === 'Enter'){
            this.hendleClick()
        }
    }
    hendleDelete=(taskId)=>{
        const delId=this.state.tasks.filter(task=>task._id!==taskId);
        this.setState({
            tasks: delId,
        })
    }
    render() {
        const { inpValues } = this.state
        const tasksArr = this.state.tasks.map((task, i) => {
            return (
                <Col key={i} xs={12} sm={6} md={4} lg={3} xl={2}>
                    <Card className='task'>
                        <Card.Body>
                            <Card.Title>{task.text.slice(0,4)+'...'}</Card.Title>
                            <Card.Text>
                                {task.text}
                            </Card.Text>
                            <Button variant="danger" onClick={()=>this.hendleDelete(task._id)}>Delete</Button>
                        </Card.Body>
                    </Card>
                </Col>

            )
        })
        return (
            <div className="todo">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={8} xl={2} lg={3} sm={6}>
                            <InputGroup className="mb-3">
                                <FormControl
                                    aria-describedby="basic-addon1"
                                    value={inpValues}
                                    onChange={this.hendleChange}
                                    onKeyDown={(ev)=>this.hedleKeydown(ev)}
                                />
                                <InputGroup.Append>
                                    <Button
                                        variant="outline-secondary"
                                        onClick={this.hendleClick}
                                        disabled={!inpValues}
                                    >Button</Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Col>
                    </Row>
                </Container>

                <Row>
                    {tasksArr}
                </Row>
            </div>
        );
    }
}

export default Todo;