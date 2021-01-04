import React, { PureComponent } from 'react';
// import Lists from './lists';
import './todo.css'
import { Button, Container, Row, Col } from 'react-bootstrap';
import idGenerator from './idGenerator';
import MyCard from './card'
import AddTask from './addTasks';
import Confirm from './removeModal';
import EditTaskModal from './editTaskModal';

class Todo extends PureComponent {
    state = {
        editTask: null,
        tasks: [],
        selectedCard: new Set(),
        toggle: false,
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
    hendleClick = (value) => {
        const myId = {
            text: value,
            _id: idGenerator()
        }
        const newTasks = [myId, ...this.state.tasks]

        this.setState({
            tasks: newTasks,
        })
    }

    hendleDelete = (taskId) => {
        const delId = this.state.tasks.filter(task => task._id !== taskId);
        this.setState({
            tasks: delId,
        })
    }
    toggleConfirm = () => {
        this.setState({
            toggle: !this.state.toggle
        })
    }
    toggleEditModal=(task)=> {
        this.setState({
            editTask: task
        })
    }
    handleRemove = () => {
        let tasks = [...this.state.tasks]
        this.state.selectedCard.forEach((id) => {
            tasks = tasks.filter((task) => task._id !== id)
        })
        this.setState({
            tasks,
            toggle:false,
            selectedCard: new Set()
        })
    }
    saveTask=(editedTask)=> {
        const tasks=[...this.state.tasks]
        const foundTextIndex=tasks.findIndex((task)=>task._id === editedTask._id)
        tasks[foundTextIndex]=editedTask
        this.setState({
            tasks:tasks,
            editTask: null,
        })
    }
    render() {
        const { toggle, selectedCard, editTask } = this.state
        const tasksArr = this.state.tasks.map((task, i) => {
            return (
                <Col key={i} xs={12} sm={6} md={4} lg={3} xl={2}>
                    <MyCard
                        data={task}
                        onRemove={this.hendleDelete}
                        onCheacke={this.onCheacke}
                        disabled={!!selectedCard.size}
                        onEdit={()=>this.toggleEditModal(task)}
                    />
                </Col>

            )
        })
        return (
            <div>
                <Container>
                    <Container>
                        <Row className="justify-content-center">
                            <Col md={8} xl={2} lg={3} sm={6}>
                                <AddTask
                                    onAdd={this.hendleClick}
                                    disabled={!!selectedCard.size}
                                />
                            </Col>
                        </Row>
                    </Container>

                    <Row>
                        {tasksArr}
                    </Row>
                    <Row>
                        <Col xs={4}>
                            <Button
                                variant='outline-danger'
                                onClick={this.toggleConfirm}
                                disabled={selectedCard.size === 0 ? true : false}
                            >
                                Remove Selected
                            </Button>
                        </Col>
                    </Row>
                </Container>
                {toggle &&
                <Confirm
                    onSubmite={this.handleRemove}
                    onClose={this.toggleConfirm}
                    count={selectedCard.size}
                />
                }
                {
                    !!editTask &&
                    <EditTaskModal
                        data={editTask}
                        onSave={this.saveTask}
                        onClose={() => this.toggleEditModal(null)}
                    />
                }

            </div>
        );
    }
}

export default Todo;