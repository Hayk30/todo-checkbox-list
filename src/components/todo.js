import React, { Component } from 'react';
// import Lists from './lists';
import './todo.css'
import { InputGroup, Button, FormControl, Container, Row, Col } from 'react-bootstrap';
import idGenerator from './idGenerator';
import MyCard from './card'

class Todo extends Component {
    state = {
        tasks: [],
        inpValues: '',
        selectedCard: new Set()
    }
    hendleChange = (ev) => {
        this.setState({
            inpValues: ev.target.value
        })
        console.log(ev.target.value)
    }
    onCheacke = (taskId) => {
        const selectedCard = new Set(this.state.selectedCard)
        if (selectedCard.has(taskId)) {
            selectedCard.delete(taskId)
        } else {
            selectedCard.add(taskId)
        }
        this.setState({
            selectedCard: selectedCard
        })
    }
    hendleClick = (ev) => {
        const { inpValues } = this.state
        if (!inpValues) {
            return
        }
        const myId = {
            text: inpValues,
            _id: idGenerator()
        }
        const newTasks = [myId, ...this.state.tasks]

        this.setState({
            tasks: newTasks,
            inpValues: ""
        })
    }
    hedleKeydown = (ev) => {
        if (ev.key === 'Enter') {
            this.hendleClick()
        }
    }
    hendleDelete = (taskId) => {
        const delId = this.state.tasks.filter(task => task._id !== taskId);
        this.setState({
            tasks: delId,
        })
    }
    handleRemove = () => {
        let tasks = [...this.state.tasks]
        this.state.selectedCard.forEach((id) => {
            tasks = tasks.filter((task) => task._id !== id)
        })
        this.setState({
            tasks,
            selectedCard: new Set()
        })
    }
    render() {
        const { inpValues, selectedCard } = this.state
        const tasksArr = this.state.tasks.map((task, i) => {
            return (
                <Col key={i} xs={12} sm={6} md={4} lg={3} xl={2}>
                    <MyCard
                        data={task}
                        onRemove={this.hendleDelete}
                        onCheacke={this.onCheacke}

                    />
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
                                    onKeyDown={(ev) => this.hedleKeydown(ev)}
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
                <Button
                    variant='outline-danger'
                    onClick={this.handleRemove}
                    disabled={selectedCard.size === 0 ? true : false}
                >
                    Remove Selected
                </Button>
            </div>
        );
    }
}

export default Todo;